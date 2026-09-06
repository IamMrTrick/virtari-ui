// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/ga.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagGa: FC<FlagCoreProps> = ({
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
    data-code="ga"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <g fillRule="evenodd">
    <path fill="#ffe700" d="M640 480H0V0h640z"/>
    <path fill="#36a100" d="M640 160H0V0h640z"/>
    <path fill="#006dbc" d="M640 480H0V320h640z"/>
  </g>
  </svg>
);

export default FlagGa;
