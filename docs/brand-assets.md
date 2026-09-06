# Virtari documentation identity

The user supplied the assets from the VirtariPlatform application. The original source files were `src/components/branding/Logo.tsx`, `src/components/loaders/VirtariLogoLoader.tsx`, `src/components/loaders/virtari-logo-loader.css`, and its `public` icon assets.

The documentation keeps the original vector paths and two-part loading animation. `apps/docs/src/components/branding` contains the React components. `apps/docs/public/brand` contains downloadable vector marks; the original favicon, touch icons, PNG app icons and symbol sprite are in `apps/docs/public`. Only the manifest's application name, description and start URL are changed for this application.

The header uses the full wordmark and switches to the symbol on narrow screens. Its home link supplies the accessible name. Logo color inherits from the hosting surface.

The initial HTML includes a minimal loader before React starts; React replaces it without an artificial delay. The Brand page uses the same loader with an explicit play/pause preview. Reduced motion displays the static mark. Loader CSS is a single public stylesheet shared by both render paths.
