import { Badge } from "@virtari-packages/react-badge";
import { Button } from "@virtari-packages/react-button";
import { Card, CardContent } from "@virtari-packages/react-card";
import { CodeBlock, InlineCode } from "@virtari-packages/react-code";
import { Cluster, Grid, Stack } from "@virtari-packages/react-layout";
import { IconArrowRight, IconCheck } from "@virtari-packages/react-icons";
import { useTranslation } from "react-i18next";
import { Section } from "../components";

export function SourceInstallationPage() {
  const { i18n } = useTranslation();
  const fa = i18n.language.startsWith("fa");
  const text = (en: string, persian: string) => fa ? persian : en;
  const href = (page: string) => fa ? `#/fa/${page}` : `#/${page}`;

  const guarantees = [
    text("Only the selected component and its transitive source dependencies are added.", "فقط کامپوننت انتخاب‌شده و وابستگی‌های سورسی لازم آن اضافه می‌شوند."),
    text("Internal imports are relative; installed code has no Virtari package dependency at runtime.", "ایمپورت‌های داخلی نسبی‌اند و کد نصب‌شده در زمان اجرا به پکیج ویرتاری وابسته نیست."),
    text("Changed files are protected until you explicitly review and overwrite them.", "فایل‌های تغییرکرده تا زمانی که خودتان بررسی و overwrite را تأیید نکنید محفوظ می‌مانند."),
    text("Required third-party packages are added to the host project's package.json.", "پکیج‌های جانبی لازم به package.json پروژهٔ میزبان افزوده می‌شوند."),
  ];

  return <>
    <Section
      title={text("Install editable source", "نصب سورس قابل‌ویرایش")}
      description={text("Virtari places ordinary React and CSS files in your project, following the same source-ownership idea as shadcn.", "ویرتاری فایل‌های عادی React و CSS را با همان ایدهٔ مالکیت سورس shadcn داخل پروژهٔ شما قرار می‌دهد.")}
    >
      <CodeBlock renderer="static" language="shell" code={"pnpm dlx virtari@latest init\npnpm dlx virtari@latest add button"} />
      <p className="docs-prose">{text("The default destination is ", "مسیر پیش‌فرض ")}<InlineCode>src/virtari</InlineCode>{text(". Import the shared foundation once, then import each local component from that directory.", " است. استایل پایه را یک‌بار و سپس هر کامپوننت محلی را از همین مسیر ایمپورت کنید.")}</p>
      <CodeBlock renderer="static" language="tsx" filename="App.tsx" code={'import "./virtari/styles/index.css";\nimport { Button } from "./virtari/components/button";\n\nexport function App() {\n  return <Button>Continue</Button>;\n}'} />
    </Section>

    <Section title={text("Choose any scope", "انتخاب هر محدوده")}
      description={text("Install one component, several related components, optional utility classes, or the complete collection.", "یک کامپوننت، چند کامپوننت مرتبط، کلاس‌های utility اختیاری یا کل مجموعه را نصب کنید.")}>
      <Grid minItemWidth="16rem" gap="md">
        <Card variant="soft"><CardContent><Stack gap="sm"><Badge variant="soft">{text("One component", "یک کامپوننت")}</Badge><CodeBlock renderer="static" language="shell" code="pnpm dlx virtari@latest add input" /></Stack></CardContent></Card>
        <Card variant="soft"><CardContent><Stack gap="sm"><Badge variant="soft">{text("Several components", "چند کامپوننت")}</Badge><CodeBlock renderer="static" language="shell" code="pnpm dlx virtari@latest add button input dialog" /></Stack></CardContent></Card>
        <Card variant="soft"><CardContent><Stack gap="sm"><Badge variant="soft">{text("Utility classes", "کلاس‌های Utility")}</Badge><CodeBlock renderer="static" language="shell" code="pnpm dlx virtari@latest add virtari-utilities" /></Stack></CardContent></Card>
        <Card variant="soft"><CardContent><Stack gap="sm"><Badge variant="soft">{text("Complete system", "کل سیستم")}</Badge><CodeBlock renderer="static" language="shell" code="pnpm dlx virtari@latest add virtari-all" /></Stack></CardContent></Card>
      </Grid>
      <CodeBlock renderer="static" language="shell" filename={text("Discover all registry items", "مشاهدهٔ تمام آیتم‌های رجیستری")} code="pnpm dlx virtari@latest list" />
    </Section>

    <Section title={text("What is copied", "چه چیزهایی کپی می‌شوند")}>
      <Stack gap="sm">
        {guarantees.map(item => <Cluster key={item} align="start"><IconCheck aria-hidden="true" size={18}/><span>{item}</span></Cluster>)}
      </Stack>
      <CodeBlock renderer="static" language="plaintext" code={"src/virtari/\n├── LICENSE\n├── styles/\n│   ├── index.css\n│   ├── core/\n│   └── tokens/\n├── components/\n│   └── button/\n└── lib/"} />
    </Section>

    <Section title={text("Customize and update safely", "شخصی‌سازی و به‌روزرسانی امن")}>
      <p className="docs-prose">{text("After installation the files belong to the application. Edit markup, props, CSS, tokens, and motion directly. Before replacing an edited component, inspect the upstream change.", "بعد از نصب، فایل‌ها متعلق به اپلیکیشن هستند. مارکاپ، پراپ‌ها، CSS، توکن‌ها و حرکت را مستقیم تغییر دهید. پیش از جایگزینی کامپوننت ویرایش‌شده، تغییر نسخهٔ جدید را بررسی کنید.")}</p>
      <CodeBlock renderer="static" language="shell" code={"pnpm dlx virtari@latest diff button\npnpm dlx virtari@latest add button --dry-run\npnpm dlx virtari@latest add button --overwrite\npnpm dlx virtari@latest doctor"} />
    </Section>

    <Section title={text("Use the shadcn CLI", "استفاده با CLI خود shadcn")}>
      <p className="docs-prose">{text("The public registry also follows shadcn's GitHub registry protocol. Pinning the release tag keeps installation reproducible.", "رجیستری عمومی با پروتکل GitHub رجیستری shadcn هم سازگار است. پین‌کردن تگ انتشار، نصب را قابل‌بازتولید نگه می‌دارد.")}</p>
      <CodeBlock renderer="static" language="shell" code="pnpm dlx shadcn@latest add IamMrTrick/virtari-ui/button#cli-v0.1.1" />
      <Button asChild variant="soft" rightSection={<IconArrowRight className="docs-directional-icon" size={16}/>}><a href={href("button")}>{text("Open component documentation", "مشاهدهٔ مستندات کامپوننت‌ها")}</a></Button>
    </Section>
  </>;
}
