import { DateFilter } from "./DateFilter";
import { FilterPopover } from "./FilterPopover";
import { NumberFilter } from "./NumberFilter";
import { SelectFilter } from "./SelectFilter";
import { TextFilter } from "./TextFilter";

export { DateFilter, FilterPopover, NumberFilter, SelectFilter, TextFilter };
export type { DateFilterProps, DateRange } from "./DateFilter";
export type { FilterPopoverProps } from "./FilterPopover";
export type { NumberFilterProps, NumberRange } from "./NumberFilter";
export type { SelectFilterOption, SelectFilterProps } from "./SelectFilter";
export type { TextFilterProps } from "./TextFilter";

export const Filters = {
  Text: TextFilter,
  Number: NumberFilter,
  Select: SelectFilter,
  Date: DateFilter,
  Popover: FilterPopover,
} as const;
