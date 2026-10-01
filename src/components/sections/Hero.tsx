import React from 'react';
import { ArrowLeft } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FFFDF8] pt-20" dir="rtl">
      {/* LALINKA Hero: approved master character + quiet organic color field */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-40 -top-32 h-[560px] w-[560px] rounded-full bg-[#00B0FF]/10 blur-[2px]" />
        <div className="absolute right-[34%] -top-20 h-[300px] w-[300px] rounded-full bg-[#F9BF31]/12" />
        <div className="absolute -left-40 bottom-[-220px] h-[600px] w-[600px] rounded-full bg-[#EF882A]/10" />
        <div className="absolute left-[18%] bottom-[2%] h-[230px] w-[230px] rounded-full bg-[#6D338E]/06" />
        <div
          className="absolute right-[5%] top-[17%] h-[230px] w-[230px] opacity-35"
          style={{
            backgroundColor: '#00B0FF',
            WebkitMaskImage: "url('/lalinka/visual/arc.svg')",
            maskImage: "url('/lalinka/visual/arc.svg')",
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
          }}
        />
        <div
          className="absolute left-[5%] bottom-[8%] h-[180px] w-[180px] opacity-25"
          style={{
            backgroundColor: '#EF882A',
            WebkitMaskImage: "url('/lalinka/visual/semicircle.svg')",
            maskImage: "url('/lalinka/visual/semicircle.svg')",
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[680px] max-w-7xl items-center gap-8 px-6 pb-10 pt-10 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-4 lg:pb-8 lg:pt-4">
        <div className="order-2 relative z-20 max-w-2xl text-right lg:order-1">
          <p className="mb-5 text-sm font-semibold tracking-[0.12em] text-[#EF882A]">העולם של ענת</p>

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
              <ArrowLeft size={19} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-1" />
            </a>
          </div>
        </div>

        <div className="relative order-1 flex min-h-[470px] items-end justify-center lg:order-2 lg:min-h-[650px]" aria-label="איור הילדה והעץ">
          <div className="absolute inset-x-0 bottom-0 top-8 rounded-[44%_56%_48%_52%/44%_42%_58%_56%] bg-white/45" />
          <img
            src="/lalinka/character/girl_hero_scene.png"
            alt="הילדה של LALINKA ליד העץ"
            className="relative z-10 max-h-[610px] w-full max-w-[610px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
