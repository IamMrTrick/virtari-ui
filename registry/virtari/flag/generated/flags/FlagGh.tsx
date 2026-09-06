// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/gh.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagGh: FC<FlagCoreProps> = ({
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
    data-code="gh"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#006b3f" d="M0 0h640v480H0z"/>
  <path fill="#fcd116" d="M0 0h640v320H0z"/>
  <path fill="#ce1126" d="M0 0h640v160H0z"/>
  <path fill="#000001" d="m320 160 52 160-136.1-98.9H404L268 320z"/>
  </svg>
);

export default FlagGh;
