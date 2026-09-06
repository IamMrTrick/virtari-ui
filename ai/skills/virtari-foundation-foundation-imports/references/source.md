## packages/tokens/package.json

```tsx
{
  "name": "@virtari-packages/tokens",
  "version": "0.6.0",
  "description": "Design tokens (colors, spacing, typography, radii, shadows, motion) as CSS variables.",
  "license": "MIT",
  "author": "Virtari",
  "homepage": "https://github.com/itstheilya/virtari-ui/tree/main/packages/tokens#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/itstheilya/virtari-ui.git",
    "directory": "packages/tokens"
  },
  "bugs": {
    "url": "https://github.com/itstheilya/virtari-ui/issues"
  },
  "keywords": [
    "virtari",
    "design-system",
    "react",
    "ui",
    "components",
    "tokens",
    "packages/tokens"
  ],
  "type": "module",
  "exports": {
    ".": "./dist/tokens.css",
    "./colors": "./src/colors.css",
    "./colors/primitives": "./src/colors/primitives.css",
    "./colors/primitives/neutral": "./src/colors/primitives/neutral.css",
    "./colors/primitives/intents": "./src/colors/primitives/intents.css",
    "./colors/primitives/alphas": "./src/colors/primitives/alphas.css",
    "./colors/semantic": "./src/colors/semantic.css",
    "./colors/semantic/background": "./src/colors/semantic/background.css",
    "./colors/semantic/text": "./src/colors/semantic/text.css",
    "./colors/semantic/icon": "./src/colors/semantic/icon.css",
    "./colors/semantic/border": "./src/colors/semantic/border.css",
    "./colors/semantic/interactive": "./src/colors/semantic/interactive.css",
    "./colors/semantic/status": "./src/colors/semantic/status.css",
    "./colors/semantic/data-viz": "./src/colors/semantic/data-viz.css",
    "./colors/aliases": "./src/colors/aliases.css",
    "./brands": "./src/brands/index.css",
    "./brands/virtari": "./src/brands/virtari.css",
    "./spacing": "./src/spacing.css",
    "./spacing/semantic": "./src/spacing/semantic.css",
    "./sizing": "./src/sizing.css",
    "./typography": "./src/typography.css",
    "./radii": "./src/radii.css",
    "./radii/primitives": "./src/radii/primitives.css",
    "./radii/modes": "./src/radii/modes.css",
    "./radii/components": "./src/radii/components.css",
    "./radii/nesting": "./src/radii/nesting.css",
    "./shadows": "./src/shadows.css",
    "./motion": "./src/motion.css",
    "./layout": "./src/layout.css",
    "./layout/primitives": "./src/layout/primitives.css",
    "./layout/semantic": "./src/layout/semantic.css",
    "./layout/components": "./src/layout/components.css",
    "./opacity": "./src/opacity.css",
    "./transition": "./src/transition.css",
    "./filter": "./src/filter.css",
    "./gradient": "./src/gradient.css"
  },
  "files": [
    "dist",
    "src",
    "README.md",
    "LICENSE"
  ],
  "publishConfig": {
    "access": "restricted",
    "registry": "https://npm.pkg.github.com"
  },
  "scripts": {
    "build": "postcss src/index.css -o dist/tokens.css",
    "clean": "rm -rf dist"
  }
}

```

## packages/tokens/src/index.css

```css
@import "./fonts.css";
@import "./colors.css";
@import "./spacing.css";
@import "./sizing.css";
@import "./typography.css";
@import "./radii.css";
@import "./shadows.css";
@import "./motion.css";
@import "./transition.css";
@import "./z-index.css";
@import "./breakpoints.css";
@import "./layout.css";
@import "./opacity.css";
@import "./filter.css";
@import "./gradient.css";
@import "./design-language.css";
@import "./surface-styles.css";

```

## packages/core/package.json

```tsx
{
  "name": "@virtari-packages/core",
  "version": "0.3.5",
  "description": "Base reset, layers, and global primitives for the Virtari design system.",
  "license": "MIT",
  "author": "Virtari",
  "homepage": "https://github.com/itstheilya/virtari-ui/tree/main/packages/core#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/itstheilya/virtari-ui.git",
    "directory": "packages/core"
  },
  "bugs": {
    "url": "https://github.com/itstheilya/virtari-ui/issues"
  },
  "keywords": [
    "virtari",
    "design-system",
    "react",
    "ui",
    "components",
    "core",
    "packages/core"
  ],
  "type": "module",
  "exports": {
    ".": "./dist/core.css"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "publishConfig": {
    "access": "restricted",
    "registry": "https://npm.pkg.github.com"
  },
  "scripts": {
    "build": "postcss src/index.css -o dist/core.css",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@virtari-packages/tokens": "workspace:*"
  }
}

```

## packages/core/src/index.css

```css
@import "./layers.css";
@import "./reset.css";
@import "./base.css";
@import "./utilities.css";

```

## packages/core/src/layers.css

```css
@layer reset, tokens, base, components, design-system, utilities;

```

## packages/utilities/package.json

```tsx
{
  "name": "@virtari-packages/utilities",
  "version": "5.0.0",
  "description": "Utility CSS classes (spacing, sizing, layout, z-index) driven by Virtari tokens.",
  "license": "MIT",
  "author": "Virtari",
  "homepage": "https://github.com/itstheilya/virtari-ui/tree/main/packages/utilities#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/itstheilya/virtari-ui.git",
    "directory": "packages/utilities"
  },
  "bugs": {
    "url": "https://github.com/itstheilya/virtari-ui/issues"
  },
  "keywords": [
    "virtari",
    "design-system",
    "react",
    "ui",
    "components",
    "utilities",
    "packages/utilities"
  ],
  "type": "module",
  "sideEffects": [
    "*.css"
  ],
  "exports": {
    ".": "./dist/utilities.css"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "publishConfig": {
    "access": "restricted",
    "registry": "https://npm.pkg.github.com"
  },
  "scripts": {
    "build": "node scripts/generate.mjs && postcss dist/_expanded.css -o dist/utilities.css && node -e \"require('node:fs').rmSync('dist/_expanded.css', { force: true })\"",
    "clean": "rm -rf dist"
  },
  "peerDependencies": {
    "@virtari-packages/tokens": "workspace:*"
  }
}

```

## packages/react-layout/package.json

```tsx
{
  "name": "@virtari-packages/react-layout",
  "version": "0.3.1",
  "description": "Virtari layout — accessible React component built on CSS variables and logical properties.",
  "license": "MIT",
  "author": "Virtari",
  "homepage": "https://github.com/itstheilya/virtari-ui/tree/main/packages/react-layout#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/itstheilya/virtari-ui.git",
    "directory": "packages/react-layout"
  },
  "bugs": {
    "url": "https://github.com/itstheilya/virtari-ui/issues"
  },
  "keywords": [
    "virtari",
    "design-system",
    "react",
    "ui",
    "components",
    "layout"
  ],
  "type": "module",
  "sideEffects": [
    "*.css"
  ],
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    },
    "./styles": "./dist/index.css"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "publishConfig": {
    "access": "restricted",
    "registry": "https://npm.pkg.github.com"
  },
  "scripts": {
    "build": "tsup && postcss src/index.css -o dist/index.css",
    "clean": "rm -rf dist",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@virtari-packages/utils": "workspace:*"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "react": "^19.2.5",
    "@types/react": "^19.2.14",
    "typescript": "^5.5.0",
    "tsup": "^8.0.0"
  }
}

```