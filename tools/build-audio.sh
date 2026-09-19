#!/usr/bin/env bash
# Audio-Pipeline: alle Sprechtexte extrahieren und als Neural-TTS-MP3s erzeugen.
# Voraussetzungen: node, python + "pip install edge-tts"
set -e
cd "$(dirname "$0")/.."
node tools/extract-phrases.mjs
python tools/synthesize_audio.py
echo "Fertig. Clips liegen in assets/audio/de/ - committen nicht vergessen!"
