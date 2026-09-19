/* ============================================================
   engine.js – Ton, deutsche Sprachausgabe, Konfetti, Helfer
   Alles läuft rein im Browser (GitHub-Pages-tauglich).
   ============================================================ */

/* ---------- Audio-Feedback über WebAudio (kein Sound-File nötig) ---------- */
const Sound = (() => {
  let ctx;
  const ensure = () => { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); return ctx; };
  function tone(freq, start, dur, type = 'sine', gain = 0.18) {
    const c = ensure();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type; o.frequency.value = freq;
    o.connect(g); g.connect(c.destination);
    const t = c.currentTime + start;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.02);
  }
  return {
    correct() { [ [660,0],[880,0.09],[1175,0.18] ].forEach(([f,s]) => tone(f, s, 0.22, 'triangle')); },
    wrong()   { tone(300, 0, 0.18, 'sawtooth', 0.12); tone(200, 0.12, 0.22, 'sawtooth', 0.12); },
    tap()     { tone(520, 0, 0.08, 'sine', 0.10); },
    win()     { [523,659,784,1046].forEach((f,i) => tone(f, i*0.12, 0.3, 'triangle', 0.2)); },
    unlock()  { try { ensure().resume(); } catch(e){} }
  };
})();

/* ---------- Sprachausgabe (deutsch) ----------
   Zwei Stufen:
   1. Vorproduzierte Neural-TTS-Clips (assets/audio/de/<hash>.mp3),
      erzeugt mit tools/build-audio.sh – klingen natürlich & lebendig.
   2. Fallback Web Speech API, falls ein Clip fehlt oder das Manifest
      nicht geladen werden kann (z. B. file://).
   Eine gemeinsame Warteschlange hält Clips und TTS in Reihenfolge. */
