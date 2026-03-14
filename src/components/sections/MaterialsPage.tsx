import React, { useMemo } from 'react';
import { ExternalLink, BookOpen, Star, ArrowRight } from 'lucide-react';
import { useMaterials } from '@/context/MaterialsContext';
import type { StaticMaterial } from '@/data/materials';

interface MaterialsPageProps {
  category: 'teaching' | 'general';
}

export function MaterialsPage({ category }: MaterialsPageProps) {
  const { materials: staticMaterials, meta: subcategoryMeta } = useMaterials();
  const isTeaching = category === 'teaching';
  const title = isTeaching ? 'חומרי למידה' : 'דברים מעניינים';
  const subtitle = isTeaching
    ? 'מערכי שיעור, דפי עבודה ומשחקים לימודיים שיצרתי באהבה עבור תלמידים ומורים.'
    : 'פינה של השראה - ספרים, שירים, וסתם דברים שעושים לי טוב ומעוררים מחשבה.';
  const Icon = isTeaching ? BookOpen : Star;

  const allItems = staticMaterials.filter(m => m.category === category);

  // Group by top-level path
  const grouped = useMemo(() => {
    const groups: Record<string, StaticMaterial[]> = {};
    allItems.forEach(m => {
      const topLevel = m.path[0];
      if (!groups[topLevel]) groups[topLevel] = [];
      groups[topLevel].push(m);
    });
    return Object.entries(groups);
  }, [allItems]);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Page Header */}
      <section className={`py-16 ${isTeaching ? 'bg-primary/5' : 'bg-secondary/5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className={`inline-flex p-4 rounded-2xl shadow-sm ${isTeaching ? 'bg-primary/10' : 'bg-secondary/10'}`}>
            <Icon className={`w-10 h-10 ${isTeaching ? 'text-primary' : 'text-secondary'}`} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground">{title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>
      </section>

      {/* Subcategory Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {grouped.map(([subcategory, items]) => {
            const meta = subcategoryMeta[subcategory] || { icon: '📁', color: 'from-gray-50 to-slate-50 border-gray-200' };

            return (
              <div
                key={subcategory}
                className={`rounded-2xl border-2 bg-gradient-to-br ${meta.color} overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
              >
                {/* Subcategory Header */}
                <div className="px-8 pt-8 pb-4 flex items-center gap-4">
                  <span className="text-4xl">{meta.icon}</span>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                      {subcategory}
                    </h2>
                    <p className="text-muted-foreground">{items.length} פריטים</p>
                  </div>
                </div>

                {/* Materials inside this subcategory */}
                <div className="px-6 pb-6">
                  <div className="grid gap-3">
                    {items.map(item => (
                      <MaterialRow key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {allItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground">עוד לא הוספתי תוכן כאן</p>
            <p className="text-lg text-muted-foreground mt-2">בקרוב!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MaterialRow({ item }: { item: StaticMaterial }) {
  const hasLink = Boolean(item.linkUrl);
  const Wrapper = hasLink ? 'a' : 'div';
  const linkProps = hasLink
    ? {
        href: item.linkUrl,
        target: item.linkUrl.startsWith('http') ? '_blank' as const : '_self' as const,
        rel: item.linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined,
      }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className={`flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white
        transition-all duration-200 group
        ${hasLink ? 'hover:bg-white hover:shadow-md hover:-translate-x-1 cursor-pointer' : ''}`}
    >
      <span className="text-2xl flex-shrink-0 w-10 text-center">{item.icon}</span>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{item.description}</p>
      </div>
      {hasLink && (
        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:-translate-x-1 flex-shrink-0 rtl:rotate-180 rtl:group-hover:translate-x-1" />
      )}
    </Wrapper>
  );
}
