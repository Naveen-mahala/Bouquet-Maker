'use client';

import React from 'react';
import { useBouquetStore } from '@/store/bouquetStore';

interface WrapItem {
  id: string;
  name: string;
  src: string;
  colorName: string;
}

const wraps: WrapItem[] = [
  { id: 'kraft-paper', name: 'Kraft Paper', src: '/wraps/kraft-paper.svg', colorName: 'Warm Brown' },
  { id: 'white-wrap', name: 'White Wrap', src: '/wraps/white-wrap.svg', colorName: 'Elegant White' },
  { id: 'pink-wrap', name: 'Pink Wrap', src: '/wraps/pink-wrap.svg', colorName: 'Blush Pink' },
  { id: 'luxury-black-wrap', name: 'Luxury Black', src: '/wraps/luxury-black-wrap.svg', colorName: 'Black & Gold' },
  { id: 'golden-wrap', name: 'Golden Wrap', src: '/wraps/golden-wrap.svg', colorName: 'Metallic Gold' },
  { id: 'transparent-wrap', name: 'Transparent', src: '/wraps/transparent-wrap.svg', colorName: 'Cellophane' },
];

export default function WrapSelector() {
  const { selectedWrap, setSelectedWrap } = useBouquetStore();

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        {wraps.map((wrap) => {
          const isSelected = selectedWrap === wrap.id;
          return (
            <button
              key={wrap.id}
              onClick={() => setSelectedWrap(isSelected ? null : wrap.id)}
              className={`group flex flex-col items-center p-2.5 rounded-xl border transition-all duration-300 active:scale-95 ${
                isSelected
                  ? 'border-amber-700/60 bg-amber-50/50 shadow-sm'
                  : 'border-stone-200/40 bg-white/40 hover:bg-white/80 hover:border-amber-700/20'
              }`}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-stone-50 border border-stone-100 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <img 
                  src={wrap.src} 
                  alt={wrap.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <span className="text-[10px] sm:text-xs text-stone-700 font-semibold mt-1.5 text-center">
                {wrap.name}
              </span>
              <span className="text-[8px] sm:text-[10px] text-stone-400">
                {wrap.colorName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
