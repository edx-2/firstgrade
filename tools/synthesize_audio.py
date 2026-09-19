#!/usr/bin/env python3
"""
synthesize_audio.py - Schritt 2 der Audio-Pipeline.

Liest tools/phrases.json (aus extract-phrases.mjs) und erzeugt fuer jeden
Satz eine MP3-Datei mit Microsoft-Edge-Neural-TTS (kostenlos, kein API-Key):

    pip install edge-tts
    python tools/synthesize_audio.py

- inkrementell: vorhandene MP3s werden uebersprungen
- schreibt assets/audio/de/manifest.json (Hash -> Text), das die App laedt
- Kategorien bekommen leicht unterschiedliches Tempo/Tonhoehe,
  damit Lob froehlich klingt und Erklaerungen ruhig
"""
import asyncio
import json
import pathlib
import sys

try:
    import edge_tts
except ImportError:
    sys.exit("edge-tts fehlt. Bitte installieren:  pip install edge-tts")

VOICE = "de-DE-KatjaNeural"   # warm & klar; Alternative: de-DE-SeraphinaMultilingualNeural

# Feintuning je Kategorie (rate/pitch relativ zur Stimme)
CATS = {
    "task":   {"rate": "+8%",  "pitch": "+2Hz"},   # Aufgabenstellungen
    "intro":  {"rate": "+6%",  "pitch": "+5Hz"},   # Fuchsis Modul-Begruessung
    "fact":   {"rate": "+4%",  "pitch": "+0Hz"},   # Erklaer-Fakten: ruhig
    "praise": {"rate": "+15%", "pitch": "+18Hz"},  # Lob: kurz & froehlich
    "cheer":  {"rate": "+10%", "pitch": "+10Hz"},  # Aufmuntern
    "finish": {"rate": "+8%",  "pitch": "+8Hz"},   # Rundenabschluss
    "static": {"rate": "+8%",  "pitch": "+6Hz"},   # Begruessung etc.
}

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "audio" / "de"
PARALLEL = 4  # gleichzeitige Anfragen an den TTS-Dienst


async def synth(sem: asyncio.Semaphore, phrase: dict, path: pathlib.Path) -> bool:
    style = CATS.get(phrase["cat"], CATS["task"])
    async with sem:
        for attempt in (1, 2, 3):
            try:
                com = edge_tts.Communicate(
                    phrase["text"], VOICE, rate=style["rate"], pitch=style["pitch"]
                )
                await com.save(str(path))
                print(f"  + {phrase['hash']}  [{phrase['cat']:<6}]  {phrase['text'][:60]}")
                return True
            except Exception as e:  # noqa: BLE001 - Netzwerk-Retry
                if attempt == 3:
                    print(f"  ! FEHLER {phrase['hash']}: {e}", file=sys.stderr)
                    if path.exists():
                        path.unlink()  # halbe Dateien nicht liegen lassen
                    return False
                await asyncio.sleep(1.5 * attempt)
    return False


async def main() -> None:
    data = json.loads((ROOT / "tools" / "phrases.json").read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)

    todo = [p for p in data["phrases"] if not (OUT / f"{p['hash']}.mp3").exists()]
    print(f"{data['count']} Sätze gesamt, {len(todo)} neu zu erzeugen (Stimme: {VOICE})")

    sem = asyncio.Semaphore(PARALLEL)
    results = await asyncio.gather(
        *(synth(sem, p, OUT / f"{p['hash']}.mp3") for p in todo)
    )
    failed = results.count(False)

    files = {
        p["hash"]: {"text": p["text"], "cat": p["cat"]}
        for p in data["phrases"]
        if (OUT / f"{p['hash']}.mp3").exists()
    }
    (OUT / "manifest.json").write_text(
        json.dumps({"voice": VOICE, "files": files}, ensure_ascii=False, indent=1),
        encoding="utf-8",
    )
    print(f"OK: Manifest mit {len(files)} Clips -> {OUT / 'manifest.json'}")
    if failed:
        sys.exit(f"{failed} Sätze fehlgeschlagen - Skript einfach erneut ausführen.")


if __name__ == "__main__":
    asyncio.run(main())
