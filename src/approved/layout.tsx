import { useState, type ReactNode } from "react";
import { Link, useLocation } from "./router";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "בית" },
  { href: "/category/learn", label: "ללמוד" },
  { href: "/category/discover", label: "לגלות" },
  { href: "/category/create", label: "ליצור" },
  { href: "/category/love", label: "לאהוב" },
  { href: "/category/products", label: "מוצרים" },
];

export default function ApprovedLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = location.split("?")[0];
  return (
    <div className="approved-ui site-shell" dir="rtl">
      <header className="site-header">
        <div className="header-inner" dir="ltr">
          <Link href="/" className="brand" aria-label="Lalinka – עמוד הבית">
            <img src="/lalinka/logo/lalinka-original.png" alt="Lalinka" className="brand-logo" />
          </Link>
          <nav className="desktop-nav" dir="rtl" aria-label="ניווט ראשי">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} aria-current={currentPath === item.href ? "page" : undefined} className={`nav-link ${currentPath === item.href ? "is-active" : ""}`}>
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="mobile-menu-button"
            aria-label={menuOpen ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={menuOpen}
            aria-controls="approved-mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {menuOpen && (
          <nav id="approved-mobile-navigation" className="mobile-nav" dir="rtl" aria-label="ניווט לנייד">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} aria-current={currentPath === item.href ? "page" : undefined} className={`mobile-nav-link ${currentPath === item.href ? "is-active" : ""}`} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="footer-inner">
          <p><span>© {new Date().getFullYear()} Lalinka</span><span className="footer-dot" aria-hidden="true" /><span>דברים שענת אוהבת במיוחד</span></p>
        </div>
      </footer>
    </div>
  );
}
