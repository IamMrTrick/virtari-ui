# بررسی ورودی‌ها، فوکوس و تکمیل خودکار

تاریخ: ۵ سپتامبر ۲۰۲۶. مبنا: `main`، کامیت `efb23d8`.

این گزارش شامل نتیجهٔ بررسی اولیه و وضعیت اصلاحات بعد از درخواست کاربر است. بخش‌های تشخیصی پایین، وضعیت پیش از اصلاح را ثبت می‌کنند.

## وضعیت پس از اصلاح

همهٔ ۱۱ گروه ایراد تأییدشدهٔ پایین در کد محلی اصلاح شدند. علاوه بر آن، پشتیبانی فرم و بازنشانی برای کنترل‌های ترکیبی، تشخیص کشور در شمارهٔ بین‌المللی، تأیید IME در ویرایش سلول و حفظ سند Yoopta هنگام تغییر readOnly اصلاح شد. Yoopta اکنون نسخهٔ جدید سند خارجی را هم نمایش می‌دهد؛ بازتاب معمول onChange باعث بازسازی نمای ویرایشگر نمی‌شود.

- مجموعهٔ قابل تکرار `apps/docs/tests/input-compatibility.html`: **۸۲ موفق، صفر ناموفق**؛ بررسی اولیه ۳۸ موفق و ۲۷ ناموفق داشت.
- کلیک واقعی بیرون Combobox: فوکوس روی ورودی مقصد باقی ماند. Tab واقعی از جست‌وجو: فوکوس به ورودی بعد از trigger منتقل شد.
- تایپ واقعی در Yoopta و سپس تغییر readOnly: متن جدید حفظ شد و حالت ویرایش بسته شد.
- بررسی نوع‌ها و ساخت تمام ۱۰ پکیج کنترلی تغییرکرده و utils موفق بود؛ ساخت مستندات هم موفق بود. هشدارهای bundling موجود دربارهٔ import پرچم‌ها مانع ساخت نشدند.
- در نسخهٔ محلی `T:/virtari-base-projects/VirtariPlatform/app/src/pages/auth/LoginPage.tsx`، autocomplete ایمیل ورود به username تغییر کرد و username در فرم رمز هم قرار گرفت. بررسی TypeScript برنامهٔ مصرف‌کننده موفق بود.

قرارداد فرم و روش اجرای تست‌ها در `apps/docs/tests/README.md` آمده است. تغییرات محلی‌اند؛ انتشار پکیج‌ها یا استقرار سایت زنده انجام نشده است. تست‌های input/change شبیه‌سازی‌شده‌اند و تأیید تکمیل خودکار با رمز ذخیره‌شدهٔ واقعی در همهٔ مرورگرها محسوب نمی‌شوند.

## نتیجهٔ اصلی

مشکل عمومیِ قطع فوکوس یا پاک شدن مقدار در `Input`، `InputField`، `PasswordInput`، `PasswordInputField`، `Textarea` و `TextareaField` در تست‌های انجام‌شده بازتولید نشد. هر هفت مسیر آزمایش‌شده، از جمله `InputField type="password"`، مقدار و همان عنصر DOM را بعد از رویدادهای `input`/`change` و رندر دوبارهٔ فرم حفظ کردند؛ مقدار ثبت‌شده در React Hook Form نیز با مقدار فیلد برابر بود.

با این حال، چند اشکال واقعی در کامپوننت‌های دیگر تأیید شد. مهم‌ترین مورد مرتبط با فوکوس در `Combobox` است: بستن فهرست با کلیک روی ورودی بعدی، فوکوس را به trigger خود Combobox برمی‌گرداند. این رفتار با کلیک واقعی در مرورگر و با Tab مشاهده شد.

## فرم ورود app.virtari.com

