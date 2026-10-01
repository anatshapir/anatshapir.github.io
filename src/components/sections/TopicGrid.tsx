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

const topicNumbers: Record<string, string> = {
  'יסודות מדעי המחשב': '01',
  'מבני נתונים': '02',
  'מדעי הנתונים': '03',
  'פיתוח ווב': '04',
  'מודלים חישוביים': '05',
};

const visualMask = (path: string) => ({
  WebkitMaskImage: `url(${path})`,
  maskImage: `url(${path})`,
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
});

export function TopicGrid({ category, title }: TopicGridProps) {
  const { materials } = useMaterials();

  const filtered = category ? materials.filter(m => m.category === category) : materials;
  const availableTopics = new Set(filtered.map(m => m.path[0]));
  const topics = category === 'teaching'
    ? learningTopicOrder.filter(name => availableTopics.has(name))
    : Array.from(availableTopics);

  return (
    <section id="topics" className="relative" dir="rtl">
      {title && (
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#18324A]">{title}</h2>
        </div>
      )}

      <div className="relative overflow-hidden py-3">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-8 -top-4 hidden h-40 w-40 opacity-35 lg:block bg-[#F9BF31]"
          style={visualMask('/lalinka/visual/offset-dots.svg')}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 top-24 hidden h-48 w-48 rotate-90 opacity-15 lg:block bg-[#00B0FF]"
          style={visualMask('/lalinka/visual/arc.svg')}
        />

        <div className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {topics.map((name, index) => {
            const isFirst = category === 'teaching' && index === 0;
            const number = topicNumbers[name] ?? String(index + 1).padStart(2, '0');

            return (
              <a
                key={name}
                href={`#topic/${encodeURIComponent(name)}`}
                className={`group relative overflow-hidden rounded-[18px] bg-white px-7 py-7 sm:px-8 sm:py-8 text-right transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(24,50,74,0.09)] ${isFirst ? 'md:col-span-2 min-h-[300px] sm:px-10 sm:py-10' : 'min-h-[215px]'}`}
              >
                <div
                  className={`absolute right-0 top-0 h-full w-1.5 ${isFirst ? 'bg-[#EF882A]' : 'bg-[#00B0FF]'}`}
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between gap-8">
                  <span
                    className={`font-sans text-sm font-semibold tracking-[0.18em] ${isFirst ? 'text-[#EF882A]' : 'text-[#00B0FF]'}`}
                    dir="ltr"
                  >
                    {number}
                  </span>

                </div>

                <div className={`max-w-2xl ${isFirst ? 'mt-14' : 'mt-10'}`}>
                  <h3 className={`font-sans font-bold tracking-tight text-[#18324A] ${isFirst ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-[28px]'}`}>
                    {name}
                  </h3>
                  {topicDescriptions[name] && (
                    <p className={`mt-3 leading-relaxed text-[#18324A]/68 ${isFirst ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                      {topicDescriptions[name]}
                    </p>
                  )}
                </div>

                <div className="absolute bottom-7 left-7 flex items-center gap-2 text-sm font-semibold text-[#18324A] opacity-70 transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100 sm:bottom-8 sm:left-8">
                  <span>להיכנס</span>
                  <span aria-hidden="true">←</span>
                </div>
              </a>
            );
          })}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 -right-4 hidden h-24 w-24 rotate-[-18deg] opacity-12 lg:block bg-[#3ABD6C]"
          style={visualMask('/lalinka/visual/leaf.svg')}
        />
      </div>
    </section>
  );
}
