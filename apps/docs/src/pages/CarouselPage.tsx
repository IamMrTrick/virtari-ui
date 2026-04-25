import { useRef, useState, type CSSProperties } from "react";
import {
  Carousel,
  CarouselSlide,
  type CarouselColor,
  type CarouselVariant,
  type CarouselSize,
  type CarouselRef,
  type CarouselInstance,
} from "@virtari-packages/react-carousel";
import { Section, Row } from "../components";

/* ----------------------------------------------------------------------- */
/* Pretty placeholder slides — built from DS surface tokens, no images so   */
/* the demo loads instantly. Swap with <img> in production.                 */
/* ----------------------------------------------------------------------- */

const slideBase: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  blockSize: "16rem",
  borderRadius: "var(--vds-radius-card)",
  background:
    "linear-gradient(135deg, var(--vds-color-primary-bg), var(--vds-color-accent-bg, var(--vds-color-primary-bg-subtle)))",
  color: "var(--vds-color-primary-text)",
  fontWeight: 600,
  fontSize: "var(--vds-text-3xl)",
  letterSpacing: "var(--vds-tracking-tight)",
  userSelect: "none",
};

function PrettySlide({ children, hue }: { children: React.ReactNode; hue?: string }) {
  return (
    <div
      style={{
        ...slideBase,
        background: hue
          ? `linear-gradient(135deg, var(--vds-color-${hue}-bg), var(--vds-color-${hue}-bg-subtle, var(--vds-color-${hue}-bg)))`
          : slideBase.background,
        color: hue ? `var(--vds-color-${hue}-text)` : slideBase.color,
      }}
    >
      {children}
    </div>
  );
}

function SlideCard({
  index,
  total,
  blockSize = "12rem",
}: {
  index: number;
  total: number;
  blockSize?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-2)",
        padding: "var(--vds-space-4)",
        blockSize,
        borderRadius: "var(--vds-radius-card)",
        background: "var(--vds-color-surface-raised, var(--vds-color-surface))",
        border: "1px solid var(--vds-color-border)",
        boxShadow: "var(--vds-shadow-sm)",
      }}
    >
      <span
        style={{
          fontSize: "var(--vds-text-xs)",
          textTransform: "uppercase",
          letterSpacing: "var(--vds-tracking-wide)",
          color: "var(--vds-color-text-muted)",
        }}
      >
        Slide {index} of {total}
      </span>
      <strong style={{ fontSize: "var(--vds-text-lg)", color: "var(--vds-color-text)" }}>
        Item #{index}
      </strong>
      <p style={{ margin: 0, color: "var(--vds-color-text-muted)", fontSize: "var(--vds-text-sm)" }}>
        Token-driven surface, fully RTL-safe.
      </p>
    </div>
  );
}

const COLORS: CarouselColor[] = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "accent",
  "neutral",
];
const VARIANTS: CarouselVariant[] = ["default", "inside", "outside", "minimal", "solid"];
const SIZES: CarouselSize[] = ["xs", "sm", "md", "lg"];

/* ----------------------------------------------------------------------- */
/* Page                                                                    */
/* ----------------------------------------------------------------------- */

