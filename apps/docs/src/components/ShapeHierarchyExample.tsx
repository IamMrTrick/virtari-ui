import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Card,CardHeader,CardTitle,CardDescription,CardContent} from '@virtari-packages/react-card';
import {Stack,Cluster} from '@virtari-packages/react-layout';
import {InputField} from '@virtari-packages/react-input';
import {Button} from '@virtari-packages/react-button';
import {Kbd} from '@virtari-packages/react-kbd';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@virtari-packages/react-tabs';
import {SegmentedControl,SegmentedControlItem} from '@virtari-packages/react-segmented-control';
import {Section} from './Section';

export function ShapeHierarchyExample(){
 const {i18n}=useTranslation();const fa=i18n.language.startsWith('fa');const text=(en:string,faText:string)=>fa?faText:en;
 const [mode,setMode]=useState('soft');
 return <Section title={text('Shape follows a role','فرم از نقش پیروی می‌کند')} description={text('Compare the same components in each radius mode. A keycap, field, action and surface have different jobs; consistency means a shared hierarchy, not one number everywhere.','کامپوننت‌های یکسان را در حالت‌های مختلف مقایسه کنید. کلید کیبورد، فیلد، دکمه و سطح نقش متفاوت دارند؛ یکدستی یعنی سلسله‌مراتب مشترک، نه یک عدد برای همه‌چیز.')}>
  <SegmentedControl value={mode} onValueChange={setMode} aria-label={text('Radius preview','پیش‌نمایش رادیوس')}>
   {['sharp','soft','round','pill'].map(value=><SegmentedControlItem key={value} value={value}>{value}</SegmentedControlItem>)}
  </SegmentedControl>
  <Card data-radius={mode}><CardHeader><CardTitle>{text('One family, different roles','یک خانواده، نقش‌های متفاوت')}</CardTitle><CardDescription>{text('The preview changes only this card and its contents.','پیش‌نمایش فقط این کارت و محتوای آن را تغییر می‌دهد.')}</CardDescription></CardHeader><CardContent><Stack gap="lg">
   <Tabs defaultValue="overview"><TabsList variant="segmented" aria-label={text('Project panels','پنل‌های پروژه')}><TabsTrigger value="overview">{text('Overview','نمای کلی')}</TabsTrigger><TabsTrigger value="activity">{text('Activity','فعالیت')}</TabsTrigger></TabsList><TabsContent value="overview"><p className="docs-prose">{text('Tabs switch between content panels.','تب‌ها بین پنل‌های محتوا جابه‌جا می‌شوند.')}</p></TabsContent><TabsContent value="activity"><p className="docs-prose">{text('Your recent activity appears here.','فعالیت اخیر اینجا نمایش داده می‌شود.')}</p></TabsContent></Tabs>
   <SegmentedControl defaultValue="week" aria-label={text('Time range','بازهٔ زمانی')}><SegmentedControlItem value="week">{text('Week','هفته')}</SegmentedControlItem><SegmentedControlItem value="month">{text('Month','ماه')}</SegmentedControlItem></SegmentedControl>
   <InputField label={text('Project name','نام پروژه')} defaultValue="Virtari Studio" />
   <Cluster gap="sm"><Button onClick={()=>setMode('soft')}>{text('Reset preview','بازنشانی پیش‌نمایش')}</Button><span>{text('Keyboard key','کلید کیبورد')}: <Kbd>Enter</Kbd></span></Cluster>
   <Card><CardContent><p className="docs-prose">{text('Nested surfaces account for their parent’s actual radius and inset. Separated controls keep their own role.','سطوح تو‌در‌تو رادیوس و فاصلهٔ واقعی از والد را در نظر می‌گیرند. کنترل‌های مستقل نقش خودشان را حفظ می‌کنند.')}</p></CardContent></Card>
  </Stack></CardContent></Card>
  <p className="docs-prose">{text('Segmented tabs and choice groups share track geometry. Their inner shape subtracts padding and border. Underlined tabs stay flat; explicit pills and circles retain their intended shape. These are Virtari design decisions, not accessibility certifications.','تب سگمنتی و گروه انتخاب، هندسهٔ مشترک دارند؛ فرم داخلی با کسر فاصله و بوردر به‌دست می‌آید. تب خطی تخت می‌ماند و شکل‌های صریح کپسولی و دایره‌ای حفظ می‌شوند. این‌ها تصمیم طراحی ویرتاری هستند، نه گواهی دسترس‌پذیری.')}</p>
  <p className="docs-prose"><a href="https://github.com/material-components/material-components-android/blob/master/docs/theming/Shape.md">{text('Material: shape roles and hierarchy','متریال: نقش‌ها و سلسله‌مراتب فرم')}</a>{' · '}<a href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/">{text('W3C: tabs and keyboard behavior','W3C: تب‌ها و رفتار کیبورد')}</a></p>
 </Section>
}
