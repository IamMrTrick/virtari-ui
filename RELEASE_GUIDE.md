# Release Guide

راهنمای انتشار پکیج‌های `@virtari-packages/*` روی GitHub Packages.

---

## جریان کلی

```
کد تغییر دادی  →  changeset می‌سازی  →  push به main
                                              ↓
                         GitHub Actions (Release workflow)
                                              ↓
                  Version PR خودکار باز می‌کنه (chore(release))
                                              ↓
                                  تو merge می‌کنی
                                              ↓
                         دوباره workflow اجرا میشه
                                              ↓
                       پکیج‌ها روی GitHub Packages publish میشن
```

---

## سه فولدر کلیدی

| فولدر | نقش |
|---|---|
| `.changeset/config.json` | تنظیمات Changesets (`access: restricted`, `baseBranch: main`) |
| `.changeset/*.md` | فایل‌های تکی هر تغییر — هرکدوم یه آپدیت رو توصیف می‌کنه |
| `.github/workflows/release.yml` | Workflow که Version PR می‌سازه و publish می‌کنه |

---

## ساختار یه فایل changeset

```markdown
---
"@virtari-packages/react-button": minor
"@virtari-packages/tokens": patch
---

توضیح کوتاه چی تغییر کرد و چرا.
```

سه نوع bump:

- **`patch`** → bug fix (`0.2.1` → `0.2.2`)
- **`minor`** → feature سازگار (`0.2.1` → `0.3.0`)
- **`major`** → breaking change (`0.2.1` → `1.0.0`)

---

## سه راه برای ساختن changeset

**۱. روش رسمی (interactive):**

```bash
pnpm changeset
```

CLI تعاملی که ازت می‌پرسه کدوم پکیج‌ها bump شن، با چه نوعی، و چی تو changelog بنویسه.

**۲. دستی:** یه فایل `.md` توی `.changeset/` بساز با فرمت بالا.

**۳. خودکار:** هیچ چیزی خودکار نیست. هیچ‌وقت changeset به‌صورت خودکار ساخته نمیشه — این تصمیم دست توئه.

---

## قانون طلایی

> هر commit که سورس پکیج رو دست بزنه باید با یه changeset همراه باشه.

اگه changeset نباشه، Workflow اجرا میشه ولی هیچ Version PR نمی‌سازه چون چیزی برای bump کردن نمی‌بینه. پکیج‌ها هم هیچ‌وقت publish نمیشن.

---

## بعد از merge شدن Version PR چی میشه؟

Version PR این کارا رو می‌کنه:

1. `package.json` همه‌ی پکیج‌های ذکر‌شده رو bump می‌کنه
2. `CHANGELOG.md` هر کدوم رو به‌روز می‌کنه
3. فایل‌های `.changeset/*.md` رو پاک می‌کنه (مصرف شدن)

وقتی merge کنی:

4. Workflow دوباره اجرا میشه
5. `pnpm build` همه پکیج‌ها رو می‌سازه
6. `changeset publish` پکیج‌ها رو push می‌کنه به `https://npm.pkg.github.com`
7. روی `https://github.com/orgs/Virtari-Packages/packages` می‌بینی‌شون

---

## توی پروژه‌ی مصرف‌کننده چطوری آپدیت می‌گیری

```bash
# نسخه‌ی جدید همه پکیج‌های ما
pnpm up "@virtari-packages/*" --latest

# یا فقط یه پکیج
pnpm up @virtari-packages/react-button --latest
```

برای دسترسی به registry خصوصی، `~/.npmrc` نیاز به این داره:

```
@virtari-packages:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_xxx
```

PAT باید scope `read:packages` داشته باشه (و `write:packages` اگه از همین مشین publish هم می‌کنی).

---

## چک‌لیست عملی برای هر آپدیت

- [ ] سورس‌ها رو تغییر بده
- [ ] `pnpm build` لوکال بزن تا مطمئن شی dist می‌سازه بدون ارور
- [ ] `pnpm changeset` بزن (یا فایل `.md` دستی بساز)
- [ ] commit + push به `main`
- [ ] Version PR رو روی گیت‌هاب merge کن
- [ ] صبر کن workflow publish بزنه (۲-۳ دقیقه)
- [ ] توی پروژه‌های مصرف‌کننده `pnpm up` بزن

---

## نکته‌های ظریف

1. **Scope باید با org match کنه:** GitHub Packages شدیداً سخت‌گیره — `@virtari-packages` باید با org `Virtari-Packages` یکی باشه. به همین خاطر scope از `@virtari` به `@virtari-packages` rename شد.

2. **`access: restricted` توی config حیاتیه.** اگه `public` باشه میره روی npm.org عمومی.

3. **dist توی گیت نیست.** `packages/*/dist` داخل `.gitignore`ه، چون workflow قبل از publish خودش build می‌زنه. پس دیگه اون `M`های همیشگی توی `git status` رو نمی‌بینی و لازم نیست چیزی discard کنی. فقط یادت باشه روی clone تازه اول `pnpm build` بزنی وگرنه `apps/docs` بالا نمیاد.

4. **Workflow Token:** `GITHUB_TOKEN` با `packages: write` scope که توی workflow YAML تعریف شده.

5. **Pre-release / snapshot:** برای نسخه‌ی آزمایشی بدون version bump واقعی، Changesets دستور `enter pre <tag>` داره.

6. **همه‌ی پکیج‌ها همزمان:** برای rolling update که چندین پکیج رو با هم bump می‌کنه، یه changeset واحد بنویس که همه رو لیست کنه — بهتر از چندتا changeset جدا.

---

## دستورهای پرکاربرد

```bash
# changeset جدید (تعاملی)
pnpm changeset

# دیدن وضعیت — کدوم پکیج‌ها bump میشن
pnpm changeset status

# build همه‌ی پکیج‌ها
pnpm -r build

# اجرای محلی Version (برای تست — معمولاً نیاز نیست)
pnpm changeset version

# پاک کردن همه changeset های مصرف‌نشده (به‌ندرت لازمه)
rm .changeset/*.md
```

---

## مشکلات رایج

**Workflow اجرا میشه ولی Version PR نمیاد:**
→ هیچ `.changeset/*.md` نداری. یکی بساز.

**Version PR هست ولی publish نمی‌کنه:**
→ بعد از merge شدن، `release.yml` دوباره trigger میشه. اگه نشد، Actions tab رو چک کن.

**`401 Unauthorized` موقع publish:**
→ `GITHUB_TOKEN` در workflow `packages: write` scope نداره.

**`E404` موقع `pnpm up` در پروژه‌ی مصرف‌کننده:**
→ `~/.npmrc` نداره یا token expired شده.
