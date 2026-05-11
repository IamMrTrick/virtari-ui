# @virtari-packages/react-date-picker

Headless, accessible, tokens-first date / time / range / calendar primitives for the Virtari design system.

Built on [`react-aria`](https://react-spectrum.adobe.com/react-aria) hooks and [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date) — ships Persian (Jalali), Islamic (Umm al-Qura / civil), Gregorian, Hebrew, Buddhist, Japanese, Indian, Ethiopic, and ROC calendars out of the box, with RTL support.

## Install

```bash
pnpm add @virtari-packages/react-date-picker
```

Import the CSS you use:

```ts
// one per primitive you render
import "@virtari-packages/react-date-picker/styles";
import "@virtari-packages/react-date-picker/calendar/styles";
import "@virtari-packages/react-date-picker/date-field/styles";
import "@virtari-packages/react-date-picker/time-field/styles";
import "@virtari-packages/react-date-picker/range-picker/styles";
```

Wrap your app in `I18nProvider` once (from `@react-aria/i18n`) so locale and direction propagate.

## Primitives

- `DatePicker` — single date, input + popover calendar.
- `DateRangePicker` — start / end with hover-preview highlight.
- `DateField` — segmented date-only input, no popover (form friendly).
- `TimeField` — segmented time input with a snapping wheel picker (12h / 24h, optional seconds and milliseconds).
- `Calendar` / `RangeCalendar` — standalone panels.

Every primitive supports: `size` (`2xs`–`2xl` — shared ramp with Button/Input/Select), `appearance` (`soft`|`outline`|`ghost`|`filled`), `invalid`, keyboard a11y, RTL, min/max, and disabled dates.

## Without modal or drawer

Use `overlayMode="popover"` to keep `DatePicker`, `DateRangePicker`, or `TimeField`
out of the mobile drawer/dialog presentation. For fully inline UIs, compose the
standalone primitives:

```tsx
<DateField value={date} onChange={setDate} />
<Calendar value={date} onChange={setDate} />
<RangeCalendar value={range} onChange={setRange} />
<TimeField value={time} onChange={setTime} showPicker={false} />
```

## License

MIT. Third-party engines (`react-aria`, `@internationalized/date`) are Apache-2.0 — see `THIRD_PARTY_LICENSES.txt`.
