import React from 'react';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#18324A]/[0.08] bg-[#FFFDF8] py-14" dir="rtl">
      <div className="pointer-events-none absolute -right-20 -bottom-24 h-64 w-64 rounded-full bg-[#00B0FF]/07" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-full bg-[#F9BF31]/08" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-sans text-xl font-extrabold tracking-[0.08em] text-[#18324A]">LALINKA</p>
          <p className="mt-3 max-w-md text-base leading-relaxed text-[#18324A]/55">
            דברים טובים ללמוד, לגלות ולאהוב.
          </p>
        </div>

        <div className="text-sm text-[#18324A]/45 md:text-left">
          <p>העולם של ענת</p>
          <p className="mt-1">© {new Date().getFullYear()} LALINKA</p>
        </div>
      </div>
    </footer>
  );
}
