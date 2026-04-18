import type { ReactNode } from "react";

export type FilterFieldType =
  | "select"
  | "text"
  | "date"
  | "date-range"
  | "number"
  | "boolean";

export interface FilterFieldDefinition {
  id: string;
  label: string;
  icon?: ReactNode;
  type: FilterFieldType;
  options?: { label: string; value: unknown }[];
  placeholder?: string;
  /** Group under "Shown" (default) or "Popular". */
  category?: "shown" | "popular";
}

export type ComparisonOperator =
  | "equals"
  | "notEquals"
  | "contains"
  | "notContains"
  | "greaterThan"
  | "lessThan"
  | "between";

export interface FilterCondition {
  id: string;
  fieldId: string;
  fieldLabel: string;
  comparison: ComparisonOperator;
  value: unknown;
  /** Second value, used only for `between`. */
  value2?: unknown;
}

export type FilterLogicOperator = "AND" | "OR";

export interface FilterGroup {
  id: string;
  operator: FilterLogicOperator;
  conditions: FilterCondition[];
}

export function countConditions(groups: FilterGroup[]): number {
  return groups.reduce((sum, g) => sum + g.conditions.length, 0);
}
