'use client';

import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useBouquetStore } from '@/store/bouquetStore';
import { Trash2, Copy, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';

export default function BouquetCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasInstance = useRef<fabric.Canvas | null>(null);
  const objectMap = useRef<Map<string, fabric.Object>>(new Map());
  
  const {
    elements,
    selectedWrap,
    selectedRibbon,
    selectedElementId,
    updateElement,
    removeElement,
    duplicateElement,
    setSelectedElementId,
    bringForward,
    sendBackward,
  } = useBouquetStore();

  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);

  // Initialize fabric canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    // Create high-res logical canvas of 800x800
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 800,
      backgroundColor: '#f6f3eb',
      preserveObjectStacking: true,
    });

    canvasInstance.current = canvas;

    // Setup event listeners to sync Fabric modifications back to Zustand store
    const syncCoords = (obj: fabric.Object) => {
      const id = (obj as any).id;
      if (!id || id === 'wrap' || id === 'ribbon') return;

      updateElement(id, {
        left: obj.left ?? 400,
        top: obj.top ?? 350,
        scaleX: obj.scaleX ?? 1,
        scaleY: obj.scaleY ?? 1,
        angle: obj.angle ?? 0,
      });
    };

    canvas.on('object:moving', (e) => {
      if (e.target) syncCoords(e.target);
    });

    canvas.on('object:rotating', (e) => {
      if (e.target) syncCoords(e.target);
    });

    canvas.on('object:scaling', (e) => {
      if (e.target) syncCoords(e.target);
    });

    // Handle selection events
    const handleSelection = () => {
      const activeObj = canvas.getActiveObject();
      setActiveObject(activeObj);
      if (activeObj && (activeObj as any).id && (activeObj as any).id !== 'wrap') {
        setSelectedElementId((activeObj as any).id);
      } else {
        setSelectedElementId(null);
      }
    };

    canvas.on('selection:created', handleSelection);
    canvas.on('selection:updated', handleSelection);
    canvas.on('selection:cleared', () => {
      setActiveObject(null);
      setSelectedElementId(null);
    });

    // Basic keyboard deletes
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        // Only trigger if not typing in inputs
        if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
          return;
        }
        const active = canvas.getActiveObject();
        if (active && (active as any).id && (active as any).id !== 'wrap' && (active as any).id !== 'ribbon') {
          removeElement((active as any).id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      canvas.dispose();
      canvasInstance.current = null;
      objectMap.current.clear();
    };
  }, [updateElement, removeElement, setSelectedElementId]);

  const canvas = canvasInstance.current;

  // Helper: Sort objects based on their layering
  const sortObjects = () => {
    if (!canvas) return;
    canvas._objects.sort((a: any, b: any) => {
      const aId = a.id;
      const bId = b.id;
      if (aId === 'wrap') return -1;
      if (bId === 'wrap') return 1;
      if (aId === 'ribbon') return 1; // Ribbon is on top of stems
      if (bId === 'ribbon') return -1;
      
      const elA = elements.find((el) => el.id === aId);
      const elB = elements.find((el) => el.id === bId);
      const zA = elA ? elA.zIndex : 10;
      const zB = elB ? elB.zIndex : 10;
      return zA - zB;
    });
    canvas.renderAll();
  };

  // Sync elements list with canvas
  useEffect(() => {
    if (!canvas) return;

    const activeObj = canvas.getActiveObject();

    // 1. Add new elements or update existing
    elements.forEach((el) => {
      if (!objectMap.current.has(el.id)) {
        fabric.Image.fromURL(el.src, (img) => {
          img.set({
            left: el.left,
            top: el.top,
            scaleX: el.scaleX,
            scaleY: el.scaleY,
            angle: el.angle,
            originX: 'center',
            originY: 'center',
            hasRotatingPoint: true,
            cornerColor: '#d4af37', // Elegant gold accents
            cornerStrokeColor: '#ffffff',
            borderColor: '#d4af37',
            cornerSize: 8,
            transparentCorners: false,
            // Apply botanical drop shadows for realistic flower overlapping
            shadow: new fabric.Shadow({
              color: 'rgba(54, 43, 36, 0.18)',
              blur: 15,
              offsetX: 5,
              offsetY: 7,
            }),
          });
          
          (img as any).id = el.id;
          (img as any).elementType = el.type;

          canvas.add(img);
          objectMap.current.set(el.id, img);
          
          // Select newly inserted flower automatically
          canvas.setActiveObject(img);
          sortObjects();
        });
      } else {
        const img = objectMap.current.get(el.id);
        if (img && activeObj !== img) {
          img.set({
            left: el.left,
            top: el.top,
            scaleX: el.scaleX,
            scaleY: el.scaleY,
            angle: el.angle,
          });
          img.setCoords();
        }
      }
    });

    // 2. Remove deleted elements
    objectMap.current.forEach((img, id) => {
      const existsInStore = elements.some((el) => el.id === id);
      if (!existsInStore) {
        canvas.remove(img);
        objectMap.current.delete(id);
      }
    });

    // 3. Keep sorted
    sortObjects();
  }, [elements, canvas]);

  // Sync Wrap paper
  useEffect(() => {
    if (!canvas) return;

    // Find and remove existing wrap
    const existingWrap = canvas.getObjects().find((obj) => (obj as any).id === 'wrap');
    if (existingWrap) {
      canvas.remove(existingWrap);
    }

    if (selectedWrap) {
      const src = `/wraps/${selectedWrap}.svg`;
      fabric.Image.fromURL(src, (img) => {
        img.set({
          left: 400,
          top: 480,
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false,
          scaleX: 1.0,
          scaleY: 1.0,
          shadow: new fabric.Shadow({
            color: 'rgba(54, 43, 36, 0.12)',
            blur: 20,
            offsetX: 0,
            offsetY: 10,
          }),
        });
        (img as any).id = 'wrap';

        canvas.add(img);
        sortObjects();
      });
    }
  }, [selectedWrap, canvas]);

  // Sync Ribbon
  useEffect(() => {
    if (!canvas) return;

    // Find and remove existing ribbon
    const existingRibbon = canvas.getObjects().find((obj) => (obj as any).id === 'ribbon');
    if (existingRibbon) {
      canvas.remove(existingRibbon);
    }

    if (selectedRibbon) {
      const src = `/ribbons/${selectedRibbon}.svg`;
      fabric.Image.fromURL(src, (img) => {
        img.set({
          left: 400,
          top: 590,
          originX: 'center',
          originY: 'center',
          scaleX: 0.9,
          scaleY: 0.9,
          cornerColor: '#d4af37',
          borderColor: '#d4af37',
          cornerSize: 8,
          transparentCorners: false,
          shadow: new fabric.Shadow({
            color: 'rgba(0,0,0,0.15)',
            blur: 10,
            offsetX: 0,
            offsetY: 4,
          }),
        });
        (img as any).id = 'ribbon';

        canvas.add(img);
        sortObjects();
      });
    }
  }, [selectedRibbon, canvas]);

  // Set active object selection from store changes
  useEffect(() => {
    if (!canvas) return;
    if (selectedElementId) {
      const obj = objectMap.current.get(selectedElementId);
      if (obj && canvas.getActiveObject() !== obj) {
        canvas.setActiveObject(obj);
        canvas.renderAll();
      }
    } else {
      if (canvas.getActiveObject() && (canvas.getActiveObject() as any).id !== 'ribbon') {
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    }
  }, [selectedElementId, canvas]);

  // Toolbar control handlers
  const handleDuplicate = () => {
    if (selectedElementId) duplicateElement(selectedElementId);
  };

  const handleDelete = () => {
    if (selectedElementId) removeElement(selectedElementId);
  };

  const handleBringForward = () => {
    if (selectedElementId) {
      bringForward(selectedElementId);
      sortObjects();
    }
  };

  const handleSendBackward = () => {
    if (selectedElementId) {
      sendBackward(selectedElementId);
      sortObjects();
    }
  };

  const handleSnapArrangement = () => {
    // Elegant Florist Auto-Arrangement Logic
    // Centers flowers into a clean circular bouquet configuration
    if (elements.length === 0) return;

    elements.forEach((el, index) => {
      const total = elements.length;
      
      if (el.type === 'leaf') {
        // Arrange leaves around the outer ring
        const angleRad = (index / total) * Math.PI * 2;
        const radius = 170 + Math.random() * 20;
        const left = 400 + Math.cos(angleRad) * radius;
        const top = 400 + Math.sin(angleRad) * radius - 30;
        const angle = (angleRad * 180) / Math.PI + 90;

        updateElement(el.id, { left, top, angle, scaleX: 0.75, scaleY: 0.75 });
      } else {
        // Arrange flowers in concentric spirals in the core
        const angleRad = (index / total) * Math.PI * 2 * 1.5; // spiral effect
        const radius = 40 + (index / total) * 110;
        const left = 400 + Math.cos(angleRad) * radius;
        const top = 390 + Math.sin(angleRad) * radius - 20;
        const angle = (Math.random() * 40 - 20); // natural slight tilt

        updateElement(el.id, { left, top, angle, scaleX: 0.8, scaleY: 0.8 });
      }
    });

    setTimeout(() => sortObjects(), 100);
  };

  const isSelectionActive = selectedElementId !== null;

  return (
    <div className="flex flex-col items-center w-full gap-4">
      {/* Dynamic Canvas Container with responsive wrapper */}
      <div 
        id="bouquet-canvas-container"
        className="relative w-full max-w-[600px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-[#efeae0] group"
        style={{
          boxShadow: '0 20px 50px rgba(54, 43, 36, 0.15), inset 0 0 100px rgba(0,0,0,0.03)'
        }}
      >
        {/* Florist Worktable Overlay (Textured styling) */}
        <div className="absolute inset-0 pointer-events-none border-[12px] border-[#d8cfc0] rounded-2xl z-20"></div>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:16px_16px] opacity-40 z-10"></div>
        
        {/* Canvas Element */}
        <div className="w-full h-full scale-[0.75] sm:scale-100 origin-top-left transition-all duration-300">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        {/* Empty Canvas Placeholder */}
        {elements.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pointer-events-none z-10 bg-stone-100/50 backdrop-blur-[2px]">
            <Sparkles className="w-12 h-12 text-amber-600/60 mb-3 animate-pulse" />
            <p className="font-serif text-xl text-stone-700 italic">Florist Table is Ready</p>
            <p className="text-sm text-stone-500 mt-1 max-w-xs">Select flower and foliage assets from the library below to start crafting your custom arrangement.</p>
          </div>
        )}
      </div>

      {/* Canvas Elements Manipulation Toolbar */}
      <div className={`flex flex-wrap items-center justify-center gap-2 p-2.5 rounded-xl border border-white/40 bg-white/70 backdrop-blur-md transition-all duration-300 shadow-md ${elements.length === 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <button
          onClick={handleSnapArrangement}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/50 transition-all active:scale-95"
          title="Auto arrange all elements into a neat spiral bouquet"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Snap Arrangement
        </button>

        {isSelectionActive && (
          <>
            <div className="w-px h-5 bg-stone-300 mx-1" />
            
            <button
              onClick={handleBringForward}
              className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all active:scale-95"
              title="Bring Layer Forward"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button
              onClick={handleSendBackward}
              className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all active:scale-95"
              title="Send Layer Backward"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={handleDuplicate}
              className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all active:scale-95"
              title="Duplicate Element"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-lg text-rose-600 hover:text-rose-900 hover:bg-rose-50 transition-all active:scale-95"
              title="Delete Element"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
