// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/sy.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagSy: FC<FlagCoreProps> = ({
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
    data-code="sy"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path d="M0 0h640v480H0Z"/>
  <path fill="#fff" d="M0 0h640v320H0Z"/>
  <path fill="#007a3d" d="M0 0h640v160H0Z"/>
  <path fill="#ce1126" d="m101 300 39-120 39 120-102-74.2h126M461 300l39-120 39 120-102-74.2h126M281 300l39-120 39 120-102.1-74.2h126.2"/>
  </svg>
);

export default FlagSy;
