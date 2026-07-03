import { useCallback, useState } from "react";
import { ScrollArea } from "@virtari-packages/react-scroll-area";
import { Section } from "../components";

const frameStyle: React.CSSProperties = {
  borderRadius: "var(--vds-radius-card)",
  border: "1px solid var(--vds-color-border)",
  background: "var(--vds-color-surface)",
};

export function ScrollAreaPage() {
  return (
    <>
      <Section
        title="Vertical"
        description="Default vertical scroll with styled thumb. The thumb stays a rounded rectangle in every radius mode — it no longer turns into a circle when the site radius is set to pill."
      >
        <ScrollArea style={{ height: 220, width: 320, ...frameStyle }}>
          <ListItems count={30} />
        </ScrollArea>
      </Section>

      <Section
        title="Horizontal"
        description="Horizontal scroll with auto wheel-to-horizontal: regular vertical scroll-wheel gestures move content sideways. Hold Shift or use a trackpad side-gesture for native behaviour."
      >
        <ScrollArea orientation="horizontal" style={{ width: 480, ...frameStyle }}>
          <TileRow count={20} />
        </ScrollArea>
      </Section>

      <Section
        title="Drag to scroll"
        description="Click or touch-and-drag the content to scroll. Buttons inside still work — the drag only activates after ~6px of movement, and the trailing click is suppressed so accidental activations are avoided. The scrollbar is auto-hidden in drag mode."
      >
        <ScrollArea
          orientation="horizontal"
          drag
          style={{ width: 480, ...frameStyle }}
        >
          <TileRow count={20} interactive />
        </ScrollArea>
      </Section>

      <Section
        title="Edge mask"
        description="Multi-stop gradient (via color-mix) produces a soft ease at the edges instead of a hard cut. The fade only appears where content continues — scroll to one end and watch that side's fade disappear."
      >
        <ScrollArea
          orientation="horizontal"
          mask
          drag
          style={{ width: 480, ...frameStyle }}
        >
          <TileRow count={20} />
        </ScrollArea>
      </Section>

      <Section
        title="Arrows — outer (default)"
        description="Arrow controls sit on either side of the scroll area. They are disabled at each edge and scroll one page at a time by default."
      >
        <ScrollArea
          orientation="horizontal"
          arrows
          mask
          style={{ width: 560, ...frameStyle }}
        >
          <TileRow count={20} />
        </ScrollArea>
      </Section>

      <Section
        title="Arrows — inner"
        description="Arrows overlay the scroll area, anchored to its start and end edges. Great for gallery / carousel patterns where outer arrows would add too much horizontal footprint."
      >
        <ScrollArea
          orientation="horizontal"
          arrows
          arrowPlacement="inner"
          mask
          style={{ width: 480, ...frameStyle }}
        >
          <TileRow count={20} />
        </ScrollArea>
      </Section>

      <Section
        title="Arrows — appear on hover"
        description="Inner arrows that fade in only when the user hovers or focuses the scroll area. Perfect for image carousels and content-first layouts."
      >
        <ScrollArea
          orientation="horizontal"
          arrows
          arrowPlacement="inner"
          arrowAppearance="hover"
          mask
          style={{ width: 480, ...frameStyle }}
        >
          <TileRow count={20} />
        </ScrollArea>
      </Section>

      <Section
        title="Vertical + arrows + mask"
        description="Every feature works for vertical orientation too."
      >
        <ScrollArea
          orientation="vertical"
          arrows
          mask
          style={{ height: 260, width: 320, ...frameStyle }}
        >
          <ListItems count={30} />
        </ScrollArea>
      </Section>

      <Section
        title="Infinite scroll"
        description="onEndReached fires via IntersectionObserver as the user nears the end. No scroll-event polling, no per-frame work — the browser handles the detection off the main thread."
      >
        <InfiniteDemo />
      </Section>

      <Section
        title="Marquee (auto-play)"
        description="CSS-animated infinite ticker — the marquee owns the layout, so pass individual items directly as children. It duplicates them internally for a seamless loop. Pauses on hover by default. Respects prefers-reduced-motion."
      >
        <ScrollArea
          orientation="horizontal"
          marquee
          marqueeDuration={25}
          style={{ width: "100%", maxWidth: 720, ...frameStyle }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <Tile key={i} n={i + 1} />
          ))}
        </ScrollArea>
      </Section>

      <Section
        title="Marquee — reverse direction"
        description="Flip marquee direction for layered, counter-moving rows (a common social-proof pattern)."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ScrollArea
            orientation="horizontal"
            marquee
            marqueeDuration={20}
            style={{ width: "100%", maxWidth: 720, ...frameStyle }}
          >
            {Array.from({ length: 8 }, (_, i) => (
              <Tile key={i} n={i + 1} />
            ))}
          </ScrollArea>
          <ScrollArea
            orientation="horizontal"
            marquee
            marqueeDuration={20}
            marqueeDirection="reverse"
            style={{ width: "100%", maxWidth: 720, ...frameStyle }}
          >
            {Array.from({ length: 8 }, (_, i) => (
              <Tile key={i} n={i + 1} />
            ))}
          </ScrollArea>
        </div>
      </Section>

      <Section
        title="Size ramp"
        description="Three scrollbar thicknesses for denser or chunkier UIs."
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {(["sm", "md", "lg"] as const).map((size) => (
            <ScrollArea
              key={size}
              size={size}
              style={{ height: 180, width: 220, ...frameStyle }}
            >
              <ListItems count={30} />
            </ScrollArea>
          ))}
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { ScrollArea } from "@virtari-packages/react-scroll-area";

