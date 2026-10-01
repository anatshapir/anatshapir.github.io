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
          <h2 className="font-sans text-3xl font-bold text-[#18324A]">{title}</h2>
        </div>
      )}

      <div className="relative">
        <div className="pointer-events-none absolute -left-10 top-2 hidden h-24 w-24 bg-[#F9BF31]/30 lg:block" aria-hidden="true" style={visualMask('/lalinka/visual/offset-dots.svg')} />
        <div className="pointer-events-none absolute -right-8 bottom-4 hidden h-20 w-20 bg-[#3ABD6C]/18 lg:block" aria-hidden="true" style={visualMask('/lalinka/visual/leaf.svg')} />

        <div className="relative">
          {topics.map((name, index) => (
            <a
              key={name}
              href={`#topic/${encodeURIComponent(name)}`}
              className="group relative block border-t border-[#18324A]/[0.12] py-8 transition-colors duration-200 last:border-b hover:bg-white/55 sm:py-10"
            >
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
