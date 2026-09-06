import { Badge } from "@virtari-packages/react-badge";
import { Button } from "@virtari-packages/react-button";
import { CodeBlock, InlineCode } from "@virtari-packages/react-code";
import { Cluster, Stack } from "@virtari-packages/react-layout";
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

  const installScopes = [
    { label: text("One component", "یک کامپوننت"), command: "pnpm dlx virtari@latest add input" },
    { label: text("Several components", "چند کامپوننت"), command: "pnpm dlx virtari@latest add button input dialog" },
    { label: text("Utility classes", "کلاس‌های Utility"), command: "pnpm dlx virtari@latest add virtari-utilities" },
    { label: text("Complete system", "کل سیستم"), command: "pnpm dlx virtari@latest add virtari-all" },
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
      <div className="docs-install-options">
        {installScopes.map(scope => <div className="docs-install-option" key={scope.command}>
          <Badge variant="soft" size="sm">{scope.label}</Badge>
          <CodeBlock renderer="static" language="shell" code={scope.command} />
        </div>)}
      </div>
      <CodeBlock renderer="static" language="shell" filename={text("Discover all registry items", "مشاهدهٔ تمام آیتم‌های رجیستری")} code="pnpm dlx virtari@latest list" />
    </Section>

    <Section
      title={text("Next.js App Router", "Next.js App Router")}
      description={text("Virtari is verified with Next.js 16 and React 19. The CLI copies the component source into the application, so it works with the App Router without a Virtari runtime package.", "ویرتاری با Next.js 16 و React 19 تست شده است. CLI سورس کامپوننت‌ها را داخل اپلیکیشن کپی می‌کند؛ بنابراین با App Router و بدون پکیج runtime ویرتاری کار می‌کند.")}
    >
      <Badge color="success" variant="soft" dot>{text("Next.js supported", "پشتیبانی‌شده در Next.js")}</Badge>
      <CodeBlock renderer="static" language="shell" code={"pnpm create next-app@latest my-app --ts --app --src-dir\ncd my-app\npnpm dlx virtari@latest init\npnpm dlx virtari@latest add button badge card input"} />
      <p className="docs-prose">{text("Import the shared stylesheet once in the root layout. With the default ", "استایل مشترک را یک‌بار در layout ریشه ایمپورت کنید. با مسیر پیش‌فرض ")}<InlineCode>src/virtari</InlineCode>{text(" destination, the relative path from ", "، مسیر نسبی از ")}<InlineCode>src/app/layout.tsx</InlineCode>{text(" is:", " این است:")}</p>
      <CodeBlock renderer="static" language="tsx" filename="src/app/layout.tsx" code={'import "../virtari/styles/index.css";\nimport "./globals.css";'} />
      <p className="docs-prose">{text("Pages can remain Server Components. Put interactive Virtari controls inside a Client Component; the client boundary also covers its local Virtari imports.", "صفحه می‌تواند Server Component باقی بماند. کنترل‌های تعاملی ویرتاری را داخل یک Client Component قرار دهید؛ همان مرز client ایمپورت‌های محلی ویرتاری را هم پوشش می‌دهد.")}</p>
      <CodeBlock renderer="static" language="tsx" filename="src/components/CallToAction.tsx" code={'"use client";\n\nimport { Button } from "@/virtari/components/button";\n\nexport function CallToAction() {\n  return <Button onClick={() => alert("Ready")}>Get started</Button>;\n}'} />
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
      <CodeBlock renderer="static" language="shell" code="pnpm dlx shadcn@latest add IamMrTrick/virtari-ui/button#cli-v0.1.2" />
      <Button asChild variant="soft" rightSection={<IconArrowRight className="docs-directional-icon" size={16}/>}><a href={href("button")}>{text("Open component documentation", "مشاهدهٔ مستندات کامپوننت‌ها")}</a></Button>
    </Section>
  </>;
}
