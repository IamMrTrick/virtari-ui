import { FormProvider } from "react-hook-form";

/**
 * Alias of react-hook-form's `FormProvider`. Using `<Form {...methods}>` reads
 * more naturally in JSX than `<FormProvider>` and keeps the Virtari surface
 * consistent with `<Form>` references in our docs.
 */
export const Form = FormProvider;
