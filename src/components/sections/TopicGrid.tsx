import React from 'react';
import { useMaterials } from '@/context/MaterialsContext';

interface TopicGridProps {
  category?: 'teaching' | 'general';
  title?: string;
}

const learningTopicOrder = [
  'יסודות מדעי המחשב',
  'מבני נתונים',
  'מדעי הנתונים',
  'פיתוח ווב',
  'מודלים חישוביים',
];

const topicDescriptions: Record<string, string> = {
  'יסודות מדעי המחשב': 'להבין איך מחשבים, תוכניות ואלגוריתמים עובדים — מהרעיון ועד הקוד.',
  'מבני נתונים': 'לחשוב כמו מתכנתים: רקורסיה, עצים, חיפוש ועוד דרכים לארגן ולפתור בעיות.',
  'מדעי הנתונים': 'לגלות מה אפשר להבין מנתונים — ואיך מחשבים עוזרים לנו למצוא דפוסים ותשובות.',
  'פיתוח ווב': 'לבנות את מה שקורה מאחורי המסך — מדפי HTML ועד אפליקציות ואתרים.',
  'מודלים חישוביים': 'לגלות מה מחשבים יכולים לחשב, איך הם עושים זאת, ואיפה עובר הגבול.',
};

const visualMask = (path: string) => ({
  WebkitMaskImage: `url(${path})`,
  maskImage: `url(${path})`,
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
});

const subjectAccents = ['#00B0FF', '#F9BF31', '#EF882A', '#3ABD6C', '#6D338E'];

export function TopicGrid({ category, title }: TopicGridProps) {
  const { materials } = useMaterials();

  const filtered = category ? materials.filter(m => m.category === category) : materials;
  const actualTopics = Array.from(new Set(
    filtered
      .map(m => m.path?.[0])
      .filter((name): name is string => typeof name === 'string' && name.trim().length > 0),
  ));
  const availableTopics = new Set(actualTopics);
  const topics = category === 'teaching'
    ? [
        ...learningTopicOrder.filter(name => availableTopics.has(name)),
        ...actualTopics.filter(name => !learningTopicOrder.includes(name)),
      ]
    : actualTopics;

  return (
    <section id="topics" className="relative" dir="rtl">
      {title && (
        <div className="mb-10">
          <h2 className="font-sans text-3xl font-bold text-[#18324A]">{title}</h2>
        </div>
      )}

      <div className="relative">
        {category !== 'teaching' && <>
          <div className="pointer-events-none absolute -left-10 top-2 hidden h-24 w-24 bg-[#F9BF31]/30 lg:block" aria-hidden="true" style={visualMask('/lalinka/visual/offset-dots.svg')} />
          <div className="pointer-events-none absolute -right-8 bottom-4 hidden h-20 w-20 bg-[#3ABD6C]/18 lg:block" aria-hidden="true" style={visualMask('/lalinka/visual/leaf.svg')} />
        </>}

        <div className={category === 'teaching'
          ? 'relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6'
          : 'relative'}>
          {topics.map((name, index) => (
            <a
              key={name}
              href={`#topic/${encodeURIComponent(name)}`}
              className={category === 'teaching'
                ? 'group relative flex min-h-[190px] flex-col overflow-hidden rounded-[1.5rem] border border-[#18324A]/[0.11] bg-[#FFFDF8]/90 p-6 text-right shadow-[0_8px_26px_rgba(24,50,74,0.045)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[#00B0FF]/45 hover:shadow-[0_16px_34px_rgba(24,50,74,0.09)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B0FF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFFDF8] sm:min-h-[214px] sm:p-7'
                : 'group relative block border-t border-[#18324A]/[0.12] py-8 transition-colors duration-200 last:border-b hover:bg-white/55 sm:py-10'}
            >
              {category === 'teaching' ? <>
                <span
                  className="pointer-events-none absolute -left-7 -top-8 h-24 w-24 rounded-full opacity-[0.11] transition-transform duration-300 group-hover:scale-125 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  style={{ backgroundColor: subjectAccents[index % subjectAccents.length] }}
                  aria-hidden="true"
                />
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-sans text-xs font-semibold tracking-[0.14em] text-[#18324A]/40" dir="ltr">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: subjectAccents[index % subjectAccents.length] }}
                    aria-hidden="true"
                  />
                </div>
                <div className="relative flex flex-1 flex-col">
                  <h3 className="font-sans text-xl font-bold tracking-tight text-[#18324A] sm:text-2xl">
                    {name}
                  </h3>
                  {topicDescriptions[name] && (
                    <p className="mt-2 max-w-[34rem] text-sm leading-[1.7] text-[#18324A]/62 sm:text-base">
                      {topicDescriptions[name]}
                    </p>
                  )}
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#18324A]/60 transition-transform duration-200 group-hover:-translate-x-1 group-hover:text-[#18324A] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                    להיכנס
                    <span aria-hidden="true">←</span>
                  </span>
                </div>
              </> : <>
              <div className="grid items-start gap-6 sm:grid-cols-[64px_1fr_auto] sm:gap-8">
                <span
                  className="pt-1 font-sans text-sm font-semibold tracking-[0.14em] text-[#EF882A]/85"
                  dir="ltr"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="max-w-3xl">
                  <h3 className="font-sans text-2xl font-bold tracking-tight text-[#18324A] sm:text-[30px]">
                    {name}
                  </h3>
                  {topicDescriptions[name] && (
                    <p className="mt-2 max-w-2xl text-base leading-[1.65] text-[#18324A]/60 sm:text-lg">
                      {topicDescriptions[name]}
                    </p>
                  )}
                </div>

                <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[#18324A]/55 transition-transform duration-200 group-hover:-translate-x-1 group-hover:text-[#18324A]">
                  להיכנס
                  <span aria-hidden="true">←</span>
                </span>
              </div>
              </>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
