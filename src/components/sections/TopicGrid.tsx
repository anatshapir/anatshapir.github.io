import React from 'react';
import { useMaterials } from '@/context/MaterialsContext';
import { IconDisplay } from '@/components/IconDisplay';

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

const topicAccents: Record<string, { line: string; soft: string; icon: string }> = {
  'יסודות מדעי המחשב': { line: '#00B0FF', soft: '#EAF8FF', icon: '#00B0FF' },
  'מבני נתונים': { line: '#3ABD6C', soft: '#EFFAF3', icon: '#3ABD6C' },
  'מדעי הנתונים': { line: '#6D338E', soft: '#F6F0FA', icon: '#6D338E' },
  'פיתוח ווב': { line: '#1C9AD3', soft: '#EEF8FC', icon: '#1C9AD3' },
  'מודלים חישוביים': { line: '#EF882A', soft: '#FFF5EC', icon: '#EF882A' },
};

const topicIcons: Record<string, string> = {
  'יסודות מדעי המחשב': '💻',
  'מבני נתונים': '🌳',
  'מדעי הנתונים': '📊',
  'פיתוח ווב': '🌐',
  'מודלים חישוביים': '🧠',
};

export function TopicGrid({ category, title }: TopicGridProps) {
  const { materials } = useMaterials();

  const filtered = category ? materials.filter(m => m.category === category) : materials;

  const availableTopics = new Set(filtered.map(m => m.path[0]));
  const topics = category === 'teaching'
    ? learningTopicOrder.filter(name => availableTopics.has(name))
    : Array.from(availableTopics);

  return (
    <section id="topics" className="py-2 bg-transparent">
      <div className="w-full">
        {title && (
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-sans font-bold text-[#18324A]">{title}</h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {topics.map((name, index) => {
            const accent = topicAccents[name] || { line: '#1C9AD3', soft: '#F4FAFD', icon: '#1C9AD3' };
            const description = topicDescriptions[name];
            const isFirst = category === 'teaching' && index === 0;

            return (
              <a
                key={name}
                href={`#topic/${encodeURIComponent(name)}`}
                className={`group relative overflow-hidden flex flex-col justify-between rounded-[18px] border border-[#18324A]/10 bg-white text-right transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(24,50,74,0.10)] ${isFirst ? 'md:col-span-2 min-h-[270px] p-9 sm:p-11' : 'min-h-[230px] p-7 sm:p-8'}`}
              >
                <div
                  className="absolute top-0 right-0 left-0 h-1"
                  style={{ backgroundColor: accent.line }}
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between gap-6">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: accent.soft }}
                  >
                    <IconDisplay icon={topicIcons[name] || '📁'} className="text-3xl" />
                  </div>

                  {isFirst && (
                    <span className="rounded-full bg-[#FFF5EC] px-3 py-1.5 text-sm font-medium text-[#EF882A]">
                      נקודת ההתחלה
                    </span>
                  )}
                </div>

                <div className="mt-8">
                  <h3 className={`font-sans font-bold text-[#18324A] ${isFirst ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
                    {name}
                  </h3>
                  {description && (
                    <p className={`mt-3 max-w-2xl leading-relaxed text-[#18324A]/65 ${isFirst ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                      {description}
                    </p>
                  )}
                </div>

                <div className="mt-7 flex items-center gap-2 text-base font-semibold text-[#18324A]">
                  <span className="transition-transform duration-200 group-hover:-translate-x-1">להיכנס לנושא</span>
                  <span aria-hidden="true">←</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
