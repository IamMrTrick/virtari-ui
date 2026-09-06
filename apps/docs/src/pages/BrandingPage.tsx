import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardContent } from "@virtari-packages/react-card";
import { Grid, Stack, Cluster } from "@virtari-packages/react-layout";
import { Button } from "@virtari-packages/react-button";
import { IconDownload } from "@virtari-packages/react-icons";
import { Section } from "../components/Section";
import { Logo } from "../components/branding/Logo";
import { VirtariLogoLoader } from "../components/branding/VirtariLogoLoader";

export function BrandingPage() {
  const [animate, setAnimate] = useState(false);
  const { i18n } = useTranslation();
  const fa = i18n.language.startsWith("fa");
  const label = (en: string, persian: string) => fa ? persian : en;
  const marks = [
    { variant: "wordmark" as const, title: label("Wordmark", "لوگوتایپ"), file: "virtari-wordmark" },
    { variant: "mark" as const, title: label("Symbol", "نشانه"), file: "virtari-mark" },
  ];
  return <>
    <Section title={label("One identity, every surface", "یک هویت روی همهٔ سطوح")}
      description={label("The original Virtari vector artwork. Keep its proportions, leave clear space and use one contrasting color.", "فایل برداری اصلی ویرتاری؛ نسبت ابعاد را حفظ کنید، پیرامون آن فضای خالی بگذارید و از یک رنگ خوانا روی زمینه استفاده کنید.")}>
      <Grid minItemWidth="15rem" gap="lg">
        {marks.map(mark => <Card key={mark.variant}>
          <CardHeader><CardTitle>{mark.title}</CardTitle></CardHeader>
          <CardContent><Stack gap="lg">
            <div className="docs-brand-preview"><Logo variant={mark.variant} height={64} title="Virtari" /></div>
            <Button asChild variant="soft" color="contrast" leftSection={<IconDownload aria-hidden="true" />}>
              <a href={`/brand/${mark.file}.svg`} download>{label("Download SVG", "دریافت SVG")}</a>
            </Button>
          </Stack></CardContent>
        </Card>)}
      </Grid>
      <p className="docs-prose">{label("Use the wordmark where the name needs to be recognizable. Use the symbol for compact navigation. A home link supplies the accessible name; decorative SVGs inside it stay hidden from assistive technology.", "وقتی نام برند باید دیده شود از لوگوتایپ و در ناوبری فشرده از نشانه استفاده کنید. نام دسترس‌پذیر روی لینک خانه قرار می‌گیرد؛ SVG تزئینی داخل لینک دوباره خوانده نمی‌شود.")}</p>
    </Section>
    <Section title={label("Loading with continuity", "لودینگ با هویت مشترک")}
      description={label("The original two-part drawing animation appears while the app starts, then gives way to the page as soon as it is ready.", "انیمیشن اصلی رسم دو بخش لوگو هنگام شروع برنامه نمایش داده می‌شود و به‌محض آماده‌شدن صفحه کنار می‌رود.")}>
      <Card><CardContent><Stack gap="md">
        <VirtariLogoLoader fullScreen={false} animated={animate} label={label("Virtari loading animation preview", "پیش‌نمایش انیمیشن لودینگ ویرتاری")} />
        <Cluster><Button variant="soft" color="contrast" aria-pressed={animate} onClick={() => setAnimate(value => !value)}>{animate ? label("Pause animation", "توقف انیمیشن") : label("Play animation", "پخش انیمیشن")}</Button></Cluster>
      </Stack></CardContent></Card>
      <p className="docs-prose">{label("Reduced-motion preferences show a static mark. Use a local loading indicator for an individual action; reserve the full-page mark for application startup.", "با فعال‌بودن کاهش حرکت، نشانه ثابت نمایش داده می‌شود. برای یک اقدام داخل صفحه از نشانگر محلی استفاده کنید؛ لودینگ تمام‌صفحه برای شروع برنامه است.")}</p>
    </Section>
    <Section title={label("App icons", "آیکون‌های برنامه")}>
      <Card><CardContent><Cluster gap="lg">
        <img src="/android-chrome-192x192.png" width={64} height={64} alt={label("Virtari app icon", "آیکون برنامهٔ ویرتاری")} />
        <Stack gap="sm">
          <p className="docs-prose">{label("Original favicon, Apple touch icon and 192/512px app icons are included. The manifest identifies this application as Virtari Design System.", "فاوآیکون اصلی، آیکون Apple و آیکون‌های ۱۹۲ و ۵۱۲ پیکسلی وارد شده‌اند. مانیفست این برنامه را با نام Virtari Design System معرفی می‌کند.")}</p>
          <Cluster><Button asChild variant="ghost" color="contrast"><a href="/favicon.ico" download>{label("Favicon", "فاوآیکون")}</a></Button><Button asChild variant="ghost" color="contrast"><a href="/android-chrome-512x512.png" download>{label("512px icon", "آیکون ۵۱۲ پیکسلی")}</a></Button></Cluster>
        </Stack>
      </Cluster></CardContent></Card>
    </Section>
  </>;
}
