import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { TopicGrid } from '@/components/sections/TopicGrid';
import { TopicPage } from '@/components/sections/TopicPage';
import { LearningAtmosphere } from '@/components/sections/LearningAtmosphere';
import { AdminPanel } from '@/components/Admin';
import { MaterialsProvider } from '@/context/MaterialsContext';
import { ArrowRight } from 'lucide-react';

const worlds = [
  ['ללמוד','רעיונות, כלים ושאלות שעוזרים להבין איך דברים עובדים — ולחשוב קצת אחרת.','#00B0FF','#materials'],
  ['לגלות','דברים מסקרנים ששווה לעצור בשבילם, לחקור ולחזור אליהם.','#F9BF31','#interesting'],
  ['ליצור','רעיונות שהופכים מחשבה למשהו שאפשר לעשות, לבנות ולשתף.','#EF882A','#'],
  ['לאהוב','ספרים, מקומות, שירים ודברים קטנים שעושים טוב.','#6D338E','#interesting'],
  ['מוצרים','דברים שנולדו מתוך העולם של LALINKA.','#3ABD6C','#'],
];

function HomePage() {
  return <>
    <Hero />
    <section id="worlds" className="relative overflow-hidden bg-[#00B0FF] py-24 sm:py-32" dir="rtl">
      <div className="pointer-events-none absolute -left-32 -top-28 h-[34rem] w-[34rem] rounded-full bg-white/10" />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <p className="text-sm font-semibold tracking-[0.12em] text-white/80">העולם של LALINKA</p>
        <h2 className="mt-4 max-w-3xl font-sans text-4xl font-bold leading-[1.08] tracking-[-0.025em] text-white sm:text-6xl">מה מחכה לך ב-lalinka?</h2>
        <p className="mt-6 max-w-2xl text-lg leading-[1.75] text-white/85 sm:text-xl">לא הכול כאן הוא מאותו סוג. אלה פשוט הדברים שמעניינים אותי — וכל אחד מהם פותח דלת אחרת.</p>
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-white/20 sm:grid-cols-2 lg:grid-cols-5">
          {worlds.map(([name,text,accent,href],i) => <a key={name} href={href} className="group relative min-h-[285px] bg-[#FFFDF8] p-7 text-right transition-transform duration-200 hover:-translate-y-1 sm:p-8">
            <span className="text-xs font-semibold tracking-[0.14em] text-[#18324A]/35" dir="ltr">{String(i+1).padStart(2,'0')}</span>
            <div className="mt-12"><span className="mb-4 block h-2.5 w-2.5 rounded-full" style={{backgroundColor:accent}} />
              <h3 className="font-sans text-2xl font-bold text-[#18324A]">{name}</h3>
              <p className="mt-3 text-base leading-[1.7] text-[#18324A]/62">{text}</p>
            </div>
            <span className="absolute bottom-7 left-7 text-sm font-semibold text-[#18324A]/45 group-hover:text-[#18324A]">להיכנס ←</span>
          </a>)}
        </div>
      </div>
    </section>
    <section className="relative overflow-hidden bg-[#FFFDF8] py-28 sm:py-36" dir="rtl">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-[0.22fr_1fr]">
        <div className="hidden lg:block"><div className="h-36 w-36 rounded-full border-[1.5rem] border-[#EF882A]/18" /></div>
        <div className="max-w-3xl"><p className="text-sm font-semibold tracking-[0.12em] text-[#EF882A]">להישאר קרובים</p>
          <h2 className="mt-4 font-sans text-4xl font-bold leading-tight tracking-[-0.025em] text-[#18324A] sm:text-5xl">העולם הזה ממשיך לזוז.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.8] text-[#18324A]/65 sm:text-xl">עוד רעיון, עוד מקום, עוד משהו שלמדתי ואהבתי. אפשר פשוט לחזור מדי פעם ולראות מה נוסף.</p>
        </div>
      </div>
    </section>
    <section className="relative overflow-hidden bg-[#18324A] py-24 text-white sm:py-28" dir="rtl">
      <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#EF882A]/15" />
      <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]"><div>
          <p className="text-sm font-semibold tracking-[0.12em] text-[#F9BF31]">פותחים עולם</p>
          <h2 className="mt-4 font-sans text-4xl font-bold sm:text-5xl">דברים שכיף לפתוח, לנסות ולשמור.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-[1.75] text-white/70">מוצרים ורעיונות שנולדו מתוך העולם של LALINKA.</p>
        </div><a href="#" className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#EF882A] px-6 py-4 font-semibold text-white"><ArrowRight size={18}/>לפתוח את העולם</a></div>
      </div>
    </section>
  </>;
}

