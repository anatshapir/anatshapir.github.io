import { BookOpen, Heart, Sparkles } from "lucide-react";
import { Link } from "./router";
import CatalogStatus from "@/approved/catalog-status";
import { contentHref, getCategoryMaterials, useContentCatalog } from "@/approved/content-catalog";
import "./catalog-pages.css";

export default function GeneralArea() {
  const catalog = useContentCatalog();
  const items = catalog.data ? getCategoryMaterials(catalog.data.materials, "discover").concat(getCategoryMaterials(catalog.data.materials, "love")) : [];

  return (
    <div className="content-page" dir="rtl">
      <div className="content-page-heading">
        <span className="section-icon coral"><Sparkles size={25} /></span>
        <p className="eyebrow">דברים שעושים טוב</p>
        <h1>אזור <span>כללי</span></h1>
        <p className="content-intro">מחשבות והמלצות אישיות של ענת, בדיוק כפי שנשמרו כאן.</p>
      </div>
      <CatalogStatus query={catalog} />
      {!catalog.isPending && !catalog.isError && catalog.data && (
        items.length ? (
          <div className="general-grid">
            {items.map((item, index) => {
              const isBook = item.path[0] === "ספרים";
              const Icon = isBook ? BookOpen : Heart;
              return (
                <Link key={item.id} href={contentHref(item, "/general")} className={`general-card catalog-general-card ${index % 2 ? "tint-rose" : "tint-sun"}`}>
                  <span className="general-card-icon"><Icon size={25} /></span>
                  <span className="general-card-path">{item.path.join(" · ")}</span>
                  <h2>{item.title}</h2>
                  {item.description && <p>{item.description}</p>}
                  <span className="catalog-card-cta">לקריאה <Sparkles size={15} aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="catalog-empty">
            <span className="catalog-empty-icon"><Heart size={22} /></span>
            <h2>עוד אין כאן פריטים</h2>
            <p>המלצות אישיות יופיעו כאן כשיהיו זמינות.</p>
          </div>
        )
      )}
    </div>
  );
}