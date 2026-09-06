// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/az.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagAz: FC<FlagCoreProps> = ({
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
    data-code="az"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#3f9c35" d="M.1 0h640v480H.1z"/>
  <path fill="#ed2939" d="M.1 0h640v320H.1z"/>
  <path fill="#00b9e4" d="M.1 0h640v160H.1z"/>
  <circle cx="304" cy="240" r="72" fill="#fff"/>
  <circle cx="320" cy="240" r="60" fill="#ed2939"/>
  <path fill="#fff" d="m384 200 7.7 21.5 20.6-9.8-9.8 20.7L424 240l-21.5 7.7 9.8 20.6-20.6-9.8L384 280l-7.7-21.5-20.6 9.8 9.8-20.6L344 240l21.5-7.7-9.8-20.6 20.6 9.8z"/>
  </svg>
);

export default FlagAz;
