import { cn } from '@virtari-packages/utils';
import { useRef } from 'react';
import { Button } from '@virtari-packages/react-button';
import { IconChevronUp, IconChevronLeft, IconChevronDown, IconChevronRight } from '@virtari-packages/react-icons';
import { SwiperSlide, Swiper } from 'swiper/react';
import { A11y, Navigation, Pagination, Autoplay, Scrollbar, Keyboard, Mousewheel, FreeMode, Zoom, Parallax, Thumbs, Grid, Virtual, EffectCards, EffectCreative, EffectFlip, EffectCoverflow, EffectCube, EffectFade } from 'swiper/modules';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';

// src/Carousel.tsx
var EFFECT_MODULES = {
  slide: null,
  fade: EffectFade,
  cube: EffectCube,
  coverflow: EffectCoverflow,
  flip: EffectFlip,
  creative: EffectCreative,
  cards: EffectCards
};
var COLOR_TO_BUTTON = {
  primary: "primary",
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
  accent: "accent",
  neutral: "contrast"
};
var VARIANT_TO_BUTTON = {
  default: "outline",
  inside: "solid",
  outside: "outline",
  minimal: "ghost",
  solid: "solid"
};
var SIZE_TO_BUTTON = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg"
};
function resolveModules(props) {
  const list = [A11y];
  if (props.navigation) list.push(Navigation);
  if (props.pagination) list.push(Pagination);
  if (props.autoplay) list.push(Autoplay);
  if (props.scrollbar) list.push(Scrollbar);
  if (props.keyboard !== false) list.push(Keyboard);
  if (props.mousewheel) list.push(Mousewheel);
  if (props.freeMode) list.push(FreeMode);
  if (props.zoom) list.push(Zoom);
  if (props.parallax) list.push(Parallax);
  if (props.thumbs) list.push(Thumbs);
  if (props.grid) list.push(Grid);
  if (props.virtual) list.push(Virtual);
  if (props.effect && props.effect !== "slide") {
    const mod = EFFECT_MODULES[props.effect];
    if (mod) list.push(mod);
  }
  return list;
}
function resolvePagination(pagination) {
  if (!pagination) return void 0;
  const base = {
    clickable: true,
    type: "bullets",
    bulletClass: "swiper-pagination-bullet",
    bulletActiveClass: "swiper-pagination-bullet-active"
  };
  return typeof pagination === "object" ? { ...base, ...pagination } : base;
}
function resolveA11y(a11y, prevLabel, nextLabel) {
  if (a11y === false) return false;
  const defaults = {
    prevSlideMessage: prevLabel,
    nextSlideMessage: nextLabel,
    paginationBulletMessage: "Go to slide {{index}}",
    firstSlideMessage: "This is the first slide",
    lastSlideMessage: "This is the last slide"
  };
  return typeof a11y === "object" ? { ...defaults, ...a11y } : defaults;
}
function Carousel({
  color = "primary",
  variant = "default",
  size = "md",
  shape = "pill",
  navigation = false,
  prevIcon,
  nextIcon,
  prevLabel = "Previous slide",
  nextLabel = "Next slide",
  pagination,
  paginationLook = "bullets",
  paginationPosition = "bottom",
  autoplay,
  scrollbar,
  keyboard = true,
  mousewheel,
  a11y = true,
  freeMode,
  zoom,
  parallax,
  thumbs,
  grid,
  virtual,
  effect = "slide",
  orientation = "horizontal",
  rtl,
  topSlot,
  bottomSlot,
  className,
  children,
  ref,
  ...swiperProps
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const modules = resolveModules({
    navigation,
    pagination,
    autoplay,
    scrollbar,
    keyboard,
    mousewheel,
    freeMode,
    zoom,
    parallax,
    thumbs,
    grid,
    virtual,
    effect
  });
  const buttonColor = COLOR_TO_BUTTON[color];
  const buttonVariant = VARIANT_TO_BUTTON[variant];
  const buttonSize = SIZE_TO_BUTTON[size];
  const isVertical = orientation === "vertical";
  const PrevIcon = isVertical ? IconChevronUp : IconChevronLeft;
  const NextIcon = isVertical ? IconChevronDown : IconChevronRight;
  const iconStrokeProps = { stroke: 1.75, "aria-hidden": true };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("vds-carousel", className),
      "data-color": color,
      "data-variant": variant,
      "data-size": size,
      "data-shape": shape !== "pill" ? shape : void 0,
      "data-pagination": paginationLook !== "bullets" ? paginationLook : void 0,
      "data-pagination-position": paginationPosition !== "bottom" ? paginationPosition : void 0,
      "data-orientation": isVertical ? "vertical" : void 0,
      dir: rtl ? "rtl" : void 0,
      children: [
        topSlot,
        /* @__PURE__ */ jsxs("div", { className: "vds-carousel-track", children: [
          /* @__PURE__ */ jsx(
            Swiper,
            {
              ref,
              modules,
              direction: isVertical ? "vertical" : "horizontal",
              dir: rtl ? "rtl" : void 0,
              navigation: navigation ? {
                prevEl: prevRef.current,
                nextEl: nextRef.current,
                disabledClass: "vds-carousel-nav--disabled",
                hiddenClass: "vds-carousel-nav--hidden",
                lockClass: "vds-carousel-nav--locked"
              } : void 0,
              onBeforeInit: (swiper) => {
                if (navigation && typeof swiper.params.navigation === "object" && swiper.params.navigation) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              },
              pagination: resolvePagination(pagination),
              autoplay,
              scrollbar,
              keyboard,
              mousewheel,
              a11y: resolveA11y(a11y, prevLabel, nextLabel),
              freeMode,
              zoom,
              parallax,
              thumbs,
              grid,
              virtual,
              effect: effect === "slide" ? void 0 : effect,
              ...swiperProps,
              children
            }
          ),
          navigation && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                ref: prevRef,
                type: "button",
                color: buttonColor,
                variant: buttonVariant,
                size: buttonSize,
                "aria-label": prevLabel,
                className: "vds-carousel-nav vds-carousel-nav--prev",
                "data-position": "prev",
                children: prevIcon ?? /* @__PURE__ */ jsx(PrevIcon, { size: iconSizeFor(size), ...iconStrokeProps })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                ref: nextRef,
                type: "button",
                color: buttonColor,
                variant: buttonVariant,
                size: buttonSize,
                "aria-label": nextLabel,
                className: "vds-carousel-nav vds-carousel-nav--next",
                "data-position": "next",
                children: nextIcon ?? /* @__PURE__ */ jsx(NextIcon, { size: iconSizeFor(size), ...iconStrokeProps })
              }
            )
          ] })
        ] }),
        bottomSlot
      ]
    }
  );
}
function iconSizeFor(size) {
  switch (size) {
    case "xs":
      return 14;
    case "sm":
      return 16;
    case "lg":
      return 22;
    case "md":
    default:
      return 18;
  }
}
var CarouselSlide = SwiperSlide;

export { Carousel, CarouselSlide };
