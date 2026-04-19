#!/usr/bin/env python3
"""
Rename the npm scope across the whole monorepo.

Rewrites `@OLD/` and `@OLD:` to `@NEW/` and `@NEW:` in every text file,
excluding node_modules, dist, .git, and .changeset. Updates package.json
names, CSS/TS imports, workflow scope fields, README/CONTRIBUTING docs,
and helper scripts in one pass.

Usage:
    python scripts/rename-scope.py <old_scope> <new_scope>

Example:
    python scripts/rename-scope.py virtari virtari-packages
    python scripts/rename-scope.py virtari-packages virtari

Lowercased automatically — npm scopes are lowercase.
After running, execute `pnpm install` to refresh workspace links.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

TEXT_EXTENSIONS = {
    ".cjs",
    ".css",
    ".js",
    ".json",
    ".md",
    ".mjs",
    ".ts",
    ".tsx",
    ".yaml",
    ".yml",
}

SKIP_DIRS = {"node_modules", ".git", ".changeset", "dist"}


def iter_text_files(root: Path):
    """Yield every text file under `root` that we allow rewriting."""
    for path in root.rglob("*"):
        if not path.is_file():
            continue
        # Reject anything inside a skipped directory.
        if any(part in SKIP_DIRS for part in path.relative_to(root).parts):
            continue
        if path.suffix.lower() not in TEXT_EXTENSIONS:
            continue
        yield path


def rewrite(path: Path, old: str, new: str) -> bool:
    """Rewrite file in place. Returns True if the file changed."""
    needles = (f"@{old}/", f"@{old}:")
    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        return False
    if not any(needle in text for needle in needles):
        return False

    updated = text.replace(f"@{old}/", f"@{new}/").replace(f"@{old}:", f"@{new}:")
    if updated == text:
        return False

    path.write_text(updated, encoding="utf-8", newline="\n")
    return True


def main() -> int:
    parser = argparse.ArgumentParser(description="Rename the npm scope across the monorepo.")
    parser.add_argument("old", help="Current scope, without @ (e.g. 'virtari').")
    parser.add_argument("new", help="Target scope, without @ (e.g. 'virtari-packages').")
    parser.add_argument(
        "--root",
        type=Path,
        default=ROOT,
        help="Repository root (defaults to the parent of this script).",
    )
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without writing.")
    args = parser.parse_args()

    old = args.old.lstrip("@").lower()
    new = args.new.lstrip("@").lower()

    if old == new:
        print(f"Scopes match ({old}); nothing to do.")
        return 0

    root = args.root.resolve()
    print(f"[rename] @{old}  -&gt;  @{new}")
    print(f"[rename] root:     {root}")
    if args.dry_run:
        print("[rename] dry-run — no files will be written.")

    changed = 0
    scanned = 0
    for path in iter_text_files(root):
        scanned += 1
        if args.dry_run:
            text = path.read_text(encoding="utf-8", errors="ignore")
            if f"@{old}/" in text or f"@{old}:" in text:
                changed += 1
                print(f"  would update: {path.relative_to(root)}")
            continue
        if rewrite(path, old, new):
            changed += 1

    print()
    print(f"[rename] scanned {scanned} files, {'would update' if args.dry_run else 'updated'} {changed}.")
    if not args.dry_run and changed:
        print("[rename] next step:  pnpm install   # refresh workspace symlinks")
    return 0


if __name__ == "__main__":
    sys.exit(main())
