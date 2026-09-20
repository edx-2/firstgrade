/* ============================================================
   data.js – Der komplette Lehrplan der 1. Klasse (Bayern)
   als monatlich gegliederte, interaktive Lernspiele.
   Orientiert am LehrplanPLUS: Deutsch, Mathematik, HSU.

   Felder je Modul:
     intro – wird beim Start von Fuchsi vorgesprochen (Lernziel)
     lb    – Lernbereich lt. LehrplanPLUS (für Eltern sichtbar)
   Felder je Aufgabe:
     fact  – kurze kindgerechte Erklärung nach richtiger Antwort
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
  intro:'Spitz die Ohren, kleiner Fuchs! Mit welchem Laut beginnen die Wörter?',
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
  intro:'Klatsch die Silben mit den Händen mit: Ba-na-ne!',
  activities:[
    { type:'mc', q:'Wie viele Silben hat: SON-NE?', hero:'☀️', say:'Sonne. Klatsch mit: Son-ne. Wie viele Silben?',
      options:[{t:'1'},{t:'2',c:true},{t:'3'}], cols:3,
      fact:'Son-ne. Zweimal geklatscht, zwei Silben!' },
    { type:'mc', q:'Wie viele Silben hat: BA-NA-NE?', hero:'🍌', say:'Banane. Klatsch mit: Ba-na-ne. Wie viele Silben?',
      options:[{t:'2'},{t:'3',c:true},{t:'4'}], cols:3,
      fact:'Ba-na-ne. Dreimal geklatscht, drei Silben!' },
    { type:'anlaut', word:'Igel', emoji:'🦔', answer:'I', letters:['I','E','N'] },
    { type:'anlaut', word:'Nase', emoji:'👃', answer:'N', letters:['N','R','T'] },
    { type:'anlaut', word:'Tomate', emoji:'🍅', answer:'T', letters:['T','E','I'] },
    { type:'trace', char:'E', sayText:'e' }
  ]},
{ id:'de3', fach:'deutsch', monat:3, emoji:'📕', title:'Erste Wörter lesen',
  desc:'Kurze Wörter zum Bild zuordnen', lb:'Lesen · Wörter erlesen',
  intro:'Wow, du liest schon Wörter! Lies langsam, Buchstabe für Buchstabe.',
  activities:[
    { type:'mc', q:'Lies das Wort:  O M A', say:'Lies das Wort. O. M. A.', options:[{e:'👵',c:true},{e:'🐟'},{e:'🌙'}], cols:3 },
    { type:'mc', q:'Lies das Wort:  M A U S', say:'Lies das Wort. M. A. U. S.', options:[{e:'🐭',c:true},{e:'🏠'},{e:'🌳'}], cols:3 },
    { type:'mc', q:'Lies das Wort:  S O N N E', say:'Lies das Wort. S. O. N. N. E.', options:[{e:'☀️',c:true},{e:'🌧️'},{e:'⭐'}], cols:3 },
    { type:'mc', q:'Lies das Wort:  R O S E', say:'Lies das Wort. R. O. S. E.', options:[{e:'🌹',c:true},{e:'🍎'},{e:'🐛'}], cols:3 },
    { type:'mc', q:'Lies das Wort:  M O N D', say:'Lies das Wort. M. O. N. D.', options:[{e:'🌙',c:true},{e:'⭐'},{e:'🌳'}], cols:3 }
  ]},
{ id:'de4', fach:'deutsch', monat:4, emoji:'🎵', title:'Reime finden',
  desc:'Wörter, die sich reimen', lb:'Sprache untersuchen · Reime',
  intro:'Reime klingen am Ende gleich: Hase und Nase!',
  activities:[
    { type:'mc', q:'Was reimt sich auf HAUS?', hero:'🏠', say:'Was reimt sich auf Haus?',
      options:[{e:'🐭',t:'Maus',c:true},{e:'🌳',t:'Baum'},{e:'🐟',t:'Fisch'}], cols:3,
      fact:'Haus und Maus klingen am Ende gleich: aus!' },
    { type:'mc', q:'Was reimt sich auf HASE?', hero:'🐇', say:'Was reimt sich auf Hase?',
      options:[{e:'👃',t:'Nase',c:true},{e:'🐕',t:'Hund'},{e:'🌸',t:'Blume'}], cols:3 },
    { type:'mc', q:'Was reimt sich auf KATZE?', hero:'🐈', say:'Was reimt sich auf Katze?',
      options:[{e:'🐾',t:'Tatze',c:true},{e:'🐁',t:'Maus'},{e:'🥛',t:'Milch'}], cols:3 },
    { type:'mc', q:'Was reimt sich auf TÜR?', hero:'🚪', say:'Was reimt sich auf Tür?',
      options:[{t:'für',c:true},{t:'Tag'},{t:'Haus'}], cols:3 }
  ]},
{ id:'de5', fach:'deutsch', monat:5, emoji:'🔠', title:'Groß und klein',
  desc:'Große und kleine Buchstaben als Paar', lb:'Buchstaben kennen',
  intro:'Jeder Buchstabe hat einen großen und einen kleinen Bruder.',
  activities:[
    { type:'pairs', q:'Finde Groß- und Kleinbuchstaben!', pairs:[['A','a'],['M','m'],['S','s'],['R','r']] },
    { type:'pairs', q:'Finde die Paare!', pairs:[['E','e'],['O','o'],['L','l'],['T','t']] },
    { type:'mc', q:'Welcher ist der große Buchstabe zu "n"?', say:'Welcher ist der große Buchstabe zu n?',
      options:[{t:'N',c:true},{t:'M'},{t:'H'}], cols:3 },
    { type:'mc', q:'Welcher ist der kleine Buchstabe zu "B"?', say:'Welcher ist der kleine Buchstabe zu B? Schau ganz genau hin!',
      options:[{t:'b',c:true},{t:'d'},{t:'p'}], cols:3,
      fact:'b, d und p sehen sich ähnlich. Beim b zeigt der Bauch nach rechts oben!' },
    { type:'trace', char:'B', sayText:'b' }
  ]},
{ id:'de6', fach:'deutsch', monat:6, emoji:'📝', title:'Sätze lesen',
  desc:'Kurze Sätze verstehen', lb:'Lesen · Sinn entnehmen',
  intro:'Lies den Satz in Ruhe und such das passende Bild.',
  activities:[
    { type:'mc', q:'Der Ball ist rot.', say:'Lies: Der Ball ist rot.',
      options:[{e:'🔴',c:true},{e:'🔵'},{e:'🟢'}], cols:3 },
    { type:'mc', q:'Die Sonne scheint.', say:'Lies: Die Sonne scheint.',
      options:[{e:'☀️',c:true},{e:'🌧️'},{e:'❄️'}], cols:3 },
    { type:'mc', q:'Die Katze trinkt Milch.', say:'Lies: Die Katze trinkt Milch.',
      sub:'Was passt zum Satz?', options:[{e:'🐈🥛',c:true},{e:'🐕🦴'},{e:'🐟💧'}], cols:3 },
    { type:'mc', q:'Ich esse einen Apfel.', say:'Lies: Ich esse einen Apfel.',
      options:[{e:'🍎',c:true},{e:'🍌'},{e:'🍇'}], cols:3 },
    { type:'mc', q:'Der Vogel sitzt im Baum.', say:'Lies: Der Vogel sitzt im Baum.',
      options:[{e:'🐦🌳',c:true},{e:'🐟🌊'},{e:'🐕🏠'}], cols:3 }
  ]},
{ id:'de7', fach:'deutsch', monat:7, emoji:'🐑', title:'Sch, ch, ei und au',
  desc:'Besondere Laute erkennen', lb:'Schriftspracherwerb · Laute',
  intro:'Manche Laute klingen ganz besonders: sch, ei und au!',
  activities:[
    { type:'anlaut', q:'Womit beginnt das Wort?', word:'Schaf', emoji:'🐑', answer:'Sch', letters:['Sch','St','Ch'],
      fact:'Sch schreibt man mit drei Buchstaben: S, C und H.' },
    { type:'anlaut', q:'Womit beginnt das Wort?', word:'Schule', emoji:'🏫', answer:'Sch', letters:['Sch','S','Z'] },
    { type:'mc', q:'Welches Wort hat "ei"?', say:'In welchem Wort hörst du ei?',
      options:[{e:'🥚',t:'Ei',c:true},{e:'🌳',t:'Baum'},{e:'🐟',t:'Fisch'}], cols:3 },
    { type:'mc', q:'Welches Wort hat "au"?', say:'In welchem Wort hörst du au?',
      options:[{e:'🏠',t:'Haus',c:true},{e:'🌙',t:'Mond'},{e:'🐸',t:'Frosch'}], cols:3 }
  ]},
{ id:'de8', fach:'deutsch', monat:8, emoji:'🧱', title:'Wörter bauen',
  desc:'Welcher Buchstabe fehlt?', lb:'Rechtschreiben · Lautgetreu schreiben',
  intro:'Sprich das Wort ganz langsam. Dann hörst du den fehlenden Buchstaben.',
  activities:[
    { type:'mc', q:'S _ N N E', hero:'☀️', say:'Sonne. Welcher Buchstabe fehlt?', options:[{t:'O',c:true},{t:'A'},{t:'U'}], cols:3 },
    { type:'mc', q:'B _ L L', hero:'⚽', say:'Ball. Welcher Buchstabe fehlt?', options:[{t:'A',c:true},{t:'E'},{t:'I'}], cols:3 },
    { type:'mc', q:'F _ S C H', hero:'🐟', say:'Fisch. Welcher Buchstabe fehlt?', options:[{t:'I',c:true},{t:'E'},{t:'A'}], cols:3 },
    { type:'mc', q:'H _ N D', hero:'🐕', say:'Hund. Welcher Buchstabe fehlt?', options:[{t:'U',c:true},{t:'A'},{t:'O'}], cols:3 },
    { type:'mc', q:'B _ U M', hero:'🌳', say:'Baum. Welcher Buchstabe fehlt?', options:[{t:'A',c:true},{t:'O'},{t:'E'}], cols:3,
      fact:'Baum schreibt man mit au. Das a kommt zuerst!' }
  ]},
{ id:'de9', fach:'deutsch', monat:9, emoji:'📦', title:'Nomen: der, die, das',
  desc:'Wörter mit dem richtigen Artikel', lb:'Sprache untersuchen · Nomen',
  intro:'Der, die oder das? Sprich das Wort leise vor dich hin.',
  activities:[
    { type:'sort', q:'Sortiere: der, die oder das?',
      buckets:[{name:'der',key:'der',emoji:'🔵'},{name:'die',key:'die',emoji:'🔴'},{name:'das',key:'das',emoji:'🟢'}],
      items:[{emoji:'🐕',label:'Hund',key:'der'},{emoji:'🌸',label:'Blume',key:'die'},
             {emoji:'🏠',label:'Haus',key:'das'},{emoji:'☀️',label:'Sonne',key:'die'},
             {emoji:'⚽',label:'Ball',key:'der'},{emoji:'🚗',label:'Auto',key:'das'}] },
    { type:'mc', q:'Welches Wort ist ein Nomen (Namenwort)?', say:'Welches Wort ist ein Nomen, also ein Namenwort?',
      options:[{t:'Baum',c:true},{t:'laufen'},{t:'schnell'}], cols:3,
      fact:'Nomen sind Namen für Dinge, Tiere und Menschen. Man schreibt sie groß!' },
    { type:'mc', q:'Welches Wort ist ein Nomen?', say:'Und noch einmal: Welches Wort ist ein Nomen?',
      options:[{t:'Katze',c:true},{t:'springen'},{t:'leise'}], cols:3 },
    { type:'mc', q:'Welcher Artikel passt zu "Maus"?', hero:'🐭', say:'Der, die oder das? Welcher Artikel passt zu Maus?',
      options:[{t:'die',c:true},{t:'der'},{t:'das'}], cols:3,
      fact:'Es heißt die Maus. Probier es aus: Die kleine Maus rennt schnell!' }
  ]},
{ id:'de10', fach:'deutsch', monat:10, emoji:'📚', title:'Geschichten & Großschreibung',
  desc:'Lesen verstehen & Nomen großschreiben', lb:'Lesen & Rechtschreiben',
  intro:'Du bist schon ein richtiger Leseprofi. Viel Spaß bei den Geschichten!',
  activities:[
    { type:'mc', q:'Lea geht mit ihrem Hund in den Park. Wen nimmt Lea mit?',
      say:'Lea geht mit ihrem Hund in den Park. Wen nimmt Lea mit?',
      options:[{e:'🐕',t:'den Hund',c:true},{e:'🐈',t:'die Katze'},{e:'🐟',t:'einen Fisch'}], cols:3 },
    { type:'mc', q:'Tom malt ein Bild für seine Oma. Für wen ist das Bild?',
      say:'Tom malt ein Bild für seine Oma. Für wen ist das Bild?',
      options:[{e:'👵',t:'für Oma',c:true},{e:'👦',t:'für Tom'},{e:'🐕',t:'für den Hund'}], cols:3 },
    { type:'mc', q:'Welches Wort schreibt man GROSS?', say:'Welches Wort schreibt man groß?',
      options:[{t:'Blume',c:true},{t:'springt'},{t:'grün'}], cols:3,
      fact:'Blume ist ein Nomen. Alle Nomen schreibt man groß!' },
    { type:'mc', q:'Welches Wort schreibt man GROSS?', say:'Welches Wort schreibt man groß?',
      options:[{t:'Auto',c:true},{t:'schnell'},{t:'fährt'}], cols:3 }
  ]},

/* =========================  M A T H E  ========================= */
{ id:'ma1', fach:'mathe', monat:1, emoji:'🧮', title:'Zählen bis 6',
  desc:'Mengen erfassen & vergleichen', lb:'Zahlen und Operationen',
  intro:'Zähle langsam mit dem Finger mit. Du schaffst das!',
  activities:[
    C('🍎',3), C('🎈',4), C('🐟',5), C('⭐',6),
    { type:'sequence', q:'Welche Farbe kommt als Nächstes?', seq:['🔴','🔵','🔴','🔵'], options:['🔴','🟢','🔵'], answer:'🔴',
      say:'Rot, blau, rot, blau. Welche Farbe kommt als Nächstes?' },
    { type:'mc', q:'Wo sind MEHR?', say:'Wo sind mehr Äpfel?', options:[{e:'🍎🍎🍎',c:true},{e:'🍎🍎'}], cols:2 }
  ]},
{ id:'ma2', fach:'mathe', monat:2, emoji:'🔟', title:'Zahlen bis 10',
  desc:'Ziffern erkennen & schreiben', lb:'Zahlen und Operationen',
  intro:'Die Zahlen bis zehn warten schon auf dich!',
  activities:[
    C('🚗',7), C('🐝',8), C('🌼',10),
    { type:'mc', q:'Welche Zahl ist das?  neun', say:'Welche Zahl ist das? Neun.', options:[{t:'9',c:true},{t:'6'},{t:'7'}], cols:3,
      fact:'Die 9 sieht aus wie eine 6, die auf dem Kopf steht!' },
    { type:'sequence', q:'Welche Zahl kommt als Nächstes?', seq:['1','2','3','4'], options:['5','7','6'], answer:'5' },
    { type:'trace', char:'8', sayText:'acht' }
  ]},
{ id:'ma3', fach:'mathe', monat:3, emoji:'➕', title:'Plus bis 10',
  desc:'Addieren im Zahlenraum 10', lb:'Rechnen · Addition',
  intro:'Plus heißt: Es kommt etwas dazu. Das Zwanzigerfeld hilft dir.',
  activities:[ S(3,2,'+'), S(4,4,'+'), S(5,4,'+'), S(6,3,'+'), S(2,7,'+'),
    { type:'mc', q:'Auf dem Teller sind 2 Kekse. Mama legt 3 dazu. Wie viele sind es jetzt?',
      say:'Auf dem Teller sind zwei Kekse. Mama legt drei dazu. Wie viele sind es jetzt?', hero:'🍪',
      options:[{t:'5',c:true},{t:'4'},{t:'6'}], cols:3,
      fact:'2 plus 3 ist 5. Plus heißt: Es kommt etwas dazu!' },
    { type:'mc', q:'Welche Aufgabe ergibt 10?', say:'Welche Aufgabe ergibt zehn?',
      options:[{t:'6 + 4',c:true},{t:'5 + 4'},{t:'7 + 2'}], cols:3,
      fact:'6 und 4 sind Zahlenfreunde: Zusammen ergeben sie 10!' }
  ]},
{ id:'ma4', fach:'mathe', monat:4, emoji:'➖', title:'Minus bis 10',
  desc:'Subtrahieren & Formen', lb:'Rechnen · Subtraktion / Geometrie',
  intro:'Minus heißt: Es geht etwas weg.',
  activities:[ S(6,2,'-'), S(7,3,'-'), S(9,4,'-'), S(10,5,'-'),
    { type:'mc', q:'Du hast 8 Kekse und isst 3 auf. Wie viele bleiben übrig?',
      say:'Du hast acht Kekse und isst drei auf. Wie viele bleiben übrig?', hero:'🍪',
      options:[{t:'5',c:true},{t:'4'},{t:'6'}], cols:3,
      fact:'8 minus 3 ist 5. Minus heißt: Es geht etwas weg!' },
    { type:'mc', q:'Welche Form ist ein Dreieck?', say:'Welche Form ist ein Dreieck?', options:[{e:'🔺',c:true},{e:'🔵'},{e:'🟦'}], cols:3,
      fact:'Ein Dreieck hat drei Ecken und drei Seiten. Darum heißt es Drei-Eck!' } ]},
{ id:'ma5', fach:'mathe', monat:5, emoji:'🔺', title:'Formen & Muster',
  desc:'Formen benennen, Muster fortsetzen', lb:'Raum und Form',
  intro:'Formen sind überall: Schau dich mal um!',
  activities:[
    { type:'mc', q:'Welche Form ist ein Kreis?', say:'Welche Form ist ein Kreis?', options:[{e:'🔵',c:true},{e:'🔺'},{e:'⬛'}], cols:3,
      fact:'Ein Kreis ist ganz rund und hat keine einzige Ecke.' },
    { type:'mc', q:'Welche Form ist ein Viereck?', say:'Welche Form ist ein Viereck?', options:[{e:'🟦',c:true},{e:'🔺'},{e:'🔴'}], cols:3,
      fact:'Ein Viereck hat vier Ecken und vier Seiten.' },
    { type:'sequence', q:'Setze das Muster fort:', seq:['🔺','🔵','🔺','🔵'], options:['🔺','🟦','🔵'], answer:'🔺',
      say:'Dreieck, Kreis, Dreieck, Kreis. Was kommt als Nächstes?' },
    { type:'sequence', q:'Setze das Muster fort:', seq:['⬛','⬛','🔵','⬛','⬛','🔵'], options:['⬛','🔵','🔺'], answer:'⬛',
      say:'Quadrat, Quadrat, Kreis. Quadrat, Quadrat, Kreis. Was kommt als Nächstes?' },
    { type:'sort', q:'Sortiere: rund oder eckig?',
      buckets:[{name:'rund',key:'r',emoji:'🔵'},{name:'eckig',key:'e',emoji:'🟦'}],
      items:[{emoji:'🔵',key:'r'},{emoji:'🟦',key:'e'},{emoji:'🔴',key:'r'},{emoji:'🔺',key:'e'},{emoji:'🟠',key:'r'},{emoji:'⬛',key:'e'}] }
  ]},
{ id:'ma6', fach:'mathe', monat:6, emoji:'2️⃣', title:'Zahlen bis 20',
  desc:'Zählen & ordnen bis 20', lb:'Zahlen und Operationen',
  intro:'Jetzt wird es spannend: die Zahlen bis zwanzig!',
  activities:[
    C('🔵',13), C('⭐',17),
    { type:'sequence', q:'Welche Zahl kommt als Nächstes?', seq:['11','12','13','14'], options:['15','16','20'], answer:'15' },
    { type:'sequence', q:'Zähle in 2er-Schritten:', seq:['2','4','6','8'], options:['10','9','12'], answer:'10',
      fact:'2, 4, 6, 8, 10 – das sind die geraden Zahlen!' },
    { type:'mc', q:'Welche Zahl ist größer?', say:'Welche Zahl ist größer?', options:[{t:'18',c:true},{t:'15'}], cols:2 },
    { type:'mc', q:'Welche Zahl ist das?  zwanzig', say:'Welche Zahl ist das? Zwanzig.', options:[{t:'20',c:true},{t:'12'},{t:'2'}], cols:3,
      fact:'Die 20 hat eine 2 vorne und eine 0 hinten: zwei volle Zehner!' }
  ]},
{ id:'ma7', fach:'mathe', monat:7, emoji:'🧠', title:'Plus & Minus bis 20',
  desc:'Rechnen mit Zehnerübergang', lb:'Rechnen im Zahlenraum 20',
  intro:'Du bist schon ein Rechenfuchs! Zähl im Feld nach, wenn du magst.',
  activities:[ S(8,5,'+'), S(7,6,'+'), S(9,4,'+'), S(13,5,'-'), S(16,8,'-'),
    { type:'mc', q:'Tauschaufgabe: 5 + 8 = 8 + ?', say:'5 plus 8 ist dasselbe wie 8 plus wie viel?',
      options:[{t:'5',c:true},{t:'8'},{t:'13'}], cols:3,
      fact:'Beim Plus darfst du die Zahlen tauschen. Das Ergebnis bleibt gleich!' },
    { type:'mc', q:'Verdopple die 7!', say:'Verdopple die Sieben! Was ist 7 plus 7?',
      options:[{t:'14',c:true},{t:'12'},{t:'16'}], cols:3,
      fact:'7 plus 7 ist 14. Verdoppeln heißt: die gleiche Zahl noch einmal dazu.' }
  ]},
{ id:'ma8', fach:'mathe', monat:8, emoji:'💶', title:'Rechnen mit Geld',
  desc:'Euro erkennen & zählen', lb:'Größen und Messen · Geld',
  intro:'Heute spielen wir Einkaufen: Wir rechnen mit Geld!',
  activities:[
    { type:'mc', q:'Wie viel Geld ist das?', hero:'🪙🪙🪙', say:'Wie viel Geld ist das? Jede Münze ist ein Euro.',
      sub:'Jede Münze = 1 Euro', options:[{t:'3 €',c:true},{t:'2 €'},{t:'5 €'}], cols:3 },
    { type:'mc', q:'Wie viel Geld ist das?', hero:'🪙🪙🪙🪙🪙', say:'Und jetzt? Jede Münze ist ein Euro.',
      sub:'Jede Münze = 1 Euro', options:[{t:'5 €',c:true},{t:'4 €'},{t:'6 €'}], cols:3 },
    { type:'mc', q:'Was kostet mehr?', say:'Was kostet wohl mehr Geld?', options:[{e:'🚲',t:'Fahrrad',c:true},{e:'🍬',t:'Bonbon'}], cols:2,
      fact:'Ein Fahrrad kostet viele hundert Euro, ein Bonbon nur ein paar Cent.' },
    { type:'mc', q:'Du hast 2 € und bekommst 3 € dazu. Wie viel hast du?', say:'Du hast zwei Euro und bekommst drei Euro dazu. Wie viel hast du jetzt?',
      options:[{t:'5 €',c:true},{t:'4 €'},{t:'6 €'}], cols:3 },
    { type:'mc', q:'Das Eis kostet 2 €. Du bezahlst mit 5 €. Wie viel bekommst du zurück?',
      say:'Das Eis kostet zwei Euro. Du bezahlst mit fünf Euro. Wie viel Geld bekommst du zurück?', hero:'🍦',
      options:[{t:'3 €',c:true},{t:'2 €'},{t:'4 €'}], cols:3,
      fact:'5 minus 2 ist 3. Das nennt man Rückgeld!' }
  ]},
{ id:'ma9', fach:'mathe', monat:9, emoji:'🕐', title:'Die Uhr & die Zeit',
  desc:'Volle Stunden & Tagesablauf', lb:'Größen und Messen · Zeit',
  intro:'Tick, tack! Heute lernst du die Uhr kennen.',
  activities:[
    { type:'mc', q:'Wie viel Uhr ist es?', hero:'🕒', say:'Schau auf die Uhr. Wie viel Uhr ist es?',
      options:[{t:'3 Uhr',c:true},{t:'6 Uhr'},{t:'9 Uhr'}], cols:3,
      fact:'Der kleine Zeiger zeigt die Stunde an.' },
    { type:'mc', q:'Wie viel Uhr ist es?', hero:'🕘', say:'Und jetzt? Wie viel Uhr ist es?',
      options:[{t:'9 Uhr',c:true},{t:'3 Uhr'},{t:'12 Uhr'}], cols:3 },
    { type:'sequence', q:'Welcher Wochentag kommt nach Montag?', seq:['Montag'], options:['Dienstag','Sonntag','Freitag'], answer:'Dienstag',
      fact:'Eine Woche hat sieben Tage: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag und Sonntag.' },
    { type:'sort', q:'Wann machst du das?',
      buckets:[{name:'Tag',key:'t',emoji:'☀️'},{name:'Nacht',key:'n',emoji:'🌙'}],
      items:[{emoji:'🌅',label:'aufstehen',key:'t'},{emoji:'😴',label:'schlafen',key:'n'},
             {emoji:'🏫',label:'Schule',key:'t'},{emoji:'⭐',label:'Sterne',key:'n'}] }
  ]},
{ id:'ma10', fach:'mathe', monat:10, emoji:'📏', title:'Größen & Sachaufgaben',
  desc:'Vergleichen, Symmetrie & Textaufgaben', lb:'Größen · Raum und Form',
  intro:'Knobelaufgaben für schlaue Füchse. Lies genau!',
  activities:[
    { type:'mc', q:'Was ist länger?', say:'Was ist länger?', options:[{e:'🚂',t:'Zug',c:true},{e:'🚗',t:'Auto'}], cols:2 },
    { type:'mc', q:'Was ist schwerer?', say:'Was ist schwerer?', options:[{e:'🐘',t:'Elefant',c:true},{e:'🐁',t:'Maus'}], cols:2,
      fact:'Ein Elefant wiegt so viel wie vier Autos!' },
    { type:'mc', q:'Welches Bild ist symmetrisch (spiegelgleich)?', say:'Welches Bild ist symmetrisch, also spiegelgleich?',
      options:[{e:'🦋',c:true},{e:'🍌'},{e:'👟'}], cols:3,
      fact:'Beim Schmetterling sehen beide Flügel gleich aus. Das heißt symmetrisch.' },
    { type:'mc', q:'Anna hat 4 Äpfel und pflückt 3 dazu. Wie viele hat sie?', say:'Anna hat vier Äpfel und pflückt drei dazu. Wie viele hat sie dann?',
      options:[{t:'7',c:true},{t:'6'},{t:'8'}], cols:3 },
    { type:'mc', q:'Im Nest sind 5 Eier. 2 schlüpfen. Wie viele Eier sind noch da?', say:'Im Nest sind fünf Eier. Zwei Küken schlüpfen. Wie viele Eier sind noch da?',
      options:[{t:'3',c:true},{t:'2'},{t:'4'}], cols:3 }
  ]},