صفحهٔ زندهٔ [ورود](https://app.virtari.com/auth/login) در یک مرورگر جدا، بدون خروج از حساب موجود Chrome، بررسی شد. فقط ایمیل و متن آزمایشی استفاده شد؛ فرم ورود به حساب ارسال نشد.

مشاهدات مستقیم:

- مرحلهٔ ایمیل: `type="email"`، `id="login-email"`، `name="email"`، `autocomplete="email"`.
- مرحلهٔ رمز عبور: `type="password"`، `id="login-password"`، `name="password"`، `autocomplete="current-password"`.
- در مرحلهٔ رمز عبور، ورودی ایمیل/نام کاربری دیگر در فرم وجود ندارد؛ ایمیل فقط به‌صورت متن بیرون فرم نمایش داده می‌شود.
- پر کردن و تایپ متن ساختگی و سپس نمایش پسورد، متن را حفظ کرد. در حالت عادی روی خود input انیمیشن یا transform فعال مشاهده نشد.
- ابزار بازرسی DOM مقدار فیلدهای حساس را پنهان می‌کند. برداشت اولیهٔ «مقدار خالی شده» با مشاهدهٔ دیداری رد شد؛ آن برداشت مبنای این گزارش نیست.

**ایراد قطعی ساختار فرم، و محتمل‌ترین نقطهٔ شروع اصلاح autofill:** ایمیل ورود باید به‌عنوان `username` معرفی شود و در مرحلهٔ رمز عبور نیز یک ورودی مرتبط با همان نام کاربری در همان فرم موجود بماند. دو فرم جدا و حذف کامل نام کاربری، اطلاعات لازم برای تشخیص حساب را از پسوردمنیجر می‌گیرد. این تشخیص از ساختار زنده و کد است؛ علت نهایی رفتار پسوردمنیجر خاص کاربر هنوز با autofill واقعی تأیید نشده است. [راهنمای رسمی فرم ورود و ورود دو مرحله‌ای](https://web.dev/articles/sign-in-form-best-practices#consider_using_two_pages)

کد مصرف‌کنندهٔ محلی نیز همین ساختار را دارد:

- [LoginPage.tsx](T:/virtari-base-projects/VirtariPlatform/app/src/pages/auth/LoginPage.tsx:278): فرم ایمیل و `autocomplete` آن.
- [LoginPage.tsx](T:/virtari-base-projects/VirtariPlatform/app/src/pages/auth/LoginPage.tsx:317): فرم پسورد بدون ورودی username.
- [PasswordField.tsx](T:/virtari-base-projects/VirtariPlatform/app/src/features/auth/components/PasswordField.tsx:1): استفاده از `InputField` دیزاین‌سیستم.
- [package.json](T:/virtari-base-projects/VirtariPlatform/app/package.json:59): وابستگی محلی `react-input` برابر `^0.4.2` است؛ نسخهٔ نصب‌شدهٔ همین checkout نیز `0.4.2` بود. نسخهٔ دقیق بسته داخل build آنلاین از این موضوع قابل استنتاج قطعی نیست. workspace دیزاین‌سیستم اکنون نسخهٔ `1.0.0` این بسته را دارد.

در مصرف‌کننده، تغییر مرحله با View Transition و `autoFocus` انجام می‌شود و والد فرم `transform: translateZ(0)` دارد. تداخل احتمالی این انتقال با پنجرهٔ autofill باید در مرورگر محل وقوع بررسی شود؛ صرف وجود این افکت‌ها، اثبات علت خطا نیست. [کد تغییر مرحله](T:/virtari-base-projects/VirtariPlatform/app/src/pages/auth/LoginPage.tsx:93)، [استایل مرحله](T:/virtari-base-projects/VirtariPlatform/app/src/features/auth/components/auth.css:354).

## تست‌های انجام‌شده

۶۵ سناریوی خودکار داخل Chromium اجرا شد: **۳۸ موفق و ۲۷ ناموفق**. این اعداد تعداد سناریو هستند؛ چند سناریو یک اشکال مشترک را پوشش می‌دهند و به معنی ۲۷ باگ مستقل نیستند.

- عبور ویژگی‌های native برای هر ۲۲ type استاندارد HTML بررسی شد: text، email، password، search، tel، url، number، date، datetime-local، month، week، time، color، range، hidden، checkbox، radio، file، button، submit، reset و image. همه موفق بودند. این تست عبور attribute را می‌سنجد، نه کیفیت ظاهری تمام typeها یا عملکرد popup بومی همهٔ مرورگرها.
- برای هفت مسیر ورودی متن/پسورد/textarea، رویدادهای `input` و `change`، یکسان ماندن DOM، فوکوس، مقدار و ثبت مقدار در React Hook Form بررسی شد؛ همه موفق بودند.
- پر کردن انتخاب nativeِ `Select`، نمایش مقدار و `FormData` موفق بود.
- ورود یک‌بارهٔ OTP شش‌رقمی، تبدیل ارقام فارسی و مقدار فرم موفق بود.
- مقدار native فرم در Checkbox، Switch، RadioGroup و Slider در حالت عادی موفق بود.
- ویژگی‌های فایل، name، multiple، accept و disabled در FileUploadInput عبور کردند.
- علاوه بر این ۶۵ تست، کلیک بیرون Combobox و خروج با Tab به‌صورت واقعی در مرورگر بررسی شد؛ هر دو فوکوس را به trigger برگرداندند.

**محدودیت تست:** رویدادهای ساختگی `input/change` معادل یک پسوردمنیجر واقعی، پنجرهٔ ذخیرهٔ رمز، افزونهٔ 1Password یا Autofill روی iOS نیستند. Safari، Firefox، افزونه‌های پسوردمنیجر و دستگاه واقعی موبایل در این جلسه تست نشدند. نتیجهٔ مثبت این تست‌ها تضمین سازگاری با تمام آن‌ها نیست.

## ایرادهای تأییدشده، به ترتیب اولویت

### ۱. Combobox فوکوس ورودی بعدی را می‌گیرد — اولویت بالا

[Combobox.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-select/src/Combobox.tsx:413)

در `onCloseAutoFocus` بدون توجه به علت بسته شدن، `preventDefault()` و سپس `triggerRef.current?.focus()` اجرا می‌شود. بنابراین کلیک روی input بعدی یا Tab باعث انتقال طبیعی فوکوس نمی‌شود. انتخاب یک آیتم یا Escape می‌تواند نیاز به برگشت فوکوس داشته باشد؛ کلیک روی کنترل دیگر باید فوکوس همان مقصد را حفظ کند.

این رفتار روی انتخاب کشور PhoneInput و مصرف‌کننده‌های همان Combobox هم باید در اصلاح پوشش داده شود.

### ۲. NumberInput در حالت uncontrolled قابل استفاده نیست — اولویت بالا

[NumberInput.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-number-input/src/NumberInput.tsx:196)

وقتی `value` ارائه نشده، خود input همیشه `value=""` می‌گیرد. `defaultValue={5}` نمایش داده نمی‌شود؛ تایپ یا پر کردن مقدار در حالت بدون `value/onChange` دوباره خالی می‌شود. React نیز دربارهٔ وجود هم‌زمان value و defaultValue هشدار می‌دهد.

همچنین ورودی کنترل‌شده فوراً به Number و دوباره String تبدیل می‌شود؛ مقدار موقت `1.` تبدیل به `1` می‌شود و ورود طبیعی اعشار مختل است. اصلاح باید متن در حال ویرایش را تا زمان مناسب حفظ کند و از الگوی یکدست controlled/uncontrolled استفاده کند. [راهنمای رسمی React برای input کنترل‌شده](https://react.dev/reference/react-dom/components/input#my-input-caret-jumps-to-the-beginning-on-every-keystroke)

### ۳. TagInput هنگام paste چند تگ، داده را از دست می‌دهد — اولویت بالا

[TagInput.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-tag-input/src/TagInput.tsx:92)

Paste کردن `alpha,beta,gamma` سه callback با یک `value` قدیمی می‌سازد و در استفادهٔ معمول با state فقط `gamma` باقی می‌ماند. نتیجه باید ابتدا به‌صورت یک آرایه جمع شود و یک‌بار commit شود؛ محدودیت تعداد، تکراری‌ها و validation هم روی نتیجهٔ تجمعی اعمال شوند.

### ۴. TagInput فوکوس و readOnly را درست رعایت نمی‌کند — اولویت بالا

[TagInput.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-tag-input/src/TagInput.tsx:129)

- رسیدن به `maxTags`، خود input فوکوس‌شده را از DOM حذف می‌کند و فوکوس از دست می‌رود.
- `readOnly` جلوی حذف تگ با Backspace را نمی‌گیرد و دکمه‌های حذف هم همچنان وجود دارند.
- `onKeyDown` یا `onPaste` مصرف‌کننده به‌دلیل ترتیب spread می‌تواند رفتار داخلی را کامل جایگزین کند.
- Enter هنگام IME/composition به‌جای تأیید متن در حال ترکیب، تگ می‌سازد.

### ۵. DateField، DatePicker و TimeField مقدار name را در فرم native ثبت نمی‌کنند — اولویت بالا

[DateField.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-date-picker/src/DateField.tsx:31)، [DatePicker.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-date-picker/src/DatePicker.tsx:51)، [TimeField.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-date-picker/src/TimeField.tsx:51)

هر سه در API، `name` دارند، ولی حتی با تاریخ/ساعت معتبر، `new FormData(form)` هیچ ورودی برای آن name ندارد. نمایش segmentهای قابل ویرایش به‌تنهایی یک form control قابل ارسال نمی‌سازد. لازم است مقدار سریال‌شده، disabled و اتصال به فرم صریحاً پوشش داده شوند؛ `required` و اعتبارسنجی native هم باید با این تصمیم هماهنگ شوند.

### ۶. OTP و PhoneInput در حالت disabled همچنان ارسال می‌شوند — اولویت متوسط

[OtpInput.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-otp-input/src/OtpInput.tsx:286)، [PhoneInput.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-phone-input/src/PhoneInput.tsx:181)

ورودی نمایشی disabled می‌شود، ولی input مخفیِ حامل مقدار disabled نمی‌شود؛ بنابراین مقدار هنوز در FormData هست. این مورد با فرم واقعی و مقدار معتبر بازتولید شد. [استاندارد ساخت داده‌های فرم](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constructing-the-entry-list)

در PhoneInput، `readOnly` نیز فقط روی فیلد تلفن اعمال می‌شود؛ انتخاب‌گر کشور فعال می‌ماند و می‌تواند معنی شماره را تغییر دهد.

### ۷. Select با clearable، دکمه را داخل دکمه می‌سازد — اولویت متوسط

[Select.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-select/src/Select.tsx:76)

Trigger یک button است و دکمهٔ Clear داخل آن رندر می‌شود. تست DOM و هشدار React هر دو این ساختار نامعتبر را تأیید کردند. این وضعیت برای تعامل و hydration مناسب نیست؛ Clear باید کنترل مستقل و هم‌سطح trigger باشد، با رفتار disabled و کیبورد مشخص.

### ۸. NumberInput با callback ref یا handler مصرف‌کننده خراب می‌شود — اولویت متوسط

[NumberInput.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-number-input/src/NumberInput.tsx:87)

ref مصرف‌کننده به RefObject cast شده؛ اگر callback باشد، `.current` در دسترس نیست و listener چرخ ماوس وصل نمی‌شود. همچنین دادن `onKeyDown={() => {}}` از بیرون، handler داخلی را حذف و ArrowUp/ArrowDown را غیرفعال می‌کند. تست رفتاری هر دو مورد ناموفق بود.

`inputMode="numeric"` برای حالت اعشاری نیز انتخاب مناسبی نیست؛ این مورد در کد دیده شد و روی کیبورد موبایل تست نشده است.

### ۹. Combobox بخشی از ویرایش استاندارد متن را می‌گیرد — اولویت متوسط

[use-combobox.ts](C:/Users/Asus/Desktop/virtari-design-system/packages/react-select/src/use-combobox.ts:306)

Home/End روی فیلد جست‌وجو برای جابه‌جایی در فهرست مصرف می‌شوند و به رفتار طبیعی مکان‌نما نمی‌رسند. Enter هنگام IME هم نتیجه را commit می‌کند و فهرست را می‌بندد. دسترسی کیبورد باید بین ویرایش متن و انتخاب گزینه تفکیک شود. [الگوی WAI-ARIA برای Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

### ۱۰. cleanup مربوط به callback ref در React 19 نادیده گرفته می‌شود — اولویت متوسط

[Input.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-input/src/Input.tsx:43)، [Textarea.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-textarea/src/Textarea.tsx:38)

callback ref مصرف‌کننده صدا زده می‌شود ولی تابع cleanup برگشتی آن به React برگردانده نمی‌شود. هر هفت مسیر وابسته در تست unmount شکست خوردند. این مشکل با از دست رفتن مقدار در autofill یکی نیست، ولی می‌تواند cleanup ثبت‌کننده‌ها و listenerهای مصرف‌کننده را خراب کند. [قرارداد رسمی callback ref در React](https://react.dev/reference/react-dom/components/common#ref-callback)

### ۱۱. دکمهٔ نمایش پسورد در InputField غیرفعال نمی‌شود — اولویت متوسط

[InputField.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-input/src/InputField.tsx:216)

`<InputField type="password" disabled revealable />` فیلد غیرفعال و دکمهٔ Show password فعال تولید می‌کند. در `PasswordInput` جداگانه، disabled روی دکمه رعایت شده است؛ رفتار دو API باید یکسان شود.

## مواردی که در کد دیده شدند و تست مستقل بیشتری می‌خواهند

- **React 18:** بسته‌های Input/Textarea پشتیبانی `^18 || ^19` اعلام می‌کنند، ولی ref را به‌صورت prop تابع عادی می‌گیرند. این شکل دریافت ref مخصوص React 19 است و برای مصرف‌کنندهٔ React 18 نیاز به forwardRef یا محدود کردن قرارداد نسخه دارد. اپلیکیشن بررسی‌شده React 19 دارد؛ این مورد توضیح قطعی مشکل ورود آن نیست.
- **DateField با ref خارجی:** `ref={ref ?? localRef}` باعث خالی ماندن ref داخلی مورد استفادهٔ hook تاریخ می‌شود. باید refها ترکیب شوند. سایر مسیرهای تاریخ هم باید با focus برنامه‌ای و فرم validation تست شوند.
- **YooptaEditor:** نمونهٔ editor با تغییر readOnly از نو ساخته می‌شود و effect، مقدار اولیهٔ ذخیره‌شده در ref را دوباره بارگذاری می‌کند؛ این مسیر خطر برگشت محتوای ویرایش‌شده به نسخهٔ اولیه را دارد. تغییرات بعدی propِ value هم عمداً اعمال نمی‌شوند؛ API باید دربارهٔ controlled یا initial بودن مقدار شفاف باشد. [YooptaEditor.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-yoopta-editor/src/YooptaEditor.tsx:67)
- **PhoneInput و بارگذاری تنبل:** state مربوط به آماده شدن libphonenumber تغییر می‌کند، ولی memoهای وابسته به کتابخانه `libReady` را در dependency ندارند. ممکن است مقدار اولیه تا تعامل بعدی دوباره parse نشود. [use-phone-input.ts](C:/Users/Asus/Desktop/virtari-design-system/packages/react-phone-input/src/use-phone-input.ts:61)
- **فیلدهای قابل ویرایش جدول:** `CellEditor` روی هر blur فوراً commit می‌کند و Enter را بدون بررسی composition مصرف می‌کند. تعامل با popup و IME باید تست شود. [CellEditor.tsx](C:/Users/Asus/Desktop/virtari-design-system/packages/react-data-table/src/editing/CellEditor.tsx:50)
- **Combobox، TagInput، DateRangePicker و ویرایشگرهای rich text/code:** مانند input native، قرارداد یکپارچهٔ name/form/required/reset ندارند. باید در مستندات روشن باشد که مقدار چگونه به فرم وصل می‌شود؛ contenteditable بودن به معنی قابلیت autofill رمز عبور نیست.

## پوشش بررسی خانواده‌ها

| خانواده | بررسی انجام‌شده | نتیجهٔ محدود به همین بررسی |
|---|---|---|
| Input و تمام typeها | کد، CSS، attributeها، فرم و فوکوس | اشکال عمومی autofill بازتولید نشد؛ قرارداد ref مشکل دارد |
| InputField و پسوردها | ثبت فرم، reveal، disabled، DOM و فوکوس | مقدار حفظ شد؛ disabled دکمه و cleanup ref مشکل دارند |
| Textarea / TextareaField | فرم، مقدار، attributeها و فوکوس | مسیر ورود داده سالم در تست؛ cleanup ref مشکل دارد |
| NumberInput | ورود داده، defaultValue، اعشار، wheel و handler | ایرادهای بالا بازتولید شدند |
| TagInput | paste، readOnly، maxTags، handler و IME | ایرادهای بالا بازتولید شدند |
| OTP | ورود کامل، ارقام فارسی، فرم disabled | ورود کامل موفق؛ disabled فرم مشکل دارد |
| PhoneInput | کد، مقدار فرم و readOnly/disabled | موارد بالا تأیید شدند؛ autofill واقعی تلفن تست نشده |
| Select | ساختار DOM، native select و FormData | autofill-style موفق؛ nested button نامعتبر |
| Combobox | جست‌وجو، IME، کیبورد و کلیک واقعی بیرون | مشکل فوکوس و ویرایش کیبورد تأیید شد |
| تاریخ، ساعت و بازه | کد segmentها و native FormData سه کنترل | name در سه کنترل ارسال نمی‌شود؛ native date autofill ادعا نشده |
| Checkbox، RadioGroup، Switch، Slider | کد و مقدار native فرم | تست حالت عادی موفق؛ این‌ها فیلد رمز نیستند |
| FileUpload / FileUploadInput | کد و ویژگی‌های input فایل | عبور attribute موفق؛ تمام جریان‌های drag/drop تست نشده |
| ColorPicker | کد فیلدهای رنگ/عدد/متن و مسیر disabled | از Input/Textarea استفاده می‌کند؛ آزمون کامل picker انجام نشده |
| LanguagePicker / انتخاب کشور | کد جست‌وجو، drawer و Combobox | مسیر Combobox در معرض اشکال فوکوس مشترک است |
| Command / جست‌وجوی جدول | کد wrapper و handlerها | مسیر پایه native/cmdk؛ autofill پسورد موضوع این جست‌وجوها نیست |
| Lexical / Yoopta / CodeMirror | کد چرخهٔ editor، props و focus | محدودیت فرم و خطر Yoopta ثبت شد؛ تست جامع ویرایشگر انجام نشده |

## اولویت اجرای اصلاحات

۱. اصلاح ساختار فرم ورود مصرف‌کننده و تست واقعی با پسوردمنیجر همان مرورگر کاربر؛ سپس بررسی View Transition فقط در صورت باقی ماندن مشکل.

۲. اصلاح focus خروج Combobox، حفظ متن/حالت uncontrolled در NumberInput و paste/readOnly/focus در TagInput.

۳. یکپارچه کردن name/form/disabled در کنترل‌های ترکیبی، ساختار Clear در Select و callback refها.

۴. بررسی جداگانهٔ قرارداد state در ویرایشگرها و ماتریس مرورگر/موبایل.

صفحهٔ تست محلی: [اجرای audit](http://127.0.0.1:5173/.tmp-input-audit.html). این صفحه به dev server وابسته است و جزو UI محصول نیست.

کد تست: [.tmp-input-audit.tsx](C:/Users/Asus/Desktop/virtari-design-system/apps/docs/.tmp-input-audit.tsx). فایل‌های تست محلی طبق الگوی موجود `.tmp-*` از Git خارج هستند. برای هر اجرای تازه، صفحه reload و سپس Run audit انتخاب شود.
