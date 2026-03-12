import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { staticMaterials, subcategoryMeta, StaticMaterial } from '@/data/materials';

interface TopicPageProps {
  topic: string;
}

export function TopicPage({ topic }: TopicPageProps) {
  const items = staticMaterials.filter(m => m.subcategory === topic);
  const meta = subcategoryMeta[topic] || { icon: '📁', color: 'from-gray-50 to-slate-50 border-gray-200' };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Header */}
      <section className={`py-16 bg-gradient-to-br ${meta.color} border-b-2`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-lg"
          >
            <ArrowRight className="w-5 h-5" />
            חזרה לדף הבית
          </a>
          <div className="text-center space-y-4">
            <span className="text-6xl">{meta.icon}</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground">{topic}</h1>
            <p className="text-xl text-muted-foreground">{items.length} {items.length === 1 ? 'פריט' : 'פריטים'}</p>
          </div>
        </div>
      </section>

      {/* Materials Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(item => (
            <MaterialCard key={item.id} item={item} />
          ))}
        </div>

        {items.length === 0 && (
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
