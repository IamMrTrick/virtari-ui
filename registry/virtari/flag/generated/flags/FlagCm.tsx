// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/cm.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagCm: FC<FlagCoreProps> = ({
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
    data-code="cm"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#007a5e" d="M0 0h213.3v480H0z"/>
  <path fill="#ce1126" d="M213.3 0h213.4v480H213.3z"/>
  <path fill="#fcd116" d="M426.7 0H640v480H426.7z"/>
  <g fill="#fcd116" transform="translate(320 240)scale(7.1111)">
    <g id="cm-b">
      <path id="cm-a" d="M0-8-2.5-.4 1.3.9z"/>
      <use xlinkHref="#cm-a" width="100%" height="100%" transform="scale(-1 1)"/>
    </g>
    <use xlinkHref="#cm-b" width="100%" height="100%" transform="rotate(72)"/>
    <use xlinkHref="#cm-b" width="100%" height="100%" transform="rotate(144)"/>
    <use xlinkHref="#cm-b" width="100%" height="100%" transform="rotate(-144)"/>
    <use xlinkHref="#cm-b" width="100%" height="100%" transform="rotate(-72)"/>
  </g>
  </svg>
);

export default FlagCm;
