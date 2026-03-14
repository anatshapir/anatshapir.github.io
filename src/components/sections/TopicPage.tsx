import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useMaterials } from '@/context/MaterialsContext';
import type { StaticMaterial } from '@/data/materials';

interface TopicPageProps {
  pathSegments: string[];
}

export function TopicPage({ pathSegments }: TopicPageProps) {
  const { materials, meta: subcategoryMeta } = useMaterials();

  const currentName = pathSegments[pathSegments.length - 1];
  const meta = subcategoryMeta[currentName] || { icon: '📁', color: 'from-gray-50 to-slate-50 border-gray-200' };

  // Find materials whose path starts with current segments
  const descendants = materials.filter(m =>
    pathSegments.every((seg, i) => m.path[i] === seg)
  );

  // Materials at exactly this level (path matches exactly)
  const directItems = descendants.filter(m => m.path.length === pathSegments.length);

  // Sub-folders: materials that go deeper, grouped by their next segment
  const subFolders = Object.entries(
    descendants.reduce((acc, m) => {
      if (m.path.length > pathSegments.length) {
        const nextSeg = m.path[pathSegments.length];
        if (!acc[nextSeg]) acc[nextSeg] = 0;
        acc[nextSeg]++;
      }
      return acc;
    }, {} as Record<string, number>)
  );

  // Determine which category page this topic belongs to
  const topCategory = descendants.length > 0 ? descendants[0].category : null;
  const categoryHref = topCategory === 'teaching' ? '#materials' : topCategory === 'general' ? '#interesting' : '#';
  const categoryLabel = topCategory === 'teaching' ? 'חומרי למידה' : topCategory === 'general' ? 'דברים מעניינים' : 'דף הבית';

  // Back link
  const backHref = pathSegments.length > 1
    ? `#topic/${pathSegments.slice(0, -1).map(encodeURIComponent).join('/')}`
    : categoryHref;
  const backLabel = pathSegments.length > 1
    ? `חזרה ל${pathSegments[pathSegments.length - 2]}`
    : `חזרה ל${categoryLabel}`;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Header */}
      <section className={`py-16 bg-gradient-to-br ${meta.color} border-b-2`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href={backHref}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-lg"
          >
            <ArrowRight className="w-5 h-5" />
            {backLabel}
          </a>

          {/* Breadcrumb */}
          {pathSegments.length > 1 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap">
              {pathSegments.map((seg, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="opacity-50">/</span>}
                  {i < pathSegments.length - 1 ? (
                    <a
                      href={`#topic/${pathSegments.slice(0, i + 1).map(encodeURIComponent).join('/')}`}
                      className="hover:text-primary transition-colors"
                    >
                      {subcategoryMeta[seg]?.icon || '📁'} {seg}
                    </a>
                  ) : (
                    <span className="font-medium text-foreground">{subcategoryMeta[seg]?.icon || '📁'} {seg}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          <div className="text-center space-y-4">
            <span className="text-6xl">{meta.icon}</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground">{currentName}</h1>
            <p className="text-xl text-muted-foreground">
              {descendants.length} {descendants.length === 1 ? 'פריט' : 'פריטים'}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Sub-folder cards */}
        {subFolders.length > 0 && (
          <div>
            {directItems.length > 0 && (
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">תת-נושאים</h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {subFolders.map(([name, count]) => {
                const subMeta = subcategoryMeta[name] || { icon: '📁', color: 'from-gray-50 to-slate-50 border-gray-200' };
                return (
                  <a
                    key={name}
                    href={`#topic/${[...pathSegments, name].map(encodeURIComponent).join('/')}`}
                    className={`group relative flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 bg-gradient-to-br ${subMeta.color}
                      shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer aspect-square`}
                  >
                    <span className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300">
                      {subMeta.icon}
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
        )}

        {/* Direct materials at this level */}
        {directItems.length > 0 && (
          <div>
            {subFolders.length > 0 && (
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">חומרים</h2>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {directItems.map(item => (
                <MaterialCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {descendants.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground">עוד לא הוספתי תוכן כאן</p>
            <p className="text-lg text-muted-foreground mt-2">בקרוב!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MaterialCard({ item }: { item: StaticMaterial }) {
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
      className={`flex flex-col gap-3 p-6 bg-white rounded-2xl border-2 border-gray-100 shadow-sm
        transition-all duration-200 group
        ${hasLink ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}`}
    >
      <span className="text-3xl">{item.icon}</span>
      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
        {item.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
      {hasLink && (
        <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-auto">
          פתח
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </span>
      )}
    </Wrapper>
  );
}
