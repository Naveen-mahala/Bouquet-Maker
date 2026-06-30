import { create } from 'zustand';

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
    const newElements: BouquetElement[] = [];
    let wrap: string = 'kraft-paper';
    let ribbon: string = 'red-ribbon';

    const addPresetItem = (
      type: 'flower' | 'leaf',
      name: string,
      category: string,
      src: string,
      left: number,
      top: number,
      scale: number,
      angle: number
    ) => {
      newElements.push({
        id: Math.random().toString(36).substring(2, 9),
        type,
        name,
        category,
        src,
        left,
        top,
        scaleX: scale,
        scaleY: scale,
        angle,
        zIndex: newElements.length + 10,
      });
    };

    if (presetName === 'romantic') {
      wrap = 'kraft-paper';
      ribbon = 'red-ribbon';
      // 15 Red Roses arranged in a lush dome
      const rosePositions = [
        { x: 400, y: 280, s: 0.85, a: 0 },
        { x: 360, y: 310, s: 0.8, a: -15 },
        { x: 440, y: 310, s: 0.8, a: 15 },
        { x: 320, y: 350, s: 0.85, a: -30 },
        { x: 480, y: 350, s: 0.85, a: 30 },
        { x: 390, y: 360, s: 0.9, a: -5 },
        { x: 410, y: 360, s: 0.9, a: 5 },
        { x: 350, y: 400, s: 0.85, a: -10 },
        { x: 450, y: 400, s: 0.85, a: 10 },
        { x: 400, y: 430, s: 0.9, a: 0 },
        // Outer layer roses
        { x: 290, y: 410, s: 0.8, a: -40 },
        { x: 510, y: 410, s: 0.8, a: 40 },
        { x: 330, y: 460, s: 0.85, a: -20 },
        { x: 470, y: 460, s: 0.85, a: 20 },
        { x: 400, y: 490, s: 0.8, a: 0 },
      ];
      rosePositions.forEach((pos) => {
        addPresetItem('flower', 'Red Rose', 'Roses', '/flowers/red-rose.svg', pos.x, pos.y, pos.s, pos.a);
      });
      // Baby's breath fillers
      const bbPositions = [
        { x: 320, y: 290, s: 0.6, a: -25 },
        { x: 480, y: 290, s: 0.6, a: 25 },
        { x: 380, y: 410, s: 0.7, a: -10 },
        { x: 420, y: 410, s: 0.7, a: 10 },
        { x: 280, y: 460, s: 0.65, a: -50 },
        { x: 520, y: 460, s: 0.65, a: 50 },
      ];
      bbPositions.forEach((pos) => {
        addPresetItem('flower', "Baby's Breath", "Baby's Breath", '/flowers/babys-breath.svg', pos.x, pos.y, pos.s, pos.a);
      });
    } else if (presetName === 'elegant') {
      wrap = 'white-wrap';
      ribbon = 'gold-ribbon';
      // White Roses + Eucalyptus
      const rosePositions = [
        { x: 400, y: 300, s: 0.85, a: 0 },
        { x: 350, y: 340, s: 0.8, a: -15 },
        { x: 450, y: 340, s: 0.8, a: 15 },
        { x: 380, y: 390, s: 0.85, a: -5 },
        { x: 420, y: 390, s: 0.85, a: 5 },
        { x: 320, y: 420, s: 0.8, a: -25 },
        { x: 480, y: 420, s: 0.8, a: 25 },
        { x: 400, y: 460, s: 0.85, a: 0 },
        { x: 360, y: 490, s: 0.8, a: -10 },
        { x: 440, y: 490, s: 0.8, a: 10 },
      ];
      rosePositions.forEach((pos) => {
        addPresetItem('flower', 'White Rose', 'Roses', '/flowers/white-rose.svg', pos.x, pos.y, pos.s, pos.a);
      });
      // Eucalyptus leaf fillers
      const leafPositions = [
        { x: 300, y: 280, s: 0.75, a: -35 },
        { x: 500, y: 280, s: 0.75, a: 35 },
        { x: 260, y: 360, s: 0.8, a: -50 },
        { x: 540, y: 360, s: 0.8, a: 50 },
        { x: 310, y: 460, s: 0.75, a: -20 },
        { x: 490, y: 460, s: 0.75, a: 20 },
      ];
      leafPositions.forEach((pos) => {
        addPresetItem('leaf', 'Eucalyptus', 'Eucalyptus', '/leaves/eucalyptus.svg', pos.x, pos.y, pos.s, pos.a);
      });
    } else if (presetName === 'princess') {
      wrap = 'pink-wrap';
      ribbon = 'pink-ribbon';
      // Pink Peonies + Lavender
      const peonyPositions = [
        { x: 400, y: 310, s: 0.85, a: 0 },
        { x: 340, y: 350, s: 0.8, a: -20 },
        { x: 460, y: 350, s: 0.8, a: 20 },
        { x: 400, y: 400, s: 0.85, a: 10 },
        { x: 310, y: 420, s: 0.75, a: -35 },
        { x: 490, y: 420, s: 0.75, a: 35 },
        { x: 360, y: 460, s: 0.8, a: -10 },
        { x: 440, y: 460, s: 0.8, a: 10 },
        { x: 400, y: 510, s: 0.75, a: 0 },
      ];
      peonyPositions.forEach((pos) => {
        addPresetItem('flower', 'Pink Peony', 'Peonies', '/flowers/peony.svg', pos.x, pos.y, pos.s, pos.a);
      });
      // Lavender stalks framing
      const lavenderPositions = [
        { x: 370, y: 260, s: 0.65, a: -10 },
        { x: 430, y: 260, s: 0.65, a: 10 },
        { x: 300, y: 310, s: 0.7, a: -30 },
        { x: 500, y: 310, s: 0.7, a: 30 },
        { x: 270, y: 390, s: 0.75, a: -45 },
        { x: 530, y: 390, s: 0.75, a: 45 },
        { x: 330, y: 510, s: 0.65, a: -15 },
        { x: 470, y: 510, s: 0.65, a: 15 },
      ];
      lavenderPositions.forEach((pos) => {
        addPresetItem('flower', 'Lavender', 'Lavender', '/flowers/lavender.svg', pos.x, pos.y, pos.s, pos.a);
      });
    } else if (presetName === 'sunshine') {
      wrap = 'kraft-paper';
      ribbon = 'gold-ribbon';
      // Sunflowers + Daisies
      const sunflowerPositions = [
        { x: 400, y: 320, s: 0.7, a: 0 },
        { x: 330, y: 370, s: 0.68, a: -20 },
        { x: 470, y: 370, s: 0.68, a: 20 },
        { x: 400, y: 440, s: 0.72, a: 10 },
        { x: 320, y: 470, s: 0.65, a: -15 },
        { x: 480, y: 470, s: 0.65, a: 15 },
        { x: 400, y: 530, s: 0.6, a: -5 },
      ];
      sunflowerPositions.forEach((pos) => {
        addPresetItem('flower', 'Sunflower', 'Sunflowers', '/flowers/sunflower.svg', pos.x, pos.y, pos.s, pos.a);
      });
      // Daisies surrounding and filling
      const daisyPositions = [
        { x: 360, y: 280, s: 0.65, a: -15 },
        { x: 440, y: 280, s: 0.65, a: 15 },
        { x: 300, y: 310, s: 0.6, a: -35 },
        { x: 500, y: 310, s: 0.6, a: 35 },
        { x: 370, y: 390, s: 0.7, a: 5 },
        { x: 430, y: 390, s: 0.7, a: -5 },
        { x: 260, y: 410, s: 0.65, a: -50 },
        { x: 540, y: 410, s: 0.65, a: 50 },
        { x: 350, y: 500, s: 0.68, a: -10 },
        { x: 450, y: 500, s: 0.68, a: 10 },
        { x: 290, y: 520, s: 0.6, a: -30 },
        { x: 510, y: 520, s: 0.6, a: 30 },
      ];
      daisyPositions.forEach((pos) => {
        addPresetItem('flower', 'White Daisy', 'Daisies', '/flowers/daisy.svg', pos.x, pos.y, pos.s, pos.a);
      });
    }

    set({
      elements: newElements,
      selectedWrap: wrap,
      selectedRibbon: ribbon,
      selectedElementId: null,
    });
  },

}));
