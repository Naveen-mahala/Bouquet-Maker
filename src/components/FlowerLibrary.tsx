'use client';

import React, { useState } from 'react';
import { useBouquetStore } from '@/store/bouquetStore';
import { Sparkles } from 'lucide-react';

interface FlowerItem {
  name: string;
  category: string;
  src: string;
  colorClass: string;
}

const flowers: FlowerItem[] = [
  // Roses
  { name: 'Red Rose', category: 'Roses', src: '/flowers/red-rose.svg', colorClass: 'bg-rose-600' },
  { name: 'Pink Rose', category: 'Roses', src: '/flowers/pink-rose.svg', colorClass: 'bg-pink-400' },
  { name: 'White Rose', category: 'Roses', src: '/flowers/white-rose.svg', colorClass: 'bg-stone-100 border border-stone-200' },
  { name: 'Yellow Rose', category: 'Roses', src: '/flowers/yellow-rose.svg', colorClass: 'bg-amber-400' },
  { name: 'Black Rose', category: 'Roses', src: '/flowers/black-rose.svg', colorClass: 'bg-stone-900' },
  // Tulips
  { name: 'Red Tulip', category: 'Tulips', src: '/flowers/red-tulip.svg', colorClass: 'bg-red-500' },
  { name: 'White Tulip', category: 'Tulips', src: '/flowers/white-tulip.svg', colorClass: 'bg-stone-50 border border-stone-200' },
  { name: 'Purple Tulip', category: 'Tulips', src: '/flowers/purple-tulip.svg', colorClass: 'bg-purple-600' },
  // Lilies
  { name: 'White Lily', category: 'Lilies', src: '/flowers/white-lily.svg', colorClass: 'bg-[#faf8f5] border border-stone-200' },
  { name: 'Orange Lily', category: 'Lilies', src: '/flowers/orange-lily.svg', colorClass: 'bg-orange-500' },
  // Sunflowers
  { name: 'Sunflower', category: 'Sunflowers', src: '/flowers/sunflower.svg', colorClass: 'bg-yellow-500' },
  // Daisies
  { name: 'White Daisy', category: 'Daisies', src: '/flowers/daisy.svg', colorClass: 'bg-stone-50 border border-stone-200' },
  // Orchids
  { name: 'Purple Orchid', category: 'Orchids', src: '/flowers/orchid.svg', colorClass: 'bg-fuchsia-500' },
  // Peonies
  { name: 'Pink Peony', category: 'Peonies', src: '/flowers/peony.svg', colorClass: 'bg-pink-300' },
  // Lavender
  { name: 'Lavender', category: 'Lavender', src: '/flowers/lavender.svg', colorClass: 'bg-[#b39ddb]' },
  // Baby's Breath
  { name: "Baby's Breath", category: "Baby's Breath", src: '/flowers/babys-breath.svg', colorClass: 'bg-stone-200 border border-stone-300' },
];

const categories = [
  'All',
  'Roses',
  'Tulips',
  'Lilies',
  'Sunflowers',
  'Daisies',
  'Orchids',
  'Peonies',
  'Lavender',
  "Baby's Breath",
];

export default function FlowerLibrary() {
  const [activeCategory, setActiveCategory] = useState('All');
  const addElement = useBouquetStore((state) => state.addElement);

  const filteredFlowers = activeCategory === 'All'
    ? flowers
    : flowers.filter((f) => f.category === activeCategory);

  const handleAddFlower = (flower: FlowerItem) => {
    addElement({
      type: 'flower',
      name: flower.name,
      category: flower.category,
      src: flower.src,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Category Tabs Scroll Wrapper */}
      <div className="flex items-center gap-1.5 pb-2 overflow-x-auto no-scrollbar scroll-smooth">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 whitespace-nowrap active:scale-95 ${
              activeCategory === cat
                ? 'bg-amber-800 text-white shadow-sm border border-amber-900/10'
                : 'bg-stone-100 hover:bg-stone-200/80 text-stone-600 border border-stone-200/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Flower Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto pr-1">
        {filteredFlowers.map((flower) => (
          <button
            key={flower.name}
            onClick={() => handleAddFlower(flower)}
            className="group flex flex-col items-center p-2.5 rounded-xl border border-stone-200/40 bg-white/40 hover:bg-white/80 hover:border-amber-700/30 transition-all duration-300 hover:shadow-md active:scale-95"
          >
            <div className="relative w-14 h-14 flex items-center justify-center rounded-lg bg-stone-50 border border-stone-100 group-hover:scale-105 transition-transform duration-300">
              {/* Mini botanical visual indicator */}
              <img 
                src={flower.src} 
                alt={flower.name}
                className="w-12 h-12 object-contain"
              />
              <span className={`absolute top-0.5 right-0.5 w-2 h-2 rounded-full ${flower.colorClass}`}></span>
            </div>
            <span className="text-[10px] sm:text-xs text-stone-600 font-medium mt-1.5 text-center truncate w-full group-hover:text-amber-900 transition-colors">
              {flower.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
