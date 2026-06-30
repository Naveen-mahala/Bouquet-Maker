'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Flower, Leaf, Gift, Mail, Sparkles, ChevronLeft, Info } from 'lucide-react';
import FlowerLibrary from '@/components/FlowerLibrary';
import LeafLibrary from '@/components/LeafLibrary';
import WrapSelector from '@/components/WrapSelector';
import RibbonSelector from '@/components/RibbonSelector';
import MessageCardForm from '@/components/MessageCardForm';
import ExportPanel from '@/components/ExportPanel';

// Dynamically load Fabric.js Canvas with SSR disabled to prevent Node rendering crashes
const BouquetCanvas = dynamic(() => import('@/components/BouquetCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[600px] aspect-square rounded-2xl border border-white/20 bg-stone-100 flex items-center justify-center animate-pulse shadow-md">
      <div className="text-center text-stone-400">
        <Flower className="w-10 h-10 mx-auto mb-2 animate-spin-slow text-amber-800/40" />
        <p className="font-serif italic text-sm">Opening florist workspace...</p>
      </div>
    </div>
  ),
});

type TabType = 'flowers' | 'foliage' | 'wrap-ribbon' | 'message' | 'presets-export';

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState<TabType>('flowers');

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#faf8f5] via-[#f7f2ea] to-[#fceef2] pb-12">
      
      {/* 1. Florist Header */}
      <header className="sticky top-0 z-30 w-full border-b border-stone-200/50 bg-white/50 backdrop-blur-lg px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-400 text-stone-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <div>
              <h1 className="font-serif text-lg font-bold text-stone-900 leading-tight">Bouquet Studio</h1>
              <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Dream Florist Workshop</p>
            </div>
          </div>
        </div>

        {/* Studio Status Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-100 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          Workspace Online
        </div>
      </header>

      {/* 2. Builder Core Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        
        {/* Left Section: Interactive Design Canvas (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          {/* Workspace tip */}
          <div className="flex items-center gap-2 mb-4 p-3 w-full max-w-[600px] rounded-xl border border-amber-900/10 bg-amber-50/45 text-amber-900 text-xs">
            <Info className="w-4 h-4 shrink-0 text-amber-700" />
            <p className="leading-normal">
              Click elements on the florist table to drag, rotate, resize, delete, and layer.
            </p>
          </div>

          <BouquetCanvas />
        </div>

        {/* Right Section: Library Selectors & Export Panels (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Glassmorphic Tabs Navigator */}
          <div className="flex w-full p-1 rounded-xl bg-stone-200/50 border border-stone-200/25">
            {[
              { id: 'flowers', label: 'Flowers', icon: Flower },
              { id: 'foliage', label: 'Foliage', icon: Leaf },
              { id: 'wrap-ribbon', label: 'Wrap & Bow', icon: Gift },
              { id: 'message', label: 'Card', icon: Mail },
              { id: 'presets-export', label: 'Share', icon: Sparkles }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 flex-1 py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all duration-300 ${
                    isSelected
                      ? 'bg-white text-amber-800 shadow-sm border border-stone-200/50'
                      : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-800' : 'text-stone-400'}`} />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel with micro-animations */}
          <div className="min-h-[380px]">
            {activeTab === 'flowers' && (
              <motion.div 
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-4 p-5 rounded-2xl border border-white/40 bg-white/50 backdrop-blur-md shadow-lg"
              >
                <div className="flex flex-col">
                  <h2 className="font-serif text-lg font-bold text-stone-800">Flower Library</h2>
                  <p className="text-xs text-stone-500 mt-0.5">Click a bloom to place it on the table.</p>
                </div>
                <FlowerLibrary />
              </motion.div>
            )}

            {activeTab === 'foliage' && (
              <motion.div 
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-4 p-5 rounded-2xl border border-white/40 bg-white/50 backdrop-blur-md shadow-lg"
              >
                <div className="flex flex-col">
                  <h2 className="font-serif text-lg font-bold text-stone-800">Foliage & Leaves</h2>
                  <p className="text-xs text-stone-500 mt-0.5">Add botanical leaves and green stems to pad your bouquet.</p>
                </div>
                <LeafLibrary />
              </motion.div>
            )}

            {activeTab === 'wrap-ribbon' && (
              <motion.div 
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-5 p-5 rounded-2xl border border-white/40 bg-white/50 backdrop-blur-md shadow-lg"
              >
                <div>
                  <h2 className="font-serif text-lg font-bold text-stone-800">Wrapping & Bows</h2>
                  <p className="text-xs text-stone-500 mt-0.5">Customize the packaging and ribbons for your arrangement.</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">Wrapping Style</h4>
                  <WrapSelector />
                </div>
                <div className="w-full h-px bg-stone-200" />
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">Ribbon Bow</h4>
                  <RibbonSelector />
                </div>
              </motion.div>
            )}

            {activeTab === 'message' && (
              <motion.div 
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <MessageCardForm />
              </motion.div>
            )}

            {activeTab === 'presets-export' && (
              <motion.div 
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <ExportPanel />
              </motion.div>
            )}
          </div>

        </div>

      </motion.div>
    </main>
  );
}
