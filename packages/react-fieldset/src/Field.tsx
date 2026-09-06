import { cn } from "@virtari-packages/utils";
import type {
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  Ref,
} from "react";

export type FieldMetaLayout = "stacked" | "inline";
export type FieldMetaAlign = "start" | "end";

type FieldMetaKind = "description" | "error" | "counter";

type FieldMetaDescriptor = {
  align: FieldMetaAlign;
  content: ReactNode;
  id?: string;
  kind: FieldMetaKind;
};

export interface FieldProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  counter?: ReactNode;
  afterControl?: ReactNode;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  controlId?: string;
  descriptionId?: string;
  errorId?: string;
  counterId?: string;
  metaLayout?: FieldMetaLayout;
  descriptionAlign?: FieldMetaAlign;
  errorAlign?: FieldMetaAlign;
  counterAlign?: FieldMetaAlign;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  controlClassName?: string;
  afterControlClassName?: string;
  metaClassName?: string;
  ref?: Ref<HTMLDivElement>;
}

function hasContent(value: ReactNode | undefined) {
  return value !== undefined && value !== null && value !== false;
}

export function composeFieldDescribedBy(
  ...values: Array<string | null | undefined | false>
) {
  const tokens = values
    .flatMap((value) => (value ? value.split(/\s+/) : []))
    .filter(Boolean);
  const uniqueTokens = Array.from(new Set(tokens));
  return uniqueTokens.length > 0 ? uniqueTokens.join(" ") : undefined;
}

function renderMetaRow(
  kind: string,
  items: FieldMetaDescriptor[],
) {
  if (items.length === 0) return null;

  const startItems = items.filter((item) => item.align === "start");
  const endItems = items.filter((item) => item.align === "end");

  const renderItems = (
    slotItems: FieldMetaDescriptor[],
    align: FieldMetaAlign,
  ) => {
    if (slotItems.length === 0) return null;

    return (
      <div className="vds-field-meta-slot" data-align={align}>
        {slotItems.map((item, index) => (
          <div
            key={`${kind}-${align}-${index}`}
            id={item.id}
            role={item.kind === "error" ? "alert" : undefined}
            className={cn(
              "vds-field-meta-item",
              `vds-field-meta-item--${item.kind}`,
            )}
          >
            {item.content}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div key={kind} className="vds-field-meta-row" data-kind={kind}>
      {renderItems(startItems, "start")}
      {renderItems(endItems, "end")}
    </div>
  );
}

export function Field({
  children,
  label,
  description,
  error,
  counter,
  afterControl,
  invalid,
  required,
  disabled,
  controlId,
  descriptionId,
  errorId,
  counterId,
  metaLayout = "stacked",
  descriptionAlign = "start",
  errorAlign = "start",
  counterAlign = "end",
  labelProps,
  className,
  controlClassName,
  afterControlClassName,
  metaClassName,
  ref,
  ...props
}: FieldProps) {
  const {
    className: labelPropsClassName,
    ...restLabelProps
  } = labelProps ?? {};
  const divLabelProps = restLabelProps as HTMLAttributes<HTMLDivElement>;
  const labelClassName = cn("vds-field-label", labelPropsClassName);
  const descriptionItem = hasContent(description)
    ? {
        align: descriptionAlign,
        content: description,
        id: descriptionId,
        kind: "description" as const,
      }
    : null;
  const errorItem = hasContent(error)
    ? {
        align: errorAlign,
        content: error,
        id: errorId,
        kind: "error" as const,
      }
    : null;
  const counterItem = hasContent(counter)
    ? {
        align: counterAlign,
        content: counter,
        id: counterId,
        kind: "counter" as const,
      }
    : null;

  const metaRows =
    metaLayout === "inline"
      ? [
          renderMetaRow(
            "inline",
            [descriptionItem, errorItem, counterItem].filter(
              Boolean,
            ) as FieldMetaDescriptor[],
          ),
        ]
      : [
          renderMetaRow(
            "primary",
            [descriptionItem, counterItem].filter(
              Boolean,
            ) as FieldMetaDescriptor[],
          ),
          renderMetaRow(
            "error",
            [errorItem].filter(Boolean) as FieldMetaDescriptor[],
          ),
        ];
  const hasMeta = metaRows.some(Boolean);

  return (
    <div
      ref={ref}
      className={cn("vds-field", className)}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      data-meta-layout={metaLayout}
      {...props}
    >
      {label ? (
        controlId ? (
          <label
            htmlFor={controlId}
            className={labelClassName}
            {...restLabelProps}
          >
            {label}
            {required ? (
              <span className="vds-field-required" aria-hidden="true">
                *
              </span>
            ) : null}
          </label>
        ) : (
          <div
            className={labelClassName}
            {...divLabelProps}
          >
            {label}
            {required ? (
              <span className="vds-field-required" aria-hidden="true">
                *
              </span>
            ) : null}
          </div>
        )
      ) : null}

      <div className={cn("vds-field-control", controlClassName)}>
        {children}
      </div>

      {afterControl ? (
        <div
          className={cn("vds-field-after-control", afterControlClassName)}
        >
          {afterControl}
        </div>
      ) : null}

      {hasMeta ? (
        <div className={cn("vds-field-meta", metaClassName)}>
          {metaRows}
        </div>
      ) : null}
    </div>
  );
}
