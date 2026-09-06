// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/vc.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagVc: FC<FlagCoreProps> = ({
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
    data-code="vc"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <g fillRule="evenodd">
    <path fill="#f4f100" d="M0 0h640v480H0z"/>
    <path fill="#199a00" d="M490 0h150v480H490z"/>
    <path fill="#0058aa" d="M0 0h150v480H0z"/>
    <path fill="#199a00" d="m259.3 130-46.4 71.3 44.7 74.4 43.8-73.7zm121.2 0-46.3 71.3 44.7 74.4 43.8-73.7zm-61.2 97.3-46.4 71.4 44.8 74.4 43.8-73.7-42.2-72z"/>
  </g>
  </svg>
);

export default FlagVc;
