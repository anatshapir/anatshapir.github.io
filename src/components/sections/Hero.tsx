import React from 'react';
import { ArrowLeft } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FFFDF8] pt-20" dir="rtl">
      {/* LALINKA Hero: quiet editorial field + approved character composition */}
      <div className="relative z-10 mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-6 pb-12 pt-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4 lg:pb-8 lg:pt-4">
        <div className="order-2 relative z-20 max-w-2xl text-right lg:order-1">
          <p className="mb-5 text-sm font-semibold tracking-[0.12em] text-[#EF882A]">
            העולם של ענת
          </p>

          <h1 className="font-sans text-[48px] font-bold leading-[1.06] tracking-[-0.035em] text-[#18324A] sm:text-[62px] lg:text-[68px]">
            דברים ש<span className="text-[#EF882A]">ענת</span> אוהבת במיוחד
          </h1>

          <p className="mt-7 max-w-xl text-xl leading-[1.65] text-[#18324A]/70 sm:text-[23px]">
            דברים טובים ללמוד, לגלות ולאהוב
          </p>

          <div className="mt-9">
            <a
              href="#worlds"
              className="group inline-flex items-center gap-3 rounded-xl bg-[#EF882A] px-7 py-4 text-lg font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
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

        <div
          className="relative order-1 flex min-h-[440px] items-end justify-center lg:order-2 lg:min-h-[620px]"
          aria-label="איור הילדה והעץ"
        >
          <img
            src="/lalinka/characters/girl-by-tree.svg"
            alt="הילדה של LALINKA ליד העץ"
            className="relative z-10 max-h-[600px] w-full max-w-[620px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
