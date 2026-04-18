import { useState } from "react";
import { Button } from "@virtari/react-button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerHandle,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  type Direction,
  type DrawerHeaderVariant,
  type DrawerIndicatorPlacement,
  type DrawerProps,
  type DrawerSizeMode,
} from "@virtari/react-drawer";
import { Input } from "@virtari/react-input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@virtari/react-select";
import { Section, Row, Stack } from "../components";

type DemoDrawerProps = Omit<DrawerProps, "children"> & {
  label: string;
  title?: string;
  description?: string;
  body?: React.ReactNode;
};

function DemoDrawer({
  label,
  title = "Drawer",
  description = "Drag the handle, or dismiss with Cancel.",
  body,
  ...drawerProps
}: DemoDrawerProps) {
  return (
    <Drawer {...drawerProps}>
      <DrawerTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerHandle />
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          {body ?? (
            <p className="docs-prose">
              This is a demo drawer. Replace the body with your own content — forms,
              lists, or any scrollable region.
            </p>
          )}
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button>Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

type SelectOption<T extends string> = { value: T; label: string };

function LabeledSelect<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: ReadonlyArray<SelectOption<T>>;
}) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-1-5)",
        fontSize: "var(--vds-text-xs)",
        color: "var(--vds-color-text-muted)",
        minInlineSize: "10rem",
      }}
    >
      <span>{label}</span>
      <Select value={value} onValueChange={(next) => onChange(next as T)}>
        <SelectTrigger size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

