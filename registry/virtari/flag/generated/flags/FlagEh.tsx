// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/eh.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagEh: FC<FlagCoreProps> = ({
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
    data-code="eh"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="eh-a">
      <path fillOpacity=".7" d="M-158.7 0H524v512h-682.7z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" clipPath="url(#eh-a)" transform="translate(148.8)scale(.94)">
    <path fill="#000001" d="M-158.3 0h680.9v255.3h-680.9z"/>
    <path fill="#007a3d" d="M-158.3 255.3h680.9v255.3h-680.9z"/>
    <path fill="#fff" d="M-158.3 148.9h680.9v212.8h-680.9z"/>
    <path fill="#c4111b" d="m-158.3 0 340.4 255.3-340.4 255.3Z"/>
    <circle cx="352.3" cy="255.3" r="68.1" fill="#c4111b"/>
    <circle cx="377.9" cy="255.3" r="68.1" fill="#fff"/>
    <path fill="#c4111b" d="m334 296.5 29.1-20.7 28.8 21-10.8-34 29-20.9-35.7-.2-11-34-11.2 33.9-35.7-.2 28.7 21.2-11.1 34z"/>
  </g>
  </svg>
);

export default FlagEh;
