import React from 'react';
import { useMaterials } from '@/context/MaterialsContext';
import { IconDisplay } from '@/components/IconDisplay';

interface TopicGridProps {
  category?: 'teaching' | 'general';
  title?: string;
}

const topicDescriptions: Record<string, string> = {
  'יסודות מדעי המחשב': 'להבין איך מחשבים, תוכניות ואלגוריתמים עובדים — מהרעיון ועד הקוד.',
  'מבני נתונים': 'לחשוב כמו מתכנתים: רקורסיה, עצים, חיפוש ועוד דרכים לארגן ולפתור בעיות.',
  'מדעי הנתונים': 'לגלות מה אפשר להבין מנתונים — ואיך מחשבים עוזרים לנו למצוא דפוסים ותשובות.',
  'פיתוח ווב': 'לבנות את מה שקורה מאחורי המסך — מדפי HTML ועד אפליקציות ואתרים.',
  'מודלים חישוביים': 'לגלות מה מחשבים יכולים לחשב, איך הם עושים זאת, ואיפה עובר הגבול.',
};

export function TopicGrid({ category, title }: TopicGridProps) {
  const { materials, meta: subcategoryMeta } = useMaterials();

  const filtered = category ? materials.filter(m => m.category === category) : materials;

  const topics = Object.entries(
    filtered.reduce((acc, m) => {
      const topLevel = m.path[0];
      if (!acc[topLevel]) acc[topLevel] = 0;
      acc[topLevel]++;
      return acc;
    }, {} as Record<string, number>)
  );

  return (
    <section id="topics" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground">{title}</h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics.map(([name]) => {
            const meta = subcategoryMeta[name] || { icon: '📁', color: 'from-gray-50 to-slate-50 border-gray-200' };
            const description = topicDescriptions[name];

            return (
              <a
                key={name}
                href={`#topic/${encodeURIComponent(name)}`}
                className={`group relative flex flex-col items-start gap-4 p-8 rounded-2xl border-2 bg-gradient-to-br ${meta.color} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-right`}
              >
                <div className="flex items-center gap-4 w-full">
                  <IconDisplay icon={meta.icon} className="text-5xl" />
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">{name}</h3>
                </div>
                {description && <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>}
                <span className="text-primary font-medium">להיכנס לנושא ←</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
