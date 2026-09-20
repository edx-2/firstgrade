/* ============================================================
   speakables.js – DIE gemeinsame Quelle aller gesprochenen Texte.
   Wird vom Browser (engine/games/app) UND von der Audio-Pipeline
   (tools/extract-phrases.mjs) genutzt, damit die vorproduzierten
   MP3-Clips exakt zu den Texten der App passen.
   ============================================================ */

const Speakables = (() => {
  const PRAISE = ['Super!','Klasse!','Toll gemacht!','Wow!','Prima!','Richtig!','Spitze!','Bravo!'];
  const CHEER  = ['Fast! Probier nochmal.','Ups, versuch es nochmal!','Nicht ganz – du schaffst das!','Kein Problem, nochmal!'];
  const WELCOME = 'Hallo! Ich bin Fuchsi der Fuchs. Such dir ein Spiel aus und sammle ganz viele Sterne!';
  const MASCOT  = 'Wuff... ähm, ich meine: Los geht\'s!';
  const TRACE_FIRST = 'Erst nachspuren! Dann drückst du auf fertig.';

  const norm = t => String(t).replace(/\s+/g, ' ').trim();

  /* FNV-1a über UTF-8-Bytes; Dateiname der Clips.
     Muss identisch bleiben zu tools/ (die Pipeline übernimmt den Hash aus
     phrases.json, rechnet also nie selbst). */
  function hash(text) {
    const bytes = new TextEncoder().encode(norm(text));
    let h = 0x811c9dc5;
    for (const b of bytes) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, '0');
  }

  const isText = s => /^[A-Za-zÄÖÜäöüß0-9]+$/.test(s);

  const traceTitle = a => a.q || (/^\d+$/.test(String(a.char))
    ? `Spure die Zahl nach: ${a.char}`
    : `Spure den Buchstaben nach: ${a.char}`);

  /* Gesprochener Text je Aufgabentyp (Spiegel der Logik in games.js) */
  const say = {
    mc:      a => a.say || a.q,
    count:   a => a.q || 'Wie viele sind das?',
    // bewusst kurz: beim Üben vieler Aufgaben nacheinander nervt ein langer Satz
    sum:     a => `Wie viel ist ${a.a} ${a.op === '+' ? 'plus' : 'minus'} ${a.b}?`,
    anlaut:  a => `${a.q || 'Welcher Buchstabe ist am Anfang?'} ${a.word}.`,
    sequence:a => a.say || (a.seq.every(isText) && a.seq.length > 1
                 ? `${a.seq.join(', ')}. ${a.q || 'Was kommt als Nächstes?'}`
                 : (a.q || 'Was kommt als Nächstes?')),
    pairs:   a => a.q || 'Finde die Paare!',
    sort:    a => `${a.q || 'Sortiere richtig ein!'} Ziehen oder antippen, dann den richtigen Korb wählen.`,
    trace:   a => `${traceTitle(a)}. Das klingt so: ${a.sayText || a.char}`
  };
  const forActivity = a => (say[a.type] || say.mc)(a);

  const finishTip = stars =>
    stars === 3 ? 'Alles beim ersten Versuch richtig. Fantastisch!'
  : stars === 2 ? 'Fast perfekt! Spiel nochmal und hol dir den dritten Stern.'
  :               'Übung macht den Meister. Spiel gleich nochmal!';
  const finish = stars =>
    `Geschafft! Du hast ${stars} ${stars === 1 ? 'Stern' : 'Sterne'} gesammelt. ${finishTip(stars)}`;

  /* Alle Sätze der App aufzählen – Grundlage der Audio-Pipeline */
  function collect(modules) {
    const out = new Map(); // hash -> {text, cat}
    const add = (text, cat) => { if (text) { const t = norm(text); out.set(hash(t), { text: t, cat }); } };
    PRAISE.forEach(t => add(t, 'praise'));
    CHEER.forEach(t => add(t, 'cheer'));
    [WELCOME, MASCOT, TRACE_FIRST].forEach(t => add(t, 'static'));
    [1, 2, 3].forEach(s => add(finish(s), 'finish'));
    for (const m of modules) {
      add(m.intro, 'intro');
      // Kernaufgaben UND die gesamte Übungsbank – sonst fehlen Clips
      for (const a of [...(m.activities || []), ...(m.drill || [])]) {
        add(forActivity(a), 'task');
        add(a.fact, 'fact');
      }
    }
    return [...out.entries()].map(([h, v]) => ({ hash: h, text: v.text, cat: v.cat }));
  }

  const api = { PRAISE, CHEER, WELCOME, MASCOT, TRACE_FIRST,
                norm, hash, forActivity, traceTitle, finishTip, finish, collect };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; // Node (Pipeline)
  return api;
})();
