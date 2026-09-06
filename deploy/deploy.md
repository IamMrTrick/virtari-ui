# Virtari Docs Deployment on ZeroHero

This is the active runbook for deploying the Virtari design-system docs as a
plain static frontend.

```text
Server: 65.109.218.236
SSH alias: taskmanager
Repository checkout: /opt/virtari-design-system
Static web root: /var/www/sites/virtari.iamilya.com/current
Release directory: /var/www/sites/virtari.iamilya.com/releases
Public domain: virtari.iamilya.com
```

No Docker or Compose stack is needed for this app. The server builds
`apps/docs`, publishes the generated Vite files, and Nginx serves the static
output directly.

## Git-Tracked Deployment Files

| Path | Purpose |
|---|---|
| `deploy/deploy.md` | This runbook. |
| `deploy/update.sh` | Server-side docs deploy script. |
| `deploy/verify.sh` | HTTPS and static asset smoke checks. |
| `deploy/nginx/virtari.iamilya.com.conf` | Final HTTPS Nginx server block. |
| `deploy/nginx/virtari.iamilya.com.bootstrap.conf` | Temporary HTTP-only Nginx block for first certificate issue. |

Never commit `.env*`, GitHub tokens, npm tokens, SSH keys, certs, ACME data, or
server logs.

## Live Domain

| Domain | Service | Status |
|---|---|---|
| `virtari.iamilya.com` | Virtari docs frontend | Points to the latest static docs build |

DNS must point at the ZeroHero server:

```text
virtari.iamilya.com A 65.109.218.236
```

## Server Layout

### `/opt/virtari-design-system`

This is the Git checkout used for builds:

```text
package.json
pnpm-lock.yaml
pnpm-workspace.yaml
apps/docs/
packages/
deploy/
```

The docs app is a Vite React app. The production build output is:

```text
/opt/virtari-design-system/apps/docs/dist
```

### `/var/www/sites/virtari.iamilya.com`

This directory stores immutable static releases:

```text
current -> /var/www/sites/virtari.iamilya.com/releases/<timestamp>-<git-sha>
releases/
```

Nginx serves only the `current` symlink.

## Required Secret Files

If the server needs private GitHub access for cloning, pulling, or installing
packages, keep the token outside Git:

```text
/root/.config/virtari/github.env
```

The file should be root-only (`0600`) and may export:

```text
GITHUB_TOKEN
GH_TOKEN
NODE_AUTH_TOKEN
```

Load it only in the shell that needs private Git/GitHub package access:

```bash
set -a
. /root/.config/virtari/github.env
set +a
```

Do not put tokens in `.env`, `.npmrc`, Markdown, or Git remote URLs.

## First-Time Server Setup

Install the host dependencies:

```bash
ssh taskmanager

apt-get update
apt-get install -y nginx certbot python3-certbot-nginx git curl ca-certificates
corepack enable
```

Clone the repository:

```bash
git clone https://github.com/IamMrTrick/virtari-ui.git /opt/virtari-design-system
cd /opt/virtari-design-system
```

Create the web root and install the temporary HTTP config:

```bash
mkdir -p /var/www/sites/virtari.iamilya.com/releases /var/www/certbot
cp deploy/nginx/virtari.iamilya.com.bootstrap.conf /etc/nginx/sites-available/virtari.iamilya.com
ln -sfn /etc/nginx/sites-available/virtari.iamilya.com /etc/nginx/sites-enabled/virtari.iamilya.com
nginx -t
systemctl reload nginx
```

Issue the certificate:

```bash
certbot certonly --webroot \
  -w /var/www/certbot \
  -d virtari.iamilya.com
```

Install the final HTTPS config:

```bash
cp deploy/nginx/virtari.iamilya.com.conf /etc/nginx/sites-available/virtari.iamilya.com
nginx -t
systemctl reload nginx
```

## Production Deploy

The normal manual deploy is:

```bash
ssh taskmanager
cd /opt/virtari-design-system
set -a
[ -f /root/.config/virtari/github.env ] && . /root/.config/virtari/github.env
set +a
bash deploy/update.sh
```

`deploy/update.sh` does:

1. Fetch and fast-forward `origin/main`.
2. Enable Corepack and install with `pnpm install --frozen-lockfile`.
3. Build the package workspace and the docs app through `@virtari-packages/docs`.
4. Copy `apps/docs/dist` to a new timestamped release directory.
5. Atomically move `current` to the new release.
6. Keep the newest five releases and remove older releases.
7. Run a local static-file smoke check.

Equivalent manual commands:

```bash
cd /opt/virtari-design-system

git fetch origin main
git checkout main
git pull --ff-only origin main

corepack enable
pnpm install --frozen-lockfile
pnpm --filter @virtari-packages/docs run build

release="/var/www/sites/virtari.iamilya.com/releases/$(date +%Y%m%d%H%M%S)-$(git rev-parse --short HEAD)"
mkdir -p "$release"
cp -a apps/docs/dist/. "$release"/
ln -sfn "$release" /var/www/sites/virtari.iamilya.com/current
```

Nginx does not need to reload after a normal deploy because it serves the
`current` symlink.

## Updating Nginx Config

Edit the tracked files under:

```text
deploy/nginx/
```

Apply the final config to the server:

```bash
cp /opt/virtari-design-system/deploy/nginx/virtari.iamilya.com.conf \
  /etc/nginx/sites-available/virtari.iamilya.com

nginx -t
systemctl reload nginx
```

Certificate renewal is handled by Certbot's system timer. Check it with:

```bash
systemctl list-timers | grep certbot
certbot renew --dry-run
```

## Verify

Production:

```bash
bash deploy/verify.sh
```

Useful direct checks:

```bash
curl -fsSI https://virtari.iamilya.com/
curl -fsS https://virtari.iamilya.com/ | grep -i '<div id="root">'
```

Local server file check:

```bash
test -f /var/www/sites/virtari.iamilya.com/current/index.html
```

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Domain does not resolve | DNS A record missing or stale | Set `virtari.iamilya.com A 65.109.218.236` and wait for DNS propagation |
| HTTPS certificate issue fails | DNS is not pointing to the server or port 80 is blocked | Fix DNS/firewall, then rerun `certbot certonly --webroot ...` |
| Nginx returns 403 | `current` symlink or release permissions are wrong | Ensure `/var/www/sites/virtari.iamilya.com/current/index.html` exists and is readable by Nginx |
| Refreshing a docs route returns 404 | SPA fallback is missing | Keep `try_files $uri $uri/ /index.html;` in the Nginx config |
| Deploy builds old code | Git checkout is not on `main` or pull failed | Run `git status`, then rerun `bash deploy/update.sh` |
| `pnpm install` cannot fetch private packages | GitHub package token is not loaded | Source `/root/.config/virtari/github.env` before deploy |

## Open Items

1. Confirm `virtari.iamilya.com` DNS points to `65.109.218.236`.
2. Run the first deploy and certificate issue on the server.
3. Add a cron or CI trigger later if manual deploys become repetitive.
