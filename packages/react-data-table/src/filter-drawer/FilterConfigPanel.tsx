import { useState } from "react";
import { Button } from "@virtari-packages/react-button";
import { Input } from "@virtari-packages/react-input";
import { cn } from "@virtari-packages/utils";

import type {
  ComparisonOperator,
  FilterCondition,
  FilterFieldDefinition,
} from "./types";

const OPERATORS_BY_TYPE: Record<
  FilterFieldDefinition["type"],
  { value: ComparisonOperator; label: string }[]
> = {
  text: [
    { value: "contains", label: "Contains" },
    { value: "notContains", label: "Does not contain" },
    { value: "equals", label: "Equals" },
    { value: "notEquals", label: "Does not equal" },
  ],
  number: [
    { value: "equals", label: "Equals" },
    { value: "notEquals", label: "Not equal" },
    { value: "greaterThan", label: "Greater than" },
    { value: "lessThan", label: "Less than" },
    { value: "between", label: "Between" },
  ],
  date: [
    { value: "equals", label: "On" },
    { value: "greaterThan", label: "After" },
    { value: "lessThan", label: "Before" },
    { value: "between", label: "Between" },
  ],
  "date-range": [{ value: "between", label: "Between" }],
  select: [
    { value: "equals", label: "Is" },
    { value: "notEquals", label: "Is not" },
  ],
  boolean: [{ value: "equals", label: "Is" }],
};

export interface FilterConfigPanelProps {
  field: FilterFieldDefinition;
  onAdd: (cond: FilterCondition) => void;
  onCancel: () => void;
}

export function FilterConfigPanel({
  field,
  onAdd,
  onCancel,
}: FilterConfigPanelProps) {
  const operators = OPERATORS_BY_TYPE[field.type];
  const [comparison, setComparison] = useState<ComparisonOperator>(
    operators[0]!.value,
  );
  const [value, setValue] = useState<string>("");
  const [value2, setValue2] = useState<string>("");

  const canAdd =
    comparison === "between"
      ? value !== "" && value2 !== ""
      : value !== "" || field.type === "boolean";

  const handleAdd = () => {
    const cond: FilterCondition = {
      id: `cond-${Date.now()}`,
      fieldId: field.id,
      fieldLabel: field.label,
      comparison,
      value:
        field.type === "number" ? Number(value) :
        field.type === "boolean" ? value === "true" :
        value,
      value2:
        comparison === "between"
          ? field.type === "number"
            ? Number(value2)
            : value2
          : undefined,
    };
    onAdd(cond);
  };

  return (
    <div className="vds-data-table-filter-config">
      <div className="vds-data-table-filter-config-row">
        <label className="vds-data-table-filter-config-label">Operator</label>
        <select
          value={comparison}
          onChange={(e) => setComparison(e.target.value as ComparisonOperator)}
          className="vds-data-table-filter-config-select"
        >
          {operators.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      </div>

      <div className="vds-data-table-filter-config-row">
        <label className="vds-data-table-filter-config-label">Value</label>
        {field.type === "select" ? (
          <select
            value={String(value)}
            onChange={(e) => setValue(e.target.value)}
            className="vds-data-table-filter-config-select"
          >
            <option value="">—</option>
            {(field.options ?? []).map((opt) => (
              <option key={String(opt.value)} value={String(opt.value)}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : field.type === "boolean" ? (
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="vds-data-table-filter-config-select"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        ) : (
          <Input
            inputSize="sm"
            type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={field.placeholder}
          />
        )}
      </div>

      {comparison === "between" && (
        <div className="vds-data-table-filter-config-row">
          <label className="vds-data-table-filter-config-label">And</label>
          <Input
            inputSize="sm"
            type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
        </div>
      )}

      <div className="vds-data-table-filter-config-actions">
        <Button
          onClick={onCancel}
          variant="ghost"
          color="contrast"
          size="sm"
          className={cn(
            "vds-data-table-toolbar-button",
            "vds-data-table-filter-config-cancel",
          )}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          disabled={!canAdd}
          data-intent="primary"
          variant="solid"
          color="primary"
          size="sm"
          className={cn("vds-data-table-toolbar-button")}
        >
          Add filter
        </Button>
      </div>
    </div>
  );
}
