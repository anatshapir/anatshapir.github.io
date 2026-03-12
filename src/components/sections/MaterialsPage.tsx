import React, { useState, useMemo } from 'react';
import { ExternalLink, BookOpen, Star } from 'lucide-react';
import { staticMaterials, StaticMaterial } from '@/data/materials';
import { Material } from '@/blink/client';

interface MaterialsPageProps {
  category: 'teaching' | 'general';
  dbMaterials: Material[];
}

export function MaterialsPage({ category, dbMaterials }: MaterialsPageProps) {
  const [activeFilter, setActiveFilter] = useState('הכל');

  const isTeaching = category === 'teaching';
  const title = isTeaching ? 'חומרי למידה' : 'דברים מעניינים';
  const subtitle = isTeaching
    ? 'מערכי שיעור, דפי עבודה ומשחקים לימודיים שיצרתי באהבה עבור תלמידים ומורים.'
    : 'פינה של השראה - ספרים, שירים, וסתם דברים שעושים לי טוב ומעוררים מחשבה.';
  const Icon = isTeaching ? BookOpen : Star;

  // Combine static + DB materials
  const allItems = useMemo(() => {
    const staticItems = staticMaterials.filter(m => m.category === category);
    const dbItems: StaticMaterial[] = dbMaterials
      .filter(m => m.category === category)
      .map(m => ({
        id: m.id,
        title: m.title,
        description: m.description,
        category: m.category,
        subcategory: m.subcategory || 'כללי',
        linkUrl: m.linkUrl || '',
        icon: isTeaching ? '📄' : '✨',
      }));
    return [...staticItems, ...dbItems];
  }, [category, dbMaterials, isTeaching]);

  // Get unique subcategories
  const subcategories = useMemo(() => {
    const subs = new Set(allItems.map(m => m.subcategory));
    return ['הכל', ...Array.from(subs)];
  }, [allItems]);

  // Filter items
  const filteredItems = activeFilter === 'הכל'
    ? allItems
    : allItems.filter(m => m.subcategory === activeFilter);

  // Group by subcategory
  const grouped = useMemo(() => {
    const groups: Record<string, StaticMaterial[]> = {};
    filteredItems.forEach(m => {
      const sub = m.subcategory || 'כללי';
      if (!groups[sub]) groups[sub] = [];
      groups[sub].push(m);
    });
    return groups;
  }, [filteredItems]);

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
          <p className="text-lg text-muted-foreground">{allItems.length} פריטים</p>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {subcategories.map(sub => (
            <button
              key={sub}
              onClick={() => setActiveFilter(sub)}
              className={`px-5 py-2.5 rounded-full text-base font-medium transition-all ${
                activeFilter === sub
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-background border-2 border-border hover:border-primary hover:text-primary'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Materials grouped by subcategory */}
        <div className="space-y-10">
          {Object.entries(grouped).map(([subcategory, items]) => (
            <div key={subcategory}>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                <span className={`w-2 h-8 rounded-full ${isTeaching ? 'bg-primary' : 'bg-secondary'}`} />
                {subcategory}
                <span className="text-base font-normal text-muted-foreground">({items.length})</span>
              </h2>
              <div className="grid gap-4">
                {items.map(item => (
                  <MaterialCard key={item.id} item={item} isTeaching={isTeaching} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground">אין תוכן בקטגוריה זו עדיין</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MaterialCard({ item, isTeaching }: { item: StaticMaterial; isTeaching: boolean }) {
  const Wrapper = item.linkUrl ? 'a' : 'div';
  const linkProps = item.linkUrl
    ? { href: item.linkUrl, target: item.linkUrl.startsWith('http') ? '_blank' : '_self', rel: item.linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className={`flex items-center gap-5 p-5 bg-background rounded-xl border-2 border-border/50
        transition-all duration-200 group
        ${item.linkUrl ? 'hover:shadow-lg hover:border-primary/30 hover:-translate-x-1 cursor-pointer' : ''}`}
    >
      <span className="text-3xl flex-shrink-0">{item.icon}</span>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium flex-shrink-0 ${
        isTeaching ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
      }`}>
        {item.subcategory}
      </span>
      {item.linkUrl && (
        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      )}
    </Wrapper>
  );
}
