# 🦊 Lernwelt – Erste Klasse (Bayern)

Eine bunte, interaktive Lern-Webseite für Kinder der **1. Klasse** in Bayern.
Die Inhalte orientieren sich am **[LehrplanPLUS Bayern](https://www.lehrplanplus.bayern.de/)**,
Jahrgangsstufe 1, und decken die drei Kernfächer ab:

- 📖 **Deutsch** – Laute & Anlaute, Silben, Lesen, Reime, Buchstaben, erste Wörter, Nomen
- 🔢 **Mathematik** – Zählen, Zahlen bis 20, Plus/Minus, Formen & Muster, Geld, Uhr, Größen
- 🌍 **Sachkunde (HSU)** – Schule, Jahreszeiten, Verkehr, Tiere, Gesundheit, Pflanzen, Umwelt

## Aufbau

Die Module sind gegliedert nach **Fach** und **Lernfortschritt in Monaten**
(Monat 1 = September bis Monat 10 = Juni/Juli). Über die Filter oben kann man ein
Fach auswählen. Jedes Modul ist ein kleines Lernspiel aus mehreren Aufgaben.

### Immer wieder üben

Jedes Modul hat eine **Aufgabenbank** (Ø 24, bis zu 80 Aufgaben), aus der pro
Runde **10 Aufgaben frisch gezogen** werden – jede Runde ist also anders und das
Kind kann beliebig oft üben, ohne dass es langweilig wird. Auf jeder Kachel steht,
wie viele Aufgaben zur Verfügung stehen (z. B. „10 von 51").

Eine Runde mischt bewusst zwei Sorten:
- **Kernaufgaben** (~40 %) – handverlesen, mit Erklärung nach der Antwort
- **Übungsaufgaben** (~60 %) – aus `js/pools.js` erzeugter Übungsvorrat

Die Reihenfolge bleibt dabei von leicht nach schwer sortiert.

### Spielarten
- Anlaute & fehlende Buchstaben, Silben zählen
- Rechnen am Zwanzigerfeld (Plus/Minus), Zählen
- Formen & Muster fortsetzen
- Memory (Paare finden), Sortieren in Körbe (Drag & Drop oder Antippen)
- Buchstaben & Zahlen nachspuren (auf Touch & Maus)
- Multiple-Choice mit Bildern

### Kindgerecht & motivierend
- 🔊 **Natürliche deutsche Sprachausgabe** aus vorproduzierten Neural-TTS-Clips
  (liest jede Aufgabe vor – auch für Kinder, die noch nicht lesen können)
- ⭐ **Sterne sammeln**, 🎉 Konfetti & fröhliche Töne als Belohnung
- Großer, bunter, tippfreundlicher Aufbau (Tablet-tauglich)
- Fortschritt wird lokal im Browser gespeichert (`localStorage`)

## Technik

Reine **statische Seite** – nur HTML, CSS und Vanilla-JavaScript, **keine** serverseitigen
Komponenten. Läuft direkt auf **GitHub Pages**.

```
index.html
css/style.css
js/pools.js       <- Wortschatz & Aufgaben-Generatoren (Übungsbank)
js/speakables.js  <- gemeinsame Quelle aller Sprechtexte
js/data.js        <- der komplette Lerninhalt (Lehrplan)
js/engine.js      <- Ton, Sprachausgabe, Konfetti
js/games.js       <- die Spielarten
js/app.js         <- Übersicht & Spielablauf
assets/audio/de/  <- vorproduzierte Sprach-Clips + manifest.json
tools/            <- Audio-Pipeline (nur zur Entwicklung nötig)
```

## 🔊 Audio-Pipeline

Die Web Speech API klingt je nach Gerät blechern oder gelangweilt – besonders auf
Android. Darum werden alle Sprechtexte **einmalig offline** mit
**Microsoft-Edge-Neural-Stimmen** (`de-DE-KatjaNeural`, kostenlos, kein API-Key)
zu MP3s gerendert und mit ausgeliefert. Die Seite bleibt damit vollständig statisch.

Zur Laufzeit gilt: **Clip vorhanden → Clip abspielen**, sonst automatisch
Web-Speech als Fallback. Es geht also nie Sprache verloren.

### Neu erzeugen (nach Änderungen an `js/data.js`)

```bash
pip install edge-tts
./tools/build-audio.sh          # oder die zwei Schritte einzeln:
node tools/extract-phrases.mjs  # sammelt alle Sätze -> tools/phrases.json
python tools/synthesize_audio.py # rendert fehlende MP3s + manifest.json
```

Wichtig: Die Generatoren in `js/pools.js` sind **deterministisch** (kein Zufall
beim Erzeugen – der Zufall steckt allein in der Auswahl zur Spielzeit). Nur
dadurch kann die Pipeline jeden möglichen Satz vorab rendern.

Die Pipeline arbeitet **inkrementell**: Es werden nur Clips erzeugt, die noch
nicht existieren. Neue oder geänderte Aufgaben kosten also nur wenige Sekunden.
Danach die neuen Dateien in `assets/audio/de/` mit committen.

**Wie die Zuordnung funktioniert:** `js/speakables.js` ist die einzige Quelle der
Sprechtexte und wird von Browser *und* Pipeline genutzt. Jeder Satz bekommt einen
FNV-1a-Hash als Dateinamen (`assets/audio/de/<hash>.mp3`). Ändert sich ein Text,
ändert sich der Hash – der alte Clip wird einfach nicht mehr nachgeschlagen.

| Kategorie | Tempo / Tonhöhe | Wofür |
|---|---|---|
| `task` | +8 % | Aufgabenstellungen |
| `intro` | +6 %, heller | Fuchsis Modul-Begrüßung |
| `fact` | +4 % | Erklär-Fakten (ruhig) |
| `praise` | +15 %, deutlich heller | Lob – kurz & fröhlich |

Aufräumen alter Clips (optional, nach vielen Textänderungen):

```bash
node tools/extract-phrases.mjs && python tools/prune_audio.py
```

## Lokal starten

Einfach `index.html` im Browser öffnen – oder ein kleiner lokaler Server:

```bash
python -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Auf GitHub Pages veröffentlichen

1. Repository zu GitHub pushen.
2. In den Repo-Einstellungen -> **Pages** -> Branch `main`, Ordner `/ (root)` wählen.
3. Nach kurzer Zeit ist die Seite unter `https://<benutzername>.github.io/firstgrade/` erreichbar.

> Hinweis: Die Sprachausgabe nutzt die im Browser/Betriebssystem installierten
> deutschen Stimmen (Web Speech API). Unter Windows/Chrome ist meist eine deutsche
> Stimme vorhanden.
