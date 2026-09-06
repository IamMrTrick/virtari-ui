// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/ma.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagMa: FC<FlagCoreProps> = ({
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
    data-code="ma"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#c1272d" d="M640 0H0v480h640z"/>
  <path fill="none" stroke="#006233" strokeWidth="11.7" d="M320 179.4 284.4 289l93.2-67.6H262.4l93.2 67.6z"/>
  </svg>
);

export default FlagMa;
