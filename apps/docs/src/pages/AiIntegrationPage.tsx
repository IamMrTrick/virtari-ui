import { InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import { Stack } from "@virtari-packages/react-layout";
import { Section } from "../components";
import { ReferenceCode, useReferenceLanguage } from "../components/KnowledgeReference";

const setup = `pnpm install --frozen-lockfile
pnpm ai:build
pnpm mcp:build
pnpm mcp:test`;
const config = JSON.stringify({ mcpServers: { virtari: { command: "node", args: ["/absolute/path/virtari-design-system/apps/mcp/dist/server.mjs"] } } }, null, 2);

export function AiIntegrationPage() {
  const { text } = useReferenceLanguage();
  return <Stack gap="xl" className="docs-reference">
    <Section title={text("One reference, three ways to read it", "یک مرجع، سه راه برای خواندن")}
      description={text("Focused skills, a local MCP server and plain files share the same source-derived catalog. They help an agent discover Virtari; they do not train a model or automatically register an integration in every AI client.", "اسکیل‌های موضوعی، سرور محلی MCP و فایل‌های ساده از یک فهرست مشترک مبتنی بر منبع استفاده می‌کنند. این‌ها به ایجنت کمک می‌کنند ویرتاری را بشناسد؛ مدل را آموزش نمی‌دهند و در همهٔ کلاینت‌ها خودکار ثبت نمی‌شوند.")}>
      <ul className="docs-reference-links">
        <li><a className="docs-reference-link" href="/llms.txt">llms.txt</a> — {text("compact discovery index", "فهرست کوتاه برای کشف منابع")}</li>
        <li><a className="docs-reference-link" href="/ai/index.md">AI index</a> — {text("packages, foundations and skills", "پکیج‌ها، مبانی و اسکیل‌ها")}</li>
        <li><a className="docs-reference-link" href="/ai/catalog.json">catalog.json</a> — {text("searchable records and provenance", "رکوردها و اطلاعات منبع")}</li>
        <li><a className="docs-reference-link" href="/ai/skills/virtari-design-system/SKILL.md">Virtari router skill</a> — {text("start here to choose a focused skill", "شروع انتخاب اسکیل مرتبط")}</li>
      </ul>
    </Section>
    <Section title={text("Install project-aware skills", "نصب اسکیل‌های آگاه از پروژه")}>
      <p className="docs-prose">{text("The Virtari CLI ships the complete generated skill bundle. init installs it into .agents/skills and adds a managed AGENTS.md contract by default, so an agent reads the router skill before implementing UI.", "CLI ویرتاری کل مجموعهٔ اسکیل‌های تولیدشده را همراه خود دارد. دستور init به‌صورت پیش‌فرض آن را در .agents/skills نصب می‌کند و قرارداد مدیریت‌شدهٔ AGENTS.md را اضافه می‌کند تا ایجنت پیش از ساخت UI اسکیل اصلی را بخواند.")}</p>
      <ReferenceCode label={text("Install and maintain skills", "نصب و نگهداری اسکیل‌ها")} code={"pnpm dlx virtari@latest init\npnpm dlx virtari@latest skills list\npnpm dlx virtari@latest skills add\npnpm dlx virtari@latest skills sync"} />
      <p className="docs-prose">{text("The required workflow searches virtari.json, installed source, and the registry first. If a component exists, the agent adds and imports it. If none exists, it composes semantic HTML with Virtari layout primitives and exact utilities. Reusable component CSS consumes existing --vds-* variables; it does not invent variables, raw design values, arbitrary utilities, or Tailwind classes.", "روال الزامی ابتدا virtari.json، سورس نصب‌شده و رجیستری را جست‌وجو می‌کند. اگر کامپوننت وجود داشته باشد، ایجنت آن را اضافه و ایمپورت می‌کند. اگر وجود نداشته باشد، HTML معنایی را با primitiveهای لایه‌بندی و utilityهای دقیق ویرتاری ترکیب می‌کند. CSS کامپوننت قابل‌استفادهٔ مجدد فقط متغیرهای فعلی --vds-* را مصرف می‌کند و متغیر، مقدار خام طراحی، utility دلخواه یا کلاس Tailwind جدید نمی‌سازد.")}</p>
      <ReferenceCode label={text("Router skill", "اسکیل اصلی")} code=".agents/skills/virtari-design-system/SKILL.md" />
      <p className="docs-prose">{text("Pass one or more skill names to skills add for a focused install, omit names for the complete bundle, use --skills-dir for another project-local destination, or init --no-skills to opt out.", "برای نصب محدود، نام یک یا چند اسکیل را به skills add بدهید؛ برای کل مجموعه نام را حذف کنید، برای مسیر محلی دیگر از --skills-dir و برای انصراف از init --no-skills استفاده کنید.")}</p>
    </Section>
    <Section title={text("Connect a local MCP server", "اتصال سرور محلی MCP")}
      description={text("Requires Node.js 20+ and pnpm. Run these commands from the repository root, then configure a host that supports local stdio MCP.", "به Node.js 20 یا جدیدتر و pnpm نیاز دارید. دستورها را از ریشهٔ مخزن اجرا کنید؛ سپس میزبانی را تنظیم کنید که MCP محلی با stdio را پشتیبانی کند.")}>
      <ReferenceCode label={text("Build and verify", "ساخت و بررسی")} code={setup} />
      <ReferenceCode label={text("Host configuration example", "نمونهٔ تنظیمات میزبان")} code={config} />
      <p className="docs-prose">{text("Replace the absolute path with your checkout path. On Windows, forward slashes work in this JSON path too. This is a common host configuration shape; use your host's equivalent settings when its format differs. Launch the built Node executable so stdout remains reserved for protocol messages.", "مسیر مطلق را با مسیر مخزن خود جایگزین کنید. در ویندوز هم می‌توانید در این مسیر JSON از اسلش رو به جلو استفاده کنید. این یک قالب رایج تنظیمات است؛ اگر میزبان قالب دیگری دارد، از تنظیمات معادل آن استفاده کنید. فایل ساخته‌شده را با Node اجرا کنید تا stdout مخصوص پیام‌های پروتکل بماند.")}</p>
      <p className="docs-prose">{text("This server is read-only: it lists records and reads allowlisted source text. It does not run project commands or write files. Local stdio is not a remote HTTP URL. Browser-only or cloud clients need a separately deployed compatible service; this setup does not deploy one.", "سرور فقط خواندنی است: رکوردها و متن منابع مجاز را می‌خواند. دستور پروژه اجرا نمی‌کند و فایل نمی‌نویسد. stdio محلی یک آدرس HTTP نیست. کلاینت‌های صرفاً مرورگری یا ابری به سرویس سازگار جداگانه نیاز دارند؛ این تنظیمات چنین سرویسی منتشر نمی‌کند.")}</p>
    </Section>
    <Section title={text("Agent reading workflow", "روش مطالعه برای ایجنت")}>
      <ol className="docs-reference-links">
        <li><VirtariInlineCode>list_records</VirtariInlineCode> — {text("choose packages, sections, tokens, utilities, examples or sources; search and follow nextOffset.", "مجموعهٔ packages، sections، tokens، utilities، examples یا sources را انتخاب، جست‌وجو و nextOffset را دنبال کنید.")}</li>
        <li><VirtariInlineCode>get_record</VirtariInlineCode> — {text("read an exact ID, its API references, guidance and limitations.", "شناسهٔ دقیق، ارجاع API، راهنما و محدودیت‌های آن را بخوانید.")}</li>
        <li><VirtariInlineCode>read_source</VirtariInlineCode> — {text("read the source ID in bounded chunks until you have its imports and complete example context.", "منبع را با شناسهٔ آن در بخش‌های محدود بخوانید تا importها و متن کامل نمونه در دسترس باشد.")}</li>
      </ol>
    </Section>
    <Section title={text("Keep knowledge current", "به‌روز نگه‌داشتن دانش")}>
      <ReferenceCode label={text("After source or guidance changes", "پس از تغییر منبع یا راهنما")} code={"pnpm ai:build\npnpm ai:check\npnpm ai:test\npnpm mcp:build\npnpm mcp:test"} />
      <p className="docs-prose">{text("Edit package source and ai/authoring guidance, then regenerate. Do not patch generated catalogs or skills. ai:check detects drift; MCP checks validate the real transport. See ai/README.md and apps/mcp/README.md in the repository for the complete maintenance and compatibility notes.", "منبع پکیج و راهنمای ai/authoring را ویرایش و سپس دوباره تولید کنید. فهرست‌ها و اسکیل‌های تولیدشده را دستی تغییر ندهید. ai:check اختلاف با منبع و تست‌های MCP ارتباط واقعی را بررسی می‌کنند. جزئیات نگهداری و سازگاری در ai/README.md و apps/mcp/README.md مخزن است.")}</p>
    </Section>
  </Stack>;
}
