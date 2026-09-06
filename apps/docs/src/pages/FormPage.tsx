import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@virtari-packages/react-form";
import "@virtari-packages/react-form/styles";
import { Input } from "@virtari-packages/react-input";
import "@virtari-packages/react-input/styles";
import { Checkbox } from "@virtari-packages/react-checkbox";
import "@virtari-packages/react-checkbox/styles";
import { Button } from "@virtari-packages/react-button";
import "@virtari-packages/react-button/styles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@virtari-packages/react-select";
import "@virtari-packages/react-select/styles";
import { Section } from "../components";

/* ────────────────────────────────────────────────────────────
 * Showcase 1 — Signup form (email + password + confirm + agree)
 * ──────────────────────────────────────────────────────────── */

const signupSchema = z
  .object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z.string(),
    agree: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms" }),
    }),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "Passwords don't match",
  });

type SignupValues = z.infer<typeof signupSchema>;

function SignupForm() {
  const [submitted, setSubmitted] = useState<SignupValues | null>(null);
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirm: "", agree: false as unknown as true },
    mode: "onBlur",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => setSubmitted(v))}
        style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4, 1rem)", maxInlineSize: "26rem" }}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>We&apos;ll send a confirmation link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormDescription>Minimum 8 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem orientation="horizontal">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(v) => field.onChange(v === true)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
              </FormControl>
              <FormLabel>I accept the terms and conditions</FormLabel>
              <div style={{ inlineSize: "100%" }}>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div style={{ display: "flex", gap: "var(--vds-space-2, 0.5rem)" }}>
          <Button type="submit">Create account</Button>
          <Button type="button" variant="ghost" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
      {submitted ? (
        <VirtariCodeBlock renderer="static" language="json" code={JSON.stringify(submitted, null, 2)} />
      ) : null}
    </Form>
  );
}

/* ────────────────────────────────────────────────────────────
 * Showcase 2 — Mixed controls (Input + Select + Checkbox)
 * Demonstrates composition with primitive-backed controls via Controller.
 * ──────────────────────────────────────────────────────────── */

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Pick a role"),
  newsletter: z.boolean(),
});

type ProfileValues = z.infer<typeof profileSchema>;

function ProfileForm() {
  const [submitted, setSubmitted] = useState<ProfileValues | null>(null);
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", role: "", newsletter: true },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => setSubmitted(v))}
        style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4, 1rem)", maxInlineSize: "26rem" }}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role…" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Controls access level.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => (
            <FormItem orientation="horizontal">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(v) => field.onChange(v === true)}
                  ref={field.ref}
                />
              </FormControl>
              <FormLabel>Subscribe to product updates</FormLabel>
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
      {submitted ? (
        <VirtariCodeBlock renderer="static" language="json" code={JSON.stringify(submitted, null, 2)} />
      ) : null}
    </Form>
  );
}

export function FormPage() {
  return (
    <>
      <Section
        title="Overview"
        description="React Hook Form + zod wrapper. <Form> aliases FormProvider. <FormField> wraps Controller and publishes context. <FormItem> generates stable ids; <FormLabel>, <FormControl>, <FormDescription>, and <FormMessage> read those ids and wire aria-describedby / aria-invalid automatically."
      >
        <p style={{ margin: 0, color: "var(--vds-color-text-muted, #6b7280)" }}>
          Install peer deps: <VirtariInlineCode>react-hook-form</VirtariInlineCode>, <VirtariInlineCode>zod</VirtariInlineCode>, <VirtariInlineCode>@hookform/resolvers</VirtariInlineCode>. Styles are minimal — just layout gap and error tone.
        </p>
      </Section>

      <Section
        title="Signup form"
        description="Email + password + confirm + accept-terms. Zod validates on blur. Cross-field check (passwords match) surfaces on the `confirm` field via `refine({ path: [...] })`."
      >
        <SignupForm />
      </Section>

      <Section
        title="Mixed controls"
        description="Primitive-backed controls (Select, Checkbox) wire via `Controller` — pass field.value / field.onChange / field.ref. FormControl is the universal Slot-based adapter that injects id + aria into whatever child it wraps."
      >
        <ProfileForm />
      </Section>

      <Section
        title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { useForm } from "react-hook-form";
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

const schema = z.object({ email: z.string().email() });

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormDescription>We never share this.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}`} />
      </Section>
    </>
  );
}