/* =========================  H S U  ========================= */
{ id:'hsu1', fach:'hsu', monat:1, emoji:'🏫', title:'Ich & meine Schule',
  desc:'Gemeinschaft, Regeln & Sinne', lb:'Demokratie · Körper',
  intro:'Herzlich willkommen in der Schule! Hier lernen wir zusammen.',
  activities:[
    { type:'mc', q:'Was tut man in der Klasse, wenn man etwas sagen will?', say:'Was tut man in der Klasse, wenn man etwas sagen will?',
      options:[{e:'✋',t:'Melden',c:true},{e:'📢',t:'Rufen'},{e:'🏃',t:'Weglaufen'}], cols:3,
      fact:'Wenn alle sich melden, kommt jeder mal dran. Das ist fair!' },
    { type:'mc', q:'Womit RIECHST du?', say:'Womit riechst du?', options:[{e:'👃',t:'Nase',c:true},{e:'👂',t:'Ohr'},{e:'👁️',t:'Auge'}], cols:3 },
    { type:'mc', q:'Womit HÖRST du?', say:'Womit hörst du?', options:[{e:'👂',t:'Ohr',c:true},{e:'👅',t:'Zunge'},{e:'✋',t:'Hand'}], cols:3,
      fact:'Du hast fünf Sinne: sehen, hören, riechen, schmecken und fühlen.' },
    { type:'sort', q:'Was gehört in die Schule?',
      buckets:[{name:'Schule',key:'s',emoji:'🎒'},{name:'zu Hause',key:'h',emoji:'🛋️'}],
      items:[{emoji:'✏️',label:'Stift',key:'s'},{emoji:'📚',label:'Buch',key:'s'},{emoji:'🛏️',label:'Bett',key:'h'},{emoji:'🍳',label:'Pfanne',key:'h'}] }
  ]},
{ id:'hsu2', fach:'hsu', monat:2, emoji:'🍂', title:'Der Herbst',
  desc:'Blätter, Tiere & Jahreszeiten', lb:'Natur und Umwelt · Zeit',
  intro:'Draußen ist Herbst. Was passiert jetzt in der Natur?',
  activities:[
    { type:'mc', q:'Welches Tier sammelt Nüsse für den Winter?', say:'Welches Tier sammelt Nüsse für den Winter?',
      options:[{e:'🐿️',t:'Eichhörnchen',c:true},{e:'🐠',t:'Fisch'},{e:'🐘',t:'Elefant'}], cols:3,
      fact:'Das Eichhörnchen vergisst manche Nüsse. Daraus wachsen neue Bäume!' },
    { type:'mc', q:'Was macht der Igel im Winter?', say:'Was macht der Igel im Winter?',
      options:[{e:'😴',t:'Winterschlaf',c:true},{e:'🏊',t:'Schwimmen'},{e:'🎈',t:'Feiern'}], cols:3,
      fact:'Der Igel schläft den ganzen Winter in einem kuscheligen Laubhaufen.' },
    { type:'sequence', q:'Welche Jahreszeit kommt nach dem Herbst?', seq:['🍂'], options:['❄️','🌸','☀️'], answer:'❄️',
      fact:'Die vier Jahreszeiten sind: Frühling, Sommer, Herbst und Winter.' },
    { type:'sort', q:'Was passt zum Herbst?',
      buckets:[{name:'Herbst',key:'h',emoji:'🍂'},{name:'Sommer',key:'s',emoji:'☀️'}],
      items:[{emoji:'🍁',label:'Blatt',key:'h'},{emoji:'🎃',label:'Kürbis',key:'h'},{emoji:'🏖️',label:'Strand',key:'s'},{emoji:'🍦',label:'Eis',key:'s'}] }
  ]},
{ id:'hsu3', fach:'hsu', monat:3, emoji:'🚦', title:'Sicher im Verkehr',
  desc:'Ampel, Zebrastreifen & Zeichen', lb:'Raum und Mobilität · Verkehr',
  intro:'Augen auf im Straßenverkehr! Du weißt bestimmt schon viel.',
  activities:[
    { type:'mc', q:'Die Ampel ist ROT. Was machst du?', say:'Die Ampel ist rot. Was machst du?',
      options:[{e:'🛑',t:'Stehen bleiben',c:true},{e:'🏃',t:'Rennen'},{e:'🚶',t:'Langsam gehen'}], cols:3,
      fact:'Bei Rot bleibst du immer stehen, auch wenn kein Auto kommt.' },
    { type:'mc', q:'Die Ampel ist GRÜN. Was machst du?', say:'Die Ampel ist grün. Was machst du?',
      options:[{e:'🚶',t:'Gehen',c:true},{e:'🛑',t:'Warten'},{e:'😴',t:'Schlafen'}], cols:3,
      fact:'Auch bei Grün schaust du kurz: Halten die Autos wirklich an?' },
    { type:'mc', q:'Bevor du über die Straße gehst: Was machst du zuerst?', say:'Bevor du über die Straße gehst: Was machst du zuerst?',
      options:[{e:'👀',t:'Links und rechts schauen',c:true},{e:'🙈',t:'Augen zumachen'},{e:'🏃',t:'Schnell rennen'}], cols:3,
      fact:'Erst schauen, dann gehen: links, rechts und noch einmal links!' },
    { type:'mc', q:'Wo gehst du sicher über die Straße?', say:'Wo gehst du sicher über die Straße?',
      options:[{e:'🦓',t:'Zebrastreifen',c:true},{e:'🌳',t:'Hinter dem Baum'},{e:'🚗',t:'Zwischen Autos'}], cols:3,
      fact:'Am Zebrastreifen halten die Autos für dich an. Schau trotzdem immer selbst!' },
    { type:'mc', q:'Was trägst du beim Radfahren auf dem Kopf?', say:'Was trägst du beim Radfahren auf dem Kopf?',
      options:[{e:'⛑️',t:'Helm',c:true},{e:'🧢',t:'Cap'},{e:'👑',t:'Krone'}], cols:3,
      fact:'Der Helm schützt deinen Kopf wie eine harte Schale.' }
  ]},
{ id:'hsu4', fach:'hsu', monat:4, emoji:'❄️', title:'Winter & Feste',
  desc:'Kleidung, Advent & Jahreskreis', lb:'Natur · Zeit und Wandel',
  intro:'Brrr, ist das kalt! Der Winter und die Feste sind da.',
  activities:[
    { type:'sort', q:'Was ziehst du im Winter an?',
      buckets:[{name:'Winter',key:'w',emoji:'❄️'},{name:'Sommer',key:'s',emoji:'☀️'}],
      items:[{emoji:'🧣',label:'Schal',key:'w'},{emoji:'🧤',label:'Handschuhe',key:'w'},{emoji:'🩳',label:'Shorts',key:'s'},{emoji:'🕶️',label:'Sonnenbrille',key:'s'}] },
    { type:'mc', q:'Wie viele Kerzen brennen am 1. Advent?', say:'Wie viele Kerzen brennen am ersten Advent?',
      options:[{t:'1',c:true},{t:'4'},{t:'2'}], cols:3,
      fact:'Jeden Sonntag im Advent zünden wir eine Kerze mehr an. Am vierten Advent brennen alle vier.' },
    { type:'sequence', q:'Welcher Monat kommt nach dem Dezember?', seq:['Dezember'], options:['Januar','März','Mai'], answer:'Januar',
      fact:'Mit dem Januar beginnt das neue Jahr. Ein Jahr hat zwölf Monate.' },
    { type:'mc', q:'Was fällt im Winter vom Himmel?', say:'Was fällt im Winter vom Himmel?', options:[{e:'❄️',t:'Schnee',c:true},{e:'🍎',t:'Äpfel'},{e:'🌸',t:'Blüten'}], cols:3,
      fact:'Jede Schneeflocke sieht anders aus. Keine gleicht der anderen!' }
  ]},
{ id:'hsu5', fach:'hsu', monat:5, emoji:'🐿️', title:'Tiere im Winter & Wetter',
  desc:'Winterschlaf, Zugvögel & Wetter', lb:'Natur und Umwelt',
  intro:'Was machen die Tiere, wenn es schneit? Finde es heraus!',
  activities:[
    { type:'sort', q:'Was macht das Tier im Winter?',
      buckets:[{name:'Winterschlaf',key:'z',emoji:'😴'},{name:'bleibt aktiv',key:'a',emoji:'🏃'}],
      items:[{emoji:'🐻',label:'Bär',key:'z'},{emoji:'🦔',label:'Igel',key:'z'},{emoji:'🦌',label:'Reh',key:'a'},{emoji:'🦊',label:'Fuchs',key:'a'}],
      fact:'Bär und Igel verschlafen den Winter. Fuchs und Reh suchen auch im Schnee Futter.' },
    { type:'mc', q:'Welches Wetter ist das?', hero:'🌧️', say:'Schau auf das Bild. Welches Wetter ist das?',
      options:[{t:'Regen',c:true},{t:'Sonne'},{t:'Schnee'}], cols:3 },
    { type:'mc', q:'Was brauchst du bei Regen?', say:'Was brauchst du bei Regen?', options:[{e:'☂️',t:'Schirm',c:true},{e:'🕶️',t:'Brille'},{e:'🩴',t:'Sandalen'}], cols:3 },
    { type:'mc', q:'Wohin fliegen viele Vögel im Winter?', say:'Wohin fliegen viele Vögel im Winter?',
      options:[{e:'🌴',t:'in den warmen Süden',c:true},{e:'🌊',t:'ins Meer'},{e:'🕳️',t:'unter die Erde'}], cols:3,
      fact:'Störche und Schwalben fliegen viele tausend Kilometer bis nach Afrika.' }
  ]},
{ id:'hsu6', fach:'hsu', monat:6, emoji:'🥕', title:'Gesund essen & Zähne',
  desc:'Gesunde Ernährung & Zahnpflege', lb:'Körper und Gesundheit',
  intro:'Gesundes Essen macht dich stark und fit!',
  activities:[
    { type:'sort', q:'Was ist gesund?',
      buckets:[{name:'gesund',key:'g',emoji:'💪'},{name:'Nascherei',key:'n',emoji:'🍭'}],
      items:[{emoji:'🥕',label:'Karotte',key:'g'},{emoji:'🍎',label:'Apfel',key:'g'},{emoji:'🥦',label:'Brokkoli',key:'g'},
             {emoji:'🍬',label:'Bonbon',key:'n'},{emoji:'🍫',label:'Schoko',key:'n'},{emoji:'🍰',label:'Kuchen',key:'n'}],
      fact:'Naschen ist ab und zu okay. Obst und Gemüse machen dich aber stark!' },
    { type:'mc', q:'Wie oft putzt du am Tag deine Zähne?', say:'Wie oft putzt du am Tag deine Zähne?',
      options:[{t:'2-mal',c:true},{t:'nie'},{t:'1-mal in der Woche'}], cols:3,
      fact:'Morgens und abends putzen, dann bleiben deine Zähne gesund und stark.' },
    { type:'mc', q:'Was ist gut für die Zähne?', say:'Was ist gut für die Zähne?', options:[{e:'🪥',t:'Zähne putzen',c:true},{e:'🍭',t:'viele Bonbons'},{e:'🥤',t:'viel Limo'}], cols:3 },
    { type:'mc', q:'Was solltest du viel trinken?', say:'Was solltest du viel trinken?', options:[{e:'💧',t:'Wasser',c:true},{e:'🥤',t:'Limo'},{e:'🧃',t:'Sirup'}], cols:3,
      fact:'Dein Körper braucht viel Wasser, genau wie eine Blume.' }
  ]},
{ id:'hsu7', fach:'hsu', monat:7, emoji:'🌷', title:'Frühling & Pflanzen',
  desc:'Wie eine Pflanze wächst', lb:'Natur und Umwelt · Pflanzen',
  intro:'Der Frühling ist da! Alles blüht und wächst.',
  activities:[
    { type:'sequence', q:'Wie wächst eine Blume? Was kommt als Nächstes?', seq:['🌰','🌱'], options:['🌿','🍂','🍎'], answer:'🌿',
      say:'Zuerst der Samen, dann der kleine Keimling. Was kommt als Nächstes?',
      fact:'Erst Samen, dann Keimling, dann Pflanze, dann Blüte!' },
    { type:'mc', q:'Was braucht eine Pflanze zum Wachsen?', say:'Was braucht eine Pflanze zum Wachsen?',
      options:[{e:'💧☀️',t:'Wasser & Sonne',c:true},{e:'🍫',t:'Schokolade'},{e:'📺',t:'Fernsehen'}], cols:3,
      fact:'Aus einem winzigen Samenkorn kann ein riesiger Baum werden!' },
    { type:'sort', q:'Was gehört zur Pflanze?',
      buckets:[{name:'Pflanze',key:'p',emoji:'🌷'},{name:'Tier',key:'t',emoji:'🐾'}],
      items:[{emoji:'🌸',label:'Blüte',key:'p'},{emoji:'🍃',label:'Blatt',key:'p'},{emoji:'🐝',label:'Biene',key:'t'},{emoji:'🐛',label:'Raupe',key:'t'}] },
    { type:'mc', q:'Welche Blume blüht im Frühling?', say:'Welche Blume blüht im Frühling?', options:[{e:'🌷',t:'Tulpe',c:true},{e:'🍄',t:'Pilz'},{e:'🌵',t:'Kaktus'}], cols:3,
      fact:'Ein Pilz ist gar keine Blume und der Kaktus wächst in der Wüste.' }
  ]},
{ id:'hsu8', fach:'hsu', monat:8, emoji:'🐣', title:'Tierkinder & Bauernhof',
  desc:'Tiere und ihre Jungen', lb:'Natur und Umwelt · Tiere',
  intro:'Auf dem Bauernhof sind die Tierkinder los!',
  activities:[
    { type:'pairs', q:'Finde Tier-Mama und Tier-Kind!', pairs:[['🐔','🐣'],['🐕','🐶'],['🐈','🐱'],['🐄','🐮']] },
    { type:'mc', q:'Welches Tier gibt uns Milch?', say:'Welches Tier gibt uns Milch?', options:[{e:'🐄',t:'Kuh',c:true},{e:'🐔',t:'Huhn'},{e:'🐖',t:'Schwein'}], cols:3,
      fact:'Eine Kuh gibt jeden Tag ungefähr 25 Liter Milch. Das sind viele Gläser!' },
    { type:'mc', q:'Welches Tier legt Eier?', say:'Welches Tier legt Eier?', options:[{e:'🐔',t:'Huhn',c:true},{e:'🐄',t:'Kuh'},{e:'🐑',t:'Schaf'}], cols:3,
      fact:'Das Küken wächst 21 Tage im Ei, dann pickt es sich heraus.' },
    { type:'mc', q:'Wie heißt das Kind vom Schaf?', say:'Wie heißt das Kind vom Schaf?',
      options:[{e:'🐑',t:'Lamm',c:true},{e:'🐮',t:'Kalb'},{e:'🐣',t:'Küken'}], cols:3,
      fact:'Das Kind vom Schaf heißt Lamm, das Kind der Kuh heißt Kalb.' },
    { type:'mc', q:'Wie macht die Kuh?', say:'Wie macht die Kuh?', options:[{t:'Muuuh',c:true},{t:'Miau'},{t:'Wau'}], cols:3 }
  ]},
{ id:'hsu9', fach:'hsu', monat:9, emoji:'🐝', title:'Wiese & Tagesablauf',
  desc:'Insekten & mein Tag', lb:'Natur · Zeit',
  intro:'Summ, summ! Auf der Wiese ist richtig was los.',
  activities:[
    { type:'mc', q:'Welches Tier macht Honig?', say:'Welches Tier macht Honig?', options:[{e:'🐝',t:'Biene',c:true},{e:'🐜',t:'Ameise'},{e:'🕷️',t:'Spinne'}], cols:3,
      fact:'Für ein Glas Honig besuchen Bienen viele tausend Blüten.' },
    { type:'mc', q:'Wie viele Beine hat ein Käfer?', say:'Wie viele Beine hat ein Käfer?',
      options:[{t:'6',c:true},{t:'4'},{t:'8'}], cols:3,
      fact:'Alle Insekten haben sechs Beine. Spinnen haben acht, sie sind keine Insekten.' },
    { type:'sequence', q:'Vom Ei zum Schmetterling – was kommt als Nächstes?', seq:['🥚','🐛'], options:['🦋','🐝','🐌'], answer:'🦋',
      say:'Zuerst das Ei, dann kriecht die Raupe heraus. Was kommt danach?',
      fact:'Aus der Raupe wird eine Puppe, und daraus schlüpft der Schmetterling.' },
    { type:'sort', q:'Wann passiert das?',
      buckets:[{name:'Morgen',key:'m',emoji:'🌅'},{name:'Abend',key:'a',emoji:'🌆'}],
      items:[{emoji:'🥣',label:'Frühstück',key:'m'},{emoji:'🦷',label:'Zähne (früh)',key:'m'},{emoji:'🌙',label:'schlafen gehen',key:'a'},{emoji:'📖',label:'Gute-Nacht-Geschichte',key:'a'}] }
  ]},
{ id:'hsu10', fach:'hsu', monat:10, emoji:'💧', title:'Wasser, Sommer & Umwelt',
  desc:'Müll trennen & Sonnenschutz', lb:'Raum nutzen und schützen',
  intro:'Wir passen gut auf unsere Erde auf. Du auch?',
  activities:[
    { type:'sort', q:'Wohin kommt der Müll?',
      buckets:[{name:'Papier',key:'p',emoji:'📄'},{name:'Bio',key:'b',emoji:'🍌'},{name:'Plastik',key:'k',emoji:'🧴'}],
      items:[{emoji:'📰',label:'Zeitung',key:'p'},{emoji:'📦',label:'Karton',key:'p'},
             {emoji:'🍎',label:'Apfelrest',key:'b'},{emoji:'🍌',label:'Bananenschale',key:'b'},
             {emoji:'🍶',label:'Flasche',key:'k'},{emoji:'🛍️',label:'Tüte',key:'k'}],
      fact:'Aus altem Papier wird neues Papier. Das nennt man Recycling.' },
    { type:'mc', q:'Was schützt dich in der Sonne?', say:'Was schützt dich in der Sonne?', options:[{e:'🧴',t:'Sonnencreme',c:true},{e:'🧥',t:'dicke Jacke'},{e:'🧣',t:'Schal'}], cols:3,
      fact:'Sonnencreme, Hut und Schatten schützen deine Haut.' },
    { type:'mc', q:'Warum sollen wir Wasser sparen?', say:'Warum sollen wir Wasser sparen?',
      options:[{e:'🌍',t:'Wasser ist kostbar',c:true},{e:'🎉',t:'Zum Spaß'},{e:'🍬',t:'Für Bonbons'}], cols:3,
      fact:'Sauberes Trinkwasser ist wertvoll. Nicht überall auf der Welt gibt es genug davon.' },
    { type:'mc', q:'Wo darf Müll NICHT hin?', say:'Wo darf Müll nicht hin?',
      options:[{e:'🌳',t:'in die Natur',c:true},{e:'🗑️',t:'in die Tonne'},{e:'♻️',t:'zum Recycling'}], cols:3,
      fact:'Müll in der Natur schadet den Tieren. Eine Plastiktüte bleibt viele Jahre liegen!' }
  ]}
];

