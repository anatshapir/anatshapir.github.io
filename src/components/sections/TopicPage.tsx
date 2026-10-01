import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useMaterials } from '@/context/MaterialsContext';
import type { StaticMaterial } from '@/data/materials';
import { IconDisplay } from '@/components/IconDisplay';

interface TopicPageProps {
  pathSegments: string[];
}

export function TopicPage({ pathSegments }: TopicPageProps) {
  const { materials, meta: subcategoryMeta } = useMaterials();

  const currentName = pathSegments[pathSegments.length - 1];
  const meta = subcategoryMeta[currentName] || { icon: '📁', color: 'from-gray-50 to-slate-50 border-gray-200' };

  const descendants = materials.filter(m =>
    pathSegments.every((seg, i) => m.path[i] === seg)
  );

  const directItems = descendants.filter(m => m.path.length === pathSegments.length);

  const subFolders = Object.keys(
    descendants.reduce((acc, m) => {
      if (m.path.length > pathSegments.length) {
        acc[m.path[pathSegments.length]] = true;
      }
      return acc;
    }, {} as Record<string, boolean>)
  );

  const topCategory = descendants.length > 0 ? descendants[0].category : null;
  const categoryHref = topCategory === 'teaching' ? '#materials' : topCategory === 'general' ? '#interesting' : '#';
  const categoryLabel = topCategory === 'teaching' ? 'ללמוד' : topCategory === 'general' ? 'דברים מעניינים' : 'דף הבית';

  const backHref = pathSegments.length > 1
    ? `#topic/${pathSegments.slice(0, -1).map(encodeURIComponent).join('/')}`
    : categoryHref;
  const backLabel = pathSegments.length > 1
    ? `חזרה ל${pathSegments[pathSegments.length - 2]}`
    : `חזרה ל${categoryLabel}`;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <section
        className={`py-16 border-b-2 relative overflow-hidden ${meta.headerImage ? '' : `bg-gradient-to-br ${meta.color}`}`}
        style={meta.headerImage ? {
          backgroundImage: `url(${meta.headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : undefined}
      >
        {meta.headerImage && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        )}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${meta.headerImage ? 'relative z-10' : ''}`}>
          <a
            href={backHref}
            className={`inline-flex items-center gap-2 transition-colors mb-8 text-lg ${meta.headerImage ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-primary'}`}
          >
            <ArrowRight className="w-5 h-5" />
            {backLabel}
          </a>

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
                      <IconDisplay icon={subcategoryMeta[seg]?.icon || '📁'} className="text-sm inline-block align-middle" /> {seg}
                    </a>
                  ) : (
                    <span className="font-medium text-foreground">
                      <IconDisplay icon={subcategoryMeta[seg]?.icon || '📁'} className="text-sm inline-block align-middle" /> {seg}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          <div className="text-center space-y-4">
            <IconDisplay icon={meta.icon} className="text-6xl" />
            <h1 className={`text-4xl sm:text-5xl font-serif font-bold ${meta.headerImage ? 'text-white drop-shadow-lg' : 'text-foreground'}`}>
              {currentName}
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {subFolders.length > 0 && (
          <div>
            {directItems.length > 0 && (
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">תת-נושאים</h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {subFolders.map(name => {
                const subMeta = subcategoryMeta[name] || { icon: '📁', color: 'from-gray-50 to-slate-50 border-gray-200' };
                return (
                  <a
                    key={name}
                    href={`#topic/${[...pathSegments, name].map(encodeURIComponent).join('/')}`}
                    className={`group relative flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 bg-gradient-to-br ${subMeta.color}
                      shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer aspect-square`}
                  >
                    <IconDisplay icon={subMeta.icon} className="text-5xl sm:text-6xl" />
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground text-center">
                      {name}
                    </h3>
                    <span className="text-sm text-muted-foreground">להיכנס לנושא ←</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

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

        {descendants.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground">לא נמצא תוכן בנושא הזה.</p>
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
      <IconDisplay icon={item.icon} className="text-3xl" />
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
