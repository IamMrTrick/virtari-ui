# @virtari-packages/react-form

Virtari form — `react-hook-form` + `zod` wrapper with `Field` / `Label` / `Control` / `Description` / `Message` primitives.

> **Private package.** Published to GitHub Packages and consumable only with a GitHub Personal Access Token that has `read:packages` scope. See [Install from GitHub Packages](#install-from-github-packages) below.

---

## Demo

Live examples in the docs app:

- Signup form (email + password + confirm + agree) with zod validation
- Mixed controls (Input + Select + Checkbox) composed via `Controller`

→ [`http://localhost:5173/#/form`](http://localhost:5173/#/form)

Run the docs locally:

```bash
pnpm -C apps/docs dev
```

Demo source: [apps/docs/src/pages/FormPage.tsx](../../apps/docs/src/pages/FormPage.tsx)

## Install from GitHub Packages

Create or edit `.npmrc` at the root of the consuming project:

```ini
@virtari-packages:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Export a token with `read:packages` permission (locally or in CI):

```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx
```

Then install as you would any scoped package:

```bash
npm install @virtari-packages/react-form react-hook-form
# optional — zod schema validation
npm install zod @hookform/resolvers
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom` and `react-hook-form ^7`. `zod` and `@hookform/resolvers` are not required but are the recommended validation stack.

## Usage

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@virtari-packages/react-form";
import "@virtari-packages/react-form/styles";
import { Input } from "@virtari-packages/react-input";

const schema = z.object({ email: z.string().email() });

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => console.log(v))}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" {...field} /></FormControl>
              <FormDescription>We never share this.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
```

### How it works

- `<FormItem>` generates a stable base id and provides `FormItemContext`.
- `<FormLabel>` reads the base id and sets `htmlFor`; adds `data-error` when the field is invalid.
- `<FormControl>` is a `Slot` that injects `id`, `aria-describedby`, and `aria-invalid` onto whatever child it wraps — works with `<Input>`, `<Select>`, `<Checkbox>`, `<DatePicker>`, and any custom control.
- `<FormDescription>` renders helper text and is always linked via `aria-describedby`.
- `<FormMessage>` renders the validation error (if any). Both description and message are exposed to assistive tech.

### Import styles

```ts
import "@virtari-packages/react-form/styles";
```

Styles are minimal — just vertical rhythm inside `<FormItem>` and the error tone for `FormMessage`.

## Design tokens

This package reads `@virtari-packages/tokens` CSS variables and defines `--vds-form-*` for gaps and message color. Override at `:root` (or a subtree) to retheme.

## Accessibility & RTL

- `aria-describedby` on every control includes the description and (when invalid) the message ids
- `aria-invalid` is set on the control — not just the label — so screen readers announce errors
- `<FormMessage>` has `role="alert"` so screen readers read new errors immediately
- Layout uses logical properties; `FormItem` supports an `orientation="horizontal"` data-attr for inline checkbox/switch rows

## Links

- [Repository](https://github.com/IamMrTrick/virtari-ui)
- [Issues](https://github.com/IamMrTrick/virtari-ui/issues)
- [Changelog](./CHANGELOG.md)

## License

[MIT](./LICENSE) © 2026 Virtari.
