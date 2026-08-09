#!/usr/bin/env bash
set -uo pipefail
BASE="http://localhost:4173"
declare -A PAGES=(
  [index]="/"
  [solutions]="/solutions"
  [core-banking]="/solutions/core-banking"
  [fahim-ai]="/solutions/fahim-ai"
  [mbuke]="/solutions/mbuke"
  [managed-services]="/solutions/managed-services"
  [banking-systems]="/solutions/banking-systems"
  [software-management-systems]="/solutions/software-management-systems"
  [about-us]="/about"
  [connect]="/connect"
  [blog]="/blog"
  [blog-article]="/blog/rise-of-fintech-uae"
  [unleashing-financial-innovation]="/blog/open-banking-uae-ksa"
  [careers]="/careers"
  [terms]="/terms"
)
declare -A VIEWPORTS=(
  [1440]="1440,900"
  [768]="768,1024"
  [360]="360,800"
)

FAIL=0
for page in "${!PAGES[@]}"; do
  path="${PAGES[$page]}"
  for vp in "${!VIEWPORTS[@]}"; do
    size="${VIEWPORTS[$vp]}"
    out="screenshots/${page}/${vp}.png"
    echo "Capturing ${page} @ ${vp}px -> ${out}"
    npx --no-install playwright screenshot \
      --viewport-size="${size}" \
      --full-page \
      --wait-for-timeout=1200 \
      "${BASE}${path}" "${out}" >/tmp/pw_${page}_${vp}.log 2>&1
    if [ $? -ne 0 ] || [ ! -s "${out}" ]; then
      echo "  FAILED: ${page} @ ${vp}"
      cat /tmp/pw_${page}_${vp}.log
      FAIL=1
    fi
  done
done
exit $FAIL
