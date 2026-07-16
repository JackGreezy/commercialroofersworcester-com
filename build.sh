#!/usr/bin/env bash
set -euo pipefail

ROOT=/Users/jackgreenberg/Desktop/rank-and-rent
S=$ROOT/David/clones/scripts
PROJ=$ROOT/commercial-roofing/commercialroofersworcester-com
REFHOST=miron-construction-com
VOICE=$S/voice/commercial-roofing.json
CAP=$ROOT/David/clones/_captures/$REFHOST-v1
MAP=$S/relabel-map-$REFHOST.json
PAGES="home=https://miron-construction.com/,about=https://miron-construction.com/our-company/,contact=https://miron-construction.com/contact-us/,index=https://miron-construction.com/our-experience/commercial/,slug=https://miron-construction.com/project/ho-chunk-casino-expansions/"

if [ ! -f "$CAP/public/home.html.ref" ]; then
  node "$S/faithful-home.mjs" --no-scripts --src "https://miron-construction.com/" --pages "$PAGES" --dir "$CAP"
fi

mkdir -p "$PROJ/public" "$PROJ/qa-out"
cp "$CAP"/public/*.html.ref "$PROJ/public/" 2>/dev/null || true
[ -d "$PROJ/public/assets-f" ] || cp -R "$CAP/public/assets-f" "$PROJ/public/"
cp "$CAP"/qa-out/ref-*.png "$PROJ/qa-out/" 2>/dev/null || true

python3 "$S/normalize_content.py" "$PROJ" --voice "$VOICE"
python3 - "$PROJ" <<'PY'
import shutil, sys, os
p = sys.argv[1]
src = os.path.join(p, 'public', 'images')
dst = os.path.join(p, 'public', 'ours')
if os.path.isdir(src):
    shutil.copytree(src, dst, dirs_exist_ok=True)
PY
python3 "$S/relabel_engine.py" --config "$PROJ/home.config.json" --map "$MAP" --voice "$VOICE"
python3 "$PROJ/scripts/normalize-contact-forms.py" "$PROJ"
python3 "$PROJ/scripts/hobo-seo-finalize.py" "$PROJ"
python3 "$S/verify_site.py" "$PROJ" --map "$MAP" --json "$PROJ/qa-out/verify.json"
node "$S/qa_shots.mjs" "$PROJ"

echo "BUILD COMPLETE — gates green. Human QA: open $PROJ/qa-out/contact-sheet.html"
