import { Link } from "./router";
import { ArrowLeft } from "lucide-react";

const categories = [
  {
    slug: "learn",
    title: "ללמוד",
    description: "רעיונות, מקורות וכלים להרחבת הידע והסקרנות",
    image: "/illustrations/categories/learn.svg",
    tint: "sun",
  },
  {
    slug: "discover",
    title: "לגלות",
    description: "מקומות, טבע, תרבויות ורעיונות מהעולם",
    image: "/illustrations/categories/discover.svg",
    tint: "sky",
  },
  {
    slug: "create",
    title: "ליצור",
    description: "רעיונות ליצירה, תכנון ועשייה שמרגשת",
    image: "/illustrations/categories/create.svg",
    tint: "mint",
  },
  {
    slug: "love",
    title: "לאהוב",
    description: "דברים קטנים וגדולים שעושים את החיים טובים יותר",
    image: "/illustrations/categories/love.svg",
    tint: "rose",
  },
  {
    slug: "products",
    title: "מוצרים",
    description: "דברים נבחרים שענת אוהבת וממליצה עליהם",
    image: "/illustrations/categories/products.svg",
    tint: "lilac",
  },
];

// Start with learning in RTL, preserving the other cards' left-to-right order.
const rightToLeftCategories = [categories[0], ...categories.slice(1).reverse()];

export default function Home() {
  return (
    <div className="home-page" dir="rtl">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-illustration">
          <img src="/lalinka/characters/girl-by-tree.svg" alt="ילדה עומדת ליד עץ" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">העולם של Lalinka</p>
          <h1 id="home-title">דברים שענת <span>אוהבת</span> במיוחד</h1>
          <p className="hero-subtitle">
            דברים טובים ללמוד, לגלות, ליצור ולאהוב
          </p>
          <a className="hero-cta" href="#categories">
            לגלות את האתר <ArrowLeft size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="category-section" id="categories" aria-labelledby="category-title">
        <div className="category-heading">
          <h2 id="category-title">מה מחכה לך ב־<span>דברים שענת אוהבת במיוחד</span>?</h2>
          <p>רעיונות, מקומות ויצירות שמזמינים אותך ללמוד, לגלות, ליצור ולאהוב</p>
        </div>
        <div className="category-grid" dir="rtl">
          {rightToLeftCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={`category-card tint-${category.tint}`}
              dir="rtl"
            >
              <span className="category-art">
                <img src={category.image} alt="" loading="lazy" />
              </span>
              <span className="category-card-copy">
                <span className="category-name">{category.title}</span>
                <span className="category-description">{category.description}</span>
                <span className="category-enter">להיכנס <ArrowLeft size={15} aria-hidden="true" /></span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
