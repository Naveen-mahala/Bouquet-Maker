import { create } from 'zustand';
import { generateBouquet } from '@/lib/arrangementEngine';

export interface BouquetElement {
  id: string;
  type: 'flower' | 'leaf';
  name: string;
  category: string;
  src: string;
  left: number;
  top: number;
  scaleX: number;
  scaleY: number;
  angle: number;
  zIndex: number;
}

export type SizeMode = 'small' | 'medium' | 'grand';

export interface MessageCardState {
  recipient: string;
  sender: string;
  title: string;
  message: string;
  enabled: boolean;
}


interface BouquetStore {
  elements: BouquetElement[];
  selectedWrap: string | null; // e.g. 'kraft-paper'
  selectedRibbon: string | null; // e.g. 'red-ribbon'
  selectedElementId: string | null;
  messageCard: MessageCardState;
  sizeMode: SizeMode;

  
  // Elements actions
  addElement: (element: Omit<BouquetElement, 'id' | 'zIndex' | 'left' | 'top' | 'scaleX' | 'scaleY' | 'angle'> & { left?: number, top?: number, scaleX?: number, scaleY?: number, angle?: number }) => void;
  updateElement: (id: string, updates: Partial<Omit<BouquetElement, 'id'>>) => void;
  removeElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  clearWorkspace: () => void;
  setSelectedElementId: (id: string | null) => void;
  
  // Wrap / Ribbon actions
  setSelectedWrap: (wrap: string | null) => void;
  setSelectedRibbon: (ribbon: string | null) => void;
  
  // Card actions
  updateMessageCard: (updates: Partial<MessageCardState>) => void;
  setSizeMode: (mode: SizeMode) => void;
  
  // Layering actions
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  
  // Templates loading
  loadPreset: (presetName: 'romantic' | 'elegant' | 'princess' | 'sunshine') => void;
}

export const useBouquetStore = create<BouquetStore>((set, get) => ({
  elements: [],
  selectedWrap: 'kraft-paper', // default wrap
  selectedRibbon: 'red-ribbon', // default ribbon
  selectedElementId: null,
  messageCard: {
    recipient: '',
    sender: '',
    title: 'For My Favorite Human ❤️',
    message: 'Thank you for being in my life. You make every day brighter and more beautiful.',
    enabled: true,
  },
  sizeMode: 'medium',


  addElement: (elem) => {
    const defaultCoords = {
      left: 400 + (Math.random() * 40 - 20),
      top: 350 + (Math.random() * 40 - 20),
      scaleX: 0.8,
      scaleY: 0.8,
      angle: (Math.random() * 30 - 15),
    };

    const newElement: BouquetElement = {
      id: Math.random().toString(36).substring(2, 9),
      left: elem.left ?? defaultCoords.left,
      top: elem.top ?? defaultCoords.top,
      scaleX: elem.scaleX ?? defaultCoords.scaleX,
      scaleY: elem.scaleY ?? defaultCoords.scaleY,
      angle: elem.angle ?? defaultCoords.angle,
      zIndex: get().elements.length + 10, // keep high initial zIndex
      ...elem,
    };

    set((state) => ({
      elements: [...state.elements, newElement],
      selectedElementId: newElement.id,
    }));
  },

  updateElement: (id, updates) => set((state) => ({
    elements: state.elements.map((el) => el.id === id ? { ...el, ...updates } : el)
  })),

  removeElement: (id) => set((state) => ({
    elements: state.elements.filter((el) => el.id !== id),
    selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
  })),

  duplicateElement: (id) => {
    const element = get().elements.find((el) => el.id === id);
    if (!element) return;

    const duplicated: BouquetElement = {
      ...element,
      id: Math.random().toString(36).substring(2, 9),
      left: element.left + 25,
      top: element.top + 25,
      zIndex: get().elements.length + 10,
    };

    set((state) => ({
      elements: [...state.elements, duplicated],
      selectedElementId: duplicated.id,
    }));
  },

  clearWorkspace: () => set({
    elements: [],
    selectedElementId: null,
    selectedWrap: null,
    selectedRibbon: null,
  }),

  setSelectedElementId: (id) => set({ selectedElementId: id }),

  setSelectedWrap: (wrap) => set({ selectedWrap: wrap }),

  setSelectedRibbon: (ribbon) => set({ selectedRibbon: ribbon }),

  updateMessageCard: (updates) => set((state) => ({
    messageCard: { ...state.messageCard, ...updates }
  })),

  setSizeMode: (mode) => set({ sizeMode: mode }),


  bringForward: (id) => {
    const elements = [...get().elements];
    const index = elements.findIndex((el) => el.id === id);
    if (index === -1 || index === elements.length - 1) return;
    
    // Swap z-index with the next element
    const temp = elements[index].zIndex;
    elements[index].zIndex = elements[index + 1].zIndex;
    elements[index + 1].zIndex = temp;

    // Re-sort elements array based on zIndex
    elements.sort((a, b) => a.zIndex - b.zIndex);
    set({ elements });
  },

  sendBackward: (id) => {
    const elements = [...get().elements];
    const index = elements.findIndex((el) => el.id === id);
    if (index === -1 || index === 0) return;
    
    // Swap z-index with the previous element
    const temp = elements[index].zIndex;
    elements[index].zIndex = elements[index - 1].zIndex;
    elements[index - 1].zIndex = temp;

    // Re-sort elements array
    elements.sort((a, b) => a.zIndex - b.zIndex);
    set({ elements });
  },

  loadPreset: (presetName) => {
    const { elements, wrap, ribbon } = generateBouquet(presetName, get().sizeMode);
    set({
      elements,
      selectedWrap: wrap,
      selectedRibbon: ribbon,
      selectedElementId: null,
    });
  },

}));