const Speech = (() => {
  const synth = window.speechSynthesis;
  const isAndroid = /android/i.test(navigator.userAgent);

  /* --- vorproduzierte Clips --- */
  const AUDIO_BASE = 'assets/audio/de/';
  let clips = null; // Set der verfügbaren Hashes
  fetch(AUDIO_BASE + 'manifest.json')
    .then(r => (r.ok ? r.json() : null))
    .then(m => { if (m && m.files) clips = new Set(Object.keys(m.files)); })
    .catch(() => {}); // kein Manifest -> reine Web-Speech-Ausgabe

  /* --- Fallback: beste Web-Speech-Stimme wählen --- */
  function score(v) {
    if (!/^de/i.test(v.lang)) return -1;
    let s = 1;
    const n = v.name.toLowerCase();
    if (/natural|neural|online/.test(n)) s += 8;
    if (!v.localService) s += 4;
    if (/google/.test(n)) s += 3;
    if (/katja|vicki|amala|anna|petra|hedda/.test(n)) s += 2;
    if (/^de[-_]de/i.test(v.lang)) s += 2;
    return s;
  }
  let voice = null;
  function pick() {
    if (!synth) return;
    const best = synth.getVoices().filter(v => score(v) > 0)
      .sort((a, b) => score(b) - score(a))[0];
    if (best) voice = best;
  }
  if (synth) { pick(); synth.onvoiceschanged = pick; }

  // Chrome (Desktop) schläft bei längeren Ausgaben ein – sanft wachhalten
  if (synth && !isAndroid) setInterval(() => {
    if (synth.speaking && !synth.paused) synth.resume();
  }, 5000);

  const sentences = t => (String(t).match(/[^.!?…]+[.!?…]*/g) || [String(t)])
    .map(s => s.trim()).filter(Boolean);

  function utter(text, opts) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = (voice && voice.lang) || 'de-DE';
    u.rate  = opts.rate  || (isAndroid ? 1.2 : 1.1);
    u.pitch = opts.pitch || 1.08;
    if (voice) u.voice = voice;
    return u;
  }

  /* --- Warteschlange: Clips und TTS gemischt, strikt in Reihenfolge --- */
  let items = [], playing = false, audioEl = null, epoch = 0;

  function stopAll() {
    epoch++; items = []; playing = false;
    if (audioEl) { audioEl.onended = audioEl.onerror = null; audioEl.pause(); audioEl = null; }
    if (synth) synth.cancel();
  }
  function pump() {
    if (playing || !items.length) return;
    playing = true;
    const my = epoch, item = items.shift();
    playItem(item, () => { if (my !== epoch) return; playing = false; pump(); });
  }
  function playItem(item, done) {
    const text = Speakables.norm(item.text);
    const h = Speakables.hash(text);
    if (clips && clips.has(h)) {
      const a = new Audio(AUDIO_BASE + h + '.mp3');
      audioEl = a;
      a.onended = a.onerror = () => { audioEl = null; done(); };
      a.play().catch(() => { audioEl = null; speakTTS(text, item.opts, done); });
    } else speakTTS(text, item.opts, done);
  }
  function speakTTS(text, opts, done) {
    if (!synth) return done();
    const parts = sentences(text);
    let left = parts.length, ended = false;
    const finish = () => { if (!ended) { ended = true; clearTimeout(guard); done(); } };
    const guard = setTimeout(finish, 2000 + text.length * 90); // onend ist nicht überall verlässlich
    parts.forEach(p => {
      const u = utter(p, opts);
      u.onend = u.onerror = () => { if (--left <= 0) finish(); };
      synth.speak(u);
    });
  }
  // Nach cancel() kurz warten (Android verschluckt sonst den Anfang);
  // epoch verwirft wartende Texte, wenn inzwischen neu gesprochen wird.
  function push(text, opts, delay) {
    const my = epoch;
    const o = typeof opts === 'number' ? { rate: opts } : (opts || {});
    setTimeout(() => { if (my !== epoch) return; items.push({ text, opts: o }); pump(); }, delay);
  }

  return {
    /** spricht sofort (bricht Laufendes ab). opts: {rate, pitch} oder Zahl (rate) */
    say(text, opts)   { if (!text) return; stopAll(); push(text, opts, isAndroid ? 120 : 20); },
    /** wie say(), aber ohne laufende Ausgabe zu unterbrechen (reiht ein) */
    queue(text, opts) { if (!text) return; push(text, opts, isAndroid ? 130 : 25); },
    stop() { stopAll(); },
    /** Buchstaben-Laut vorlesen (nicht Buchstabenname) */
    letter(ch) {
      const map = { A:'a', E:'e', I:'i', O:'o', U:'u', M:'mmm', L:'lll', S:'sss',
        R:'rrr', F:'fff', N:'nnn', T:'t', W:'w' };
      this.say(map[ch] || ch, { rate: 0.9 });
    }
  };
})();

/* ---------- Konfetti ---------- */
const Confetti = (() => {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  let parts = [], raf = null;
  const colors = ['#ff7a59','#3aa0ff','#39c26b','#ffce3a','#b06bff','#ff5da2'];
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  addEventListener('resize', resize); resize();
  function burst(n = 120) {
    for (let i=0;i<n;i++) parts.push({
      x: innerWidth/2 + (Math.random()-.5)*220,
      y: innerHeight/3,
      vx:(Math.random()-.5)*9, vy: Math.random()*-9-3,
      g:0.24+Math.random()*0.12, r:6+Math.random()*8,
      c:colors[(Math.random()*colors.length)|0], rot:Math.random()*6, vr:(Math.random()-.5)*.4,
      life:90+Math.random()*40
    });
    if (!raf) loop();
  }
  function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    parts.forEach(p => {
      p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.fillStyle=p.c;
      ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*0.6); ctx.restore();
    });
    parts = parts.filter(p => p.life>0 && p.y < canvas.height+40);
    if (parts.length) raf = requestAnimationFrame(loop);
    else { ctx.clearRect(0,0,canvas.width,canvas.height); raf=null; }
  }
  return { burst };
})();

/* ---------- Kleine Helfer ---------- */
const Util = {
  shuffle(a){ a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=(Math.random()*(i+1))|0; [a[i],a[j]]=[a[j],a[i]]; } return a; },
  rand(min,max){ return min + ((Math.random()*(max-min+1))|0); },
  el(tag, cls, html){ const e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; },
  praise(){ return Speakables.PRAISE[(Math.random()*Speakables.PRAISE.length)|0]; },
  cheer(){ return Speakables.CHEER[(Math.random()*Speakables.CHEER.length)|0]; }
};