/* ------------------------------------------------------------------ */
/*  Ü B U N G S B A N K E N                                            */
/*  Zusätzlicher Aufgabenvorrat je Modul (aus js/pools.js erzeugt).    */
/*  Pro Runde wird daraus eine frische Auswahl gezogen -> jede Runde   */
/*  ist anders, das Kind kann endlos üben.                             */
/* ------------------------------------------------------------------ */
const P = Pools;
const DRILLS = {
  /* --- Deutsch --- */
  de1: [...P.anlaute(['A','M','L','O','S']),
        ...['O','S','L'].map(c => ({ type:'trace', char:c, sayText:c.toLowerCase() }))],
  de2: [...P.anlaute(['E','I','N','R','T']),
        ...P.silben(['Sonne','Banane','Blume','Apfel','Elefant','Tomate','Maus','Zitrone',
                     'Katze','Baum','Giraffe','Nase','Hund','Melone','Rakete','Ball'])],
  de3: P.lesen(['Oma','Maus','Sonne','Rose','Mond','Ball','Haus','Nase','Hut','Igel',
                'Ente','Nuss','Ring','Tür','Zug','Ohr','Hand','Baum','Fisch','Katze']),
  /* Reime: falsche Optionen dürfen sich NICHT auch reimen,
     und alle Reimwörter müssen Erstklässlern bekannt sein. */
  de4: P.quiz([
    ['Was reimt sich auf MAUS?','Was reimt sich auf Maus?',['🏠','Haus'],['🌳','Baum'],['🐟','Fisch']],
    ['Was reimt sich auf BAUM?','Was reimt sich auf Baum?',['💭','Traum'],['🐭','Maus'],['🌸','Blume']],
    ['Was reimt sich auf ROSE?','Was reimt sich auf Rose?',['👖','Hose'],['🌹','Blume'],['🐕','Hund']],
    ['Was reimt sich auf HUT?','Was reimt sich auf Hut?',['🩸','Blut'],['🎩','Kappe'],['🐈','Katze']],
    ['Was reimt sich auf BALL?','Was reimt sich auf Ball?',['🏚️','Stall'],['⚽','Tor'],['🌙','Mond']],
    ['Was reimt sich auf SONNE?','Was reimt sich auf Sonne?',['🗑️','Tonne'],['⭐','Stern'],['🌧️','Regen']],
    ['Was reimt sich auf FISCH?','Was reimt sich auf Fisch?',['🪑','Tisch'],['🌊','Wasser'],['🐦','Vogel']],
    ['Was reimt sich auf NASE?','Was reimt sich auf Nase?',['🏺','Vase'],['👄','Mund'],['👁️','Auge']],
    ['Was reimt sich auf KATZE?','Was reimt sich auf Katze?',['🐾','Tatze'],['🐁','Maus'],['🥛','Milch']],
    ['Was reimt sich auf HAND?','Was reimt sich auf Hand?',['🏖️','Sand'],['🖐️','Finger'],['🦶','Fuß']],
    ['Was reimt sich auf BEIN?','Was reimt sich auf Bein?',['🪨','Stein'],['🦶','Fuß'],['💪','Arm']],
    ['Was reimt sich auf BUCH?','Was reimt sich auf Buch?',['🧻','Tuch'],['📖','Seite'],['✏️','Stift']]
  ]),
  de5: [...P.grossKlein(['AMSR','EOLT','BDFG','HIKN','PUWZ','MNOP']),
        ...['A','E','M','S','R','L','T','O'].map(c => ({ type:'trace', char:c, sayText:c.toLowerCase() })),
        ...P.quiz([
          ['Welcher ist der große Buchstabe zu "b"?','Welcher ist der große Buchstabe zu b?',[null,'B'],[null,'D'],[null,'P']],
          ['Welcher ist der große Buchstabe zu "d"?','Welcher ist der große Buchstabe zu d?',[null,'D'],[null,'B'],[null,'P']],
          ['Welcher ist der kleine Buchstabe zu "R"?','Welcher ist der kleine Buchstabe zu R?',[null,'r'],[null,'n'],[null,'m']],
          ['Welcher ist der kleine Buchstabe zu "E"?','Welcher ist der kleine Buchstabe zu E?',[null,'e'],[null,'a'],[null,'o']]
        ])],
  de6: P.quiz([
    ['Der Hund bellt laut.','Lies: Der Hund bellt laut.',['🐕',''],['🐈',''],['🐦','']],
    ['Die Blume ist gelb.','Lies: Die Blume ist gelb.',['🌻',''],['🌹',''],['🌷','']],
    ['Das Auto fährt schnell.','Lies: Das Auto fährt schnell.',['🚗',''],['🚲',''],['⛵','']],
    ['Die Maus frisst Käse.','Lies: Die Maus frisst Käse.',['🐭🧀',''],['🐈🥛',''],['🐕🦴','']],
    ['Der Vogel fliegt hoch.','Lies: Der Vogel fliegt hoch.',['🐦',''],['🐟',''],['🐌','']],
    ['Es regnet heute.','Lies: Es regnet heute.',['🌧️',''],['☀️',''],['❄️','']],
    ['Der Baum ist groß.','Lies: Der Baum ist groß.',['🌳',''],['🌱',''],['🍄','']],
    ['Ich trinke Milch.','Lies: Ich trinke Milch.',['🥛',''],['🧃',''],['☕','']],
    ['Die Katze schläft.','Lies: Die Katze schläft.',['😴',''],['🏃',''],['🍽️','']],
    ['Der Fisch schwimmt im Wasser.','Lies: Der Fisch schwimmt im Wasser.',['🐟',''],['🐦',''],['🐛','']]
  ]),
  de7: [...P.anlaute(['Sch']),
        ...P.quiz([
          ['Welches Wort hat "ei"?','In welchem Wort hörst du ei?',['🥚','Ei'],['🌳','Baum'],['🐟','Fisch']],
          ['Welches Wort hat "ei"?','Und hier: In welchem Wort hörst du ei?',['🍦','Eis'],['🐭','Maus'],['🌙','Mond']],
          ['Welches Wort hat "au"?','In welchem Wort hörst du au?',['🏠','Haus'],['🌙','Mond'],['🐸','Frosch']],
          ['Welches Wort hat "au"?','Und hier: In welchem Wort hörst du au?',['🌳','Baum'],['🐟','Fisch'],['⭐','Stern']],
          ['Welches Wort hat "au"?','Noch einmal: In welchem Wort hörst du au?',['🐭','Maus'],['🌹','Rose'],['🍎','Apfel']],
          ['Welches Wort beginnt mit "St"?','Welches Wort beginnt mit St?',['⭐','Stern'],['🐑','Schaf'],['🌞','Sonne']],
          ['Welches Wort beginnt mit "Sp"?','Welches Wort beginnt mit Sp?',['🕷️','Spinne'],['🐑','Schaf'],['⭐','Stern']],
          ['Welches Wort hat "eu"?','In welchem Wort hörst du eu?',['🔥','Feuer'],['🏠','Haus'],['🥚','Ei']]
        ])],
  de8: P.fehlenderLaut([['Sonne',1],['Ball',1],['Fisch',1],['Hund',1],['Baum',1],['Maus',1],
                        ['Mond',1],['Rose',1],['Nase',1],['Hase',1],['Katze',1],['Tiger',1],
                        ['Nuss',1],['Ring',1],['Zug',1],['Hut',1],['Ohr',0],['Apfel',0],
                        ['Igel',0],['Ente',0],['Oma',0],['Uhr',0]]),
  de9: [...P.artikel([['Hund','der'],['Blume','die'],['Haus','das'],['Sonne','die'],['Ball','der'],
                      ['Auto','das'],['Maus','die'],['Baum','der'],['Buch','das'],['Katze','die'],
                      ['Mond','der'],['Fisch','der'],['Rose','die'],['Brot','das'],['Nase','die'],
                      ['Tiger','der'],['Boot','das'],['Uhr','die']]),
        ...P.quiz([
          ['Welches Wort ist ein Nomen?','Welches Wort ist ein Nomen?',[null,'Haus'],[null,'lachen'],[null,'bunt']],
          ['Welches Wort ist ein Nomen?','Welches Wort ist ein Nomen?',[null,'Vogel'],[null,'fliegen'],[null,'hoch']],
          ['Welches Wort ist ein Nomen?','Welches Wort ist ein Nomen?',[null,'Schule'],[null,'lernen'],[null,'klug']]
        ])],
  de10: P.quiz([
    ['Welches Wort schreibt man GROSS?','Welches Wort schreibt man groß?',[null,'Hund'],[null,'rennt'],[null,'schnell']],
    ['Welches Wort schreibt man GROSS?','Welches Wort schreibt man groß?',[null,'Sonne'],[null,'scheint'],[null,'warm']],
    ['Welches Wort schreibt man GROSS?','Welches Wort schreibt man groß?',[null,'Tisch'],[null,'steht'],[null,'braun']],
    ['Welches Wort schreibt man GROSS?','Welches Wort schreibt man groß?',[null,'Kind'],[null,'spielt'],[null,'froh']],
    ['Max hat Durst. Was braucht er?','Max hat Durst. Was braucht er?',['💧','Wasser'],['🍞','Brot'],['📚','Buch']],
    ['Lisa ist müde. Was macht sie?','Lisa ist müde. Was macht sie?',['😴','schlafen'],['🏃','rennen'],['🍰','backen']],
    ['Es regnet. Was nimmt Paul mit?','Es regnet. Was nimmt Paul mit?',['☂️','Schirm'],['🕶️','Brille'],['🩴','Sandalen']],
    ['Oma hat Geburtstag. Was schenkt Mia?','Oma hat Geburtstag. Was schenkt Mia?',['🎁','Geschenk'],['🗑️','Müll'],['🧦','alte Socke']]
  ]),

  /* --- Mathematik --- */
  ma1: [...P.zaehlen(1, 6), ...P.zaehlen(2, 6),
        ...P.quiz([
          ['Wo sind MEHR?','Wo sind mehr Punkte?',['🔵🔵🔵🔵',''],['🔵🔵','']],
          ['Wo sind WENIGER?','Wo sind weniger Sterne?',['⭐',''],['⭐⭐⭐','']],
          ['Wo sind MEHR?','Wo sind mehr Herzen?',['❤️❤️❤️❤️❤️',''],['❤️❤️❤️','']],
          ['Wo sind WENIGER?','Wo sind weniger Blumen?',['🌸🌸',''],['🌸🌸🌸🌸','']]
        ])],
  ma2: [...P.zaehlen(5, 10), ...P.zahlErkennen(1, 10), ...P.folgen(1, 10, 1),
        ...'0123456789'.split('').map(c => ({ type:'trace', char:c, sayText:P.ZAHLWORT[+c] }))],
  ma3: [...P.plus(10), ...P.sachaufgaben([
        ['Tim hat 3 Murmeln und findet 4 dazu. Wie viele hat er?','Tim hat drei Murmeln und findet vier dazu. Wie viele hat er?',7,'🔮'],
        ['Im Korb sind 5 Eier. Oma legt 3 dazu. Wie viele sind es?','Im Korb sind fünf Eier. Oma legt drei dazu. Wie viele sind es?',8,'🥚'],
        ['4 Vögel sitzen im Baum. 2 kommen dazu. Wie viele sind es?','Vier Vögel sitzen im Baum. Zwei kommen dazu. Wie viele sind es?',6,'🐦'],
        ['Du hast 6 Sticker und bekommst 3. Wie viele hast du?','Du hast sechs Sticker und bekommst drei dazu. Wie viele hast du?',9,'⭐']])],
  ma4: [...P.minus(10), ...P.sachaufgaben([
        ['9 Luftballons, 4 platzen. Wie viele bleiben?','Neun Luftballons. Vier platzen. Wie viele bleiben?',5,'🎈'],
        ['Auf dem Teller sind 7 Kekse. Du isst 2. Wie viele bleiben?','Auf dem Teller sind sieben Kekse. Du isst zwei. Wie viele bleiben?',5,'🍪'],
        ['10 Enten schwimmen. 3 fliegen weg. Wie viele bleiben?','Zehn Enten schwimmen. Drei fliegen weg. Wie viele bleiben?',7,'🦆'],
        ['Du hast 8 Bonbons und teilst 5 aus. Wie viele bleiben?','Du hast acht Bonbons und teilst fünf aus. Wie viele bleiben?',3,'🍬']])],
  ma5: P.quiz([
    ['Welche Form ist ein Quadrat?','Welche Form ist ein Quadrat?',['🟦',''],['🔺',''],['🔵','']],
    ['Welche Form hat 3 Ecken?','Welche Form hat drei Ecken?',['🔺',''],['🟦',''],['🔵','']],
    ['Welche Form hat keine Ecke?','Welche Form hat keine einzige Ecke?',['🔵',''],['🔺',''],['⬛','']],
    ['Welche Form hat 4 Ecken?','Welche Form hat vier Ecken?',['⬛',''],['🔵',''],['🔺','']],
    ['Was ist ein Würfel?','Welcher Körper ist ein Würfel?',['🎲',''],['⚽',''],['🥫','']],
    ['Was ist eine Kugel?','Welcher Körper ist eine Kugel?',['⚽',''],['🎲',''],['📦','']],
    ['Welches Bild ist symmetrisch?','Welches Bild ist spiegelgleich?',['🦋',''],['🌙',''],['🍌','']],
    ['Welches Bild ist symmetrisch?','Welches Bild ist spiegelgleich?',['❤️',''],['👟',''],['🥄','']]
  ]),
  ma6: [...P.zaehlen(11, 20), ...P.zahlErkennen(11, 20), ...P.folgen(10, 20, 1),
        ...P.folgen(2, 20, 2), ...P.folgen(5, 20, 5),
        ...P.vergleich([[18,15],[12,19],[20,17],[11,14],[16,13],[9,12],[20,2],[15,17]])],
  ma7: [...P.plusUeber10(), ...P.minusUeber10(),
        ...P.quiz([
          ['Verdopple die 5!','Verdopple die Fünf! Was ist 5 plus 5?',[null,'10'],[null,'8'],[null,'12']],
          ['Verdopple die 6!','Verdopple die Sechs! Was ist 6 plus 6?',[null,'12'],[null,'10'],[null,'14']],
          ['Verdopple die 8!','Verdopple die Acht! Was ist 8 plus 8?',[null,'16'],[null,'14'],[null,'18']],
          ['Verdopple die 9!','Verdopple die Neun! Was ist 9 plus 9?',[null,'18'],[null,'16'],[null,'20']],
          ['Tauschaufgabe: 3 + 9 = 9 + ?','Drei plus neun ist dasselbe wie neun plus wie viel?',[null,'3'],[null,'9'],[null,'12']],
          ['Tauschaufgabe: 7 + 4 = 4 + ?','Sieben plus vier ist dasselbe wie vier plus wie viel?',[null,'7'],[null,'4'],[null,'11']],
          ['Welche Zahl fehlt?  8 + ? = 10','Acht plus wie viel ergibt zehn?',[null,'2'],[null,'3'],[null,'1']],
          ['Welche Zahl fehlt?  6 + ? = 10','Sechs plus wie viel ergibt zehn?',[null,'4'],[null,'3'],[null,'5']],
          ['Welche Zahl fehlt?  3 + ? = 10','Drei plus wie viel ergibt zehn?',[null,'7'],[null,'6'],[null,'8']]
        ])],
  ma8: [...P.geld(2, 10),
        ...P.sachaufgaben([
          ['Das Brot kostet 3 €. Du zahlst 5 €. Wie viel zurück?','Das Brot kostet drei Euro. Du zahlst mit fünf Euro. Wie viel bekommst du zurück?',2,'🍞'],
          ['Der Apfel kostet 1 €. Du zahlst 5 €. Wie viel zurück?','Der Apfel kostet einen Euro. Du zahlst mit fünf Euro. Wie viel bekommst du zurück?',4,'🍎'],
          ['Du hast 4 € und bekommst 5 € dazu. Wie viel?','Du hast vier Euro und bekommst fünf Euro dazu. Wie viel hast du?',9,'💶'],
          ['Das Eis kostet 3 €, der Saft 2 €. Wie viel zusammen?','Das Eis kostet drei Euro, der Saft zwei Euro. Wie viel kostet beides zusammen?',5,'🍦']]),
        ...P.quiz([
          ['Was kostet mehr?','Was kostet wohl mehr?',['🚗','Auto'],['🍎','Apfel']],
          ['Was kostet weniger?','Was kostet wohl weniger?',['✏️','Stift'],['🏠','Haus']],
          ['Was kostet mehr?','Was kostet wohl mehr?',['📱','Handy'],['🍬','Bonbon']]
        ])],
  ma9: [...P.uhrzeiten([1,2,3,4,5,6,7,8,9,10,11,12]),
        ...P.quiz([
          ['Welcher Tag kommt nach Dienstag?','Welcher Wochentag kommt nach Dienstag?',[null,'Mittwoch'],[null,'Montag'],[null,'Freitag']],
          ['Welcher Tag kommt nach Freitag?','Welcher Wochentag kommt nach Freitag?',[null,'Samstag'],[null,'Donnerstag'],[null,'Montag']],
          ['Welcher Tag kommt vor Montag?','Welcher Wochentag kommt vor Montag?',[null,'Sonntag'],[null,'Dienstag'],[null,'Samstag']],
          ['Wie viele Tage hat eine Woche?','Wie viele Tage hat eine Woche?',[null,'7'],[null,'5'],[null,'10']],
          ['Wie viele Monate hat ein Jahr?','Wie viele Monate hat ein Jahr?',[null,'12'],[null,'7'],[null,'10']],
          ['Wie viele Stunden hat ein Tag?','Wie viele Stunden hat ein Tag?',[null,'24'],[null,'12'],[null,'60']],
          ['Wann frühstückst du?','Wann frühstückst du?',['🌅','morgens'],['🌙','nachts'],['🌆','abends']],
          ['Wann gehst du ins Bett?','Wann gehst du ins Bett?',['🌙','abends'],['🌅','morgens'],['☀️','mittags']]
        ])],
  ma10: P.quiz([
    ['Was ist länger?','Was ist länger?',['🚌','Bus'],['🚲','Fahrrad']],
    ['Was ist kürzer?','Was ist kürzer?',['✏️','Stift'],['🪜','Leiter']],
    ['Was ist schwerer?','Was ist schwerer?',['🚗','Auto'],['🪶','Feder']],
    ['Was ist leichter?','Was ist leichter?',['🎈','Luftballon'],['🪨','Stein']],
    ['Was ist größer?','Was ist größer?',['🐘','Elefant'],['🐈','Katze']],
    ['Was ist kleiner?','Was ist kleiner?',['🐜','Ameise'],['🐕','Hund']],
    ['Womit misst du eine Länge?','Womit misst du, wie lang etwas ist?',['📏','Lineal'],['🕐','Uhr'],['⚖️','Waage']],
    ['Womit misst du die Zeit?','Womit misst du die Zeit?',['🕐','Uhr'],['📏','Lineal'],['🌡️','Thermometer']],
    ['Womit misst du das Gewicht?','Womit misst du, wie schwer etwas ist?',['⚖️','Waage'],['📏','Lineal'],['🕐','Uhr']]
  ]),

  /* --- Sachkunde (HSU) --- */
  hsu1: P.quiz([
    ['Womit SIEHST du?','Womit siehst du?',['👁️','Auge'],['👂','Ohr'],['👃','Nase']],
    ['Womit SCHMECKST du?','Womit schmeckst du?',['👅','Zunge'],['✋','Hand'],['👂','Ohr']],
    ['Womit FÜHLST du?','Womit fühlst du?',['✋','Hand'],['👁️','Auge'],['👃','Nase']],
    ['Was gehört in deinen Schulranzen?','Was gehört in deinen Schulranzen?',['📒','Heft'],['🍳','Pfanne'],['🛏️','Kissen']],
    ['Was macht man in der Pause?','Was macht man in der Pause?',['⚽','spielen'],['😴','schlafen'],['🛁','baden']],
    ['Ein Kind ist traurig. Was tust du?','Ein Kind ist traurig. Was tust du?',['🤗','trösten'],['😂','auslachen'],['🙈','weggehen']],
    ['Wie grüßt man am Morgen?','Wie grüßt man am Morgen?',[null,'Guten Morgen'],[null,'Gute Nacht'],[null,'Tschüss']],
    ['Was sagst du, wenn du etwas möchtest?','Was sagst du, wenn du etwas möchtest?',[null,'Bitte'],[null,'Sofort!'],[null,'Nein!']]
  ]),
  hsu2: P.quiz([
    ['Welche Farbe haben Blätter im Herbst?','Welche Farbe haben die Blätter im Herbst?',['🍁','bunt'],['💙','blau'],['🖤','schwarz']],
    ['Was wächst im Herbst am Baum?','Was wächst im Herbst am Baum?',['🍎','Äpfel'],['🍦','Eis'],['❄️','Schnee']],
    ['Welches Tier fliegt in den Süden?','Welches Tier fliegt im Herbst in den Süden?',['🦢','Storch'],['🐿️','Eichhörnchen'],['🦔','Igel']],
    ['Was braucht man bei Wind?','Was braucht man bei viel Wind?',['🪁','Drachen'],['🍦','Eis'],['🩱','Badehose']],
    ['Welche Frucht ist eine Herbstfrucht?','Welche Frucht reift im Herbst?',['🌰','Kastanie'],['🍉','Melone'],['🍍','Ananas']],
    ['Was macht der Bauer im Herbst?','Was macht der Bauer im Herbst?',['🚜','ernten'],['🎿','Ski fahren'],['🏊','schwimmen']],
    ['Wie viele Jahreszeiten gibt es?','Wie viele Jahreszeiten gibt es?',[null,'4'],[null,'2'],[null,'12']],
    ['Welche Jahreszeit kommt vor dem Herbst?','Welche Jahreszeit kommt vor dem Herbst?',['☀️','Sommer'],['❄️','Winter'],['🌸','Frühling']]
  ]),
  hsu3: P.quiz([
    ['Die Ampel ist GELB. Was bedeutet das?','Die Ampel ist gelb. Was bedeutet das?',['⚠️','gleich Rot'],['🏃','schnell rennen'],['😴','schlafen']],
    ['Wo gehst du auf dem Weg zur Schule?','Wo gehst du auf dem Weg zur Schule?',['🚶','auf dem Gehweg'],['🛣️','auf der Straße'],['🅿️','auf dem Parkplatz']],
    ['Was machst du an einer Bushaltestelle?','Was machst du an der Bushaltestelle?',['🧍','warten'],['🏃','rennen'],['💃','tanzen']],
    ['Was bedeutet ein rotes Stoppschild?','Was bedeutet ein rotes Stoppschild?',['🛑','anhalten'],['🏃','weitergehen'],['🔄','umdrehen']],
    ['Was trägst du bei Dunkelheit?','Was trägst du am besten, wenn es dunkel ist?',['🦺','helle Kleidung'],['🖤','dunkle Kleidung'],['🕶️','Sonnenbrille']],
    ['Wo sitzt du sicher im Auto?','Wo sitzt du sicher im Auto?',['💺','im Kindersitz'],['🦵','auf dem Schoß'],['🧳','im Kofferraum']],
    ['Darfst du zwischen Autos auf die Straße laufen?','Darfst du zwischen parkenden Autos auf die Straße laufen?',['🚫','Nein'],['✅','Ja'],['🤷','Manchmal']],
    ['Was macht ein Fahrradklingel?','Wofür ist die Fahrradklingel da?',['🔔','warnen'],['🎵','Musik machen'],['🎨','schmücken']]
  ]),
  hsu4: P.quiz([
    ['Was gehört zum Winter?','Was gehört zum Winter?',['⛄','Schneemann'],['🏖️','Strand'],['🌻','Sonnenblume']],
    ['Was ziehst du bei Kälte an?','Was ziehst du an, wenn es kalt ist?',['🧥','Jacke'],['🩱','Badeanzug'],['🩳','Shorts']],
    ['Wie viele Kerzen am 4. Advent?','Wie viele Kerzen brennen am vierten Advent?',[null,'4'],[null,'1'],[null,'2']],
    ['Welcher Monat ist der erste im Jahr?','Welcher Monat ist der erste im Jahr?',[null,'Januar'],[null,'Dezember'],[null,'Juni']],
    ['Welcher Monat ist der letzte im Jahr?','Welcher Monat ist der letzte im Jahr?',[null,'Dezember'],[null,'Januar'],[null,'Juli']],
    ['Was passiert mit Wasser bei Frost?','Was passiert mit Wasser, wenn es sehr kalt ist?',['🧊','es gefriert'],['💨','es fliegt weg'],['🔥','es brennt']],
    ['Was macht man auf dem Eis?','Was kann man auf dem Eis machen?',['⛸️','Schlittschuh laufen'],['🏊','schwimmen'],['🚴','Rad fahren']],
    ['Welches Fest feiert man im Dezember?','Welches Fest feiert man im Dezember?',['🎄','Weihnachten'],['🐣','Ostern'],['🎃','Halloween']]
  ]),
  hsu5: P.quiz([
    ['Welches Tier hält Winterschlaf?','Welches Tier hält Winterschlaf?',['🐻','Bär'],['🦊','Fuchs'],['🦌','Reh']],
    ['Welches Tier hält KEINEN Winterschlaf?','Welches Tier hält keinen Winterschlaf?',['🐿️','Eichhörnchen'],['🐻','Bär'],['🦔','Igel']],
    ['Was hilft Vögeln im Winter?','Wie kannst du Vögeln im Winter helfen?',['🌰','Futter geben'],['💧','Wasser wegnehmen'],['📢','laut sein']],
    ['Welches Wetter ist das?','Welches Wetter zeigt dieses Bild?',['❄️','Schnee'],['☀️','Sonne'],['🌈','Regenbogen']],
    ['Welches Wetter ist das?','Und dieses Wetter?',['⛈️','Gewitter'],['☀️','Sonne'],['🌫️','Nebel']],
    ['Was brauchst du bei Schnee?','Was brauchst du, wenn es schneit?',['🧤','Handschuhe'],['🩴','Sandalen'],['🕶️','Sonnenbrille']],
    ['Woraus besteht Schnee?','Woraus besteht Schnee?',['💧','Wasser'],['🍚','Reis'],['🧂','Salz']],
    ['Welches Tier hat ein dickes Winterfell?','Welches Tier bekommt im Winter ein dickeres Fell?',['🦊','Fuchs'],['🐠','Fisch'],['🐍','Schlange']]
  ]),
  hsu6: P.quiz([
    ['Was ist gesünder?','Was ist gesünder?',['🥗','Salat'],['🍟','Pommes']],
    ['Was ist gesünder?','Was ist gesünder?',['🍇','Trauben'],['🍩','Donut']],
    ['Wann putzt du die Zähne?','Wann putzt du deine Zähne?',['🌙','morgens und abends'],['🎂','nur am Geburtstag'],['🚫','nie']],
    ['Was solltest du vor dem Essen tun?','Was solltest du vor dem Essen tun?',['🧼','Hände waschen'],['📺','fernsehen'],['🏃','rennen']],
    ['Wie oft solltest du dich bewegen?','Wie oft solltest du dich bewegen?',['🏃','jeden Tag'],['📅','einmal im Jahr'],['🚫','nie']],
    ['Was gehört zu einem guten Frühstück?','Was gehört zu einem guten Frühstück?',['🥣','Müsli'],['🍫','Schokolade'],['🥤','Cola']],
    ['Wie viele Mahlzeiten am Tag sind gut?','Wie viele Mahlzeiten am Tag sind gut?',[null,'3'],[null,'1'],[null,'10']],
    ['Was macht dich müde?','Was macht dich müde, wenn du zu wenig davon hast?',['😴','Schlaf'],['🍬','Bonbons'],['📺','Fernsehen']]
  ]),
  hsu7: P.quiz([
    ['Was macht die Biene an der Blume?','Was holt sich die Biene von der Blume?',['🍯','Nektar'],['💧','Regen'],['🍂','Blätter']],
    ['Welcher Teil der Pflanze ist unter der Erde?','Welcher Teil der Pflanze ist unter der Erde?',['🫚','Wurzel'],['🌸','Blüte'],['🍃','Blatt']],
    ['Was kommt aus einem Samen?','Was wächst aus einem Samenkorn?',['🌱','Pflanze'],['🪨','Stein'],['💧','Wasser']],
    ['Welches Tier lebt im Frühling neu auf?','Welches Tier siehst du im Frühling wieder?',['🦋','Schmetterling'],['🐧','Pinguin'],['🦈','Hai']],
    ['Was machen Vögel im Frühling?','Was bauen Vögel im Frühling?',['🪹','ein Nest'],['🏠','ein Haus'],['🚗','ein Auto']],
    ['Welche Farbe hat ein Blatt im Frühling?','Welche Farbe hat ein frisches Blatt?',['💚','grün'],['🤎','braun'],['🤍','weiß']],
    ['Was braucht ein Baum zum Leben?','Was braucht ein Baum zum Leben?',['💧','Wasser'],['🍫','Schokolade'],['📺','Fernsehen']],
    ['Welche Blume hat einen gelben Kopf?','Welche Blume hat einen großen gelben Kopf?',['🌻','Sonnenblume'],['🌹','Rose'],['🌷','Tulpe']]
  ]),
  hsu8: P.quiz([
    ['Wie heißt das Kind vom Hund?','Wie heißt das Kind vom Hund?',['🐶','Welpe'],['🐣','Küken'],['🐑','Lamm']],
    ['Wie heißt das Kind von der Katze?','Wie heißt das Kind von der Katze?',['🐱','Kätzchen'],['🐮','Kalb'],['🐷','Ferkel']],
    ['Wie heißt das Kind vom Schwein?','Wie heißt das Kind vom Schwein?',['🐷','Ferkel'],['🐶','Welpe'],['🐣','Küken']],
    ['Wie heißt das Kind vom Pferd?','Wie heißt das Kind vom Pferd?',['🐴','Fohlen'],['🐑','Lamm'],['🐮','Kalb']],
    ['Woher kommt die Wolle?','Von welchem Tier kommt die Wolle?',['🐑','Schaf'],['🐄','Kuh'],['🐔','Huhn']],
    ['Woher kommen die Eier?','Von welchem Tier kommen die Eier?',['🐔','Huhn'],['🐖','Schwein'],['🐑','Schaf']],
    ['Wie macht das Schaf?','Wie macht das Schaf?',[null,'Mäh'],[null,'Muh'],[null,'Wau']],
    ['Wie macht das Schwein?','Wie macht das Schwein?',[null,'Oink'],[null,'Miau'],[null,'Mäh']],
    ['Was frisst die Kuh?','Was frisst eine Kuh am liebsten?',['🌾','Gras'],['🍖','Fleisch'],['🍫','Schokolade']],
    ['Wo lebt ein Huhn?','Wo lebt ein Huhn?',['🏡','im Stall'],['🌊','im Meer'],['🌳','im Baum']]
  ]),
  hsu9: P.quiz([
    ['Wie viele Beine hat eine Spinne?','Wie viele Beine hat eine Spinne?',[null,'8'],[null,'6'],[null,'4']],
    ['Welches Tier lebt in einem Bau unter der Erde?','Welches Tier lebt unter der Erde?',['🐜','Ameise'],['🦋','Schmetterling'],['🐝','Biene']],
    ['Was macht die Ameise?','Wofür sind Ameisen bekannt?',['💪','schwer tragen'],['🎵','singen'],['🏊','schwimmen']],
    ['Welches Tier ist ein Insekt?','Welches Tier ist ein Insekt?',['🐞','Marienkäfer'],['🕷️','Spinne'],['🐌','Schnecke']],
    ['Was trägt die Schnecke auf dem Rücken?','Was trägt die Schnecke auf dem Rücken?',['🐚','ihr Haus'],['🎒','Rucksack'],['☂️','Schirm']],
    ['Wo wohnen Bienen?','Wo wohnen Bienen?',['🍯','im Bienenstock'],['🕳️','im Loch'],['🌊','im Wasser']],
    ['Was machst du mittags?','Was machst du meistens mittags?',['🍽️','Mittagessen'],['😴','schlafen'],['🌙','Sterne schauen']],
    ['Was machst du nach der Schule?','Was machst du meistens nach der Schule?',['📚','Hausaufgaben'],['🏫','Unterricht'],['🌅','aufstehen']]
  ]),
  hsu10: P.quiz([
    ['Wohin kommt eine Glasflasche?','Wohin kommt eine Glasflasche?',['🫙','Glascontainer'],['📄','Papiertonne'],['🌳','in den Wald']],
    ['Wohin kommt eine Zeitung?','Wohin kommt eine alte Zeitung?',['📄','Papiertonne'],['🍌','Biotonne'],['🌊','ins Meer']],
    ['Was spart Wasser?','Womit sparst du Wasser?',['🚿','kurz duschen'],['🛁','lange baden'],['💦','Hahn laufen lassen']],
    ['Wie kommst du umweltfreundlich zur Schule?','Wie kommst du umweltfreundlich zur Schule?',['🚶','zu Fuß'],['✈️','mit dem Flugzeug'],['🚗','mit dem Auto']],
    ['Was ist gut für die Umwelt?','Was ist gut für die Umwelt?',['♻️','Recycling'],['🗑️','wegwerfen'],['🔥','verbrennen']],
    ['Warum sind Bäume wichtig?','Warum sind Bäume wichtig?',['💨','sie machen Luft'],['📺','sie machen Fernsehen'],['🍬','sie machen Bonbons']],
    ['Was brauchst du im Sommer draußen?','Was brauchst du im Sommer draußen?',['🧢','eine Kappe'],['🧤','Handschuhe'],['🧣','einen Schal']],
    ['Was solltest du bei Hitze viel tun?','Was solltest du machen, wenn es sehr heiß ist?',['💧','viel trinken'],['🏃','viel rennen'],['🧥','Jacke anziehen']]
  ])
};

/* Banken an die Module hängen; Rundengröße je Modul.
   Wichtig: Kernaufgaben und Generatoren überschneiden sich (z. B. steckt
   "3 + 2" sowohl kuratiert als auch in P.plus(10)). Ohne Dedup könnte
   dieselbe Aufgabe zweimal in einer Runde landen. */
const _idKey = a =>
    a.type === 'anlaut' ? 'anlaut|' + a.word          // gleiches Wort = gleiche Aufgabe
  : a.type === 'mc'     ? 'mc|' + (a.q || '') + '|' + // Frage UND Antwortsatz zählen:
      a.options.map(o => `${o.e || ''}${o.t || ''}`).sort().join(',')
  : a.type + '|' + JSON.stringify(a);                 // Rest: strukturgleich

MODULES.forEach(m => {
  const seen = new Set((m.activities || []).map(_idKey));
  m.drill = (DRILLS[m.id] || []).filter(a => {
    const k = _idKey(a);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  m.round = m.round || 10;   // Aufgaben pro Spielrunde
});