<ScrollArea
  orientation="horizontal"
  drag
  mask
  arrows
  arrowPlacement="inner"
  arrowAppearance="hover"
  wheelToHorizontal
  onEndReached={() => loadMore()}
  endThreshold={120}
  size="md"
  style={{ width: 480 }}
>
  {items}
</ScrollArea>

// Marquee
<ScrollArea orientation="horizontal" marquee marqueeDuration={20}>
  {logos}
</ScrollArea>`}</pre>
      </Section>
    </>
  );
}

function ListItems({ count }: { count: number }) {
  return (
    <div style={{ padding: "var(--vds-space-4)" }}>
      {Array.from({ length: count }, (_, i) => (
        <p
          key={i}
          style={{
            margin: "0 0 var(--vds-space-2)",
            fontSize: "var(--vds-text-sm)",
            color: "var(--vds-color-text)",
          }}
        >
          Item {i + 1} — Lorem ipsum dolor sit amet
        </p>
      ))}
    </div>
  );
}

function TileRow({
  count,
  interactive = false,
}: {
  count: number;
  interactive?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--vds-space-3)",
        padding: "var(--vds-space-4)",
        width: "max-content",
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <TileItem key={i} n={i + 1} interactive={interactive} />
      ))}
    </div>
  );
}

function Tile({ n }: { n: number }) {
  return (
    <div
      style={{
        width: 120,
        height: 80,
        borderRadius: "var(--vds-radius-card)",
        background: "var(--vds-color-bg-subtle)",
        color: "var(--vds-color-text)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        fontSize: "var(--vds-text-sm)",
        border: "1px solid var(--vds-color-border)",
        userSelect: "none",
      }}
    >
      {n}
    </div>
  );
}

function TileItem({ n, interactive }: { n: number; interactive: boolean }) {
  const [count, setCount] = useState(0);
  const style: React.CSSProperties = {
    width: 120,
    height: 80,
    borderRadius: "var(--vds-radius-card)",
    background: "var(--vds-color-bg-subtle)",
    color: "var(--vds-color-text)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "var(--vds-text-sm)",
    border: "1px solid var(--vds-color-border)",
    cursor: interactive ? "pointer" : "default",
    userSelect: "none",
  };
  if (interactive) {
    return (
      <button
        type="button"
        style={{ ...style, font: "inherit", appearance: "none" }}
        onClick={() => setCount((c) => c + 1)}
      >
        {n} · {count}
      </button>
    );
  }
  return <div style={style}>{n}</div>;
}

function InfiniteDemo() {
  const [items, setItems] = useState(() =>
    Array.from({ length: 20 }, (_, i) => i + 1),
  );
  const [loading, setLoading] = useState(false);
  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => [
        ...prev,
        ...Array.from({ length: 20 }, (_, i) => prev.length + i + 1),
      ]);
      setLoading(false);
    }, 350);
  }, [loading]);

  return (
    <ScrollArea
      onEndReached={loadMore}
      endThreshold={160}
      mask
      style={{ height: 260, width: 320, ...frameStyle }}
    >
      <div style={{ padding: "var(--vds-space-4)" }}>
        {items.map((n) => (
          <p
            key={n}
            style={{
              margin: "0 0 var(--vds-space-2)",
              fontSize: "var(--vds-text-sm)",
              color: "var(--vds-color-text)",
            }}
          >
            Item {n}
          </p>
        ))}
        <p
          style={{
            margin: "var(--vds-space-3) 0 0",
            fontSize: "var(--vds-text-xs)",
            color: "var(--vds-color-text-muted)",
          }}
        >
          {loading ? "Loading…" : `${items.length} items`}
        </p>
      </div>
    </ScrollArea>
  );
}
