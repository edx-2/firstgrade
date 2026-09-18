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

### Spielarten
- Anlaute & fehlende Buchstaben, Silben zählen
- Rechnen am Zwanzigerfeld (Plus/Minus), Zählen
- Formen & Muster fortsetzen
- Memory (Paare finden), Sortieren in Körbe (Drag & Drop oder Antippen)
- Buchstaben & Zahlen nachspuren (auf Touch & Maus)
- Multiple-Choice mit Bildern

### Kindgerecht & motivierend
- 🔊 **Deutsche Sprachausgabe** (liest Aufgaben & Wörter vor – auch für Kinder, die noch nicht lesen können)
- ⭐ **Sterne sammeln**, 🎉 Konfetti & fröhliche Töne als Belohnung
- Großer, bunter, tippfreundlicher Aufbau (Tablet-tauglich)
- Fortschritt wird lokal im Browser gespeichert (`localStorage`)

## Technik

Reine **statische Seite** – nur HTML, CSS und Vanilla-JavaScript, **keine** serverseitigen
Komponenten. Läuft direkt auf **GitHub Pages**.

```
index.html
css/style.css
js/data.js      <- der komplette Lerninhalt (Lehrplan)
js/engine.js    <- Ton, Sprachausgabe, Konfetti
js/games.js     <- die Spielarten
js/app.js       <- Übersicht & Spielablauf
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
