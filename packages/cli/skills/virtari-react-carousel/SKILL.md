---
name: virtari-react-carousel
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-carousel. Swiper-backed carousel with Virtari navigation, pagination, effects and horizontal or vertical tracks."
---

# @virtari-packages/react-carousel

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-carousel`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose Carousel with CarouselSlide children. The ref is CarouselRef/SwiperRef: access the engine through ref.current.swiper or onSwiper, not a DOM-element ref.
- Import the package /styles entry; it includes Carousel.tokens.css and the minimal Swiper track CSS. Effect-specific Swiper CSS is still needed for effects such as fade, cube or coverflow. Import button styles for the navigation controls in applications that do not already load them globally.
- Use orientation='vertical' with a definite container block size. The wrapper fills its parent; an unconstrained height does not define a usable vertical viewport.
- Navigation is a boolean and defaults to false; enable it deliberately and use prevIcon/nextIcon plus localized prevLabel/nextLabel to customize its controls. Pagination accepts a boolean or Swiper PaginationOptions; paginationLook and paginationPosition only change its appearance.
- The wrapper selects Swiper modules from feature props. Use effect, autoplay, keyboard, mousewheel, freeMode, thumbs, grid, virtual and zoom rather than a modules prop, which is omitted from the public API.
- Use rtl for explicit direction and verify the inherited direction when composing in scoped RTL layouts. color affects navigation and pagination chrome; it does not recolor slide content. variant and shape are carousel-specific axes, not the Button variant API.

## Known limits and mistakes to avoid

- Reduced-motion CSS shortens transitions but does not stop the Swiper autoplay timer. Applications enabling autoplay must also provide pause behavior and respect the user's motion preference.
- The forwarded Swiper props are spread after the wrapper's onBeforeInit. Supplying onBeforeInit replaces the internal callback that binds navigation refs; preserve that wiring or avoid replacing it.
- The wrapper className is applied to its outer div while most other inherited Swiper attributes are forwarded to the inner Swiper. Do not assume the ref, className and style target the same element.
- Swiper integration is interactive browser behavior. Validate actual hydration, keyboard focus and effect CSS in the consuming framework; the package does not provide a separate SSR adapter.

Related package IDs: `react-button`, `react-icons`, `react-card`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
