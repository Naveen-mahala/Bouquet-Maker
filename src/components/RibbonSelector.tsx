'use client';

import React from 'react';
import { useBouquetStore } from '@/store/bouquetStore';

interface RibbonItem {
  id: string;
  name: string;
  src: string;
  colorName: string;
}

const ribbons: RibbonItem[] = [
  { id: 'red-ribbon', name: 'Red Ribbon', src: '/ribbons/red-ribbon.svg', colorName: 'Satin Crimson' },
  { id: 'white-ribbon', name: 'White Ribbon', src: '/ribbons/white-ribbon.svg', colorName: 'Warm White' },
  { id: 'gold-ribbon', name: 'Gold Ribbon', src: '/ribbons/gold-ribbon.svg', colorName: 'Shimmering Gold' },
  { id: 'pink-ribbon', name: 'Pink Ribbon', src: '/ribbons/pink-ribbon.svg', colorName: 'Soft Pink' },
  { id: 'purple-ribbon', name: 'Purple Ribbon', src: '/ribbons/purple-ribbon.svg', colorName: 'Majestic Violet' },
  { id: 'satin-black-ribbon', name: 'Satin Black', src: '/ribbons/satin-black-ribbon.svg', colorName: 'Black Satin' },
];

export default function RibbonSelector() {
  const { selectedRibbon, setSelectedRibbon } = useBouquetStore();

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        {ribbons.map((ribbon) => {
          const isSelected = selectedRibbon === ribbon.id;
          return (
            <button
              key={ribbon.id}
              onClick={() => setSelectedRibbon(isSelected ? null : ribbon.id)}
              className={`group flex flex-col items-center p-2.5 rounded-xl border transition-all duration-300 active:scale-95 ${
                isSelected
                  ? 'border-amber-700/60 bg-amber-50/50 shadow-sm'
                  : 'border-stone-200/40 bg-white/40 hover:bg-white/80 hover:border-amber-700/20'
              }`}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-stone-50 border border-stone-100 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <img 
                  src={ribbon.src} 
                  alt={ribbon.name}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <span className="text-[10px] sm:text-xs text-stone-700 font-semibold mt-1.5 text-center">
                {ribbon.name}
              </span>
              <span className="text-[8px] sm:text-[10px] text-stone-400">
                {ribbon.colorName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
