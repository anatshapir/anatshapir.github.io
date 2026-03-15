import React from 'react';
import { useMaterials } from '@/context/MaterialsContext';
import { IconDisplay } from '@/components/IconDisplay';

interface TopicGridProps {
  category?: 'teaching' | 'general';
  title?: string;
}

export function TopicGrid({ category, title = 'מה תמצאו כאן?' }: TopicGridProps) {
  const { materials, meta: subcategoryMeta } = useMaterials();

  const filtered = category
    ? materials.filter(m => m.category === category)
    : materials;

  const topics = Object.entries(
    filtered.reduce((acc, m) => {
      const topLevel = m.path[0];
      if (!acc[topLevel]) acc[topLevel] = 0;
      acc[topLevel]++;
      return acc;
    }, {} as Record<string, number>)
  );

  return (
    <section id="topics" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground">
              {title}
            </h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {topics.map(([name, count]) => {
            const meta = subcategoryMeta[name] || { icon: '📁', color: 'from-gray-50 to-slate-50 border-gray-200' };

            return (
              <a
                key={name}
                href={`#topic/${encodeURIComponent(name)}`}
                className={`group relative flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 bg-gradient-to-br ${meta.color}
                  shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer aspect-square`}
              >
                <span className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300">
                  <IconDisplay icon={meta.icon} className="text-5xl sm:text-6xl" />
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground text-center">
                  {name}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {count} {count === 1 ? 'פריט' : 'פריטים'}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
