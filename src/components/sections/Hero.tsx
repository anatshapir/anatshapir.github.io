import React from 'react';
import { ArrowLeft } from 'lucide-react';

export function Hero() {
  return (
    <section
      className="relative min-h-[78vh] overflow-hidden bg-[#FFFDF8] pt-24"
      dir="rtl"
    >
      <div className="relative z-10 mx-auto grid min-h-[78vh] max-w-6xl items-center px-6 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
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

        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute -right-10 top-20 h-64 w-64 opacity-70"
            style={{
              backgroundColor: "#00B0FF",
              WebkitMaskImage: "url(/lalinka/visual/circle.svg)",
              maskImage: "url(/lalinka/visual/circle.svg)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
          <div
            className="absolute right-[14%] top-[18%] h-44 w-44 opacity-45"
            style={{
              backgroundColor: "#F9BF31",
              WebkitMaskImage: "url(/lalinka/visual/arc.svg)",
              maskImage: "url(/lalinka/visual/arc.svg)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
          <div
            className="absolute -bottom-20 left-[-2%] h-72 w-72 opacity-55"
            style={{
              backgroundColor: "#EF882A",
              WebkitMaskImage: "url(/lalinka/visual/semicircle.svg)",
              maskImage: "url(/lalinka/visual/semicircle.svg)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
          <div
            className="absolute bottom-8 left-[18%] h-32 w-32 opacity-30"
            style={{
              backgroundColor: "#6D338E",
              WebkitMaskImage: "url(/lalinka/visual/diagonal-block.svg)",
              maskImage: "url(/lalinka/visual/diagonal-block.svg)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
        </div>
      </div>
    </section>
  );
}
