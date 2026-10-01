import React from 'react';
import { ArrowLeft } from 'lucide-react';

export function Hero() {
  return (
    <section
      className="relative min-h-[78vh] overflow-hidden bg-[#FFFDF8] pt-24"
      dir="rtl"
    >
      <div className="mx-auto grid min-h-[78vh] max-w-6xl items-center px-6 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="max-w-3xl">
          <p className="mb-7 text-sm font-semibold tracking-[0.12em] text-[#EF882A]">
            העולם של ענת
          </p>

          <h1 className="font-sans text-[48px] font-bold leading-[1.08] tracking-[-0.035em] text-[#18324A] sm:text-[64px] lg:text-[72px]">
            דברים ש<span className="text-[#EF882A]">ענת</span> אוהבת במיוחד
          </h1>

          <p className="mt-8 max-w-2xl font-sans text-xl leading-[1.65] text-[#18324A]/65 sm:text-[23px]">
            דברים טובים ללמוד, לגלות ולאהוב
          </p>

          <div className="mt-10">
            <a
              href="#materials"
              className="group inline-flex items-center gap-3 rounded-xl bg-[#18324A] px-7 py-4 font-sans text-lg font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              להיכנס לעולם של ענת
              <ArrowLeft
                size={19}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
            </a>
          </div>
        </div>

        <div className="relative hidden min-h-[360px] lg:block" aria-hidden="true">
          <div className="absolute right-10 top-10 h-56 w-56 bg-[#00B0FF]/12" style={{
            WebkitMaskImage: "url(/lalinka/visual/arc.svg)",
            maskImage: "url(/lalinka/visual/arc.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }} />
        </div>
      </div>
    </section>
  );
}
