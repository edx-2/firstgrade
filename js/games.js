/* ============================================================
   games.js – Aktivitäts-Typen (Lernspiele)
   Jede Funktion rendert EINE Aufgabe in "stage" und ruft
   ctx.solved(firstTry) auf, wenn sie richtig gelöst wurde.
   ctx: { solved(firstTry), miss(), speak(text) }
   ============================================================ */

const Games = (() => {
  const E = Util.el;

  /* Vorlese-Knopf – bei JEDER Aufgabe verfügbar ---------------- */
  function speakBtn(text, ctx, autoplay = true) {
    const b = E('button', 'speak-btn', '🔊 Vorlesen');
    b.onclick = () => ctx.speak(text);
    // reiht sich hinter Intro/Lob ein, statt es zu unterbrechen
    if (autoplay) setTimeout(() => (ctx.autoSay || ctx.speak)(text), 350);
    return b;
  }

  /* Wiederverwendbar: "Wähle eine richtige Antwort" ------------- */
  function renderChoice(stage, cfg, ctx) {
    let firstTry = true;
    stage.innerHTML = '';

    const title = E('div', 'q-title', cfg.title);
    stage.appendChild(title);
    if (cfg.sub) stage.appendChild(E('div', 'q-sub', cfg.sub));

    if (cfg.heroHtml) stage.appendChild(cfg.heroHtml);
    else if (cfg.hero) stage.appendChild(E('div', 'q-hero', cfg.hero));

    // Aufgabenstellung ist immer vorlesbar (Fallback: die Frage/Titel)
    const sayText = cfg.say || cfg.title;
    if (sayText) stage.appendChild(speakBtn(sayText, ctx));

    const cols = cfg.cols || (cfg.options.length <= 2 ? 2 : cfg.options.length === 4 ? 4 : 3);
    const grid = E('div', 'options cols-' + cols);
    Util.shuffle(cfg.options).forEach(o => {
      const b = E('button', 'opt');
      if (o.emoji) b.appendChild(E('span', 'opt-emoji', o.emoji));
      if (o.label != null) b.appendChild(E('span', 'opt-label', o.label));
      b.onclick = () => {
        if (b.classList.contains('correct') || b.classList.contains('dim')) return;
        if (o.correct) {
          b.classList.add('correct'); Sound.correct();
          grid.querySelectorAll('.opt').forEach(x => { if (x !== b) x.classList.add('dim'); });
          ctx.solved(firstTry);
        } else {
          b.classList.add('wrong', 'dim'); Sound.wrong(); firstTry = false;
          ctx.miss();
          setTimeout(() => b.classList.remove('wrong'), 450);
        }
      };
      grid.appendChild(b);
    });
    stage.appendChild(grid);
  }

  /* --- Multiple Choice (allgemein) --- */
  function mc(stage, a, ctx) {
    renderChoice(stage, {
      title: a.q, sub: a.sub, hero: a.hero, say: a.say || a.q,
      options: a.options.map(o => ({ label: o.t, emoji: o.e, correct: !!o.c })),
      cols: a.cols
    }, ctx);
  }

  /* --- Zählen --- */
  function count(stage, a, ctx) {
    const grid = E('div', 'count-grid');
    for (let i = 0; i < a.n; i++) {
      const s = E('span', null, a.emoji);
      s.style.animationDelay = (i * 0.06) + 's';
      grid.appendChild(s);
    }
    const opts = new Set([a.n]);
    while (opts.size < 4) { const c = Util.rand(Math.max(1, a.n - 3), a.n + 3); if (c > 0) opts.add(c); }
    renderChoice(stage, {
      title: a.q || 'Wie viele sind das?', say: a.q || 'Wie viele sind das?',
      heroHtml: grid,
      options: [...opts].map(v => ({ label: String(v), correct: v === a.n })),
      cols: 4
    }, ctx);
  }

  /* --- Rechnen (+/-) mit Zwanzigerfeld --- */
  function sum(stage, a, ctx) {
    const res = a.op === '+' ? a.a + a.b : a.a - a.b;
    const frame = E('div', 'tens');
    for (let i = 0; i < 20; i++) {
      const cell = E('div', 'cell');
      if (i < res) { cell.classList.add('on'); cell.textContent = a.emoji || '🔵'; }
      frame.appendChild(cell);
    }
    const opts = new Set([res]);
    while (opts.size < 4) { const c = res + Util.rand(-3, 3); if (c >= 0 && c <= 20) opts.add(c); }
    const q = `${a.a} ${a.op} ${a.b} = ?`;
    renderChoice(stage, {
      title: q, sub: 'Zähl die blauen Felder!', hero: null, heroHtml: frame,
      say: `Wie viel ist ${a.a} ${a.op === '+' ? 'plus' : 'minus'} ${a.b}? Zähl die Felder, wenn du magst.`,
      options: [...opts].sort((x, y) => x - y).map(v => ({ label: String(v), correct: v === res })),
      cols: 4
    }, ctx);
  }

  /* --- Anlaut: Womit beginnt das Wort? --- */
  function anlaut(stage, a, ctx) {
    const frage = a.q || 'Welcher Buchstabe ist am Anfang?';
    renderChoice(stage, {
      title: frage,
      sub: a.word, hero: a.emoji, say: `${frage} ${a.word}.`,
      options: a.letters.map(L => ({ label: L, correct: L === a.answer })),
      cols: a.letters.length
    }, ctx);
  }

  /* --- Muster / Was kommt als Nächstes? --- */
  function sequence(stage, a, ctx) {
    const row = E('div', 'q-hero');
    row.style.display = 'flex'; row.style.gap = '10px'; row.style.flexWrap = 'wrap'; row.style.justifyContent = 'center';
    a.seq.forEach(s => row.appendChild(E('span', null, s)));
    const q = E('span', null, '❓'); q.style.opacity = '.55'; row.appendChild(q);
    const isText = s => /^[A-Za-zÄÖÜäöüß0-9]+$/.test(s); // Text/Zahl vs. Emoji
    const frage = a.q || 'Was kommt als Nächstes?';
    // Lesbare Folgen (Zahlen, Wörter) werden mit vorgelesen – sonst hört
    // ein Nicht-Leser die Reihe nie. Emoji-Folgen brauchen ein eigenes a.say.
    const spoken = a.say || (a.seq.every(isText) && a.seq.length > 1
      ? `${a.seq.join(', ')}. ${frage}` : frage);
    renderChoice(stage, {
      title: frage, say: spoken,
      heroHtml: row,
      options: a.options.map(o => ({ label: isText(o) ? o : null, emoji: isText(o) ? null : o, correct: o === a.answer })),
      cols: a.options.length
    }, ctx);
  }

  /* --- Memory / Paare finden --- */
  function pairs(stage, a, ctx) {
    stage.innerHTML = '';
    const frage = a.q || 'Finde die Paare!';
    stage.appendChild(E('div', 'q-title', frage));
    stage.appendChild(speakBtn(frage, ctx));
    let firstTry = true, matched = 0, open = null, lock = false;
    const deck = [];
    a.pairs.forEach((p, gi) => { deck.push({ g: gi, v: p[0] }); deck.push({ g: gi, v: p[1] }); });
    const cells = Util.shuffle(deck);
    const n = cells.length;
    const cols = n <= 6 ? 3 : 4;
    const grid = E('div', 'memory'); grid.style.gridTemplateColumns = `repeat(${cols},1fr)`;
    cells.forEach(cd => {
      const card = E('div', 'card');
      card.appendChild(E('div', 'back', '?'));
      card.appendChild(E('div', 'front', cd.v));
      card.onclick = () => {
        if (lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;
        card.classList.add('flipped'); Sound.tap();
        if (!open) { open = { card, g: cd.g }; return; }
        if (open.card === card) return;
        if (open.g === cd.g) {
          card.classList.add('matched'); open.card.classList.add('matched');
          Sound.correct(); open = null; matched++;
          if (matched === a.pairs.length) { setTimeout(() => ctx.solved(firstTry), 400); }
        } else {
          lock = true; firstTry = false; Sound.wrong(); ctx.miss();
          const prev = open.card; open = null;
          setTimeout(() => { card.classList.remove('flipped'); prev.classList.remove('flipped'); lock = false; }, 800);
        }
      };
      grid.appendChild(card);
    });
    stage.appendChild(grid);
  }

  /* --- Sortieren in Körbe (Drag & Drop + Tippen) --- */
  function sort(stage, a, ctx) {
    stage.innerHTML = '';
    const frage = a.q || 'Sortiere richtig ein!';
    stage.appendChild(E('div', 'q-title', frage));
    stage.appendChild(speakBtn(`${frage} Ziehen oder antippen, dann den richtigen Korb wählen.`, ctx));
    let firstTry = true, placed = 0;
    const total = a.items.length;
    let selected = null; // für Tipp-Bedienung (Tablet)

    const buckets = E('div', 'buckets');
    a.buckets.forEach(bk => {
      const bEl = E('div', 'bucket');
      bEl.appendChild(E('h3', null, `${bk.emoji || ''} ${bk.name}`));
      const drop = E('div', 'drop'); bEl.appendChild(drop);
      bEl.dataset.key = bk.key;
      const accept = (chip, item) => {
        if (item.key === bk.key) {
          Sound.correct(); chip.classList.remove('dragging'); chip.style.cursor = 'default'; chip.style.outline = '';
          chip.onclick = null; chip.draggable = false; drop.appendChild(chip);
          placed++; selected = null;
          if (placed === total) setTimeout(() => ctx.solved(firstTry), 350);
        } else { Sound.wrong(); firstTry = false; ctx.miss(); bEl.classList.add('over'); setTimeout(()=>bEl.classList.remove('over'),300); }
      };
      bEl.ondragover = e => { e.preventDefault(); bEl.classList.add('over'); };
      bEl.ondragleave = () => bEl.classList.remove('over');
      bEl.ondrop = e => { e.preventDefault(); bEl.classList.remove('over');
        const id = e.dataTransfer.getData('text'); const chip = document.getElementById(id);
        if (chip) accept(chip, chip._item); };
      bEl.onclick = () => { if (selected) accept(selected.chip, selected.item); };
      buckets.appendChild(bEl);
    });

    const tray = E('div', 'sort-items');
    Util.shuffle(a.items).forEach((item, i) => {
      const chip = E('div', 'chip'); chip.id = 'chip' + i; chip._item = item; chip.draggable = true;
      if (item.emoji) chip.appendChild(E('span', 'chip-emoji', item.emoji));
      if (item.label) chip.appendChild(E('span', null, item.label));
      chip.ondragstart = e => { e.dataTransfer.setData('text', chip.id); chip.classList.add('dragging'); };
      chip.ondragend = () => chip.classList.remove('dragging');
      chip.onclick = () => {
        tray.querySelectorAll('.chip').forEach(c => c.style.outline = '');
        selected = { chip, item }; chip.style.outline = '4px solid var(--sun)'; Sound.tap();
      };
      tray.appendChild(chip);
    });

    stage.appendChild(E('div', 'q-sub', 'Ziehen oder antippen, dann Korb wählen.'));
    stage.appendChild(tray);
    stage.appendChild(buckets);
  }

  /* --- Buchstaben / Zahlen nachspuren (Canvas) --- */
  function trace(stage, a, ctx) {
    stage.innerHTML = '';
    const frage = a.q || `Spure den Buchstaben nach: ${a.char}`;
    stage.appendChild(E('div', 'q-title', frage));
    stage.appendChild(speakBtn(`${frage}. Das klingt so: ${a.sayText || a.char}`, ctx));

    const size = Math.min(360, Math.floor(innerWidth * 0.8));
    const wrap = E('div', 'trace-wrap'); wrap.style.width = size + 'px'; wrap.style.height = size + 'px';
    const ghost = E('div', 'trace-ghost', a.char); wrap.appendChild(ghost);
    const canvas = E('canvas'); canvas.id = 'traceCanvas'; canvas.width = size; canvas.height = size;
    wrap.appendChild(canvas);
    const c = canvas.getContext('2d');
    c.lineWidth = Math.max(14, size / 16); c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = '#ff7a59';
    let drawing = false, painted = 0;
    const pos = e => { const r = canvas.getBoundingClientRect(); const p = e.touches ? e.touches[0] : e;
      return { x: (p.clientX - r.left) * (canvas.width / r.width), y: (p.clientY - r.top) * (canvas.height / r.height) }; };
    const start = e => { drawing = true; const {x,y} = pos(e); c.beginPath(); c.moveTo(x, y); e.preventDefault(); };
    const move = e => { if (!drawing) return; const {x,y} = pos(e); c.lineTo(x, y); c.stroke(); painted++; e.preventDefault(); };
    const end = () => drawing = false;
    canvas.addEventListener('mousedown', start); canvas.addEventListener('mousemove', move);
    addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start, {passive:false}); canvas.addEventListener('touchmove', move, {passive:false});
    canvas.addEventListener('touchend', end);
    stage.appendChild(wrap);

    const tools = E('div', 'trace-tools');
    const clear = E('button', 'btn-ghost', '🧽 Nochmal');
    clear.onclick = () => { c.clearRect(0,0,size,size); painted = 0; };
    const done = E('button', 'btn-primary', '✅ Fertig!');
    done.onclick = () => { if (painted < 8) { ctx.speak('Spure den Buchstaben erst nach!'); return; } Sound.correct(); ctx.solved(true); };
    tools.appendChild(clear); tools.appendChild(done);
    stage.appendChild(tools);
  }

  const map = { mc, count, sum, anlaut, sequence, pairs, sort, trace };
  return {
    render(type, stage, activity, ctx) { (map[type] || mc)(stage, activity, ctx); }
  };
})();
