'use client';

import React from 'react';
import { useBouquetStore } from '@/store/bouquetStore';

interface LeafItem {
  name: string;
  category: string;
  src: string;
}

const leaves: LeafItem[] = [
  { name: 'Eucalyptus', category: 'Eucalyptus', src: '/leaves/eucalyptus.svg' },
  { name: 'Fern', category: 'Fern', src: '/leaves/fern.svg' },
  { name: 'Palm Leaf', category: 'Palm', src: '/leaves/palm.svg' },
  { name: 'Silver Dollar Leaf', category: 'Silver Dollar', src: '/leaves/silver-dollar.svg' },
  { name: 'Ivy', category: 'Ivy', src: '/leaves/ivy.svg' },
];

export default function LeafLibrary() {
  const addElement = useBouquetStore((state) => state.addElement);

  const handleAddLeaf = (leaf: LeafItem) => {
    addElement({
      type: 'leaf',
      name: leaf.name,
      category: leaf.category,
      src: leaf.src,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Leaves Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-3 xl:grid-cols-5 gap-3 max-h-[300px] overflow-y-auto pr-1">
        {leaves.map((leaf) => (
          <button
            key={leaf.name}
            onClick={() => handleAddLeaf(leaf)}
            className="group flex flex-col items-center p-2.5 rounded-xl border border-stone-200/40 bg-white/40 hover:bg-white/80 hover:border-amber-700/30 transition-all duration-300 hover:shadow-md active:scale-95"
          >
            <div className="relative w-14 h-14 flex items-center justify-center rounded-lg bg-stone-50 border border-stone-100 group-hover:scale-105 transition-transform duration-300">
              <img 
                src={leaf.src} 
                alt={leaf.name}
                className="w-12 h-12 object-contain"
              />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-600"></span>
            </div>
            <span className="text-[10px] sm:text-xs text-stone-600 font-medium mt-1.5 text-center truncate w-full group-hover:text-amber-900 transition-colors">
              {leaf.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
