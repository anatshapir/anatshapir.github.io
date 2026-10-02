import { ArrowRight, BookOpen, ExternalLink } from "lucide-react";
import { Link, useSearch } from "./router";
import CatalogStatus from "@/approved/catalog-status";
import { getMaterialUrl, useContentCatalog } from "@/approved/content-catalog";
import type { Material } from "@/approved/content-catalog";
import "./catalog-pages.css";

const allowedReturnPaths = new Set([
  "/general",
  "/teaching-materials",
  "/category/learn",
  "/category/discover",
  "/category/create",
  "/category/love",
  "/category/products",
]);

function fallbackPath(item?: Material) {
  if (item?.category === "teaching") return "/category/learn";
  if (item?.category === "general" && item.path?.[0] === "ספרים") return "/category/discover";
  if (item && ["discover", "create", "love", "products"].includes(item.category)) return `/category/${item.category}`;
  return "/category/love";
}

function safeReturnPath(value: string | null, item?: Material) {
  if (!value) return fallbackPath(item);
  try {
    if (allowedReturnPaths.has(value)) return value;
    if (item?.category === "teaching" && value.startsWith("/topic/")) {
      const segments = value.slice("/topic/".length).split("/").map((part) => decodeURIComponent(part));
      const isOwnedLearningAncestor = segments.length > 0
        && segments.every(Boolean)
        && segments.length <= item.path.length
        && segments.every((part, index) => item.path[index] === part);
      if (isOwnedLearningAncestor) return `/topic/${segments.map(encodeURIComponent).join("/")}`;
    }
    return fallbackPath(item);
  } catch {
    return fallbackPath(item);
  }
}

function isExternal(url: string) {
  try {
    return new URL(url, window.location.origin).origin !== window.location.origin;
  } catch {
    return false;
  }
}

export default function ContentDetail({ id }: { id: string }) {
  const search = useSearch();
  const catalog = useContentCatalog();
  const params = new URLSearchParams(search);
  let decodedId: string;
  try {
    decodedId = decodeURIComponent(id);
  } catch {
    return <section className="not-found-page" dir="rtl"><h1>העמוד לא נמצא</h1><p>הקישור הזה לא מוביל לעמוד באתר.</p><Link href="/">חזרה לדף הבית</Link></section>;
  }
  const item = catalog.data?.materials.find((material) => material.id === decodedId);
  const backPath = safeReturnPath(params.get("from"), item);

  if (catalog.isPending || catalog.isError) return <div className="content-page" dir="rtl"><CatalogStatus query={catalog} /></div>;
  if (!catalog.data || !item) return <section className="not-found-page" dir="rtl"><h1>העמוד לא נמצא</h1><p>הקישור הזה לא מוביל לעמוד באתר.</p><Link href="/">חזרה לדף הבית</Link></section>;

  const url = getMaterialUrl(item);
  const sourcePath = fallbackPath(item);
  const external = url ? isExternal(url) : false;

  return (
    <div className="content-detail-page" dir="rtl">
      <Link href={backPath} className="content-detail-back"><ArrowRight size={17} /> חזרה לתוכן</Link>
      <CatalogStatus query={catalog} />
      <article className={`content-detail-card${item.category === "teaching" ? " learning-detail-card" : ""}`}>
        <div className="content-detail-overline"><BookOpen size={17} /> {item.path.length ? item.path.join(" / ") : "מתוך האוסף של ענת"}</div>
        <h1>{item.title}</h1>
        {item.description ? <p className="content-detail-description">{item.description}</p> : <p className="content-detail-description is-empty">לא צורף תיאור לפריט הזה.</p>}
        <div className="content-detail-divider" />
        <div className="content-detail-meta">
          <span>מיקום באוסף</span>
          <p>{item.path.length ? item.path.join(" ← ") : item.category}</p>
        </div>
        <div className={`content-detail-actions${item.category === "teaching" ? " learning-detail-actions" : ""}`}>
          <Link href={sourcePath} className="catalog-detail-link"><ArrowRight size={16} /> חזרה לקטגוריה</Link>
          {url && (
            <a className={`catalog-source-link source-button${item.category === "teaching" ? " learning-resource-link" : ""}`} href={url} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
              {external ? "פתיחה באתר המקורי" : item.category === "teaching" ? "פתיחת חומר הלמידה" : "פתיחת המשאב"} <ExternalLink size={16} aria-hidden="true" />
              {external && <span className="sr-only"> (נפתח בחלון חדש)</span>}
            </a>
          )}
          {!url && item.category === "teaching" && <span className="learning-no-resource">לפריט הזה מוצגים פרטים בלבד</span>}
        </div>
      </article>
    </div>
  );
}