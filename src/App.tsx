import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { TopicGrid } from '@/components/sections/TopicGrid';
import { TopicPage } from '@/components/sections/TopicPage';
import { AdminPanel } from '@/components/Admin';
import { MaterialsProvider } from '@/context/MaterialsContext';
import { ArrowRight } from 'lucide-react';

function HomePage() {
  const worlds = [
    { name: 'ללמוד', text: 'רעיונות, כלים ושאלות שעוזרים להבין איך דברים עובדים.', href: '#materials', accent: '#00B0FF' },
    { name: 'לגלות', text: 'דברים מסקרנים ששווה לעצור בשבילם, לחקור ולחזור אליהם.', href: '#interesting', accent: '#F9BF31' },
    { name: 'ליצור', text: 'רעיונות שהופכים מחשבה למשהו שאפשר לעשות, לבנות ולשתף.', href: '#', accent: '#EF882A' },
    { name: 'לאהוב', text: 'ספרים, מקומות, שירים ודברים קטנים שעושים טוב.', href: '#interesting', accent: '#6D338E' },
    { name: 'מוצרים', text: 'דברים שנולדו מתוך העולם של LALINKA.', href: '#', accent: '#3ABD6C' },
  ];

  return (
    <>
      <Hero />

      <section id="worlds" className="relative overflow-hidden bg-[#FFFDF8] py-24 sm:py-32" dir="rtl">
        <div className="pointer-events-none absolute -right-28 top-16 h-72 w-72 rounded-full bg-[#00B0FF]/08" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#EF882A]/07" aria-hidden="true" />

        <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.12em] text-[#EF882A]">העולם של LALINKA</p>
            <h2 className="mt-4 font-sans text-4xl font-bold leading-tight tracking-[-0.025em] text-[#18324A] sm:text-5xl">
              מה מחכה לך ב-lalinka?
            </h2>
            <p className="mt-5 text-lg leading-[1.7] text-[#18324A]/62 sm:text-xl">
              לא הכול כאן הוא מאותו סוג. אלה פשוט הדברים שמעניינים אותי — וכל אחד מהם פותח דלת אחרת.
            </p>
          </div>

          <div className="mt-16 border-t border-[#18324A]/10">
            {worlds.map((world, index) => (
              <a
                key={world.name}
                href={world.href}
                className="group relative block border-b border-[#18324A]/10 py-8 transition-colors hover:bg-white/45 sm:py-10"
              >
                <div className="grid gap-5 sm:grid-cols-[64px_1fr_auto] sm:items-center sm:gap-8">
                  <span className="text-sm font-semibold tracking-[0.14em] text-[#18324A]/35" dir="ltr">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: world.accent }} aria-hidden="true" />
                      <h3 className="font-sans text-2xl font-bold text-[#18324A] sm:text-[30px]">{world.name}</h3>
                    </div>
                    <p className="mt-2 max-w-2xl text-base leading-[1.65] text-[#18324A]/58 sm:text-lg">
                      {world.text}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#18324A]/45 transition-transform duration-200 group-hover:-translate-x-1 group-hover:text-[#18324A]">
                    להיכנס ←
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#18324A] py-24 text-white sm:py-28" dir="rtl">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#00B0FF]/15" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-28 -bottom-32 h-96 w-96 rounded-full bg-[#EF882A]/10" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
          <p className="text-sm font-semibold tracking-[0.12em] text-[#F9BF31]">להישאר קרובים</p>
          <h2 className="mt-4 font-sans text-4xl font-bold sm:text-5xl">יש כאן עוד דברים בדרך.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-[1.75] text-white/70 sm:text-xl">
            העולם הזה ימשיך להשתנות, להתמלא ולהפתיע. אפשר פשוט לחזור מדי פעם ולראות מה התווסף.
          </p>
        </div>
      </section>
    </>
  );
}
function CategoryPage({ category, title, subtitle }: { category: 'teaching' | 'general'; title: string; subtitle: string }) {
  const isLearning = category === 'teaching';

  return (
    <div className="min-h-screen bg-[#FFFDF8] pt-20" dir="rtl">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20">
          <a
            href="#"
            className="mb-16 inline-flex items-center gap-2 text-sm font-medium text-[#18324A]/55 transition-colors hover:text-[#18324A]"
          >
            <ArrowRight size={17} />
            חזרה לדף הבית
          </a>

          <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.22fr]">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-semibold tracking-[0.12em] text-[#EF882A]">
                {isLearning ? 'עולם 01' : 'מתוך העולם של ענת'}
              </p>

              <h1 className="font-sans text-[52px] font-bold leading-[1.02] tracking-[-0.03em] text-[#18324A] sm:text-[72px]">
                {title}
              </h1>

              <div className="mt-7 h-px w-20 bg-[#00B0FF]" />

              <p className="mt-7 max-w-2xl text-xl leading-[1.65] text-[#18324A]/68 sm:text-[22px]">
                {subtitle}
              </p>
            </div>

            <div className="hidden justify-end pb-2 lg:flex" aria-hidden="true">
              <div
                className="h-32 w-32 rotate-[-12deg] bg-[#00B0FF]/20"
                style={{
                  WebkitMaskImage: "url(/lalinka/visual/arc.svg)",
                  maskImage: "url(/lalinka/visual/arc.svg)",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {isLearning && (
        <section className="border-y border-[#18324A]/[0.07] bg-white/45">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="mb-12 max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.1em] text-[#00B0FF]">
                שבילים
              </p>
              <h2 className="mt-3 font-sans text-3xl font-bold tracking-tight text-[#18324A] sm:text-4xl">
                מה בא לך להבין?
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-[#18324A]/58">
                בחרי נושא, ומשם ניכנס פנימה.
              </p>
            </div>

            <TopicGrid category={category} title="" />
          </div>
        </section>
      )}

      {!isLearning && (
        <div className="pb-20">
          <TopicGrid category={category} title="" />
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [page, setPage] = React.useState('home');
  const [topicPath, setTopicPath] = React.useState<string[]>([]);

  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('topic/')) {
        const segments = hash.slice(6).split('/').map(decodeURIComponent).filter(Boolean);
        setTopicPath(segments);
        setPage('topic');
      } else if (hash === 'about') {
        setPage('home');
        setTimeout(() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (hash === 'admin') {
        setPage('admin');
        window.scrollTo(0, 0);
      } else if (hash === 'materials') {
        setPage('materials');
        window.scrollTo(0, 0);
      } else if (hash === 'interesting') {
        setPage('interesting');
        window.scrollTo(0, 0);
      } else {
        setPage('home');
        window.scrollTo(0, 0);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <MaterialsProvider>
      <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
        <Navbar />

        <main className="relative z-10">
          {page === 'home' && <HomePage />}
          {page === 'materials' && (
            <CategoryPage
              category="teaching"
              title="ללמוד"
              subtitle="רעיונות, כלים ושאלות שעוזרים להבין איך דברים עובדים — ולחשוב קצת אחרת."
            />
          )}
          {page === 'interesting' && (
            <CategoryPage
              category="general"
              title="דברים מעניינים"
              subtitle="דברים שפשוט עושים טוב על הלב - ספרים, השראה, שירים והמלצות"
            />
          )}
          {page === 'topic' && <TopicPage pathSegments={topicPath} />}
          {page === 'admin' && <AdminPanel />}
        </main>

        <Footer />
      </div>
    </MaterialsProvider>
  );
}
