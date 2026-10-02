import { Link } from "./router";
import { ArrowLeft, BookOpen, ExternalLink, Heart, Lightbulb, Package, Sparkles } from "lucide-react";
import TeachingMaterials from "@/approved/teaching-materials";
import CatalogStatus from "@/approved/catalog-status";
import { contentHref, getCategoryMaterials, getMaterialUrl, useContentCatalog } from "@/approved/content-catalog";
import { LearningAtmosphere } from "@/components/sections/LearningAtmosphere";
import { TopicGrid } from "@/components/sections/TopicGrid";
import "./catalog-pages.css";

const categories: Record<string, { title: string; kicker: string; description: string; illustration: string; icon: typeof Sparkles }> = {
  discover: { title: "לגלות", kicker: "סקרנות פותחת דלתות", description: "המלצות מתוך הדברים שענת אוהבת במיוחד.", illustration: "/illustrations/categories/discover.svg", icon: Sparkles },
  create: { title: "ליצור", kicker: "רעיונות שמבקשים ידיים", description: "הפריטים שענת שיתפה באזור היצירה.", illustration: "/illustrations/categories/create.svg", icon: Lightbulb },
  love: { title: "לאהוב", kicker: "דברים קטנים שעושים טוב", description: "השראה אישית מתוך האוסף של ענת.", illustration: "/illustrations/categories/love.svg", icon: Heart },
  products: { title: "מוצרים", kicker: "בוחרים באהבה", description: "מוצרים שענת בחרה לשתף.", illustration: "/illustrations/categories/products.svg", icon: Package },
};

function isExternal(url: string) {
  try {
    return new URL(url, window.location.origin).origin !== window.location.origin;
  } catch {
    return false;
  }
}

export default function CategoryPage({ slug }: { slug: string }) {
  const catalog = useContentCatalog();
  if (slug === "learn") return (
    <div className="learning-overview" dir="rtl">
      <LearningAtmosphere />
      <section className="learning-intro">
        <p className="eyebrow">עולם 01</p>
        <h1>ללמוד</h1>
        <p>רעיונות, מקורות וכלים להרחבת הידע והסקרנות</p>
      </section>
      <section className="learning-topics" aria-labelledby="learning-topics-title">
        <div className="learning-topics-heading">
          <p className="eyebrow">שבילים</p>
          <h2 id="learning-topics-title">מה בא לך להבין?</h2>
          <p>בחרי נושא, ומשם ניכנס פנימה.</p>
        </div>
        <TopicGrid category="teaching" title="" />
      </section>
      <TeachingMaterials />
    </div>
  );
  const category = categories[slug];
  if (!category) return <div className="not-found-page" dir="rtl"><h1>העמוד לא נמצא</h1><Link href="/">חזרה לדף הבית <ArrowLeft size={16} /></Link></div>;

  const items = catalog.data ? getCategoryMaterials(catalog.data.materials, slug) : [];
  const Icon = category.icon;

  return (
    <section className="category-page" dir="rtl" aria-labelledby="category-page-title">
      <div className="category-page-hero">
        <div className="category-page-copy">
          <p className="eyebrow">{category.kicker}</p>
          <h1 id="category-page-title">{category.title}</h1>
          <p>{category.description}</p>
        </div>
        <img src={category.illustration} alt="" />
      </div>
      <CatalogStatus query={catalog} />
      {!catalog.isPending && !catalog.isError && catalog.data && (
        items.length ? (
          <div className="existing-content">
            {items.map((item) => {
              const url = getMaterialUrl(item);
              return (
                <article className="existing-content-card catalog-category-card" key={item.id}>
                  <span className="existing-content-icon"><Icon size={22} /></span>
                  <div className="catalog-category-copy">
                    <span className="general-card-path">{item.path.join(" · ")}</span>
                    <Link href={contentHref(item, `/category/${slug}`)} className="catalog-category-title"><h2>{item.title}</h2></Link>
                    {item.description && <p>{item.description}</p>}
                    <div className="catalog-card-links">
                      <Link href={contentHref(item, `/category/${slug}`)} className="catalog-detail-link">לפרטים <ArrowLeft size={15} /></Link>
                      {url && <a className="catalog-source-link" href={url} target={isExternal(url) ? "_blank" : undefined} rel={isExternal(url) ? "noopener noreferrer" : undefined}>
                        {isExternal(url) ? "פתיחה באתר חיצוני" : "פתיחת המשאב"} <ExternalLink size={14} />
                        {isExternal(url) && <span className="sr-only"> (נפתח בחלון חדש)</span>}
                      </a>}
                    </div>
                  </div>
                </article>
              );
            })}
            {slug === "discover" && (
              <Link href="/general" className="text-link general-link">לכל התוכן הכללי <BookOpen size={16} /></Link>
            )}
          </div>
        ) : (
          <div className="category-empty">
            <span className="empty-mark" aria-hidden="true" />
            <h2>עוד אין כאן פריטים</h2>
            <p>כשתהיה לענת המלצה לשתף, היא תופיע כאן.</p>
            <Link href="/" className="text-link">חזרה לכל הקטגוריות <ArrowLeft size={16} /></Link>
          </div>
        )
      )}
    </section>
  );
}