const DIRECTION_OPTIONS: ReadonlyArray<SelectOption<Direction>> = [
  { value: "bottom", label: "Bottom" },
  { value: "top", label: "Top" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

const SIZE_MODE_OPTIONS: ReadonlyArray<SelectOption<DrawerSizeMode>> = [
  { value: "adaptive", label: "Adaptive" },
  { value: "full", label: "Full" },
  { value: "fixed", label: "Fixed" },
];

const INDICATOR_OPTIONS: ReadonlyArray<SelectOption<DrawerIndicatorPlacement>> = [
  { value: "inside", label: "Inside" },
  { value: "outside", label: "Outside" },
  { value: "hidden", label: "Hidden" },
];

const HEADER_OPTIONS: ReadonlyArray<SelectOption<DrawerHeaderVariant>> = [
  { value: "plain", label: "Plain" },
  { value: "bordered", label: "Bordered" },
];

function buildPlaygroundCode({
  direction,
  sizeMode,
  indicator,
  headerVariant,
}: {
  direction: Direction;
  sizeMode: DrawerSizeMode;
  indicator: DrawerIndicatorPlacement;
  headerVariant: DrawerHeaderVariant;
}) {
  const props = [
    `direction="${direction}"`,
    `sizeMode="${sizeMode}"`,
    sizeMode === "fixed" ? `size="28rem"` : null,
    `indicator="${indicator}"`,
    `headerVariant="${headerVariant}"`,
  ].filter(Boolean) as string[];

  return `<Drawer
  ${props.join("\n  ")}
  openStates={[
    { id: "peek", size: 0.4 },
    { id: "full", size: 1 },
  ]}
>
  <DrawerTrigger asChild>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerHandle />
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>{/* content */}</DrawerBody>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`;
}

export function DrawerPage() {
  const [direction, setDirection] = useState<Direction>("bottom");
  const [sizeMode, setSizeMode] = useState<DrawerSizeMode>("adaptive");
  const [indicator, setIndicator] = useState<DrawerIndicatorPlacement>("inside");
  const [headerVariant, setHeaderVariant] =
    useState<DrawerHeaderVariant>("plain");

  return (
    <>
      <Section
        title="Basic"
        description="A bottom drawer with a handle, title, description, body, and footer actions."
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Open drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerHandle />
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Update your details and save your changes.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <Stack>
                <Input placeholder="Name" defaultValue="Ada Lovelace" />
                <Input placeholder="Email" defaultValue="ada@virtari.dev" />
              </Stack>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button>Save</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Section>

      <Section
        title="Anatomy"
        description="A drawer is a composition of named parts. Use them in this order."
      >
        <pre className="docs-code">{`<Drawer>                   // root, owns state + props
  <DrawerTrigger />        // opens the drawer (asChild recommended)
  <DrawerContent>          // the sliding panel itself
    <DrawerHeader>         // top region
      <DrawerHandle />     // drag indicator + drag surface
      <DrawerTitle />      // required for accessibility
      <DrawerDescription/> // optional supporting copy
    </DrawerHeader>
    <DrawerBody />         // scrollable content region
    <DrawerFooter />       // sticky action bar
    <DrawerClose />        // closes the drawer
  </DrawerContent>
</Drawer>`}</pre>
      </Section>

      <Section
        title="Direction"
        description="Slide in from any edge. Bottom is the default on mobile; left and right work well for navigation or detail panels."
      >
        <Row>
          <DemoDrawer direction="bottom" label="Bottom" title="From bottom" />
          <DemoDrawer direction="top" label="Top" title="From top" />
          <DemoDrawer
            direction="left"
            label="Left"
            title="From left"
            sizeMode="fixed"
            size="22rem"
          />
          <DemoDrawer
            direction="right"
            label="Right"
            title="From right"
            sizeMode="fixed"
            size="22rem"
          />
        </Row>
      </Section>

      <Section
        title="Size modes"
        description="Adaptive fits the content, full covers the viewport, fixed uses an explicit size."
      >
        <Row>
          <DemoDrawer
            sizeMode="adaptive"
            label="Adaptive"
            title="Adaptive"
            description="Height is measured from the content and clamped to the viewport."
          />
          <DemoDrawer
            sizeMode="full"
            label="Full"
            title="Full"
            description="Fills ~96% of the viewport in the drawer's direction."
          />
          <DemoDrawer
            sizeMode="fixed"
            size="28rem"
            label="Fixed 28rem"
            title="Fixed"
            description="Uses the exact size you provide."
          />
        </Row>
      </Section>

      <Section
        title="Open states"
        description="Name each resting stage with a semantic id. Recommended over raw numeric snapPoints — drag the handle to move between peek, comfortable, and full."
      >
        <Drawer
          openStates={[
            { id: "peek", size: 0.35, label: "Peek" },
            { id: "comfortable", size: 0.7, label: "Comfortable" },
            { id: "full", size: 1, label: "Full" },
          ]}
          defaultOpenState="comfortable"
        >
          <DrawerTrigger asChild>
            <Button>Open staged drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerHandle />
              <DrawerTitle>Three stages</DrawerTitle>
              <DrawerDescription>
                Drag or flick the handle to snap between stages.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="docs-prose">
                Each stage has an id and a size — a ratio between 0 and 1, or a pixel
                number when larger. If you need raw numeric control instead, use the
                low-level <code>snapPoints</code> + <code>defaultSnapPoint</code> API.
              </p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Section>

      <Section
        title="Minimized state"
        description="A pre-close resting lane below the open states. Drag past the smallest stage and the drawer rests as a compact bar instead of dismissing."
      >
        <Drawer
          openStates={[
            { id: "peek", size: 0.4, label: "Peek" },
            { id: "full", size: 1, label: "Full" },
          ]}
          minimizedState={{ id: "minimized", size: 72, label: "Minimized" }}
        >
          <DrawerTrigger asChild>
            <Button>Open with minimized lane</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerHandle />
              <DrawerTitle>Three lanes</DrawerTitle>
              <DrawerDescription>
                minimized → open states → closed. Drag down past peek to minimize.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="docs-prose">
                The minimized lane is separate from the open states — it is a pre-close
                resting position. While minimized the drawer becomes non-modal so the
                background is interactive.
              </p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Section>

      <Section
        title="Offset"
        description="Add a gap between the drawer and the opening edge for a floating-sheet look."
      >
        <Row>
          <DemoDrawer
            offset={16}
            label="Floating bottom"
            title="Offset 16"
            description="16px gap from the bottom edge."
          />
          <DemoDrawer
            direction="right"
            sizeMode="fixed"
            size="22rem"
            offset={24}
            label="Floating right"
            title="Offset 24"
            description="24px gap from the right edge."
          />
        </Row>
      </Section>

      <Section
        title="Indicator and header"
        description="Move the drag indicator inside, outside, or hide it — and pick a plain or bordered header."
      >
        <Row>
          <DemoDrawer
            indicator="inside"
            headerVariant="plain"
            label="Inside · plain"
            title="Inside indicator"
            description="Handle sits inside the header, no separator."
          />
          <DemoDrawer
            indicator="outside"
            headerVariant="plain"
            label="Outside · plain"
            title="Outside indicator"
            description="Handle floats above the drawer."
          />
          <DemoDrawer
            indicator="hidden"
            headerVariant="bordered"
            label="Hidden · bordered"
            title="No indicator"
            description="Bordered header separates the title from the body."
          />
        </Row>
      </Section>

      <Section
        title="Behavior"
        description="Three toggles that change how the drawer feels. scaleBackground needs a parent with data-vds-drawer-wrapper."
      >
        <Row>
          <DemoDrawer
            dragHandleOnly
            label="Handle-only drag"
            title="Handle-only drag"
            description="Only the handle initiates drag. The body scrolls instead."
          />
          <DemoDrawer
            dismissible={false}
            label="Persistent"
            title="Persistent drawer"
            description="Escape and overlay taps are ignored — close it with the action below."
          />
          <div data-vds-drawer-wrapper>
            <DemoDrawer
              scaleBackground
              label="Scales background"
              title="Background scales"
              description="The parent wrapper scales and rounds while the drawer is open."
            />
          </div>
        </Row>
      </Section>

      <Section
        title="Playground"
        description="Four live props, one preview. Every other prop stays fixed so you can learn one axis at a time."
      >
        <Row>
          <LabeledSelect
            label="Direction"
            value={direction}
            onChange={setDirection}
            options={DIRECTION_OPTIONS}
          />
          <LabeledSelect
            label="Size mode"
            value={sizeMode}
            onChange={setSizeMode}
            options={SIZE_MODE_OPTIONS}
          />
          <LabeledSelect
            label="Indicator"
            value={indicator}
            onChange={setIndicator}
            options={INDICATOR_OPTIONS}
          />
          <LabeledSelect
            label="Header"
            value={headerVariant}
            onChange={setHeaderVariant}
            options={HEADER_OPTIONS}
          />
        </Row>

        <Drawer
          direction={direction}
          sizeMode={sizeMode}
          size={sizeMode === "fixed" ? "28rem" : undefined}
          indicator={indicator}
          headerVariant={headerVariant}
          openStates={[
            { id: "peek", size: 0.4, label: "Peek" },
            { id: "full", size: 1, label: "Full" },
          ]}
        >
          <DrawerTrigger asChild>
            <Button>Open playground drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerHandle />
              <DrawerTitle>Playground</DrawerTitle>
              <DrawerDescription>
                direction={direction} · sizeMode={sizeMode} · indicator={indicator} ·
                header={headerVariant}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="docs-prose">
                Change the controls above and open this drawer again. Each change is
                reflected in the generated code below.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <pre className="docs-code">
          {buildPlaygroundCode({ direction, sizeMode, indicator, headerVariant })}
        </pre>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import {
  Drawer, DrawerTrigger, DrawerContent,
  DrawerHeader, DrawerHandle, DrawerTitle, DrawerDescription,
  DrawerBody, DrawerFooter, DrawerClose,
} from "@virtari/react-drawer";

<Drawer
  direction="bottom"
  openStates={[
    { id: "peek",        size: 0.4 },
    { id: "comfortable", size: 0.7 },
    { id: "full",        size: 1   },
  ]}
  defaultOpenState="comfortable"
>
  <DrawerTrigger asChild>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerHandle />
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>{/* content */}</DrawerBody>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

// Advanced tuning (see packages/react-drawer for full API):
//   snapBehavior, velocityThreshold, closeThreshold,
//   snapStepThreshold, snapSkipThreshold, preventAutoFocus,
//   modal, snapPoints, defaultSnapPoint — all optional.`}</pre>
      </Section>
    </>
  );
}