function CategoryPage({category,title,subtitle}:{category:'teaching'|'general';title:string;subtitle:string}) {
  const isLearning=category==='teaching';
  return <div className={`min-h-screen bg-[#FFFDF8] pt-20${isLearning ? ' relative isolate' : ''}`} dir="rtl">
    {isLearning && <LearningAtmosphere/>}
    <section className={isLearning ? 'relative' : undefined}><div className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20">
      <a href="#" className="mb-16 inline-flex items-center gap-2 text-sm font-medium text-[#18324A]/55"><ArrowRight size={17}/>חזרה לדף הבית</a>
      <div className="max-w-3xl"><p className="mb-5 text-sm font-semibold tracking-[0.12em] text-[#EF882A]">{isLearning?'עולם 01':'מתוך העולם של ענת'}</p>
      <h1 className="font-sans text-[52px] font-bold leading-[1.02] tracking-[-0.03em] text-[#18324A] sm:text-[72px]">{title}</h1>
      <div className="mt-7 h-px w-20 bg-[#00B0FF]"/><p className="mt-7 max-w-2xl text-xl leading-[1.65] text-[#18324A]/68 sm:text-[22px]">{subtitle}</p></div>
    </div></section>
    {isLearning && <section className="relative isolate overflow-hidden border-y border-[#18324A]/[0.07] bg-white/45"><div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
      <div className="mb-12 max-w-2xl"><p className="text-sm font-semibold tracking-[0.1em] text-[#00B0FF]">שבילים</p><h2 className="mt-3 font-sans text-3xl font-bold text-[#18324A] sm:text-4xl">מה בא לך להבין?</h2><p className="mt-3 text-lg text-[#18324A]/58">בחרי נושא, ומשם ניכנס פנימה.</p></div><TopicGrid category={category} title=""/></div></section>}
    {!isLearning && <div className="pb-20"><TopicGrid category={category} title=""/></div>}
  </div>;
}

export default function App(){
  const [page,setPage]=React.useState('home'); const [topicPath,setTopicPath]=React.useState<string[]>([]);
  React.useEffect(()=>{const handle=()=>{const h=window.location.hash.slice(1);if(h.startsWith('topic/')){setTopicPath(h.slice(6).split('/').map(decodeURIComponent).filter(Boolean));setPage('topic')}else if(h==='admin'){setPage('admin')}else if(h==='materials'){setPage('materials')}else if(h==='interesting'){setPage('interesting')}else{setPage('home');window.scrollTo(0,0)}};handle();window.addEventListener('hashchange',handle);return()=>window.removeEventListener('hashchange',handle)},[]);
  return <MaterialsProvider><div className="min-h-screen bg-background font-sans"><Navbar/><main className="relative z-10">{page==='home'&&<HomePage/>}{page==='materials'&&<CategoryPage category="teaching" title="ללמוד" subtitle="רעיונות, כלים ושאלות שעוזרים להבין איך דברים עובדים — ולחשוב קצת אחרת."/>}{page==='interesting'&&<CategoryPage category="general" title="דברים מעניינים" subtitle="דברים שפשוט עושים טוב על הלב - ספרים, השראה, שירים והמלצות"/>}{page==='topic'&&<TopicPage pathSegments={topicPath}/>} {page==='admin'&&<AdminPanel/>}</main><Footer/></div></MaterialsProvider>;
}