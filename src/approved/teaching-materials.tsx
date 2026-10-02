import { useMemo, useState } from "react";
import { Link, useLocation } from "./router";
import { ArrowUpLeft, BookOpen, ExternalLink, FileText, Search } from "lucide-react";
import CatalogStatus from "@/approved/catalog-status";
import { useContentCatalog, getCategoryMaterials, getMaterialUrl, contentHref, type Material } from "@/approved/content-catalog";
import "./catalog-pages.css";

function isExternal(url: string) {
  try {
    return new URL(url, window.location.origin).origin !== window.location.origin;
  } catch {
    return false;
  }
}

export default function TeachingMaterials() {
  const [location] = useLocation();
  const catalog = useContentCatalog();
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [subSubtopic, setSubSubtopic] = useState("");
  const [search, setSearch] = useState("");
  const materials = catalog.data?.materials;
  const learningMaterials = useMemo(() => materials ? getCategoryMaterials(materials, "learn") : [], [materials]);
  const topics = useMemo(() => Array.from(new Set(learningMaterials.map((item) => item.path[0]).filter(Boolean))), [learningMaterials]);
  const subtopics = useMemo(() => Array.from(new Set(learningMaterials.filter((item) => !topic || item.path[0] === topic).map((item) => item.path[1]).filter(Boolean))), [learningMaterials, topic]);
  const subSubtopics = useMemo(() => Array.from(new Set(learningMaterials.filter((item) => (!topic || item.path[0] === topic) && (!subtopic || item.path[1] === subtopic)).map((item) => item.path[2]).filter(Boolean))), [learningMaterials, topic, subtopic]);
  const visibleMaterials = useMemo(() => learningMaterials.filter((item) => {
    const query = search.trim().toLocaleLowerCase();
    return (!topic || item.path[0] === topic)
      && (!subtopic || item.path[1] === subtopic)
      && (!subSubtopic || item.path[2] === subSubtopic)
      && (!query || `${item.title} ${item.description} ${item.path.join(" ")}`.toLocaleLowerCase().includes(query));
  }), [learningMaterials, topic, subtopic, subSubtopic, search]);

  const setTopicValue = (value: string) => { setTopic(value); setSubtopic(""); setSubSubtopic(""); };
  const setSubtopicValue = (value: string) => { setSubtopic(value); setSubSubtopic(""); };

  return (
    <div className="content-page" dir="rtl">
      <div className="content-page-heading">
        <span className="section-icon"><BookOpen size={25} /></span>
        <p className="eyebrow">ללמוד</p>
        <h1>חומרי <span>למידה</span></h1>
        <p className="content-intro">כל חומרי הלמידה המקוריים, מסודרים לפי נושא ותת־נושא.</p>
      </div>
      <CatalogStatus query={catalog} />
      {!catalog.isPending && !catalog.isError && materials && (
        <>
          {learningMaterials.length > 0 && (
            <section className="catalog-browser" aria-label="סינון חומרי למידה">
              <div className="catalog-filters">
                <label className="catalog-filter" htmlFor="learning-topic">
                  <span>תחום</span>
                  <select id="learning-topic" aria-label="תחום" value={topic} onChange={(event) => setTopicValue(event.target.value)}>
                    <option value="">כל התחומים</option>
                    {topics.map((value) => <option key={value} value={value}>{value}</option>)}
                  </select>
                </label>
                <label className="catalog-filter" htmlFor="learning-subtopic">
                  <span>נושא</span>
                  <select id="learning-subtopic" aria-label="נושא" value={subtopic} onChange={(event) => setSubtopicValue(event.target.value)} disabled={!subtopics.length}>
                    <option value="">כל הנושאים</option>
                    {subtopics.map((value) => <option key={value} value={value}>{value}</option>)}
                  </select>
                </label>
                <label className="catalog-filter" htmlFor="learning-sub-subtopic">
                  <span>תת־נושא</span>
                  <select id="learning-sub-subtopic" aria-label="תת־נושא" value={subSubtopic} onChange={(event) => setSubSubtopic(event.target.value)} disabled={!subSubtopics.length}>
                    <option value="">כל תתי־הנושאים</option>
                    {subSubtopics.map((value) => <option key={value} value={value}>{value}</option>)}
                  </select>
                </label>
                <label className="catalog-search">
                  <Search size={18} aria-hidden="true" />
                  <span className="sr-only">חיפוש בחומרי הלמידה</span>
                  <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="חיפוש לפי שם או נושא" />
                </label>
              </div>
              <div className="catalog-count" aria-live="polite">{visibleMaterials.length} מתוך {learningMaterials.length} פריטים</div>
            </section>
          )}
          {learningMaterials.length === 0 ? (
            <div className="catalog-empty">
              <span className="catalog-empty-icon"><BookOpen size={22} /></span>
              <h2>עדיין אין חומרי למידה</h2>
              <p>כשיתווספו חומרים, הם יופיעו כאן.</p>
            </div>
          ) : visibleMaterials.length === 0 ? (
            <div className="catalog-empty compact">
              <h2>לא נמצאו תוצאות</h2>
              <p>נסו לשנות את הנושא או את מילות החיפוש.</p>
              <button className="catalog-text-button" type="button" onClick={() => { setTopicValue(""); setSearch(""); }}>ניקוי הסינון</button>
            </div>
          ) : (
            <div className="materials-grid">
              {visibleMaterials.map((item) => <LearningCard key={item.id} item={item} from={location} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function LearningCard({ item, from }: { item: Material; from: string }) {
  const url = getMaterialUrl(item);
  const external = url ? isExternal(url) : false;
  return (
    <article className="material-card catalog-material-card">
      <div className="material-icon tone-blue"><FileText size={23} /></div>
      <nav className="material-path" aria-label="מיקום בנושא">
        {item.path.map((part, index) => <span key={`${part}-${index}`}>{part}</span>)}
      </nav>
      <Link href={contentHref(item, from)} className="material-title-link">
        <h2>{item.title}</h2>
      </Link>
      {item.description && <p className="material-description">{item.description}</p>}
      <div className={`material-actions learning-material-actions${url ? " has-resource" : ""}`}>
        {url ? (
          <>
            <a className="catalog-source-link learning-resource-link" href={url} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
              {external ? "פתיחה באתר המקורי" : "פתיחת חומר הלמידה"} <ExternalLink size={15} aria-hidden="true" />
              {external && <span className="sr-only"> (נפתח בחלון חדש)</span>}
            </a>
            <Link href={contentHref(item, from)} className="catalog-detail-link learning-detail-link">
              לפרטי החומר <ArrowUpLeft size={16} />
            </Link>
          </>
        ) : (
          <>
            <Link href={contentHref(item, from)} className="catalog-detail-link learning-detail-link">
              לפרטי החומר <ArrowUpLeft size={16} />
            </Link>
            <span className="learning-no-resource">לפריט הזה מוצגים פרטים בלבד</span>
          </>
        )}
      </div>
    </article>
  );
}