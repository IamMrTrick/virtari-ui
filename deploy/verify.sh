#!/usr/bin/env bash
set -Eeuo pipefail

DOMAIN="${DOMAIN:-virtari.iamilya.com}"
URL="${URL:-https://$DOMAIN}"
WEB_ROOT="${WEB_ROOT:-/var/www/sites/$DOMAIN}"

echo "Checking local static release..."
if [ -d "$WEB_ROOT" ]; then
  test -L "$WEB_ROOT/current"
  test -f "$WEB_ROOT/current/index.html"
fi

echo "Checking HTTPS headers..."
curl -fsSI "$URL/" >/dev/null

echo "Checking docs shell..."
curl -fsS "$URL/" | grep -qi '<div id="root">'

echo "OK: $URL is serving the Virtari docs frontend."
