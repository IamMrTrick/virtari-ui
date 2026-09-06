// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/bf.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagBf: FC<FlagCoreProps> = ({
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
    data-code="bf"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <g fillRule="evenodd">
    <path fill="#de0000" d="M640 479.6H.4V0H640z"/>
    <path fill="#35a100" d="M639.6 480H0V240.2h639.6z"/>
    <path fill="#fff300" d="m254.6 276.2-106-72.4h131L320 86.6 360.4 204l131-.1-106 72.4 40.5 117.3-106-72.6L214 393.4"/>
  </g>
  </svg>
);

export default FlagBf;