export function CarouselPage() {
  const [color, setColor] = useState<CarouselColor>("primary");
  const [variant, setVariant] = useState<CarouselVariant>("default");
  const [size, setSize] = useState<CarouselSize>("md");

  const [thumbsSwiper, setThumbsSwiper] = useState<CarouselInstance | null>(null);
  const autoplayRef = useRef<CarouselRef>(null);

  return (
    <>
      {/* ───────────────── Playground ───────────────── */}
      <Section
        title="Playground"
        description="Pick a color, variant, and size — every property below is composable and orthogonal. The arrows are <Button> from @virtari-packages/react-button with chevron icons from @virtari-packages/react-icons."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)" }}>
          <Row>
            <strong style={{ fontSize: "var(--vds-text-sm)" }}>Color:</strong>
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                aria-pressed={color === c}
                style={chipStyle(color === c)}
              >
                {c}
              </button>
            ))}
          </Row>
          <Row>
            <strong style={{ fontSize: "var(--vds-text-sm)" }}>Variant:</strong>
            {VARIANTS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
                aria-pressed={variant === v}
                style={chipStyle(variant === v)}
              >
                {v}
              </button>
            ))}
          </Row>
          <Row>
            <strong style={{ fontSize: "var(--vds-text-sm)" }}>Size:</strong>
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                style={chipStyle(size === s)}
              >
                {s}
              </button>
            ))}
          </Row>
        </div>

        <Carousel
          color={color}
          variant={variant}
          size={size}
          navigation
          pagination
          loop
          slidesPerView={1}
          spaceBetween={16}
          aria-label="Playground carousel"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <CarouselSlide key={i}>
              <PrettySlide>Slide {i}</PrettySlide>
            </CarouselSlide>
          ))}
        </Carousel>
      </Section>

      {/* ───────────────── Multi-slide responsive ───────────────── */}
      <Section
        title="Multiple slides per view"
        description="Set slidesPerView and breakpoints to build a card carousel. Mobile shows 1, tablet 2, desktop 3."
      >
        <Carousel
          navigation
          pagination
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          aria-label="Featured products"
        >
          {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => (
            <CarouselSlide key={i}>
              <SlideCard index={i} total={9} />
            </CarouselSlide>
          ))}
        </Carousel>
      </Section>

      {/* ───────────────── Autoplay + progressbar ───────────────── */}
      <Section
        title="Autoplay with progress bar"
        description="Pass autoplay options directly. Progressbar pagination + pauseOnMouseEnter for accessibility. Use the imperative ref to start/stop autoplay."
      >
        <Carousel
          ref={autoplayRef}
          color="accent"
          variant="solid"
          navigation
          pagination={{ type: "progressbar" }}
          autoplay={{ delay: 3500, pauseOnMouseEnter: true, disableOnInteraction: false }}
          loop
          effect="fade"
          aria-label="Auto-rotating hero"
        >
          {["primary", "success", "info", "danger"].map((hue, i) => (
            <CarouselSlide key={hue}>
              <PrettySlide hue={hue}>{["Welcome", "Discover", "Connect", "Ship"][i]}</PrettySlide>
            </CarouselSlide>
          ))}
        </Carousel>
        <Row>
          <button
            type="button"
            style={chipStyle(false)}
            onClick={() => autoplayRef.current?.swiper.autoplay.stop()}
          >
            Pause autoplay
          </button>
          <button
            type="button"
            style={chipStyle(false)}
            onClick={() => autoplayRef.current?.swiper.autoplay.start()}
          >
            Resume autoplay
          </button>
        </Row>
      </Section>

      {/* ───────────────── Pagination styles ───────────────── */}
      <Section
        title="Pagination styles"
        description="bullets · bars · fraction · progressbar — switch type via the pagination prop."
      >
        <div style={{ display: "grid", gap: "var(--vds-space-5)" }}>
          <Carousel navigation pagination={{ clickable: true }} loop slidesPerView={1} spaceBetween={16}>
            {[1, 2, 3, 4].map((i) => (
              <CarouselSlide key={i}>
                <PrettySlide hue="info">Bullets · {i}</PrettySlide>
              </CarouselSlide>
            ))}
          </Carousel>

          <Carousel
            color="success"
            navigation
            pagination={{ clickable: true }}
            paginationLook="bars"
            loop
            slidesPerView={1}
          >
            {[1, 2, 3, 4].map((i) => (
              <CarouselSlide key={i}>
                <PrettySlide hue="success">Bars · {i}</PrettySlide>
              </CarouselSlide>
            ))}
          </Carousel>

          <Carousel
            color="warning"
            navigation
            pagination={{ type: "fraction" }}
            loop
            slidesPerView={1}
          >
            {[1, 2, 3, 4].map((i) => (
              <CarouselSlide key={i}>
                <PrettySlide hue="warning">Fraction · {i}</PrettySlide>
              </CarouselSlide>
            ))}
          </Carousel>

          <Carousel
            color="danger"
            navigation
            pagination={{ type: "progressbar" }}
            loop
            slidesPerView={1}
          >
            {[1, 2, 3, 4].map((i) => (
              <CarouselSlide key={i}>
                <PrettySlide hue="danger">Progressbar · {i}</PrettySlide>
              </CarouselSlide>
            ))}
          </Carousel>
        </div>
      </Section>

      {/* ───────────────── Effects (fade) ───────────────── */}
      <Section
        title="Fade effect"
        description="effect='fade' cross-fades between slides. Heavier 3D effects (cube, coverflow, cards, flip) require swiper's bundled effect CSS — see the package README."
      >
        <Carousel
          color="info"
          variant="minimal"
          effect="fade"
          navigation
          pagination
          loop
          slidesPerView={1}
        >
          {["primary", "info", "accent", "success"].map((hue) => (
            <CarouselSlide key={hue}>
              <PrettySlide hue={hue}>{hue.toUpperCase()}</PrettySlide>
            </CarouselSlide>
          ))}
        </Carousel>
      </Section>

      {/* ───────────────── Vertical orientation ───────────────── */}
      <Section
        title="Vertical orientation"
        description="orientation='vertical' swings the track on the block axis. Wrap in a fixed-height container — the Carousel fills it."
      >
        <div style={{ blockSize: "24rem", maxInlineSize: "32rem" }}>
          <Carousel
            color="neutral"
            orientation="vertical"
            navigation
            pagination
            loop
            slidesPerView={1}
            spaceBetween={16}
            mousewheel
          >
            {[1, 2, 3, 4].map((i) => (
              <CarouselSlide key={i}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    blockSize: "100%",
                    inlineSize: "100%",
                    borderRadius: "var(--vds-radius-card)",
                    background:
                      "linear-gradient(135deg, var(--vds-color-info-bg), var(--vds-color-primary-bg))",
                    color: "var(--vds-color-text)",
                    fontWeight: 600,
                    fontSize: "var(--vds-text-2xl)",
                  }}
                >
                  Vertical {i}
                </div>
              </CarouselSlide>
            ))}
          </Carousel>
        </div>
      </Section>

      {/* ───────────────── Outside variant ───────────────── */}
      <Section
        title="Outside nav variant"
        description="variant='outside' floats nav buttons in a gutter outside the track — perfect for product carousels where slides shouldn't overlap controls."
      >
        <Carousel
          color="primary"
          variant="outside"
          navigation
          pagination
          slidesPerView={1}
          spaceBetween={12}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
            <CarouselSlide key={i}>
              <SlideCard index={i} total={8} blockSize="10rem" />
            </CarouselSlide>
          ))}
        </Carousel>
      </Section>

      {/* ───────────────── Free mode (no snap) ───────────────── */}
      <Section
        title="Free mode (no snap)"
        description="freeMode lets users flick through multiple items at once without snapping to the next slide."
      >
        <Carousel
          color="accent"
          variant="minimal"
          navigation
          freeMode
          slidesPerView="auto"
          spaceBetween={12}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((i) => (
            <CarouselSlide key={i} style={{ inlineSize: "12rem" }}>
              <SlideCard index={i} total={12} blockSize="9rem" />
            </CarouselSlide>
          ))}
        </Carousel>
      </Section>

      {/* ───────────────── Thumbs gallery ───────────────── */}
      <Section
        title="Thumbs gallery"
        description="Pair two carousels: the second drives the first via the thumbs prop. Click a thumb to jump."
      >
        <div style={{ display: "grid", gap: "var(--vds-space-3)" }}>
          <Carousel
            color="primary"
            navigation
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            slidesPerView={1}
            loop
          >
            {["primary", "accent", "success", "info", "danger", "warning"].map((hue) => (
              <CarouselSlide key={hue}>
                <PrettySlide hue={hue}>{hue}</PrettySlide>
              </CarouselSlide>
            ))}
          </Carousel>

          <Carousel
            variant="minimal"
            size="sm"
            slidesPerView={4}
            spaceBetween={8}
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
            breakpoints={{ 640: { slidesPerView: 6 } }}
          >
            {["primary", "accent", "success", "info", "danger", "warning"].map((hue) => (
              <CarouselSlide
                key={hue}
                style={{
                  cursor: "pointer",
                  blockSize: "4rem",
                  borderRadius: "var(--vds-radius-md)",
                  background: `var(--vds-color-${hue}-bg)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: `var(--vds-color-${hue}-text)`,
                  fontWeight: 600,
                  textTransform: "capitalize",
                  fontSize: "var(--vds-text-sm)",
                }}
              >
                {hue}
              </CarouselSlide>
            ))}
          </Carousel>
        </div>
      </Section>

      {/* ───────────────── Variant matrix ───────────────── */}
      <Section
        title="All nav variants"
        description="default · inside · outside · minimal · solid — same content, five chrome treatments."
      >
        <div style={{ display: "grid", gap: "var(--vds-space-5)" }}>
          {VARIANTS.map((v) => (
            <div key={v}>
              <p
                style={{
                  margin: 0,
                  marginBlockEnd: "var(--vds-space-2)",
                  fontSize: "var(--vds-text-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--vds-tracking-wide)",
                  color: "var(--vds-color-text-muted)",
                }}
              >
                variant = {v}
              </p>
              <Carousel
                variant={v}
                navigation
                pagination
                loop
                slidesPerView={1}
                spaceBetween={16}
              >
                {[1, 2, 3].map((i) => (
                  <CarouselSlide key={i}>
                    <PrettySlide>{v} · {i}</PrettySlide>
                  </CarouselSlide>
                ))}
              </Carousel>
            </div>
          ))}
        </div>
      </Section>

      {/* ───────────────── Usage ───────────────── */}
      <Section title="Usage">
        <pre className="docs-code">{`import { Carousel, CarouselSlide } from "@virtari-packages/react-carousel";
import "@virtari-packages/react-carousel/styles";

<Carousel
  color="primary"        // primary | success | warning | danger | info | accent | neutral
  variant="default"      // default | inside | outside | minimal | solid
  size="md"              // xs | sm | md | lg
  shape="pill"           // pill | square
  navigation pagination loop
  autoplay={{ delay: 4000, pauseOnMouseEnter: true }}
  slidesPerView={1}
  spaceBetween={16}
  breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
>
  <CarouselSlide>...</CarouselSlide>
</Carousel>`}</pre>
      </Section>
    </>
  );
}

/* ----------------------------------------------------------------------- */

function chipStyle(active: boolean): CSSProperties {
  return {
    paddingInline: "var(--vds-space-3)",
    paddingBlock: "var(--vds-space-1-5)",
    fontSize: "var(--vds-text-sm)",
    borderRadius: "var(--vds-radius-full)",
    border: "1px solid var(--vds-color-border)",
    background: active ? "var(--vds-color-primary-solid)" : "var(--vds-color-surface)",
    color: active ? "var(--vds-color-on-primary)" : "var(--vds-color-text)",
    cursor: "pointer",
    textTransform: "capitalize",
  };
}
