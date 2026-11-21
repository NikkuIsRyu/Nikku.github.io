#!/usr/bin/env bash
# Convert the rendered progress samples (WAV, from render_progress_samples.py)
# into small MP3s for the Voice ML project page.
# Usage: scripts/voice-ml/import_progress_samples.sh [source_dir]
set -euo pipefail
SRC="${1:-$HOME/GoogleDrive/10 Projects/Voice ML/website_progress}"
DEST="$(cd "$(dirname "$0")/../.." && pwd)/public/audio/voice-ml"
mkdir -p "$DEST"
count=0
for wav in "$SRC"/[1-4]_*_*.wav; do
  name="$(basename "${wav%.wav}")"
  ffmpeg -loglevel error -y -i "$wav" -ac 1 -ar 32000 -af loudnorm=I=-18:TP=-1.5 -codec:a libmp3lame -b:a 80k "$DEST/$name.mp3"
  count=$((count + 1))
done
echo "Converted $count files into $DEST"
