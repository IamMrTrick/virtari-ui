import { useEffect, useMemo, useRef, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../../drawer";
import { Button } from "../../button";
import { Chip, ChipLabel, ChipRemove } from "../../chip";
import { Input } from "../../input";
import { Switch } from "../../switch";
import { cn } from "../../../lib/utils";
import { IconChevronLeft } from "../../icons";

import { FilterConfigPanel } from "./FilterConfigPanel";
import type {
  FilterCondition,
  FilterFieldDefinition,
  FilterGroup,
} from "./types";
import { countConditions } from "./types";

export interface DataTableFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Fields the user can add conditions against. */
  availableFilters: FilterFieldDefinition[];
  /** Currently-active filter groups (controlled). */
  filterGroups?: FilterGroup[];
  /** Fired on Apply. */
  onApplyFilters: (groups: FilterGroup[]) => void;
  title?: string;
  /** Drawer side. Default "right". */
  side?: "left" | "right" | "top" | "bottom";
}

export function DataTableFilterDrawer({
  open,
  onOpenChange,
  availableFilters,
  filterGroups: externalGroups = [],
  onApplyFilters,
  title = "Filters",
  side = "right",
}: DataTableFilterDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [groups, setGroups] = useState<FilterGroup[]>(externalGroups);
  const [configField, setConfigField] = useState<FilterFieldDefinition | null>(
    null,
  );

  /* Re-sync internal state each time the drawer opens. */
  const prevOpenRef = useRef(false);
  useEffect(() => {
    if (open && !prevOpenRef.current) {
      setGroups(externalGroups);
      setSearchQuery("");
      setConfigField(null);
    }
    prevOpenRef.current = open;
  }, [open, externalGroups]);

  const filteredFields = useMemo(() => {
    if (!searchQuery.trim()) return availableFilters;
    const q = searchQuery.toLowerCase();
    return availableFilters.filter(
      (f) => f.label.toLowerCase().includes(q) || f.id.toLowerCase().includes(q),
    );
  }, [availableFilters, searchQuery]);

  const shown = filteredFields.filter(
    (f) => f.category === "shown" || !f.category,
  );
  const popular = filteredFields.filter((f) => f.category === "popular");
  const activeCount = countConditions(groups);

  const hasActive = (fieldId: string) =>
    groups.some((g) => g.conditions.some((c) => c.fieldId === fieldId));

  const addCondition = (cond: FilterCondition) => {
    setGroups((prev) => {
      if (prev.length === 0) {
        return [
          {
            id: `group-${Date.now()}`,
            operator: "AND",
            conditions: [cond],
          },
        ];
      }
      const next = [...prev];
      next[next.length - 1]!.conditions.push(cond);
      return next;
    });
    setConfigField(null);
  };

  const removeCondition = (groupId: string, conditionId: string) => {
    setGroups((prev) =>
      prev
        .map((g) =>
          g.id === groupId
            ? {
                ...g,
                conditions: g.conditions.filter((c) => c.id !== conditionId),
              }
            : g,
        )
        .filter((g) => g.conditions.length > 0),
    );
  };

  const toggleOperator = (groupId: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, operator: g.operator === "AND" ? "OR" : "AND" }
          : g,
      ),
    );
  };

  const handleApply = () => {
    onApplyFilters(groups);
    onOpenChange(false);
  };

  const handleClear = () => {
    setGroups([]);
    onApplyFilters([]);
    onOpenChange(false);
  };

  return (
    <Drawer
      direction={side}
      open={open}
      onOpenChange={onOpenChange}
      sizeMode="fixed"
      size="min(26rem, 95vw)"
    >
      <DrawerContent
        className="vds-data-table-filter-drawer"
        aria-label={title}
      >
        <DrawerHeader>
          <div className="vds-data-table-filter-drawer-header">
            {configField && (
              <button
                type="button"
                onClick={() => setConfigField(null)}
                aria-label="Back"
                className="vds-data-table-filter-drawer-back"
              >
                <IconChevronLeft size={14} stroke={1.75} aria-hidden focusable={false} />
              </button>
            )}
            <DrawerTitle>{configField ? configField.label : title}</DrawerTitle>
            {!configField && activeCount > 0 && (
              <span className="vds-data-table-filter-drawer-count">
                {activeCount}
              </span>
            )}
          </div>
        </DrawerHeader>

        <DrawerBody>
          {!configField ? (
            <div className="vds-data-table-filter-drawer-body">
              <Input
                inputSize="md"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search filters..."
              />

              {activeCount > 0 && (
                <div className="vds-data-table-filter-drawer-active">
                  <div className="vds-data-table-filter-drawer-active-header">
                    <span>Active ({activeCount})</span>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="vds-data-table-filter-drawer-clear"
                    >
                      Clear all
                    </button>
                  </div>
                  {groups.map((group, gi) => (
                    <div key={group.id} className="vds-data-table-filter-drawer-group">
                      {gi > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleOperator(group.id)}
                          className="vds-data-table-filter-drawer-operator"
                        >
                          {group.operator}
                        </button>
                      )}
                      {group.conditions.map((c) => (
                        <Chip
                          key={c.id}
                          size="sm"
                          appearance="outline"
                          variant="primary"
                          className="vds-data-table-filter-drawer-chip"
                        >
                          <ChipLabel>
                            {c.fieldLabel}: {String(c.value)}
                          </ChipLabel>
                          <ChipRemove
                            onClick={() => removeCondition(group.id, c.id)}
                            aria-label={`Remove ${c.fieldLabel} filter`}
                          />
                        </Chip>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {shown.length > 0 && (
                <FilterSection
                  title="Shown"
                  fields={shown}
                  hasActive={hasActive}
                  onPick={setConfigField}
                />
              )}
              {popular.length > 0 && (
                <FilterSection
                  title="Popular"
                  fields={popular}
                  hasActive={hasActive}
                  onPick={setConfigField}
                />
              )}
            </div>
          ) : (
            <FilterConfigPanel
              field={configField}
              onAdd={addCondition}
              onCancel={() => setConfigField(null)}
            />
          )}
        </DrawerBody>

        {!configField && (
          <DrawerFooter>
            <div className="vds-data-table-filter-drawer-footer">
              <Button
                onClick={() => onOpenChange(false)}
                variant="ghost"
                color="contrast"
                size="sm"
                className="vds-data-table-toolbar-button"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                disabled={activeCount === 0}
                data-intent="primary"
                variant="solid"
                color="primary"
                size="sm"
                className="vds-data-table-toolbar-button"
              >
                Apply
              </Button>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}

function FilterSection({
  title,
  fields,
  hasActive,
  onPick,
}: {
  title: string;
  fields: FilterFieldDefinition[];
  hasActive: (fieldId: string) => boolean;
  onPick: (f: FilterFieldDefinition) => void;
}) {
  return (
    <div className="vds-data-table-filter-drawer-section">
      <div className="vds-data-table-filter-drawer-section-title">{title}</div>
      <div className="vds-data-table-filter-drawer-fields">
        {fields.map((field) => (
          <div
            key={field.id}
            role="button"
            tabIndex={0}
            onClick={() => onPick(field)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onPick(field);
              }
            }}
            className={cn("vds-data-table-filter-drawer-field")}
            data-active={hasActive(field.id) ? "" : undefined}
          >
            <span className="vds-data-table-filter-drawer-field-left">
              {field.icon && <span>{field.icon}</span>}
              <span>{field.label}</span>
            </span>
            <Switch
              checked={hasActive(field.id)}
              onCheckedChange={() => onPick(field)}
              aria-label={`Toggle ${field.label}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
