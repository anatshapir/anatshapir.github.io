import React from 'react';

const maskStyle = (asset: string) => ({
  WebkitMaskImage: `url(/lalinka/visual/${asset}.svg)`,
  maskImage: `url(/lalinka/visual/${asset}.svg)`,
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
});

export function LearningAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -right-7 top-16 h-24 w-24 bg-[#F9BF31]/[0.35] sm:right-[4%] sm:top-10 sm:h-36 sm:w-36"
        style={maskStyle('offset-dots')}
      />
      <div
        className="absolute -left-9 top-[43%] h-28 w-28 rotate-12 bg-[#3ABD6C]/20 sm:left-[2%] sm:h-40 sm:w-40"
        style={maskStyle('leaf')}
      />
      <div
        className="absolute -right-10 bottom-8 h-28 w-28 rotate-[-16deg] bg-[#EF882A]/20 sm:right-[8%] sm:h-40 sm:w-40"
        style={maskStyle('quarter-circle')}
      />
      <div className="absolute left-[18%] top-[29%] h-3 w-3 rounded-full bg-[#00B0FF]/[0.35] sm:left-[19%] sm:h-4 sm:w-4" />
      <div className="absolute right-[13%] bottom-[29%] h-2.5 w-2.5 rounded-full bg-[#6D338E]/25 sm:right-[18%] sm:h-3.5 sm:w-3.5" />
    </div>
  );
}