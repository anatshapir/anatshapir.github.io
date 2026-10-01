import React from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: 'ללמוד', href: '#materials' },
    { name: 'לגלות', href: '#interesting' },
    { name: 'ליצור', href: '#' },
    { name: 'לאהוב', href: '#interesting' },
    { name: 'מוצרים', href: '#' },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#18324A]/[0.06] bg-[#FFFDF8]/92 backdrop-blur-sm" dir="rtl">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex h-[84px] items-center justify-between">
          <a href="#" aria-label="LALINKA" className="shrink-0">
            <img src="/lalinka/logo/lalinka_logo_original_MASTER.svg" alt="LALINKA" className="h-[54px] w-auto" />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="text-base font-semibold text-[#18324A]/75 transition-colors hover:text-[#EF882A]">
                {item.name}
              </a>
            ))}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="rounded-lg p-2 text-[#18324A] md:hidden" aria-label={isOpen ? 'סגירת תפריט' : 'פתיחת תפריט'} aria-expanded={isOpen}>
            {isOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[#18324A]/[0.06] bg-[#FFFDF8] md:hidden">
          <div className="mx-auto max-w-7xl px-6 py-3 sm:px-8">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="block border-b border-[#18324A]/[0.07] py-4 text-lg font-semibold text-[#18324A]/75 last:border-0">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
