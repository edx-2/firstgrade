/* ============================================================
   pools.js – Wortschatz & Aufgaben-Generatoren.

   Liefert die "Übungsbank" (drill) jedes Moduls: viele gleichartige
   Aufgaben, aus denen pro Runde eine frische Auswahl gezogen wird.

   WICHTIG: Alle Generatoren sind deterministisch (kein Zufall!).
   Der Zufall steckt allein in der Auswahl zur Spielzeit. Nur so kann
   die Audio-Pipeline jeden möglichen Satz vorab als MP3 rendern.
   ============================================================ */

const Pools = (() => {

  /* ---------- Wortschatz: Wort, Bild, Anlaut, Silbenzahl ---------- */
  const W = (w, e, a, s) => ({ w, e, a, s });
  const WORDS = [
    W('Affe','🐵','A',2),   W('Apfel','🍎','A',2),   W('Ampel','🚦','A',2),
    W('Auto','🚗','A',2),   W('Ananas','🍍','A',3),
    W('Ball','⚽','B',1),   W('Banane','🍌','B',3),  W('Baum','🌳','B',1),
    W('Blume','🌸','B',2),  W('Brot','🍞','B',1),    W('Biene','🐝','B',2),
    W('Buch','📚','B',1),   W('Boot','⛵','B',1),
    W('Dose','🥫','D',2),   W('Drache','🐉','D',2),
    W('Elefant','🐘','E',3),W('Ente','🦆','E',2),    W('Erdbeere','🍓','E',3),
    W('Eule','🦉','E',2),   W('Eimer','🪣','E',2),
    W('Fisch','🐟','F',1),  W('Fuchs','🦊','F',1),   W('Frosch','🐸','F',1),
    W('Feuer','🔥','F',2),  W('Flasche','🍶','F',2),
    W('Gabel','🍴','G',2),  W('Giraffe','🦒','G',3), W('Gitarre','🎸','G',3),
    W('Hund','🐕','H',1),   W('Haus','🏠','H',1),    W('Hand','✋','H',1),
    W('Hase','🐇','H',2),   W('Hut','🎩','H',1),     W('Honig','🍯','H',2),
    W('Igel','🦔','I',2),   W('Insel','🏝️','I',2),
    W('Katze','🐈','K',2),  W('Kuh','🐄','K',1),     W('Krone','👑','K',2),
    W('Kerze','🕯️','K',2),  W('Käse','🧀','K',2),    W('Koffer','🧳','K',2),
    W('Löwe','🦁','L',2),   W('Lampe','💡','L',2),   W('Leiter','🪜','L',2),
    W('Maus','🐭','M',1),   W('Mond','🌙','M',1),    W('Mama','👩','M',2),
    W('Messer','🔪','M',2), W('Melone','🍈','M',3),
    W('Nase','👃','N',2),   W('Nuss','🌰','N',1),    W('Nadel','📍','N',2),
    W('Oma','👵','O',2),    W('Opa','👴','O',2),     W('Ohr','👂','O',1),
    W('Pilz','🍄','P',1),   W('Pinsel','🖌️','P',2),  W('Pferd','🐎','P',1),
    W('Rose','🌹','R',2),   W('Rakete','🚀','R',3),  W('Ring','💍','R',1),
    W('Regen','🌧️','R',2),
    W('Sonne','☀️','S',2),  W('Salat','🥗','S',2),   W('Socke','🧦','S',2),
    W('Seife','🧼','S',2),  W('Sofa','🛋️','S',2),
    W('Tomate','🍅','T',3), W('Tiger','🐅','T',2),   W('Tür','🚪','T',1),
    W('Torte','🎂','T',2),  W('Tasse','☕','T',2),
    W('Uhr','🕐','U',1),
    W('Vogel','🐦','V',2),  W('Vase','🏺','V',2),
    W('Wolke','☁️','W',2),  W('Wald','🌲','W',1),    W('Wurm','🐛','W',1),
    W('Zebra','🦓','Z',2),  W('Zitrone','🍋','Z',3), W('Zahn','🦷','Z',1),
    W('Zug','🚂','Z',1)
  ];
  const SCH = [
    W('Schaf','🐑','Sch',1),   W('Schule','🏫','Sch',2),
    W('Schiff','🚢','Sch',1),  W('Schere','✂️','Sch',2),
    W('Schnecke','🐌','Sch',2),W('Schlüssel','🔑','Sch',2)
  ];
  const ALL = WORDS.concat(SCH);
  const byWord = w => ALL.find(x => x.w === w);

  /* ---------- Helfer ---------- */
  // deterministische Ablenker: nimmt aus 'from' die ersten, die nicht 'not' sind
  const distract = (from, not, n, seed = 0) => {
    const pool = from.filter(x => x !== not);
    const out = [];
    for (let i = 0; i < n && pool.length; i++) out.push(pool[(seed + i * 3 + 1) % pool.length]);
    return [...new Set(out)].slice(0, n);
  };
  const LETTERS = 'ABDEFGHIKLMNOPRSTUVWZ'.split('');

  /* ================= DEUTSCH ================= */

  /** Anlaut-Aufgaben für bestimmte Anfangsbuchstaben */
  function anlaute(letters) {
    const set = ALL.filter(x => letters.includes(x.a));
    return set.map((x, i) => ({
      type: 'anlaut', word: x.w, emoji: x.e, answer: x.a,
      letters: [x.a, ...distract(letters.length >= 3 ? letters : LETTERS, x.a, 2, i)]
        .slice(0, 3).sort()
    }));
  }

  /** Silben klatschen */
  function silben(words) {
    return words.map(w => byWord(w)).filter(Boolean).map(x => ({
      type: 'mc', hero: x.e,
      q: `Wie viele Silben hat: ${x.w.toUpperCase()}?`,
      say: `${x.w}. Klatsch mit! Wie viele Silben hat ${x.w}?`,
      options: [1, 2, 3].map(n => ({ t: String(n), c: n === x.s })),
      cols: 3
    }));
  }

  /** Wort lesen und Bild zuordnen */
  function lesen(words) {
    return words.map((w, i) => {
      const x = byWord(w);
      if (!x) return null;
      const others = ALL.filter(y => y.a !== x.a && y.e !== x.e);
      const d = [others[(i * 7 + 2) % others.length], others[(i * 13 + 5) % others.length]];
      return {
        type: 'mc',
        q: `Lies das Wort:  ${x.w.toUpperCase().split('').join(' ')}`,
        say: `Lies das Wort. ${x.w.toUpperCase().split('').join('. ')}.`,
        options: [{ e: x.e, c: true }, { e: d[0].e }, { e: d[1].e }], cols: 3
      };
    }).filter(Boolean);
  }

  /** Fehlender Buchstabe (Selbstlaut) */
  function fehlenderLaut(items) {
    return items.map(([w, pos]) => {
      const x = byWord(w);
      if (!x) return null;
      const up = x.w.toUpperCase();
      const miss = up[pos];
      const shown = up.split('').map((c, i) => (i === pos ? '_' : c)).join(' ');
      return {
        type: 'mc', hero: x.e, q: shown,
        say: `${x.w}. Welcher Buchstabe fehlt?`,
        options: [miss, ...distract('AEIOU'.split(''), miss, 2, pos)]
          .slice(0, 3).map(c => ({ t: c, c: c === miss })),
        cols: 3
      };
    }).filter(Boolean);
  }

  /** Groß-/Kleinbuchstaben-Memory in Vierergruppen */
  function grossKlein(groups) {
    return groups.map(g => ({
      type: 'pairs', q: 'Finde Groß- und Kleinbuchstaben!',
      pairs: g.split('').map(c => [c, c.toLowerCase()])
    }));
  }

  /** Artikel-Zuordnung als Einzelfrage */
  function artikel(items) {
    return items.map(([w, art]) => {
      const x = byWord(w);
      return {
        type: 'mc', hero: x ? x.e : null,
        q: `Welcher Artikel passt zu "${w}"?`,
        say: `Der, die oder das? Welcher Artikel passt zu ${w}?`,
        options: ['der', 'die', 'das'].map(a => ({ t: a, c: a === art })), cols: 3
      };
    });
  }

  /* ================= MATHEMATIK ================= */

  const COUNT_EMOJI = ['🍎','⭐','🐟','🎈','🐝','🌼','🚗','🔵','🍓','🐞','🎁','🦋'];

  /** Zählaufgaben – alle teilen denselben Sprechtext (spart Clips) */
  function zaehlen(from, to, step = 1) {
    const out = [];
    for (let n = from, i = 0; n <= to; n += step, i++)
      out.push({ type: 'count', emoji: COUNT_EMOJI[i % COUNT_EMOJI.length], n });
    return out;
  }

  /** Alle Plusaufgaben mit Summe <= max */
  function plus(max, minA = 1) {
    const out = [];
    for (let a = minA; a < max; a++)
      for (let b = 1; a + b <= max; b++) out.push({ type: 'sum', a, b, op: '+' });
    return out;
  }
  /** Alle Minusaufgaben im Bereich bis max (Ergebnis >= 0) */
  function minus(max, minA = 2) {
    const out = [];
    for (let a = minA; a <= max; a++)
      for (let b = 1; b <= a; b++) out.push({ type: 'sum', a, b, op: '-' });
    return out;
  }
  /** Plus mit Zehnerübergang (die wirklich schweren) */
  function plusUeber10() {
    const out = [];
    for (let a = 4; a <= 9; a++)
      for (let b = 2; b <= 9; b++) if (a + b > 10 && a + b <= 20) out.push({ type: 'sum', a, b, op: '+' });
    return out;
  }
  /** Minus mit Zehnerübergang */
  function minusUeber10() {
    const out = [];
    for (let a = 11; a <= 20; a++)
      for (let b = 2; b <= 9; b++) if (a - b < 10 && a - b >= 0) out.push({ type: 'sum', a, b, op: '-' });
    return out;
  }
  /** Zahl erkennen: Zahlwort -> Ziffer */
  const ZAHLWORT = ['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn',
    'elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn','zwanzig'];
  function zahlErkennen(from, to) {
    const out = [];
    for (let n = from; n <= to; n++) {
      const d = [n + 1 <= to ? n + 1 : n - 2, n - 1 >= from ? n - 1 : n + 2].filter(x => x !== n);
      out.push({
        type: 'mc', q: `Welche Zahl ist das?  ${ZAHLWORT[n]}`,
        say: `Welche Zahl ist das? ${ZAHLWORT[n]}.`,
        options: [{ t: String(n), c: true }, ...[...new Set(d)].slice(0, 2).map(x => ({ t: String(x) }))],
        cols: 3
      });
    }
    return out;
  }
  /** Zahlenfolgen fortsetzen */
  function folgen(start, end, step) {
    const out = [];
    for (let s = start; s + 4 * step <= end; s += step) {
      const seq = [0, 1, 2, 3].map(i => String(s + i * step));
      const ans = String(s + 4 * step);
      out.push({
        type: 'sequence', q: 'Welche Zahl kommt als Nächstes?',
        seq, answer: ans,
        options: [ans, String(s + 5 * step), String(s + 3 * step)]
          .filter((v, i, arr) => arr.indexOf(v) === i)
      });
    }
    return out;
  }
  /** Größenvergleich zweier Zahlen */
  function vergleich(pairs) {
    return pairs.map(([a, b]) => ({
      type: 'mc', q: 'Welche Zahl ist größer?', say: 'Welche Zahl ist größer?',
      options: [{ t: String(a), c: a > b }, { t: String(b), c: b > a }], cols: 2
    }));
  }
  /** Geld zählen (Münzen à 1 €) */
  function geld(from, to) {
    const out = [];
    for (let n = from; n <= to; n++) out.push({
      type: 'mc', hero: '🪙'.repeat(n), sub: 'Jede Münze = 1 Euro',
      q: 'Wie viel Geld ist das?', say: 'Wie viel Geld ist das? Jede Münze ist ein Euro.',
      options: [{ t: `${n} €`, c: true }, { t: `${n + 1} €` }, { t: `${Math.max(1, n - 1)} €` }]
        .filter((o, i, arr) => arr.findIndex(x => x.t === o.t) === i),
      cols: 3
    });
    return out;
  }
  /** Volle Stunden auf der Uhr */
  const CLOCK = ['🕛','🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚'];
  function uhrzeiten(hours) {
    return hours.map(h => ({
      type: 'mc', hero: CLOCK[h % 12], q: 'Wie viel Uhr ist es?',
      say: 'Schau auf die Uhr. Wie viel Uhr ist es?',
      options: [h, (h % 12) + 1, ((h + 5) % 12) + 1]
        .filter((v, i, a) => a.indexOf(v) === i).slice(0, 3)
        .map(v => ({ t: `${v} Uhr`, c: v === h })),
      cols: 3
    }));
  }
  /** Sachaufgaben aus Vorlagen */
  function sachaufgaben(items) {
    return items.map(([text, spoken, res, hero]) => ({
      type: 'mc', q: text, say: spoken, hero,
      options: [res, res + 1, Math.max(0, res - 1)]
        .filter((v, i, a) => a.indexOf(v) === i).slice(0, 3)
        .map(v => ({ t: String(v), c: v === res })),
      cols: 3
    }));
  }

  /* ================= ALLGEMEIN ================= */

  /** Einfache Bild-Auswahl: [Frage, richtig(emoji,text), falsch...] */
  function quiz(items) {
    return items.map(([q, say, correct, ...wrong]) => ({
      type: 'mc', q, say: say || q,
      options: [{ e: correct[0], t: correct[1], c: true },
                ...wrong.map(w => ({ e: w[0], t: w[1] }))],
      cols: Math.min(3, 1 + wrong.length)
    }));
  }

  return { WORDS, SCH, ALL, byWord, anlaute, silben, lesen, fehlenderLaut, grossKlein,
           artikel, zaehlen, plus, minus, plusUeber10, minusUeber10, zahlErkennen,
           folgen, vergleich, geld, uhrzeiten, sachaufgaben, quiz, ZAHLWORT };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = Pools;
