import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, FileText } from "lucide-react";
import { Link, useLocation } from "./router";
import CatalogStatus from "@/approved/catalog-status";
import { contentHref, getCategoryMaterials, getMaterialUrl, useContentCatalog, type Material } from "@/approved/content-catalog";
import "./catalog-pages.css";
import "./learning-topics.css";

const learningOrder = ["יסודות מדעי המחשב", "מבני נתונים", "מדעי הנתונים", "פיתוח ווב", "מודלים חישוביים"];
const descriptions: Record<string, string> = {
  "יסודות מדעי המחשב": "להבין איך מחשבים, תוכניות ואלגוריתמים עובדים — מהרעיון ועד הקוד.",
  "מבני נתונים": "לחשוב כמו מתכנתים: רקורסיה, עצים, חיפוש ועוד דרכים לארגן ולפתור בעיות.",
  "מדעי הנתונים": "לגלות מה אפשר להבין מנתונים — ואיך מחשבים עוזרים לנו למצוא דפוסים ותשובות.",
  "פיתוח ווב": "לבנות את מה שקורה מאחורי המסך — מדפי HTML ועד אפליקציות ואתרים.",
  "מודלים חישוביים": "לגלות מה מחשבים יכולים לחשב, איך הם עושים זאת, ואיפה עובר הגבול.",
};
const accents = ["#00B0FF", "#F9BF31", "#EF882A", "#3ABD6C", "#6D338E"];
export const topicHref = (path: string[]) => `#topic/${path.map(encodeURIComponent).join("/")}`;
export const pathMatches = (path: string[], prefix: string[]) => prefix.length <= path.length && prefix.every((part, index) => path[index] === part);

function safeExternal(url: string) {
  try { return new URL(url, window.location.origin).origin !== window.location.origin; }
  catch { return false; }
}

export function LearningSubjectGrid() {
  const catalog = useContentCatalog();
  const materials = catalog.data?.materials;
  const learning = materials ? getCategoryMaterials(materials, "learn") : [];
  const names = Array.from(new Set(learning.map((item) => item.path[0]).filter((name): name is string => Boolean(name))));
  const topics = [...learningOrder.filter((name) => names.includes(name)), ...names.filter((name) => !learningOrder.includes(name))];
  return (
    <section id="topics" className="learning-subjects" aria-label="נושאי הלמידה" dir="rtl">
      <CatalogStatus query={catalog} />
      {!catalog.isPending && !catalog.isError && (
        topics.length ? <div className="learning-subject-grid">
          {topics.map((name, index) => (
            <Link key={name} href={topicHref([name])} className="learning-subject-card">
              <span className="learning-subject-number" dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <span className="learning-subject-mark" style={{ backgroundColor: accents[index % accents.length] }} aria-hidden="true" />
              <span className="learning-subject-copy">
                <strong>{name}</strong>
                {descriptions[name] && <span>{descriptions[name]}</span>}
                <span className="learning-subject-cta">להיכנס <span aria-hidden="true">←</span></span>
              </span>
            </Link>
          ))}
        </div> : <div className="catalog-empty"><h2>עדיין אין נושאי למידה</h2><p>לא נמצאו נושאים בקטלוג המקורי.</p></div>
      )}
    </section>
  );
}

