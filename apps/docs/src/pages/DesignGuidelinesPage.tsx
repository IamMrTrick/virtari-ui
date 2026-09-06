import { useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Stack, Cluster, Grid } from "@virtari-packages/react-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@virtari-packages/react-card";
import { InputField } from "@virtari-packages/react-input";
import { TextareaField } from "@virtari-packages/react-textarea";
import { Button } from "@virtari-packages/react-button";
import { Badge } from "@virtari-packages/react-badge";
import { Kbd } from "@virtari-packages/react-kbd";
import { SegmentedControl, SegmentedControlItem } from "@virtari-packages/react-segmented-control";
import { Section } from "../components";
import { ShapeHierarchyExample } from "../components/ShapeHierarchyExample";

type Copy = (english: string, persian: string) => string;
function GuidanceCard({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return <Card variant="soft"><CardHeader><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader>{children && <CardContent>{children}</CardContent>}</Card>;
}

function FieldAnatomy({ copy }: { copy: Copy }) {
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [complete, setComplete] = useState(false);
  return <Card><CardHeader><CardTitle>{copy("Project updates", "خبرهای پروژه")}</CardTitle><CardDescription>{copy("A local example. Email is required; notes are optional. Nothing is sent or stored.", "یک نمونهٔ محلی؛ ایمیل الزامی و یادداشت اختیاری است. اطلاعات ارسال یا ذخیره نمی‌شود.")}</CardDescription></CardHeader><CardContent>
    <form noValidate onSubmit={event => {
      event.preventDefault();
      const valid = emailRef.current?.validity.valid ?? false;
      setInvalid(!valid);
      setComplete(valid);
      if (!valid) emailRef.current?.focus();
    }}><Stack gap="lg">
      <InputField ref={emailRef} label={copy("Email", "ایمیل")} required name="email" type="email" autoComplete="email" inputMode="email" dir="ltr"
        description={copy("Use an address where you can receive project updates.", "آدرسی وارد کنید که بتوانید خبرهای پروژه را در آن دریافت کنید.")}
        placeholder="you@example.com" value={email} invalid={invalid}
        error={invalid ? copy("Enter an email address such as you@example.com.", "ایمیلی مانند you@example.com وارد کنید.") : undefined}
        onBlur={event => { if (event.currentTarget.value) setInvalid(!event.currentTarget.validity.valid); }}
        onChange={event => { setEmail(event.currentTarget.value); setComplete(false); if (invalid) setInvalid(!event.currentTarget.validity.valid); }}/>
      <TextareaField label={copy("Notes (optional)", "یادداشت (اختیاری)")} name="notes" value={notes} rows={3}
        description={copy("Include only what the team needs to know.", "فقط اطلاعات موردنیاز تیم را بنویسید.")}
        onChange={event => { setNotes(event.currentTarget.value); setComplete(false); }}/>
      <Cluster gap="sm"><Button type="submit">{copy("Preview confirmation", "پیش‌نمایش تأیید")}</Button><Button type="button" variant="outline" color="contrast" onClick={() => { setEmail(""); setNotes(""); setInvalid(false); setComplete(false); emailRef.current?.focus(); }}>{copy("Reset example", "بازنشانی نمونه")}</Button></Cluster>
      <p role="status" className="docs-prose" style={{ margin: 0, minBlockSize: "1.75em" }}>{complete ? copy("The example is valid. In a product, confirm success after the server accepts the request.", "ورودی نمونه معتبر است. در محصول، موفقیت را پس از پذیرش درخواست توسط سرور اعلام کنید.") : ""}</p>
    </Stack></form>
  </CardContent></Card>;
}

export function DesignGuidelinesPage() {
  const { i18n } = useTranslation();
  const fa = i18n.language.startsWith("fa");
  const copy: Copy = (english, persian) => fa ? persian : english;
  const href = (page: string) => `#/${fa ? "fa/" : ""}${page}`;
  const [density, setDensity] = useState("comfortable");
  const patterns = [
    { title: copy("A single field", "یک فیلد"), body: copy("Use InputField, SelectField or TextareaField for a connected label, control, help and error. Reserve placeholder text for an example.", "از InputField، SelectField یا TextareaField برای اتصال برچسب، کنترل، راهنما و خطا استفاده کنید. متن جای‌نگهدار فقط نمونه باشد."), path: "input" },
    { title: copy("A complete form", "یک فرم کامل"), body: copy("Compose Form with native names and autocomplete. Keep entered values after a failed request and place related controls in one group.", "Form را با نام‌های بومی و autocomplete ترکیب کنید. پس از درخواست ناموفق ورودی‌ها را نگه دارید و کنترل‌های مرتبط را گروه‌بندی کنید."), path: "form" },
    { title: copy("A choice or disclosure", "انتخاب یا بازشو"), body: copy("Use SegmentedControl for a single choice, Tabs for panels, NavSubmenu for navigation and Drawer for a temporary surface. Keep their focus behavior intact.", "برای یک انتخاب از SegmentedControl، برای پنل‌ها از Tabs، برای ناوبری از NavSubmenu و برای سطح موقت از Drawer استفاده کنید؛ رفتار فوکوس آن‌ها را حفظ کنید."), path: "composition" },
  ];
  return <>
    <ShapeHierarchyExample />
    <Section title={copy("Make every field understandable", "هر فیلد را قابل‌فهم کنید")} description={copy("Try submitting the empty example, correct the email, then submit again. Help stays available while the error explains the next step.", "نمونهٔ خالی را ثبت کنید، ایمیل را اصلاح کنید و دوباره ثبت کنید. راهنما باقی می‌ماند و خطا قدم بعدی را توضیح می‌دهد.")}>
      <FieldAnatomy copy={copy}/>
      <ul className="docs-prose">
        <li>{copy("Keep a visible, connected label. Mark required inputs before someone starts typing.", "برچسبی قابل‌مشاهده و متصل به کنترل داشته باشید. فیلد الزامی را پیش از شروع ورود مشخص کنید.")}</li>
        <li>{copy("Put format instructions near the field. Errors identify the problem and describe a correction; color alone is not the message.", "راهنمای قالب را نزدیک فیلد قرار دهید. خطا باید مشکل و روش اصلاح را توضیح دهد؛ رنگ به‌تنهایی پیام نیست.")}</li>
        <li>{copy("Keep the control stable while typing or autofilling. Validate at a useful point, then let people correct their entry.", "کنترل را هنگام تایپ یا تکمیل خودکار ثابت نگه دارید. در زمان مناسب اعتبارسنجی کنید و فرصت اصلاح بدهید.")}</li>
      </ul>
      <p className="docs-prose"><a href="https://www.w3.org/WAI/tutorials/forms/instructions/">{copy("W3C: form instructions", "W3C: راهنمای فرم")}</a>{" · "}<a href="https://www.w3.org/WAI/tutorials/forms/notifications/">{copy("W3C: errors and confirmation", "W3C: خطا و تأیید")}</a></p>
    </Section>
    <Section title={copy("Give actions a clear hierarchy", "به اقدام‌ها سلسله‌مراتب بدهید")} description={copy("Virtari's default: one emphasized next step per action group. Keep alternatives quieter and name the outcome, as in the example above.", "قاعدهٔ ویرتاری: در هر گروه اقدام، یک قدم بعدی برجسته باشد. جایگزین‌ها آرام‌تر باشند و نام دکمه نتیجه را بگوید؛ مانند نمونهٔ بالا.")}>
      <Grid gap="md" minItemWidth="12rem">
        <GuidanceCard title={copy("Primary", "اصلی")} description={copy("Solid for the intended next step: save, submit, or continue.", "حالت Solid برای قدم بعدی موردنظر: ذخیره، ثبت یا ادامه.")}><Badge>solid</Badge></GuidanceCard>
        <GuidanceCard title={copy("Alternative", "جایگزین")} description={copy("Outline or soft for another valid path. Avoid competing with the primary action.", "حالت Outline یا Soft برای مسیر معتبر دیگر؛ با اقدام اصلی رقابت نکند.")}><Badge color="neutral">outline / soft</Badge></GuidanceCard>
        <GuidanceCard title={copy("Low emphasis", "تأکید کم")} description={copy("Ghost for a quiet action; a real link for navigation. Give icon-only actions an accessible name.", "حالت Ghost برای اقدام کم‌اهمیت‌تر و لینک واقعی برای ناوبری. دکمهٔ فقط‌آیکون نام دسترس‌پذیر داشته باشد.")}><Badge color="neutral">ghost / link</Badge></GuidanceCard>
      </Grid>
      <p className="docs-prose"><a href="https://developer.android.com/develop/ui/compose/components/button">{copy("Material: button emphasis and purpose", "متریال: تأکید و هدف دکمه‌ها")}</a></p>
    </Section>
    <Section title={copy("Make keyboard use predictable", "کار با کیبورد را پیش‌بینی‌پذیر کنید")}>
      <Card variant="soft"><CardContent><Stack gap="md">
        <p className="docs-prose" style={{ margin: 0 }}><Kbd>Tab</Kbd>{" "}{copy("enters this choice group; arrow keys change the choice. Tab again moves on.", "وارد این گروه انتخاب می‌شود؛ کلیدهای جهت انتخاب را تغییر می‌دهند و Tab بعدی خارج می‌شود.")}</p>
        <SegmentedControl value={density} onValueChange={setDensity} aria-label={copy("Example density", "تراکم نمونه")}>
          <SegmentedControlItem value="comfortable">{copy("Comfortable", "راحت")}</SegmentedControlItem><SegmentedControlItem value="compact">{copy("Compact", "فشرده")}</SegmentedControlItem>
        </SegmentedControl>
        <p className="docs-prose" style={{ margin: 0 }}>{copy("Selected:", "انتخاب‌شده:")}{" "}{density === "comfortable" ? copy("Comfortable", "راحت") : copy("Compact", "فشرده")}</p>
      </Stack></CardContent></Card>
      <ul className="docs-prose"><li>{copy("Preserve DOM reading order and visible focus. Avoid positive tabindex values.", "ترتیب خواندن DOM و فوکوس قابل‌مشاهده را حفظ کنید. از tabindex مثبت پرهیز کنید.")}</li><li>{copy("When a dialog closes, return focus to its trigger or a logical next step. Test Escape, Tab and Shift+Tab with real content.", "پس از بستن دیالوگ، فوکوس را به بازکننده یا قدم منطقی بعدی برگردانید. Escape، Tab و Shift+Tab را با محتوای واقعی آزمایش کنید.")}</li></ul>
      <p className="docs-prose"><a href="https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/">{copy("W3C APG: keyboard conventions and focus", "W3C APG: قراردادهای کیبورد و فوکوس")}</a></p>
    </Section>
    <Section title={copy("Compose patterns, not copies", "الگوها را ترکیب کنید، کپی نسازید")} description={copy("Share behavior through the system's components. Check the finished flow with keyboard, touch, zoom, RTL and the fonts your product actually uses.", "رفتار را با کامپوننت‌های سیستم به اشتراک بگذارید. جریان نهایی را با کیبورد، لمس، بزرگ‌نمایی، راست‌به‌چپ و فونت واقعی محصول بررسی کنید.")}>
      <Stack gap="md">{patterns.map(pattern => <GuidanceCard key={pattern.path} title={pattern.title} description={pattern.body}><Button asChild variant="link"><a href={href(pattern.path)}>{copy("Open component guidance", "مشاهدهٔ راهنمای کامپوننت")}</a></Button></GuidanceCard>)}</Stack>
    </Section>
    <Section title={copy("Design the complete state", "حالت کامل را طراحی کنید")}
      description={copy("A component needs more than an ideal empty or filled preview. Make the surrounding content and recovery path part of the pattern.", "یک کامپوننت به بیش از پیش‌نمایش خالی یا پرشده نیاز دارد. متن پیرامون و مسیر بازیابی را هم بخشی از الگو بدانید.")}>
      <Grid minItemWidth="15rem" gap="md">
        <GuidanceCard title={copy("Waiting, success and recovery", "انتظار، موفقیت و بازیابی")} description={copy("Keep an action's width stable while loading, prevent duplicate activation and announce the result. An empty state explains what to do next; a failure preserves entered work and offers a useful retry.", "عرض اقدام در لودینگ ثابت بماند؛ از اجرای تکراری جلوگیری و نتیجه اعلام شود. حالت خالی قدم بعد را بگوید؛ خطا ورودی را نگه دارد و راه تلاش دوباره بدهد.")} />
        <GuidanceCard title={copy("Text and icon rhythm", "ریتم متن و آیکون")} description={copy("Use Button's section slots or mixed children, with one icon scale per size. Let line boxes grow for larger text. Judge optical alignment with the real font and script; a fixed vertical nudge cannot center every font.", "از جایگاه آیکون Button یا فرزندهای ترکیبی با اندازهٔ مشترک آیکون استفاده کنید. برای متن بزرگ‌تر فضای خط رشد کند. تراز بصری را با فونت و زبان واقعی بسنجید؛ جابه‌جایی ثابت عمودی برای همهٔ فونت‌ها جواب نمی‌دهد.")} />
        <GuidanceCard title={copy("Adaptable input", "ورودی سازگار")} description={copy("Keep native names, input types and autocomplete. Allow paste and password managers. For touch, use generous controls and spacing; verify that enlarged text and the on-screen keyboard do not hide the current task.", "نام، نوع ورودی و autocomplete بومی را حفظ کنید. Paste و پسوردمنیجر را مجاز بگذارید. برای لمس، کنترل و فاصلهٔ کافی بدهید و مطمئن شوید متن بزرگ و کیبورد صفحه، کار جاری را پنهان نمی‌کنند.")} />
        <GuidanceCard title={copy("Contrast and motion", "کنتراست و حرکت")} description={copy("Quiet borders are decorative, not an accessibility guarantee. Test text, focus and control recognition on the final background. Honor increased contrast and reduced motion, and explain important states with words as well as color.", "بوردر ملایم تزئینی است و تضمین دسترس‌پذیری نیست. خوانایی متن، فوکوس و تشخیص کنترل را روی زمینهٔ نهایی بسنجید. کنتراست بیشتر و کاهش حرکت را رعایت کنید و حالت مهم را علاوه بر رنگ، با متن توضیح دهید.")} />
      </Grid>
      <p className="docs-prose"><a href="https://www.w3.org/WAI/tips/designing/">{copy("W3C: accessible visual and interaction design", "W3C: طراحی بصری و تعامل دسترس‌پذیر")}</a></p>
    </Section>
  </>;
}
