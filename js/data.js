/* ============================================================
   data.js – Der komplette Lehrplan der 1. Klasse (Bayern)
   als monatlich gegliederte, interaktive Lernspiele.
   Orientiert am LehrplanPLUS: Deutsch, Mathematik, HSU.
   ============================================================ */

const MONTHS = [
  { n: 1,  when: 'September' }, { n: 2,  when: 'Oktober' },
  { n: 3,  when: 'November' },  { n: 4,  when: 'Dezember' },
  { n: 5,  when: 'Januar' },    { n: 6,  when: 'Februar' },
  { n: 7,  when: 'März' },      { n: 8,  when: 'April' },
  { n: 9,  when: 'Mai' },       { n: 10, when: 'Juni / Juli' }
];

const FACHNAME = { deutsch: 'Deutsch', mathe: 'Mathematik', hsu: 'Sachkunde (HSU)' };

/* kleine Helfer (data.js lädt zuerst, daher lokal) */
const S = (a,b,op,emoji) => ({ type:'sum', a, b, op, emoji });   // Rechenaufgabe
const C = (emoji,n,q) => ({ type:'count', emoji, n, q });         // Zählaufgabe

/* ------------------------------------------------------------------ */
/*  M O D U L E                                                        */
/* ------------------------------------------------------------------ */
const MODULES = [

/* =========================  D E U T S C H  ========================= */
{ id:'de1', fach:'deutsch', monat:1, emoji:'🔤', title:'Laute & erste Buchstaben',
  desc:'Anlaute hören: A, M, L, O, S', lb:'Schriftspracherwerb · Laute wahrnehmen',
  activities:[
    { type:'anlaut', word:'Affe', emoji:'🐵', answer:'A', letters:['A','M','O'] },
    { type:'anlaut', word:'Maus', emoji:'🐭', answer:'M', letters:['M','L','S'] },
    { type:'anlaut', word:'Oma',  emoji:'👵', answer:'O', letters:['O','A','L'] },
    { type:'anlaut', word:'Sonne',emoji:'☀️', answer:'S', letters:['S','M','O'] },
    { type:'trace', char:'A', sayText:'a' },
    { type:'trace', char:'M', sayText:'mmm' }
  ]},
{ id:'de2', fach:'deutsch', monat:2, emoji:'👏', title:'Silben klatschen',
  desc:'Silben zählen & neue Buchstaben E, I, N, R, T', lb:'Phonologische Bewusstheit',
  activities:[
    { type:'mc', q:'Wie viele Silben hat: BA-NA-NE?', hero:'🍌', say:'Banane',
      options:[{t:'2'},{t:'3',c:true},{t:'4'}], cols:3 },
    { type:'mc', q:'Wie viele Silben hat: SON-NE?', hero:'☀️', say:'Sonne',
      options:[{t:'1'},{t:'2',c:true},{t:'3'}], cols:3 },
    { type:'anlaut', word:'Igel', emoji:'🦔', answer:'I', letters:['I','E','N'] },
    { type:'anlaut', word:'Nase', emoji:'👃', answer:'N', letters:['N','R','T'] },
    { type:'anlaut', word:'Tomate', emoji:'🍅', answer:'T', letters:['T','E','I'] },
    { type:'trace', char:'E', sayText:'e' }
  ]},
{ id:'de3', fach:'deutsch', monat:3, emoji:'📕', title:'Erste Wörter lesen',
  desc:'Kurze Wörter zum Bild zuordnen', lb:'Lesen · Wörter erlesen',
  activities:[
    { type:'mc', q:'Lies das Wort:  O M A', say:'Oma', options:[{e:'👵',c:true},{e:'🐟'},{e:'🌙'}], cols:3 },
    { type:'mc', q:'Lies das Wort:  M A U S', say:'Maus', options:[{e:'🐭',c:true},{e:'🏠'},{e:'🌳'}], cols:3 },
    { type:'mc', q:'Lies das Wort:  S O N N E', say:'Sonne', options:[{e:'☀️',c:true},{e:'🌧️'},{e:'⭐'}], cols:3 },
    { type:'mc', q:'Lies das Wort:  R O S E', say:'Rose', options:[{e:'🌹',c:true},{e:'🍎'},{e:'🐛'}], cols:3 },
    { type:'mc', q:'Lies das Wort:  E S E L', say:'Esel', options:[{e:'🫏',c:true},{e:'🐘'},{e:'🦁'}], cols:3 }
  ]},
{ id:'de4', fach:'deutsch', monat:4, emoji:'🎵', title:'Reime finden',
  desc:'Wörter, die sich reimen', lb:'Sprache untersuchen · Reime',
  activities:[
    { type:'mc', q:'Was reimt sich auf HAUS?', hero:'🏠', say:'Was reimt sich auf Haus?',
      options:[{e:'🐭',t:'Maus',c:true},{e:'🌳',t:'Baum'},{e:'🐟',t:'Fisch'}], cols:3 },
    { type:'mc', q:'Was reimt sich auf HASE?', hero:'🐇', say:'Was reimt sich auf Hase?',
      options:[{e:'👃',t:'Nase',c:true},{e:'🐕',t:'Hund'},{e:'🌸',t:'Blume'}], cols:3 },
    { type:'mc', q:'Was reimt sich auf KATZE?', hero:'🐈', say:'Was reimt sich auf Katze?',
      options:[{e:'🐾',t:'Tatze',c:true},{e:'🐁',t:'Maus'},{e:'🥛',t:'Milch'}], cols:3 },
    { type:'mc', q:'Was reimt sich auf TÜR?', hero:'🚪', say:'Was reimt sich auf Tür?',
      options:[{t:'für',c:true},{t:'Tag'},{t:'Haus'}], cols:3 }
  ]},
{ id:'de5', fach:'deutsch', monat:5, emoji:'🔠', title:'Groß und klein',
  desc:'Große und kleine Buchstaben als Paar', lb:'Buchstaben kennen',
  activities:[
    { type:'pairs', q:'Finde Groß- und Kleinbuchstaben!', pairs:[['A','a'],['M','m'],['S','s'],['R','r']] },
    { type:'pairs', q:'Finde die Paare!', pairs:[['E','e'],['O','o'],['L','l'],['T','t']] },
    { type:'mc', q:'Welcher ist der große Buchstabe zu "n"?', say:'n',
      options:[{t:'N',c:true},{t:'M'},{t:'H'}], cols:3 }
  ]},
{ id:'de6', fach:'deutsch', monat:6, emoji:'📝', title:'Sätze lesen',
  desc:'Kurze Sätze verstehen', lb:'Lesen · Sinn entnehmen',
  activities:[
    { type:'mc', q:'Die Katze trinkt Milch.', say:'Die Katze trinkt Milch.',
      sub:'Was passt zum Satz?', options:[{e:'🐈🥛',c:true},{e:'🐕🦴'},{e:'🐟💧'}], cols:3 },
    { type:'mc', q:'Der Ball ist rot.', say:'Der Ball ist rot.',
      options:[{e:'🔴',c:true},{e:'🔵'},{e:'🟢'}], cols:3 },
    { type:'mc', q:'Die Sonne scheint.', say:'Die Sonne scheint.',
      options:[{e:'☀️',c:true},{e:'🌧️'},{e:'❄️'}], cols:3 },
    { type:'mc', q:'Ich esse einen Apfel.', say:'Ich esse einen Apfel.',
      options:[{e:'🍎',c:true},{e:'🍌'},{e:'🍇'}], cols:3 }
  ]},
{ id:'de7', fach:'deutsch', monat:7, emoji:'🐑', title:'Sch, ch, ei und au',
  desc:'Besondere Laute erkennen', lb:'Schriftspracherwerb · Laute',
  activities:[
    { type:'anlaut', q:'Womit beginnt das Wort?', word:'Schaf', emoji:'🐑', answer:'Sch', letters:['Sch','St','Ch'] },
    { type:'anlaut', q:'Womit beginnt das Wort?', word:'Schule', emoji:'🏫', answer:'Sch', letters:['Sch','S','Z'] },
    { type:'mc', q:'Welches Wort hat "ei"?', say:'Welches Wort hat ei?',
      options:[{e:'🥚',t:'Ei',c:true},{e:'🌳',t:'Baum'},{e:'🐟',t:'Fisch'}], cols:3 },
    { type:'mc', q:'Welches Wort hat "au"?', say:'Welches Wort hat au?',
      options:[{e:'🏠',t:'Haus',c:true},{e:'🌙',t:'Mond'},{e:'🐭',t:'Maus'}], cols:3 }
  ]},
{ id:'de8', fach:'deutsch', monat:8, emoji:'🧱', title:'Wörter bauen',
  desc:'Welcher Buchstabe fehlt?', lb:'Rechtschreiben · Lautgetreu schreiben',
  activities:[
    { type:'mc', q:'S _ N N E', hero:'☀️', say:'Sonne', options:[{t:'O',c:true},{t:'A'},{t:'U'}], cols:3 },
    { type:'mc', q:'B _ U M', hero:'🌳', say:'Baum', options:[{t:'A',c:true},{t:'O'},{t:'E'}], cols:3 },
    { type:'mc', q:'F _ S C H', hero:'🐟', say:'Fisch', options:[{t:'I',c:true},{t:'E'},{t:'A'}], cols:3 },
    { type:'mc', q:'H _ N D', hero:'🐕', say:'Hund', options:[{t:'U',c:true},{t:'A'},{t:'O'}], cols:3 },
    { type:'mc', q:'B _ L L', hero:'⚽', say:'Ball', options:[{t:'A',c:true},{t:'E'},{t:'I'}], cols:3 }
  ]},
{ id:'de9', fach:'deutsch', monat:9, emoji:'📦', title:'Nomen: der, die, das',
  desc:'Wörter mit dem richtigen Artikel', lb:'Sprache untersuchen · Nomen',
  activities:[
    { type:'sort', q:'Sortiere: der, die oder das?',
      buckets:[{name:'der',key:'der',emoji:'🔵'},{name:'die',key:'die',emoji:'🔴'},{name:'das',key:'das',emoji:'🟢'}],
      items:[{emoji:'🐕',label:'Hund',key:'der'},{emoji:'🌸',label:'Blume',key:'die'},
             {emoji:'🏠',label:'Haus',key:'das'},{emoji:'☀️',label:'Sonne',key:'die'},
             {emoji:'⚽',label:'Ball',key:'der'},{emoji:'🚗',label:'Auto',key:'das'}] },
    { type:'mc', q:'Welches Wort ist ein Nomen (Namenwort)?', say:'Welches Wort ist ein Nomen?',
      options:[{t:'Baum',c:true},{t:'laufen'},{t:'schnell'}], cols:3 }
  ]},
{ id:'de10', fach:'deutsch', monat:10, emoji:'📚', title:'Geschichten & Großschreibung',
  desc:'Lesen verstehen & Nomen großschreiben', lb:'Lesen & Rechtschreiben',
  activities:[
    { type:'mc', q:'Lea geht mit ihrem Hund in den Park. Wen nimmt Lea mit?',
      say:'Lea geht mit ihrem Hund in den Park. Wen nimmt Lea mit?',
      options:[{e:'🐕',t:'den Hund',c:true},{e:'🐈',t:'die Katze'},{e:'🐟',t:'einen Fisch'}], cols:3 },
    { type:'mc', q:'Welches Wort schreibt man GROSS?', say:'Welches Wort schreibt man groß?',
      options:[{t:'Blume',c:true},{t:'springt'},{t:'grün'}], cols:3 },
    { type:'mc', q:'Welches Wort schreibt man GROSS?', say:'Welches Wort schreibt man groß?',
      options:[{t:'Auto',c:true},{t:'schnell'},{t:'fährt'}], cols:3 }
  ]},

/* =========================  M A T H E  ========================= */
{ id:'ma1', fach:'mathe', monat:1, emoji:'🧮', title:'Zählen bis 6',
  desc:'Mengen erfassen & vergleichen', lb:'Zahlen und Operationen',
  activities:[
    C('🍎',3), C('🐟',5), C('⭐',6), C('🎈',4),
    { type:'sequence', q:'Welche Farbe kommt als Nächstes?', seq:['🔴','🔵','🔴','🔵'], options:['🔴','🟢','🔵'], answer:'🔴' },
    { type:'mc', q:'Wo sind MEHR?', options:[{e:'🍎🍎🍎',c:true},{e:'🍎🍎'}], cols:2 }
  ]},
{ id:'ma2', fach:'mathe', monat:2, emoji:'🔟', title:'Zahlen bis 10',
  desc:'Ziffern erkennen & schreiben', lb:'Zahlen und Operationen',
  activities:[
    C('🐝',8), C('🌼',10), C('🚗',7),
    { type:'mc', q:'Welche Zahl ist das?  neun', say:'neun', options:[{t:'9',c:true},{t:'6'},{t:'7'}], cols:3 },
    { type:'sequence', q:'Welche Zahl kommt als Nächstes?', seq:['1','2','3','4'], options:['5','7','6'], answer:'5' },
    { type:'trace', char:'8', sayText:'acht' }
  ]},
{ id:'ma3', fach:'mathe', monat:3, emoji:'➕', title:'Plus bis 10',
  desc:'Addieren im Zahlenraum 10', lb:'Rechnen · Addition',
  activities:[ S(3,2,'+'), S(5,4,'+'), S(6,3,'+'), S(4,4,'+'), S(2,7,'+'), S(1,8,'+') ]},
{ id:'ma4', fach:'mathe', monat:4, emoji:'➖', title:'Minus bis 10',
  desc:'Subtrahieren & Formen', lb:'Rechnen · Subtraktion / Geometrie',
  activities:[ S(7,3,'-'), S(9,4,'-'), S(6,2,'-'), S(10,5,'-'),
    { type:'mc', q:'Welche Form ist ein Dreieck?', options:[{e:'🔺',c:true},{e:'🔵'},{e:'🟦'}], cols:3 } ]},
{ id:'ma5', fach:'mathe', monat:5, emoji:'🔺', title:'Formen & Muster',
  desc:'Formen benennen, Muster fortsetzen', lb:'Raum und Form',
  activities:[
    { type:'mc', q:'Welche Form ist ein Kreis?', options:[{e:'🔵',c:true},{e:'🔺'},{e:'⬛'}], cols:3 },
    { type:'mc', q:'Welche Form ist ein Viereck?', options:[{e:'🟦',c:true},{e:'🔺'},{e:'🔴'}], cols:3 },
    { type:'sequence', q:'Setze das Muster fort:', seq:['🔺','🔵','🔺','🔵'], options:['🔺','🟦','🔵'], answer:'🔺' },
    { type:'sequence', q:'Setze das Muster fort:', seq:['⬛','⬛','🔵','⬛','⬛','🔵'], options:['⬛','🔵','🔺'], answer:'⬛' },
    { type:'sort', q:'Sortiere: rund oder eckig?',
      buckets:[{name:'rund',key:'r',emoji:'🔵'},{name:'eckig',key:'e',emoji:'🟦'}],
      items:[{emoji:'🔵',key:'r'},{emoji:'🟦',key:'e'},{emoji:'🔴',key:'r'},{emoji:'🔺',key:'e'},{emoji:'🟠',key:'r'},{emoji:'⬛',key:'e'}] }
  ]},
{ id:'ma6', fach:'mathe', monat:6, emoji:'2️⃣', title:'Zahlen bis 20',
  desc:'Zählen & ordnen bis 20', lb:'Zahlen und Operationen',
  activities:[
    C('🔵',13), C('⭐',17),
    { type:'sequence', q:'Welche Zahl kommt als Nächstes?', seq:['11','12','13','14'], options:['15','16','20'], answer:'15' },
    { type:'sequence', q:'Zähle in 2er-Schritten:', seq:['2','4','6','8'], options:['10','9','12'], answer:'10' },
    { type:'mc', q:'Welche Zahl ist größer?', options:[{t:'18',c:true},{t:'15'}], cols:2 },
    { type:'mc', q:'Welche Zahl ist das?  zwanzig', say:'zwanzig', options:[{t:'20',c:true},{t:'12'},{t:'2'}], cols:3 }
  ]},
{ id:'ma7', fach:'mathe', monat:7, emoji:'🧠', title:'Plus & Minus bis 20',
  desc:'Rechnen mit Zehnerübergang', lb:'Rechnen im Zahlenraum 20',
  activities:[ S(8,5,'+'), S(7,6,'+'), S(9,4,'+'), S(13,5,'-'), S(16,8,'-'), S(14,7,'-') ]},
{ id:'ma8', fach:'mathe', monat:8, emoji:'💶', title:'Rechnen mit Geld',
  desc:'Euro erkennen & zählen', lb:'Größen und Messen · Geld',
  activities:[
    { type:'mc', q:'Wie viel Geld ist das?', hero:'🪙🪙🪙', say:'Wie viel Geld ist das? Jede Münze ist ein Euro.',
      sub:'Jede Münze = 1 Euro', options:[{t:'3 €',c:true},{t:'2 €'},{t:'5 €'}], cols:3 },
    { type:'mc', q:'Wie viel Geld ist das?', hero:'🪙🪙🪙🪙🪙', say:'Wie viel Geld?',
      sub:'Jede Münze = 1 Euro', options:[{t:'5 €',c:true},{t:'4 €'},{t:'6 €'}], cols:3 },
    { type:'mc', q:'Was kostet mehr?', options:[{e:'🚲',t:'Fahrrad',c:true},{e:'🍬',t:'Bonbon'}], cols:2 },
    { type:'mc', q:'Du hast 2 € und bekommst 3 € dazu. Wie viel hast du?', say:'Du hast zwei Euro und bekommst drei Euro dazu.',
      options:[{t:'5 €',c:true},{t:'4 €'},{t:'6 €'}], cols:3 }
  ]},
{ id:'ma9', fach:'mathe', monat:9, emoji:'🕐', title:'Die Uhr & die Zeit',
  desc:'Volle Stunden & Tagesablauf', lb:'Größen und Messen · Zeit',
  activities:[
    { type:'mc', q:'Wie viel Uhr ist es?', hero:'🕒', say:'Wie viel Uhr ist es?',
      options:[{t:'3 Uhr',c:true},{t:'6 Uhr'},{t:'9 Uhr'}], cols:3 },
    { type:'mc', q:'Wie viel Uhr ist es?', hero:'🕘', say:'Wie viel Uhr ist es?',
      options:[{t:'9 Uhr',c:true},{t:'3 Uhr'},{t:'12 Uhr'}], cols:3 },
    { type:'sequence', q:'Welcher Wochentag kommt nach Montag?', seq:['Montag'], options:['Dienstag','Sonntag','Freitag'], answer:'Dienstag' },
    { type:'sort', q:'Wann machst du das?',
      buckets:[{name:'Tag',key:'t',emoji:'☀️'},{name:'Nacht',key:'n',emoji:'🌙'}],
      items:[{emoji:'🌅',label:'aufstehen',key:'t'},{emoji:'😴',label:'schlafen',key:'n'},
             {emoji:'🏫',label:'Schule',key:'t'},{emoji:'⭐',label:'Sterne',key:'n'}] }
  ]},
{ id:'ma10', fach:'mathe', monat:10, emoji:'📏', title:'Größen & Sachaufgaben',
  desc:'Vergleichen, Symmetrie & Textaufgaben', lb:'Größen · Raum und Form',
  activities:[
    { type:'mc', q:'Was ist länger?', options:[{e:'🚂',t:'Zug',c:true},{e:'🚗',t:'Auto'}], cols:2 },
    { type:'mc', q:'Was ist schwerer?', options:[{e:'🐘',t:'Elefant',c:true},{e:'🐁',t:'Maus'}], cols:2 },
    { type:'mc', q:'Welches Bild ist symmetrisch (spiegelgleich)?', options:[{e:'🦋',c:true},{e:'🍌'},{e:'👟'}], cols:3 },
    { type:'mc', q:'Anna hat 4 Äpfel und pflückt 3 dazu. Wie viele hat sie?', say:'Anna hat vier Äpfel und pflückt drei dazu.',
      options:[{t:'7',c:true},{t:'6'},{t:'8'}], cols:3 },
    { type:'mc', q:'Im Nest sind 5 Eier. 2 schlüpfen. Wie viele Eier sind noch da?', say:'Im Nest sind fünf Eier. Zwei schlüpfen.',
      options:[{t:'3',c:true},{t:'2'},{t:'4'}], cols:3 }
  ]},

/* =========================  H S U  ========================= */
{ id:'hsu1', fach:'hsu', monat:1, emoji:'🏫', title:'Ich & meine Schule',
  desc:'Gemeinschaft, Regeln & Sinne', lb:'Demokratie · Körper',
  activities:[
    { type:'mc', q:'Was tut man in der Klasse, wenn man etwas sagen will?', say:'Was tut man in der Klasse, wenn man etwas sagen will?',
      options:[{e:'✋',t:'Melden',c:true},{e:'📢',t:'Rufen'},{e:'🏃',t:'Weglaufen'}], cols:3 },
    { type:'mc', q:'Womit RIECHST du?', options:[{e:'👃',t:'Nase',c:true},{e:'👂',t:'Ohr'},{e:'👁️',t:'Auge'}], cols:3 },
    { type:'mc', q:'Womit HÖRST du?', options:[{e:'👂',t:'Ohr',c:true},{e:'👅',t:'Zunge'},{e:'✋',t:'Hand'}], cols:3 },
    { type:'sort', q:'Was gehört in die Schule?',
      buckets:[{name:'Schule',key:'s',emoji:'🎒'},{name:'zu Hause',key:'h',emoji:'🛋️'}],
      items:[{emoji:'✏️',label:'Stift',key:'s'},{emoji:'📚',label:'Buch',key:'s'},{emoji:'🛏️',label:'Bett',key:'h'},{emoji:'🍳',label:'Pfanne',key:'h'}] }
  ]},
{ id:'hsu2', fach:'hsu', monat:2, emoji:'🍂', title:'Der Herbst',
  desc:'Blätter, Tiere & Jahreszeiten', lb:'Natur und Umwelt · Zeit',
  activities:[
    { type:'mc', q:'Welches Tier sammelt Nüsse für den Winter?', say:'Welches Tier sammelt Nüsse für den Winter?',
      options:[{e:'🐿️',t:'Eichhörnchen',c:true},{e:'🐠',t:'Fisch'},{e:'🐘',t:'Elefant'}], cols:3 },
    { type:'mc', q:'Was macht der Igel im Winter?', say:'Was macht der Igel im Winter?',
      options:[{e:'😴',t:'Winterschlaf',c:true},{e:'🏊',t:'Schwimmen'},{e:'🎈',t:'Feiern'}], cols:3 },
    { type:'sequence', q:'Welche Jahreszeit kommt nach dem Herbst?', seq:['🍂'], options:['❄️','🌸','☀️'], answer:'❄️' },
    { type:'sort', q:'Was passt zum Herbst?',
      buckets:[{name:'Herbst',key:'h',emoji:'🍂'},{name:'Sommer',key:'s',emoji:'☀️'}],
      items:[{emoji:'🍁',label:'Blatt',key:'h'},{emoji:'🎃',label:'Kürbis',key:'h'},{emoji:'🏖️',label:'Strand',key:'s'},{emoji:'🍦',label:'Eis',key:'s'}] }
  ]},
{ id:'hsu3', fach:'hsu', monat:3, emoji:'🚦', title:'Sicher im Verkehr',
  desc:'Ampel, Zebrastreifen & Zeichen', lb:'Raum und Mobilität · Verkehr',
  activities:[
    { type:'mc', q:'Die Ampel ist ROT. Was machst du?', say:'Die Ampel ist rot. Was machst du?',
      options:[{e:'🛑',t:'Stehen bleiben',c:true},{e:'🏃',t:'Rennen'},{e:'🚶',t:'Langsam gehen'}], cols:3 },
    { type:'mc', q:'Die Ampel ist GRÜN. Was machst du?', say:'Die Ampel ist grün. Was machst du?',
      options:[{e:'🚶',t:'Gehen',c:true},{e:'🛑',t:'Warten'},{e:'😴',t:'Schlafen'}], cols:3 },
    { type:'mc', q:'Wo gehst du sicher über die Straße?', say:'Wo gehst du sicher über die Straße?',
      options:[{e:'🦓',t:'Zebrastreifen',c:true},{e:'🌳',t:'Hinter dem Baum'},{e:'🚗',t:'Zwischen Autos'}], cols:3 },
    { type:'mc', q:'Was trägst du beim Radfahren auf dem Kopf?', say:'Was trägst du beim Radfahren auf dem Kopf?',
      options:[{e:'⛑️',t:'Helm',c:true},{e:'🧢',t:'Cap'},{e:'👑',t:'Krone'}], cols:3 }
  ]},
{ id:'hsu4', fach:'hsu', monat:4, emoji:'❄️', title:'Winter & Feste',
  desc:'Kleidung, Advent & Jahreskreis', lb:'Natur · Zeit und Wandel',
  activities:[
    { type:'sort', q:'Was ziehst du im Winter an?',
      buckets:[{name:'Winter',key:'w',emoji:'❄️'},{name:'Sommer',key:'s',emoji:'☀️'}],
      items:[{emoji:'🧣',label:'Schal',key:'w'},{emoji:'🧤',label:'Handschuhe',key:'w'},{emoji:'🩳',label:'Shorts',key:'s'},{emoji:'🕶️',label:'Sonnenbrille',key:'s'}] },
    { type:'mc', q:'Wie viele Kerzen brennen am 1. Advent?', say:'Wie viele Kerzen brennen am ersten Advent?',
      options:[{t:'1',c:true},{t:'4'},{t:'2'}], cols:3 },
    { type:'sequence', q:'Welcher Monat kommt nach dem Dezember?', seq:['Dezember'], options:['Januar','März','Mai'], answer:'Januar' },
    { type:'mc', q:'Was fällt im Winter vom Himmel?', options:[{e:'❄️',t:'Schnee',c:true},{e:'🍎',t:'Äpfel'},{e:'🌸',t:'Blüten'}], cols:3 }
  ]},
{ id:'hsu5', fach:'hsu', monat:5, emoji:'🐿️', title:'Tiere im Winter & Wetter',
  desc:'Winterschlaf, Zugvögel & Wetter', lb:'Natur und Umwelt',
  activities:[
    { type:'sort', q:'Was macht das Tier im Winter?',
      buckets:[{name:'Winterschlaf',key:'z',emoji:'😴'},{name:'bleibt aktiv',key:'a',emoji:'🏃'}],
      items:[{emoji:'🐻',label:'Bär',key:'z'},{emoji:'🦔',label:'Igel',key:'z'},{emoji:'🦌',label:'Reh',key:'a'},{emoji:'🦊',label:'Fuchs',key:'a'}] },
    { type:'mc', q:'Welches Wetter ist das?', hero:'🌧️', say:'Welches Wetter ist das?',
      options:[{t:'Regen',c:true},{t:'Sonne'},{t:'Schnee'}], cols:3 },
    { type:'mc', q:'Was brauchst du bei Regen?', options:[{e:'☂️',t:'Schirm',c:true},{e:'🕶️',t:'Brille'},{e:'🩴',t:'Sandalen'}], cols:3 },
    { type:'mc', q:'Wohin fliegen viele Vögel im Winter?', say:'Wohin fliegen viele Vögel im Winter?',
      options:[{e:'🌴',t:'in den warmen Süden',c:true},{e:'🌊',t:'ins Meer'},{e:'🕳️',t:'unter die Erde'}], cols:3 }
  ]},
{ id:'hsu6', fach:'hsu', monat:6, emoji:'🥕', title:'Gesund essen & Zähne',
  desc:'Gesunde Ernährung & Zahnpflege', lb:'Körper und Gesundheit',
  activities:[
    { type:'sort', q:'Was ist gesund?',
      buckets:[{name:'gesund',key:'g',emoji:'💪'},{name:'Nascherei',key:'n',emoji:'🍭'}],
      items:[{emoji:'🥕',label:'Karotte',key:'g'},{emoji:'🍎',label:'Apfel',key:'g'},{emoji:'🥦',label:'Brokkoli',key:'g'},
             {emoji:'🍬',label:'Bonbon',key:'n'},{emoji:'🍫',label:'Schoko',key:'n'},{emoji:'🍰',label:'Kuchen',key:'n'}] },
    { type:'mc', q:'Wie oft putzt du am Tag deine Zähne?', say:'Wie oft putzt du am Tag deine Zähne?',
      options:[{t:'2-mal',c:true},{t:'nie'},{t:'1-mal in der Woche'}], cols:3 },
    { type:'mc', q:'Was ist gut für die Zähne?', options:[{e:'🪥',t:'Zähne putzen',c:true},{e:'🍭',t:'viele Bonbons'},{e:'🥤',t:'viel Limo'}], cols:3 },
    { type:'mc', q:'Was solltest du viel trinken?', options:[{e:'💧',t:'Wasser',c:true},{e:'🥤',t:'Limo'},{e:'🧃',t:'Sirup'}], cols:3 }
  ]},
{ id:'hsu7', fach:'hsu', monat:7, emoji:'🌷', title:'Frühling & Pflanzen',
  desc:'Wie eine Pflanze wächst', lb:'Natur und Umwelt · Pflanzen',
  activities:[
    { type:'sequence', q:'Wie wächst eine Blume? Was kommt als Nächstes?', seq:['🌰','🌱'], options:['🌿','🍂','🍎'], answer:'🌿' },
    { type:'mc', q:'Was braucht eine Pflanze zum Wachsen?', say:'Was braucht eine Pflanze zum Wachsen?',
      options:[{e:'💧☀️',t:'Wasser & Sonne',c:true},{e:'🍫',t:'Schokolade'},{e:'📺',t:'Fernsehen'}], cols:3 },
    { type:'sort', q:'Was gehört zur Pflanze?',
      buckets:[{name:'Pflanze',key:'p',emoji:'🌷'},{name:'Tier',key:'t',emoji:'🐾'}],
      items:[{emoji:'🌸',label:'Blüte',key:'p'},{emoji:'🍃',label:'Blatt',key:'p'},{emoji:'🐝',label:'Biene',key:'t'},{emoji:'🐛',label:'Raupe',key:'t'}] },
    { type:'mc', q:'Welche Blume blüht im Frühling?', options:[{e:'🌷',t:'Tulpe',c:true},{e:'🍄',t:'Pilz'},{e:'🌵',t:'Kaktus'}], cols:3 }
  ]},
{ id:'hsu8', fach:'hsu', monat:8, emoji:'🐣', title:'Tierkinder & Bauernhof',
  desc:'Tiere und ihre Jungen', lb:'Natur und Umwelt · Tiere',
  activities:[
    { type:'pairs', q:'Welches Tierkind gehört dazu?', pairs:[['🐔','🐣'],['🐄','🐮'],['🐑','🐏'],['🐖','🐷']] },
    { type:'mc', q:'Welches Tier gibt uns Milch?', options:[{e:'🐄',t:'Kuh',c:true},{e:'🐔',t:'Huhn'},{e:'🐖',t:'Schwein'}], cols:3 },
    { type:'mc', q:'Welches Tier legt Eier?', options:[{e:'🐔',t:'Huhn',c:true},{e:'🐄',t:'Kuh'},{e:'🐑',t:'Schaf'}], cols:3 },
    { type:'mc', q:'Wie macht die Kuh?', say:'Wie macht die Kuh?', options:[{t:'Muuuh',c:true},{t:'Miau'},{t:'Wau'}], cols:3 }
  ]},
{ id:'hsu9', fach:'hsu', monat:9, emoji:'🐝', title:'Wiese & Tagesablauf',
  desc:'Insekten & mein Tag', lb:'Natur · Zeit',
  activities:[
    { type:'mc', q:'Welches Tier macht Honig?', options:[{e:'🐝',t:'Biene',c:true},{e:'🐜',t:'Ameise'},{e:'🕷️',t:'Spinne'}], cols:3 },
    { type:'mc', q:'Wie viele Beine hat ein Käfer?', say:'Wie viele Beine hat ein Käfer?',
      options:[{t:'6',c:true},{t:'4'},{t:'8'}], cols:3 },
    { type:'sequence', q:'Vom Ei zum Schmetterling – was kommt als Nächstes?', seq:['🥚','🐛'], options:['🦋','🐝','🐌'], answer:'🦋' },
    { type:'sort', q:'Wann passiert das?',
      buckets:[{name:'Morgen',key:'m',emoji:'🌅'},{name:'Abend',key:'a',emoji:'🌆'}],
      items:[{emoji:'🥣',label:'Frühstück',key:'m'},{emoji:'🦷',label:'Zähne (früh)',key:'m'},{emoji:'🌙',label:'schlafen gehen',key:'a'},{emoji:'📖',label:'Gute-Nacht-Geschichte',key:'a'}] }
  ]},
{ id:'hsu10', fach:'hsu', monat:10, emoji:'💧', title:'Wasser, Sommer & Umwelt',
  desc:'Müll trennen & Sonnenschutz', lb:'Raum nutzen und schützen',
  activities:[
    { type:'sort', q:'Wohin kommt der Müll?',
      buckets:[{name:'Papier',key:'p',emoji:'📄'},{name:'Bio',key:'b',emoji:'🍌'},{name:'Plastik',key:'k',emoji:'🧴'}],
      items:[{emoji:'📰',label:'Zeitung',key:'p'},{emoji:'📦',label:'Karton',key:'p'},
             {emoji:'🍎',label:'Apfelrest',key:'b'},{emoji:'🍌',label:'Bananenschale',key:'b'},
             {emoji:'🍶',label:'Flasche',key:'k'},{emoji:'🛍️',label:'Tüte',key:'k'}] },
    { type:'mc', q:'Was schützt dich in der Sonne?', options:[{e:'🧴',t:'Sonnencreme',c:true},{e:'🧥',t:'dicke Jacke'},{e:'🧣',t:'Schal'}], cols:3 },
    { type:'mc', q:'Warum sollen wir Wasser sparen?', say:'Warum sollen wir Wasser sparen?',
      options:[{e:'🌍',t:'Wasser ist kostbar',c:true},{e:'🎉',t:'Zum Spaß'},{e:'🍬',t:'Für Bonbons'}], cols:3 },
    { type:'mc', q:'Wo darf Müll NICHT hin?', say:'Wo darf Müll nicht hin?',
      options:[{e:'🌳',t:'in die Natur',c:true},{e:'🗑️',t:'in die Tonne'},{e:'♻️',t:'zum Recycling'}], cols:3 }
  ]}
];