export function LearningTopicPage({ pathSegments }: { pathSegments: string[] }) {
  const catalog = useContentCatalog();
  const [location] = useLocation();
  const materials = catalog.data?.materials;
  const currentName = pathSegments[pathSegments.length - 1];
  if (!pathSegments.length || pathSegments.some((part) => !part.trim())) {
    return <TopicMessage title="הנושא לא נמצא" body="נתיב הנושא אינו תקין." />;
  }
  if (catalog.isPending || catalog.isError) return <div className="learning-topic-page" dir="rtl"><CatalogStatus query={catalog} /></div>;
  if (!materials) return <TopicMessage title="לא ניתן לטעון את הנושא" body="קטלוג התוכן לא זמין כרגע." />;
  const learning = getCategoryMaterials(materials, "learn");
  const descendants = learning.filter((item) => pathMatches(item.path, pathSegments));
  if (!descendants.length) return <TopicMessage title="הנושא לא נמצא" body="לא נמצא תוכן בנתיב הזה בקטלוג המקורי." />;

  const directItems = descendants.filter((item) => item.path.length === pathSegments.length);
  const subFolders = Array.from(new Set(descendants.filter((item) => item.path.length > pathSegments.length).map((item) => item.path[pathSegments.length])));
  const rootHref = "#materials";
  const backHref = pathSegments.length > 1 ? topicHref(pathSegments.slice(0, -1)) : rootHref;
  const backLabel = pathSegments.length > 1 ? `חזרה ל${pathSegments[pathSegments.length - 2]}` : "חזרה לללמוד";
  const from = location.split("?")[0];
  return (
    <div className="learning-topic-page" dir="rtl">
      <header className="learning-topic-hero">
        <Link href={backHref} className="learning-topic-back"><ArrowRight size={18} />{backLabel}</Link>
        <nav className="learning-topic-breadcrumbs" aria-label="פירורי לחם">
          <Link href={rootHref}>ללמוד</Link>
          {pathSegments.map((part, index) => <span key={`${part}-${index}`} className="learning-crumb">
            <span aria-hidden="true">/</span>
            {index < pathSegments.length - 1 ? <Link href={topicHref(pathSegments.slice(0, index + 1))}>{part}</Link> : <span aria-current="page">{part}</span>}
          </span>)}
        </nav>
        <span className="learning-topic-icon" aria-hidden="true"><BookOpen size={25} /></span>
        <p className="eyebrow">ללמוד · {pathSegments.length === 1 ? "תחום" : "תת־נושא"}</p>
        <h1>{currentName}</h1>
        <p className="learning-topic-count">{descendants.length} פריטים בשביל הזה</p>
      </header>
      <div className="learning-topic-content">
        {subFolders.length > 0 && <section className="learning-topic-section" aria-labelledby="topic-subjects-title">
          <div className="learning-topic-section-heading"><p className="eyebrow">ממשיכים פנימה</p><h2 id="topic-subjects-title">תת־נושאים</h2></div>
          <div className="learning-subfolder-grid">{subFolders.map((name, index) => {
            const count = descendants.filter((item) => item.path.length > pathSegments.length && item.path[pathSegments.length] === name).length;
            return <Link key={name} href={topicHref([...pathSegments, name])} className="learning-subfolder-card">
              <span className="learning-subfolder-index" dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <span className="learning-subfolder-dot" style={{ backgroundColor: accents[(index + pathSegments.length) % accents.length] }} />
              <strong>{name}</strong><span>{count} פריטים <ArrowLeft size={15} /></span>
            </Link>;
          })}</div>
        </section>}
        {directItems.length > 0 && <section className="learning-topic-section" aria-labelledby="topic-materials-title">
          <div className="learning-topic-section-heading"><p className="eyebrow">מתוך האוסף המקורי</p><h2 id="topic-materials-title">חומרי למידה</h2></div>
          <div className="materials-grid">{directItems.map((item) => <TopicMaterialCard key={item.id} item={item} from={from} />)}</div>
        </section>}
        {!directItems.length && !subFolders.length && <div className="catalog-empty"><h2>אין כאן פריטים</h2><p>לא נמצאו חומרים ישירים או תתי־נושאים.</p></div>}
      </div>
    </div>
  );
}

function TopicMaterialCard({ item, from }: { item: Material; from: string }) {
  const url = getMaterialUrl(item);
  const external = url ? safeExternal(url) : false;
  return <article className="material-card catalog-material-card">
    <div className="material-icon tone-blue"><FileText size={22} /></div>
    <nav className="material-path" aria-label="מיקום בנושא">{item.path.map((part, index) => <span key={`${part}-${index}`}>{part}</span>)}</nav>
    <Link href={contentHref(item, from)} className="material-title-link"><h2>{item.title}</h2></Link>
    {item.description && <p className="material-description">{item.description}</p>}
    <div className="material-actions learning-material-actions">
      {url ? <a className="catalog-source-link learning-resource-link" href={url} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {external ? "פתיחה באתר המקורי" : "פתיחת חומר הלמידה"} <ExternalLink size={15} aria-hidden="true" />
        {external && <span className="sr-only"> (נפתח בחלון חדש)</span>}
      </a> : <span className="learning-no-resource">לפריט הזה מוצגים פרטים בלבד</span>}
      <Link href={contentHref(item, from)} className="catalog-detail-link learning-detail-link">לפרטי החומר <ArrowLeft size={15} /></Link>
    </div>
  </article>;
}

function TopicMessage({ title, body }: { title: string; body: string }) {
  return <section className="learning-topic-page" dir="rtl"><div className="catalog-empty"><BookOpen size={24} /><h2>{title}</h2><p>{body}</p><Link href="/category/learn" className="text-link">חזרה לללמוד <ArrowLeft size={16} /></Link></div></section>;
}