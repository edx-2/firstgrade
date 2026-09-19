#!/usr/bin/env python3
"""
prune_audio.py - Aufraeumen der Audio-Pipeline (optional).

Loescht MP3-Clips in assets/audio/de/, die in tools/phrases.json nicht mehr
vorkommen - also Reste von Saetzen, die inzwischen geaendert wurden.

    node tools/extract-phrases.mjs   # zuerst! phrases.json aktualisieren
    python tools/prune_audio.py --dry-run
    python tools/prune_audio.py
"""
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "audio" / "de"

dry = "--dry-run" in sys.argv

data = json.loads((ROOT / "tools" / "phrases.json").read_text(encoding="utf-8"))
keep = {p["hash"] for p in data["phrases"]}

stale = [f for f in OUT.glob("*.mp3") if f.stem not in keep]
freed = sum(f.stat().st_size for f in stale)

for f in stale:
    print(("[dry-run] " if dry else "loesche  ") + f.name)
    if not dry:
        f.unlink()

print(f"{len(stale)} verwaiste Clips ({freed/1024:.0f} KB), {len(keep)} bleiben.")

if stale and not dry:
    manifest = OUT / "manifest.json"
    if manifest.exists():
        m = json.loads(manifest.read_text(encoding="utf-8"))
        m["files"] = {h: v for h, v in m["files"].items() if h in keep}
        manifest.write_text(
            json.dumps(m, ensure_ascii=False, indent=1), encoding="utf-8"
        )
        print(f"Manifest aktualisiert: {len(m['files'])} Clips.")
