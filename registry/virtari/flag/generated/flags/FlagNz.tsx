// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/nz.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagNz: FC<FlagCoreProps> = ({
  size,
  rounded = true,
  title,
  className,
  style,
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 480"
    className={cn("vds-flag", className)}
    data-size={typeof size === "string" ? size : undefined}
    data-rounded={rounded === false ? undefined : rounded === "full" ? "full" : ""}
    data-code="nz"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <g id="nz-b">
      <g id="nz-a">
        <path d="M0-.3v.5l1-.5z"/>
        <path d="M.2.3 0-.1l1-.2z"/>
      </g>
      <use xlinkHref="#nz-a" transform="scale(-1 1)"/>
      <use xlinkHref="#nz-a" transform="rotate(72 0 0)"/>
      <use xlinkHref="#nz-a" transform="rotate(-72 0 0)"/>
      <use xlinkHref="#nz-a" transform="scale(-1 1)rotate(72)"/>
    </g>
  </defs>
  <path fill="#00247d" fillRule="evenodd" d="M0 0h640v480H0z"/>
  <g transform="translate(-111 36.1)scale(.66825)">
    <use xlinkHref="#nz-b" width="100%" height="100%" fill="#fff" transform="translate(900 120)scale(45.4)"/>
    <use xlinkHref="#nz-b" width="100%" height="100%" fill="#cc142b" transform="matrix(30 0 0 30 900 120)"/>
  </g>
  <g transform="rotate(82 525.2 114.6)scale(.66825)">
    <use xlinkHref="#nz-b" width="100%" height="100%" fill="#fff" transform="rotate(-82 519 -457.7)scale(40.4)"/>
    <use xlinkHref="#nz-b" width="100%" height="100%" fill="#cc142b" transform="rotate(-82 519 -457.7)scale(25)"/>
  </g>
  <g transform="rotate(82 525.2 114.6)scale(.66825)">
    <use xlinkHref="#nz-b" width="100%" height="100%" fill="#fff" transform="rotate(-82 668.6 -327.7)scale(45.4)"/>
    <use xlinkHref="#nz-b" width="100%" height="100%" fill="#cc142b" transform="rotate(-82 668.6 -327.7)scale(30)"/>
  </g>
  <g transform="translate(-111 36.1)scale(.66825)">
    <use xlinkHref="#nz-b" width="100%" height="100%" fill="#fff" transform="translate(900 480)scale(50.4)"/>
    <use xlinkHref="#nz-b" width="100%" height="100%" fill="#cc142b" transform="matrix(35 0 0 35 900 480)"/>
  </g>
  <path fill="#012169" d="M0 0h320v240H0z"/>
  <path fill="#fff" d="m37.5 0 122 90.5L281 0h39v31l-120 89.5 120 89V240h-40l-120-89.5L40.5 240H0v-30l119.5-89L0 32V0z"/>
  <path fill="#c8102e" d="M212 140.5 320 220v20l-135.5-99.5zm-92 10 3 17.5-96 72H0zM320 0v1.5l-124.5 94 1-22L295 0zM0 0l119.5 88h-30L0 21z"/>
  <path fill="#fff" d="M120.5 0v240h80V0zM0 80v80h320V80z"/>
  <path fill="#c8102e" d="M0 96.5v48h320v-48zM136.5 0v240h48V0z"/>
  </svg>
);

export default FlagNz;
