/* ============================================================
   app.js – Übersicht (Hub), Fortschritt & Spielablauf
   ============================================================ */
(() => {
  const $ = s => document.querySelector(s);
  const E = Util.el;
  const STORE = 'lernwelt_progress_v1';

  /* ---------- Fortschritt ---------- */
  const load = () => { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch(e){ return {}; } };
  const save = p => { try { localStorage.setItem(STORE, JSON.stringify(p)); } catch(e){} };
  let progress = load();
  const bestStars = id => progress[id] || 0;
  const totalStars = () => Object.values(progress).reduce((a,b)=>a+b,0);

  /* ---------- Audio beim ersten Tippen freischalten ---------- */
  let unlocked = false;
  const unlock = () => { if (unlocked) return; unlocked = true; Sound.unlock(); Speech.say(' '); };
  document.addEventListener('pointerdown', unlock, { once:true });

  /* ---------- Hub aufbauen ---------- */
  let currentFach = 'alle';

  function renderHub() {
    $('#starTotal').textContent = totalStars();
    const board = $('#board'); board.innerHTML = '';

    MONTHS.forEach(m => {
      const mods = MODULES.filter(x => x.monat === m.n && (currentFach === 'alle' || x.fach === currentFach));
      if (!mods.length) return;
      const section = E('div', 'month');
      const head = E('div', 'month-head');
      head.appendChild(E('h2', null, `Monat ${m.n}`));
      head.appendChild(E('span', 'when', m.when));
      head.appendChild(E('div', 'month-line'));
      section.appendChild(head);

      const tiles = E('div', 'tiles');
      mods.forEach(mod => tiles.appendChild(makeTile(mod)));
      section.appendChild(tiles);
      board.appendChild(section);
    });
  }

  const bankSize = m => (m.activities || []).length + (m.drill || []).length;

  function starRow(best) {
    let h = '';
    for (let i=1;i<=3;i++) h += `<span class="${i<=best?'earned':'empty'}">⭐</span>`;
    return h;
  }

  function makeTile(mod) {
    const best = bestStars(mod.id);
    const t = E('button', 'tile ' + mod.fach + (best ? ' done' : ''));
    t.innerHTML =
      `<span class="t-fach">${FACHNAME[mod.fach].split(' ')[0]}</span>` +
      `<span class="t-emoji">${mod.emoji}</span>` +
      `<span class="t-title">${mod.title}</span>` +
      `<span class="t-desc">${mod.desc}</span>` +
      `<span class="t-lb" title="Lernbereich laut LehrplanPLUS">📚 ${mod.lb}</span>` +
      `<span class="t-stars">${starRow(best)}` +
        `<span class="t-count" title="Aufgaben pro Runde von insgesamt verfügbaren">` +
        `${Math.min(mod.round, bankSize(mod))} von ${bankSize(mod)}</span></span>`;
    t.onclick = () => startModule(mod);
    return t;
  }

  /* ---------- Filter ---------- */
  $('#subjectFilters').addEventListener('click', e => {
    const b = e.target.closest('.filter'); if (!b) return;
    document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    currentFach = b.dataset.fach;
    renderHub();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Spielablauf ---------- */
  const player = $('#player'), stage = $('#stage');
  let mod = null, round = [], idx = 0, firstTryCount = 0;

  /** n zufällige Einträge, aber in der ursprünglichen Reihenfolge
      (die Banken sind nach Schwierigkeit sortiert) */
  function sampleOrdered(arr, n) {
    if (n >= arr.length) return arr.slice();
    return Util.shuffle(arr.map((_, i) => i)).slice(0, n)
      .sort((a, b) => a - b).map(i => arr[i]);
  }

  /** Runde zusammenstellen: erst Kernaufgaben (erklären), dann Übung.
      Ist eine der beiden Quellen zu klein, füllt die andere auf. */
  function buildRound(m) {
    const core = m.activities || [], drill = m.drill || [];
    const n = Math.min(m.round || 10, core.length + drill.length);
    let nCore = Math.min(core.length, Math.max(2, Math.round(n * 0.4)));
    let nDrill = Math.min(drill.length, n - nCore);
    nCore = Math.min(core.length, n - nDrill);   // Rest aus den Kernaufgaben
    return [...sampleOrdered(core, nCore), ...sampleOrdered(drill, nDrill)];
  }

  function startModule(m) {
    unlock();
    mod = m; round = buildRound(m); idx = 0; firstTryCount = 0;
    player.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (m.intro) Speech.say(m.intro); // Fuchsi begrüßt; erste Aufgabe reiht sich dahinter ein
    runActivity();
  }

  function exitGame() {
    Speech.stop();
    player.classList.add('hidden');
    document.body.style.overflow = '';
    renderHub();
  }
  $('#exitGame').onclick = exitGame;

  function setProgress() {
    const pct = (idx / round.length) * 100;
    $('#progressFill').style.width = pct + '%';
    $('#roundStarCount').textContent = firstTryCount;
  }

  function feedback(good, fact) {
    const f = $('#feedback');
    const extra = fact ? `<span class="fact">💡 ${fact}</span>` : '';
    f.innerHTML = `<div class="bubble ${good?'good':'oops'}${fact?' with-fact':''}">${good?'🎉 '+Util.praise():'💪 '+Util.cheer()}${extra}</div>`;
    f.classList.add('show');
    clearTimeout(feedback._t);
    feedback._t = setTimeout(() => f.classList.remove('show'), fact ? 3400 : 1300);
  }

  const ctx = {
    speak: t => Speech.say(t),
    autoSay: t => Speech.queue(t),
    miss: () => feedback(false),
    solved: firstTry => {
      const a = round[idx];
      if (firstTry) firstTryCount++;
      feedback(true, a.fact);
      Speech.say(Util.praise(), { rate: 1.25, pitch: 1.25 }); // fröhlich!
      if (a.fact) Speech.queue(a.fact); // kleine Erklärung nach dem Lob
      idx++;
      setProgress();
      // mit Erklärung etwas mehr Zeit zum Zuhören lassen
      setTimeout(() => { idx < round.length ? runActivity() : finish(); }, a.fact ? 3400 : 1100);
    }
  };

  function runActivity() {
    setProgress();
    const a = round[idx];
    Games.render(a.type, stage, a, ctx);
    stage.scrollTop = 0;
  }

  function finish() {
    const n = round.length;
    let stars = 1;
    if (firstTryCount >= n) stars = 3;
    else if (firstTryCount >= Math.ceil(n * 0.6)) stars = 2;
    if (stars > bestStars(mod.id)) { progress[mod.id] = stars; save(progress); }

    $('#progressFill').style.width = '100%';
    Sound.win(); Confetti.burst(160);
    const tip = Speakables.finishTip(stars);
    Speech.say(Speakables.finish(stars));

    const done = MODULES.filter(x => bestStars(x.id) > 0).length;
    stage.innerHTML = '';
    const r = E('div', 'result');
    r.innerHTML =
      `<div class="big">🦊</div>` +
      `<h2>Geschafft!</h2>` +
      `<div class="stars-earned">${'⭐'.repeat(stars)}${'☆'.repeat(3-stars)}</div>` +
      `<p>${tip}<br>Insgesamt: <b>${totalStars()} ⭐</b> · ${done}/${MODULES.length} Spiele gespielt</p>`;
    const again = E('button', 'btn-primary', '🔁 Nochmal spielen');
    again.onclick = () => startModule(mod);
    const back = E('button', 'btn-ghost', '🏠 Zur Übersicht');
    back.onclick = exitGame;
    const row = E('div'); row.style.cssText = 'display:flex;gap:14px;flex-wrap:wrap;justify-content:center';
    row.appendChild(again); row.appendChild(back);
    r.appendChild(row);
    stage.appendChild(r);
  }

  /* ---------- Vorlesen der Begrüßung ---------- */
  $('#speakWelcome').onclick = () => { unlock(); Speech.say(Speakables.WELCOME); };
  $('#mascot').onclick = () => { unlock(); Speech.say(Speakables.MASCOT); };

  /* ---------- Zurücksetzen ---------- */
  $('#resetProgress').onclick = () => {
    if (confirm('Möchtest du wirklich alle Sterne zurücksetzen?')) {
      progress = {}; save(progress); renderHub();
    }
  };

  /* Start */
  renderHub();
})();
