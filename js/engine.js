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
   Natürlicher klingen ohne Server:
   - beste verfügbare Stimme per Scoring (Natural/Online > Google > Rest)
   - Satz für Satz sprechen -> flüssigere Satzmelodie, bes. auf Android
   - Android-Bug umgehen: speak() direkt nach cancel() wird verschluckt
   - freundlichere Grundtonhöhe, normales Tempo (0.9 klang gelangweilt) */
const Speech = (() => {
  const synth = window.speechSynthesis;
  const isAndroid = /android/i.test(navigator.userAgent);
  let voice = null;

  function score(v) {
    if (!/^de/i.test(v.lang)) return -1;
    let s = 1;
    const n = v.name.toLowerCase();
    if (/natural|neural|online/.test(n)) s += 8; // z. B. Edge "Katja Online (Natural)"
    if (!v.localService) s += 4;                 // Netzwerk-Stimmen klingen voller
    if (/google/.test(n)) s += 3;
    if (/katja|vicki|amala|anna|petra|hedda/.test(n)) s += 2;
    if (/^de[-_]de/i.test(v.lang)) s += 2;       // de-DE vor de-AT/CH
    return s;
  }
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

  // kurze Sätze statt eines langen Blocks -> natürlichere Betonung
  const sentences = t => (String(t).match(/[^.!?…]+[.!?…]*/g) || [String(t)])
    .map(s => s.trim()).filter(Boolean);

  function utter(text, opts) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = (voice && voice.lang) || 'de-DE';
    u.rate  = opts.rate  || (isAndroid ? 1.0 : 0.95);
    u.pitch = opts.pitch || 1.08;
    if (voice) u.voice = voice;
    return u;
  }
  function enqueue(text, opts) { sentences(text).forEach(s => synth.speak(utter(s, opts))); }

  // Nach cancel() kurz warten (Android verschluckt sonst den Anfang).
  // epoch sorgt dafür, dass ein neues say() ältere, noch wartende Texte verwirft.
  let gate = 0, epoch = 0;
  function later(fn) {
    const my = epoch;
    const wait = Math.max(0, gate - Date.now());
    const run = () => { if (my === epoch) fn(); };
    wait ? setTimeout(run, wait + 5) : run();
  }
  const norm = o => typeof o === 'number' ? { rate: o } : (o || {});

  return {
    /** spricht sofort (bricht Laufendes ab). opts: {rate, pitch} oder Zahl (rate) */
    say(text, opts) {
      if (!synth || !text) return;
      epoch++;
      synth.cancel();
      gate = Date.now() + (isAndroid ? 150 : 40);
      later(() => enqueue(text, norm(opts)));
    },
    /** wie say(), aber ohne laufende Ausgabe zu unterbrechen (reiht ein) */
    queue(text, opts) {
      if (!synth || !text) return;
      later(() => enqueue(text, norm(opts)));
    },
    stop() { if (synth) { epoch++; gate = 0; synth.cancel(); } },
    /** Buchstaben-Laut vorlesen (nicht Buchstabenname) */
    letter(ch) {
      const map = { A:'a', E:'e', I:'i', O:'o', U:'u', M:'mmm', L:'lll', S:'sss',
        R:'rrr', F:'fff', N:'nnn', T:'t', W:'w' };
      this.say(map[ch] || ch, { rate: 0.8 });
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
  praise(){ return ['Super!','Klasse!','Toll gemacht!','Wow!','Prima!','Richtig!','Spitze!','Bravo!'][ (Math.random()*8)|0 ]; },
  cheer(){ return ['Fast! Probier nochmal.','Ups, versuch es nochmal!','Nicht ganz – du schaffst das!','Kein Problem, nochmal!'][ (Math.random()*4)|0 ]; }
};
