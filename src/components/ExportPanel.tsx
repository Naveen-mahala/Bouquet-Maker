'use client';

import React, { useState } from 'react';
import { useBouquetStore } from '@/store/bouquetStore';
import { exportToPNG, exportToPDF } from '@/lib/exportUtils';
import { Download, Sparkles, Trash2, Heart, Star, Compass, Sun, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ExportPanel() {
  const { elements, messageCard, clearWorkspace, loadPreset } = useBouquetStore();
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handlePreset = (type: 'romantic' | 'elegant' | 'princess' | 'sunshine') => {
    loadPreset(type);
    
    // Tiny micro-confetti on template generation
    confetti({
      particleCount: 30,
      spread: 40,
      colors: ['#d4af37', '#e53935', '#ff8da1'],
      origin: { y: 0.8 }
    });
  };

  const getCanvasDataUrl = (): string => {
    // Find the canvas elements rendering in Fabric.js
    const canvasEl = document.querySelector('#bouquet-canvas-container canvas') as HTMLCanvasElement;
    if (!canvasEl) {
      throw new Error('Canvas not found');
    }
    return canvasEl.toDataURL('image/png');
  };

  const triggerConfetti = () => {
    // Elegant, premium fireworks confetti celebration
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#bb0000', '#ffffff', '#ffd700', '#ff69b4']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#bb0000', '#ffffff', '#ffd700', '#ff69b4']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleExportPNG = async () => {
    if (elements.length === 0) return;
    setIsExporting(true);
    try {
      const dataUrl = getCanvasDataUrl();
      await exportToPNG({ canvasDataUrl: dataUrl, messageCard });
      setExportSuccess(true);
      triggerConfetti();
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    if (elements.length === 0) return;
    setIsExporting(true);
    try {
      const dataUrl = getCanvasDataUrl();
      await exportToPDF({ canvasDataUrl: dataUrl, messageCard });
      setExportSuccess(true);
      triggerConfetti();
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-5 rounded-2xl border border-white/40 bg-white/50 backdrop-blur-md shadow-lg">
      
      {/* 1. Predefined Templates Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-800" />
          <h3 className="font-serif text-sm font-semibold text-stone-800">Arrangement Templates</h3>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => handlePreset('romantic')}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-rose-100 bg-rose-50/50 hover:bg-rose-50 text-stone-700 text-xs font-semibold transition-all hover:border-rose-300 active:scale-95 text-left"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
            <div>
              <p className="font-semibold text-rose-900">Romantic Bouquet</p>
              <p className="text-[9px] text-stone-500">Roses & Baby's Breath</p>
            </div>
          </button>

          <button
            onClick={() => handlePreset('elegant')}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-amber-100 bg-amber-50/20 hover:bg-amber-50/60 text-stone-700 text-xs font-semibold transition-all hover:border-amber-300 active:scale-95 text-left"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
            <div>
              <p className="font-semibold text-stone-800">Elegant Bouquet</p>
              <p className="text-[9px] text-stone-500">White Roses & Leaves</p>
            </div>
          </button>

          <button
            onClick={() => handlePreset('princess')}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-fuchsia-100 bg-fuchsia-50/40 hover:bg-fuchsia-50/80 text-stone-700 text-xs font-semibold transition-all hover:border-fuchsia-300 active:scale-95 text-left"
          >
            <Compass className="w-4 h-4 text-fuchsia-500 shrink-0" />
            <div>
              <p className="font-semibold text-fuchsia-950">Princess Bouquet</p>
              <p className="text-[9px] text-stone-500">Pink Peonies & Lavender</p>
            </div>
          </button>

          <button
            onClick={() => handlePreset('sunshine')}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-yellow-100 bg-yellow-50/30 hover:bg-yellow-50/70 text-stone-700 text-xs font-semibold transition-all hover:border-yellow-300 active:scale-95 text-left"
          >
            <Sun className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0" />
            <div>
              <p className="font-semibold text-yellow-900">Sunshine Bouquet</p>
              <p className="text-[9px] text-stone-500">Sunflowers & Daisies</p>
            </div>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-stone-200" />

      {/* 2. Download / Clean Workspace Controls */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-sm font-semibold text-stone-800">Export & Finish</h3>
          {elements.length > 0 && (
            <button
              onClick={clearWorkspace}
              className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-800 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Table
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            disabled={elements.length === 0 || isExporting}
            onClick={handleExportPNG}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium text-sm transition-all text-white bg-amber-800 hover:bg-amber-900 shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Generating PNG...' : 'Download PNG Card'}
          </button>

          <button
            disabled={elements.length === 0 || isExporting}
            onClick={handleExportPDF}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium text-sm transition-all text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Generating PDF...' : 'Download PDF Document'}
          </button>
        </div>

        {/* Success toast micro-indicator */}
        {exportSuccess && (
          <div className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold">Bouquet completed and downloaded! ❤️</span>
          </div>
        )}
      </div>

    </div>
  );
}
