# @virtari-packages/react-file-upload

Virtari file upload — compound dropzone + file list with controlled/uncontrolled state, built on `react-dropzone`.

> **Private package.** Published to GitHub Packages and consumable only with a GitHub Personal Access Token that has `read:packages` scope. See [Install from GitHub Packages](#install-from-github-packages) below.

---

## Demo

Live examples in the docs app:

- Single-image avatar picker with preview
- Multi-file upload with custom render for non-images
- Validation & rejection handling (file-too-large, file-invalid-type, too-many-files)

→ [`http://localhost:5173/#/file-upload`](http://localhost:5173/#/file-upload)

Run the docs locally:

```bash
pnpm -C apps/docs dev
```

Demo source: [apps/docs/src/pages/FileUploadPage.tsx](../../apps/docs/src/pages/FileUploadPage.tsx)

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
npm install @virtari-packages/react-file-upload
# or
pnpm add @virtari-packages/react-file-upload
# or
yarn add @virtari-packages/react-file-upload
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`. `react-dropzone` is a regular dependency (not peer) — it's an implementation detail.

## Usage

```tsx
import { FileUpload } from "@virtari-packages/react-file-upload";
import "@virtari-packages/react-file-upload/styles";
import { Button } from "@virtari-packages/react-button";
import { IconUpload } from "@virtari-packages/react-icons";

function Avatar() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload.Root
      accept={{ "image/*": [".png", ".jpg", ".webp"] }}
      maxSize={5 * 1024 * 1024}
      maxFiles={1}
      files={files}
      onFilesChange={setFiles}
      onReject={(rs) => console.warn(rs)}
    >
      <FileUpload.Dropzone>
        {({ isDragActive }) => (
          <>
            <IconUpload />
            <p>{isDragActive ? "Drop here" : "Drag or browse"}</p>
            <FileUpload.Trigger asChild>
              <Button variant="outline">Browse</Button>
            </FileUpload.Trigger>
          </>
        )}
      </FileUpload.Dropzone>
      <FileUpload.List>
        {files.map((f) => (
          <FileUpload.Item key={f.name} file={f}>
            <FileUpload.Preview file={f} />
            <FileUpload.Item.Name />
            <FileUpload.Item.Size />
            <FileUpload.Item.Remove />
          </FileUpload.Item>
        ))}
      </FileUpload.List>
    </FileUpload.Root>
  );
}
```

### Scope

The package handles **selection + validation** only. Upload (XHR / `fetch` / streamed multipart) is your job. Pass per-item progress to `FileUpload.Item.Progress` if you want a built-in progress bar:

```tsx
<FileUpload.Item file={f} progress={progressByName[f.name]}>
  <FileUpload.Item.Name />
  <FileUpload.Item.Progress />
</FileUpload.Item>
```

### Integration with `react-form`

Compose via RHF's `Controller`:

```tsx
<FormField
  control={form.control}
  name="avatar"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Avatar</FormLabel>
      <FileUpload.Root
        files={field.value ?? []}
        onFilesChange={field.onChange}
        accept={{ "image/*": [".png", ".jpg"] }}
        maxSize={5 * 1024 * 1024}
        maxFiles={1}
      >
        {/* Dropzone / List / Item / Preview */}
      </FileUpload.Root>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Import styles

```ts
import "@virtari-packages/react-file-upload/styles";
```

Styles sit in the `design-system.components` cascade layer.

## Design tokens

This package reads `@virtari-packages/tokens` CSS variables and defines `--vds-file-upload-*` tokens for the dropzone border, background, item layout, preview thumbnail size, and remove button. Data attributes `[data-drag-active]`, `[data-drag-reject]`, and `[data-disabled]` drive the visual state changes.

## Accessibility & RTL

- Dropzone gets `role="button"` + `tabIndex={0}` + keyboard focus from `react-dropzone`
- Trigger uses `asChild` so it inherits the focus and ARIA semantics of your `<Button>`
- Each Remove button is labelled `Remove {filename}`
- Layout uses logical CSS properties; the Remove button sits at `margin-inline-start: auto` so it auto-flips in RTL

## Links

- [Repository](https://github.com/Virtari-Packages/virtari-design-system)
- [Issues](https://github.com/Virtari-Packages/virtari-design-system/issues)
- [Changelog](./CHANGELOG.md)

## License

[MIT](./LICENSE) © 2026 Virtari.
