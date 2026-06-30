import { BouquetElement, SizeMode } from '../store/bouquetStore';

// Simple seedable random number generator
export function createRandom(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export interface ArrangementTemplate {
  name: string;
  focalFlowers: { name: string; src: string; category: string }[];
  fillers: { name: string; src: string; category: string }[];
  foliage: { name: string; src: string; category: string }[];
  wrap: string;
  ribbon: string;
  rules: {
    symmetry: boolean;
    outerFoliage: boolean;
    pastelDominant?: boolean;
    whiteDominant?: boolean;
    brightDominant?: boolean;
  };
}

export const TEMPLATES: Record<'romantic' | 'elegant' | 'princess' | 'sunshine', ArrangementTemplate> = {
  romantic: {
    name: 'Romantic Bouquet',
    focalFlowers: [
      { name: 'Red Rose', src: '/flowers/red-rose.svg', category: 'Roses' },
      { name: 'Pink Rose', src: '/flowers/pink-rose.svg', category: 'Roses' },
    ],
    fillers: [
      { name: "Baby's Breath", src: '/flowers/babys-breath.svg', category: "Baby's Breath" },
    ],
    foliage: [
      { name: 'Eucalyptus', src: '/leaves/eucalyptus.svg', category: 'Eucalyptus' },
    ],
    wrap: 'kraft-paper',
    ribbon: 'red-ribbon',
    rules: { symmetry: true, outerFoliage: true },
  },
  elegant: {
    name: 'Elegant Bouquet',
    focalFlowers: [
      { name: 'White Rose', src: '/flowers/white-rose.svg', category: 'Roses' },
      { name: 'White Lily', src: '/flowers/white-lily.svg', category: 'Lilies' },
    ],
    fillers: [],
    foliage: [
      { name: 'Eucalyptus', src: '/leaves/eucalyptus.svg', category: 'Eucalyptus' },
      { name: 'Silver Dollar Leaf', src: '/leaves/silver-dollar.svg', category: 'Silver Dollar' },
    ],
    wrap: 'white-wrap',
    ribbon: 'gold-ribbon',
    rules: { symmetry: false, outerFoliage: true, whiteDominant: true },
  },
  princess: {
    name: 'Princess Bouquet',
    focalFlowers: [
      { name: 'Pink Peony', src: '/flowers/peony.svg', category: 'Peonies' },
      { name: 'White Rose', src: '/flowers/white-rose.svg', category: 'Roses' },
    ],
    fillers: [
      { name: 'Lavender', src: '/flowers/lavender.svg', category: 'Lavender' },
    ],
    foliage: [
      { name: 'Ivy', src: '/leaves/ivy.svg', category: 'Ivy' },
      { name: 'Fern', src: '/leaves/fern.svg', category: 'Fern' },
    ],
    wrap: 'pink-wrap',
    ribbon: 'pink-ribbon',
    rules: { symmetry: true, outerFoliage: true, pastelDominant: true },
  },
  sunshine: {
    name: 'Sunshine Bouquet',
    focalFlowers: [
      { name: 'Sunflower', src: '/flowers/sunflower.svg', category: 'Sunflowers' },
      { name: 'Yellow Rose', src: '/flowers/yellow-rose.svg', category: 'Roses' },
    ],
    fillers: [
      { name: 'White Daisy', src: '/flowers/daisy.svg', category: 'Daisies' },
    ],
    foliage: [
      { name: 'Fern', src: '/leaves/fern.svg', category: 'Fern' },
    ],
    wrap: 'kraft-paper',
    ribbon: 'gold-ribbon',
    rules: { symmetry: false, outerFoliage: false, brightDominant: true },
  },
};

/**
 * Validates the quality of a generated bouquet.
 * Returns a score from 0 to 100 based on aesthetic metrics:
 * - Balance: Even weight across quadrants.
 * - Symmetry: Left vs right balance.
 * - Density: Distance checks to avoid overlapping chaos or huge empty gaps.
 * - Zone correctness: Center = focal, outer = leaves.
 */
export function scoreBouquet(
  elements: BouquetElement[],
  template: ArrangementTemplate,
  sizeMode: SizeMode
): number {
  if (elements.length === 0) return 0;

  let balanceScore = 100;
  let symmetryScore = 100;
  let densityScore = 100;
  let zoneScore = 100;

  const centerX = 400;
  const centerY = 390;

  // 1. Quadrant Balance
  let q1 = 0, q2 = 0, q3 = 0, q4 = 0; // standard 4 quadrants relative to center
  elements.forEach((el) => {
    const dx = el.left - centerX;
    const dy = el.top - centerY;
    if (dx >= 0 && dy >= 0) q1++;
    else if (dx < 0 && dy >= 0) q2++;
    else if (dx < 0 && dy < 0) q3++;
    else q4++;
  });

  const total = elements.length;
  const expectedPerQ = total / 4;
  const devQ = (Math.abs(q1 - expectedPerQ) + Math.abs(q2 - expectedPerQ) + Math.abs(q3 - expectedPerQ) + Math.abs(q4 - expectedPerQ)) / total;
  balanceScore = Math.max(0, 100 - devQ * 120);

  // 2. Symmetry (Left vs Right side density check)
  let leftCount = 0;
  let rightCount = 0;
  elements.forEach((el) => {
    if (el.left < centerX) leftCount++;
    else rightCount++;
  });
  const symmetryDev = Math.abs(leftCount - rightCount) / total;
  symmetryScore = Math.max(0, 100 - symmetryDev * 150);

  // If the template specifies strict symmetry, penalize asymmetry more
  if (template.rules.symmetry) {
    symmetryScore = Math.max(0, symmetryScore - 15);
  }

  // 3. Overlap / Distance Density Checks (Avoid overlapping chaos and sparse holes)
  let tooCloseCount = 0;
  let tooFarCount = 0;
  let overlapPenalty = 0;

  for (let i = 0; i < elements.length; i++) {
    let minDistance = Infinity;
    const elA = elements[i];
    for (let j = 0; j < elements.length; j++) {
      if (i === j) continue;
      const elB = elements[j];
      const dist = Math.hypot(elA.left - elB.left, elA.top - elB.top);
      if (dist < minDistance) {
        minDistance = dist;
      }

      // Check overlap details: foliage should not cover focal flowers
      if (dist < 40 && elA.type === 'leaf' && elB.type === 'flower') {
        // If foliage is on top of flower (zIndex of leaf > zIndex of flower), apply penalty
        if (elA.zIndex > elB.zIndex) {
          overlapPenalty += 10;
        }
      }
    }

    if (minDistance < 25) {
      tooCloseCount++; // Too crowded
    } else if (minDistance > 110) {
      tooFarCount++; // Too sparse
    }
  }

  const crowdRatio = tooCloseCount / total;
  const sparseRatio = tooFarCount / total;
  densityScore = Math.max(0, 100 - (crowdRatio * 150 + sparseRatio * 100 + overlapPenalty));

  // 4. Zone Correctness (Center = focal, Middle = medium, Outer = leaves/fillers)
  let correctZones = 0;
  elements.forEach((el) => {
    const dist = Math.hypot(el.left - centerX, el.top - centerY);
    if (el.type === 'flower' && el.category !== "Baby's Breath" && el.category !== 'Lavender' && el.category !== 'Daisies') {
      // Focal flowers should be mostly in Center or Middle zones (radius <= 140)
      if (dist <= 140) correctZones++;
    } else {
      // Leaves and fillers should be mostly in Middle or Outer zones (radius > 70)
      if (dist > 70) correctZones++;
    }
  });

  zoneScore = (correctZones / total) * 100;

  // Final weighted score
  const finalScore = Math.round(
    balanceScore * 0.25 +
    symmetryScore * 0.25 +
    densityScore * 0.3 +
    zoneScore * 0.2
  );

  return Math.min(100, Math.max(0, finalScore));
}

/**
 * Arranges elements dynamically using seeded random, composition zones, templates rules.
 */
function createBouquetArrangement(
  templateKey: 'romantic' | 'elegant' | 'princess' | 'sunshine',
  sizeMode: SizeMode,
  seed: string
): BouquetElement[] {
  const template = TEMPLATES[templateKey];
  const rand = createRandom(seed);

  // Determine element counts
  let minFlowers = 5;
  let maxFlowers = 8;
  let minLeaves = 3;
  let maxLeaves = 5;

  if (sizeMode === 'small') {
    minFlowers = 5; maxFlowers = 7;
    minLeaves = 2; maxLeaves = 5;
  } else if (sizeMode === 'medium') {
    minFlowers = 8; maxFlowers = 12;
    minLeaves = 4; maxLeaves = 8;
  } else if (sizeMode === 'grand') {
    minFlowers = 15; maxFlowers = 22;
    minLeaves = 6; maxLeaves = 13;
  }

  const flowerCount = Math.floor(rand() * (maxFlowers - minFlowers + 1)) + minFlowers;
  const leafCount = Math.floor(rand() * (maxLeaves - minLeaves + 1)) + minLeaves;

  const elements: BouquetElement[] = [];
  const centerX = 400;
  const centerY = 390;

  let currentZ = 10;

  // 1. Generate Leaves/Foliage (Outer Zone)
  // Leaves generally sit at the bottom layer, except decorative ivy or twigs
  for (let i = 0; i < leafCount; i++) {
    const leafInfo = template.foliage[Math.floor(rand() * template.foliage.length)];
    if (!leafInfo) continue;

    // Distribute leaves around the outer ring
    const angleRad = (i / leafCount) * Math.PI * 2 + (rand() * 0.4 - 0.2);
    // Outer radius for foliage
    const radius = 150 + rand() * 50;
    const left = centerX + Math.cos(angleRad) * radius;
    const top = centerY + Math.sin(angleRad) * radius - 30;

    // Angle points outward with slight noise
    const angle = (angleRad * 180) / Math.PI + 90 + (rand() * 30 - 15);
    const scale = 0.7 + rand() * 0.2;

    elements.push({
      id: `${seed}-leaf-${i}-${Math.floor(rand() * 1000)}`,
      type: 'leaf',
      name: leafInfo.name,
      category: leafInfo.category,
      src: leafInfo.src,
      left,
      top,
      scaleX: scale,
      scaleY: scale,
      angle,
      zIndex: currentZ++,
    });
  }

  // 2. Generate Focal Flowers (Center & Middle Zones)
  for (let i = 0; i < flowerCount; i++) {
    const flowerInfo = template.focalFlowers[Math.floor(rand() * template.focalFlowers.length)];
    if (!flowerInfo) continue;

    // Distribute flowers in spiral/layers
    // Inner layers have smaller radius
    const ratio = i / flowerCount;
    const angleRad = ratio * Math.PI * 2 * 2.3 + (rand() * 0.5 - 0.25);
    const radius = 35 + ratio * 90 + rand() * 20;

    const left = centerX + Math.cos(angleRad) * radius;
    const top = centerY + Math.sin(angleRad) * radius - 20;
    
    // Subtle natural tilt
    const angle = rand() * 40 - 20;
    const scale = 0.8 + rand() * 0.2;

    elements.push({
      id: `${seed}-flower-${i}-${Math.floor(rand() * 1000)}`,
      type: 'flower',
      name: flowerInfo.name,
      category: flowerInfo.category,
      src: flowerInfo.src,
      left,
      top,
      scaleX: scale,
      scaleY: scale,
      angle,
      zIndex: currentZ++,
    });
  }

  // 3. Generate Fillers (e.g. Baby's Breath, Lavender, Daisy) in Middle/Outer Zones
  if (template.fillers.length > 0) {
    const fillerCount = Math.max(3, Math.floor(flowerCount * 0.6));
    for (let i = 0; i < fillerCount; i++) {
      const fillerInfo = template.fillers[Math.floor(rand() * template.fillers.length)];
      if (!fillerInfo) continue;

      const angleRad = rand() * Math.PI * 2;
      const radius = 70 + rand() * 90;
      const left = centerX + Math.cos(angleRad) * radius;
      const top = centerY + Math.sin(angleRad) * radius - 15;

      const angle = rand() * 360;
      const scale = 0.55 + rand() * 0.15;

      elements.push({
        id: `${seed}-filler-${i}-${Math.floor(rand() * 1000)}`,
        type: 'flower',
        name: fillerInfo.name,
        category: fillerInfo.category,
        src: fillerInfo.src,
        left,
        top,
        scaleX: scale,
        scaleY: scale,
        angle,
        zIndex: currentZ++,
      });
    }
  }

  return elements;
}

/**
 * High-level orchestration engine that generates unique variations and validates beauty scores.
 */
export function generateBouquet(
  templateKey: 'romantic' | 'elegant' | 'princess' | 'sunshine',
  sizeMode: SizeMode
): { elements: BouquetElement[]; wrap: string; ribbon: string } {
  const template = TEMPLATES[templateKey];

  let bestArrangement: BouquetElement[] = [];
  let bestScore = -1;

  // Run up to 15 variations to achieve a premium composition score >= 80
  for (let attempt = 0; attempt < 15; attempt++) {
    const seed = `${templateKey}-${sizeMode}-${Math.random().toString(36).substring(2, 9)}`;
    const arrangement = createBouquetArrangement(templateKey, sizeMode, seed);
    const score = scoreBouquet(arrangement, template, sizeMode);

    if (score > bestScore) {
      bestScore = score;
      bestArrangement = arrangement;
    }

    // Stop early if we achieve a stellar aesthetic rating
    if (score >= 80) {
      break;
    }
  }

  // Ensure elements are layered correctly:
  // Sort elements: leaves/foliage first (lowest zIndex), then fillers, then focal flowers.
  // This prevents leaves or Baby's Breath from fully covering beautiful roses/peonies.
  bestArrangement.sort((a, b) => {
    if (a.type === 'leaf' && b.type === 'flower') return -1;
    if (a.type === 'flower' && b.type === 'leaf') return 1;

    // Fillers like Baby's Breath / Lavender / Daisy go below focal roses/lilies/peonies
    const isAFiller = a.category === "Baby's Breath" || a.category === 'Lavender' || a.category === 'Daisies';
    const isBFiller = b.category === "Baby's Breath" || b.category === 'Lavender' || b.category === 'Daisies';
    if (isAFiller && !isBFiller) return -1;
    if (!isAFiller && isBFiller) return 1;

    return a.zIndex - b.zIndex;
  });

  // Re-index zIndex values to be solid sequentially
  bestArrangement.forEach((el, index) => {
    el.zIndex = index + 10;
  });

  return {
    elements: bestArrangement,
    wrap: template.wrap,
    ribbon: template.ribbon,
  };
}
