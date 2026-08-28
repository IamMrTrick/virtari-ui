#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/virtari-design-system}"
BRANCH="${BRANCH:-main}"
DOMAIN="${DOMAIN:-virtari.iamilya.com}"
WEB_ROOT="${WEB_ROOT:-/var/www/sites/$DOMAIN}"
RELEASES_DIR="${RELEASES_DIR:-$WEB_ROOT/releases}"
CURRENT_LINK="${CURRENT_LINK:-$WEB_ROOT/current}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"

cd "$APP_DIR"

if [ -f /root/.config/virtari/github.env ]; then
  set -a
  # shellcheck disable=SC1091
  . /root/.config/virtari/github.env
  set +a
fi

git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

if command -v corepack >/dev/null 2>&1; then
  corepack enable
fi

pnpm install --frozen-lockfile
pnpm --filter @virtari-packages/docs run build

if [ ! -f apps/docs/dist/index.html ]; then
  echo "Build failed: apps/docs/dist/index.html was not created." >&2
  exit 1
fi

short_sha="$(git rev-parse --short HEAD)"
timestamp="$(date +%Y%m%d%H%M%S)"
release_dir="$RELEASES_DIR/$timestamp-$short_sha"

mkdir -p "$release_dir"
cp -a apps/docs/dist/. "$release_dir"/
ln -sfn "$release_dir" "$CURRENT_LINK"

find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d \
  | sort -r \
  | tail -n +"$((KEEP_RELEASES + 1))" \
  | xargs -r rm -rf

test -f "$CURRENT_LINK/index.html"

echo "Deployed $DOMAIN docs"
echo "Release: $release_dir"
echo "Git SHA: $(git rev-parse HEAD)"
