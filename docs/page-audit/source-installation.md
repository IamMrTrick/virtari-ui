# Source installation page audit

Reviewed the installation page, the public CLI workflow, the generated source registry, and a clean Next.js App Router application.

## Findings and changes

- The scope chooser wrapped every short command in a padded Card, creating an unnecessary second surface around CodeBlock. It now uses a responsive two-column list with a compact Badge and the package CodeBlock directly.
- Repeated scope markup now comes from one data list so command labels and examples stay synchronized.
- The page now documents Next.js App Router setup, the one-time root stylesheet import, local component imports, and the Client Component boundary required by interactive controls.
- The breakpoint source used `@custom-media`, which made Next.js Turbopack emit five production-build warnings. Breakpoints are now ordinary CSS token values; responsive utilities continue to emit concrete media queries.
- Copied primitive and utility helpers were made compatible with the React 19 ESLint rules used by a new Next.js application.

## Validation

- Created a clean Next.js 16.3.4 and React 19.2.8 application in `T:\new-personal-trick`.
- Installed Button, Badge, Card, Input, their transitive source dependencies, and the shared Virtari styles through the CLI registry workflow.
- Built a responsive landing page that imports only local files from `src/virtari`.
- The Next.js production build and ESLint pass without warnings or errors.
- The running page was browser-inspected at `http://127.0.0.1:3000/`.
