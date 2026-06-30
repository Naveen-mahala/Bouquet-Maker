const fs = require('fs');
const path = require('path');

// Ensure directories exist
const dirs = [
  'public/flowers',
  'public/leaves',
  'public/wraps',
  'public/ribbons'
];

dirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Helper to write SVG file
function writeSVG(category, name, content) {
  const filePath = path.join(process.cwd(), 'public', category, `${name}.svg`);
  fs.writeFileSync(filePath, content.trim());
  console.log(`Generated: public/${category}/${name}.svg`);
}

// ==========================================
// FLOWERS GENERATION
// ==========================================

// 1. ROSES
const roseGradients = `
  <defs>
    <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2d5a27" />
      <stop offset="100%" stop-color="#15330e" />
    </linearGradient>
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3c7a36" />
      <stop offset="100%" stop-color="#1b4016" />
    </linearGradient>
`;

const generateRose = (name, pColor1, pColor2, pColor3, pColor4) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400" width="200" height="400">
  ${roseGradients}
    <linearGradient id="petalGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${pColor1}" />
      <stop offset="100%" stop-color="${pColor2}" />
    </linearGradient>
    <linearGradient id="petalGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${pColor3}" />
      <stop offset="100%" stop-color="${pColor4}" />
    </linearGradient>
  </defs>
  
  <!-- Stem -->
  <path d="M 100 130 Q 95 280 100 400" fill="none" stroke="url(#stemGrad)" stroke-width="6" stroke-linecap="round" />
  
  <!-- Stem Leaves -->
  <path d="M 98 220 C 130 200 150 210 140 230 C 125 245 105 235 98 232" fill="url(#leafGrad)" stroke="#15330e" stroke-width="1.5" />
  <path d="M 97 270 C 60 260 40 275 50 295 C 65 305 85 290 97 282" fill="url(#leafGrad)" stroke="#15330e" stroke-width="1.5" />
  
  <!-- Calyx -->
  <path d="M 75 130 C 75 145 125 145 125 130 C 120 155 80 155 75 130" fill="#2d5a27" />
  <path d="M 78 135 L 65 155 L 85 142 L 100 165 L 115 142 L 135 155 L 122 135 Z" fill="#2d5a27" />

  <!-- Rose Bloom -->
  <g id="bloom">
    <!-- Outer Petals -->
    <path d="M 50 110 C 20 80 50 40 90 60 C 70 20 130 20 110 60 C 150 40 180 80 150 110 C 170 140 120 160 100 140 C 80 160 30 140 50 110 Z" fill="url(#petalGrad1)" />
    
    <!-- Mid Petals -->
    <path d="M 65 105 C 50 85 65 55 100 70 C 135 55 150 85 135 105 C 145 125 115 135 100 125 C 85 135 55 125 65 105 Z" fill="url(#petalGrad2)" opacity="0.95" />
    
    <!-- Inner Petals / Bud Core -->
    <path d="M 80 100 C 75 85 85 75 100 82 C 115 75 125 85 120 100 C 115 112 85 112 80 100 Z" fill="url(#petalGrad1)" />
    <path d="M 88 95 C 88 88 95 85 100 90 C 105 85 112 88 112 95 C 110 102 90 102 88 95 Z" fill="${pColor4}" />
  </g>
</svg>
`;

writeSVG('flowers', 'red-rose', generateRose('Red Rose', '#8a0010', '#e6193c', '#ff3355', '#4a0007'));
writeSVG('flowers', 'pink-rose', generateRose('Pink Rose', '#a31c58', '#ff6baf', '#ff8ebc', '#5e0b30'));
writeSVG('flowers', 'white-rose', generateRose('White Rose', '#e2dfd8', '#fcfbf7', '#ffffff', '#c5c2ba'));
writeSVG('flowers', 'yellow-rose', generateRose('Yellow Rose', '#d99b00', '#ffeb55', '#ffea7a', '#7f5b00'));
writeSVG('flowers', 'black-rose', generateRose('Black Rose', '#0e0c0d', '#2c2025', '#3d2e33', '#000000'));


// 2. TULIPS
const generateTulip = (name, tColor1, tColor2, tColor3) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400" width="200" height="400">
  <defs>
    <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4d823e" />
      <stop offset="100%" stop-color="#244d18" />
    </linearGradient>
    <linearGradient id="tulipGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${tColor1}" />
      <stop offset="100%" stop-color="${tColor2}" />
    </linearGradient>
    <linearGradient id="tulipGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${tColor2}" />
      <stop offset="100%" stop-color="${tColor3}" />
    </linearGradient>
  </defs>
  
  <!-- Stem -->
  <path d="M 100 120 Q 102 260 100 400" fill="none" stroke="url(#stemGrad)" stroke-width="7" stroke-linecap="round" />
  
  <!-- Large Tulip Leaf -->
  <path d="M 100 320 C 130 260 140 180 125 150 C 115 180 105 240 100 320" fill="#4d823e" stroke="#244d18" stroke-width="1.5" />
  
  <!-- Tulip Bloom (Layered Bell shape) -->
  <g id="bloom">
    <!-- Back Petals -->
    <path d="M 70 120 C 50 80 65 30 100 40 C 135 30 150 80 130 120 Z" fill="url(#tulipGrad2)" />
    
    <!-- Left Petal -->
    <path d="M 68 120 C 45 90 60 40 85 45 C 95 65 95 100 68 120 Z" fill="url(#tulipGrad1)" />
    
    <!-- Right Petal -->
    <path d="M 132 120 C 155 90 140 40 115 45 C 105 65 105 100 132 120 Z" fill="url(#tulipGrad1)" />
    
    <!-- Center/Front Petal -->
    <path d="M 80 125 C 70 85 85 50 100 50 C 115 50 130 85 120 125 C 105 130 95 130 80 125 Z" fill="url(#tulipGrad2)" stroke="rgba(0,0,0,0.05)" />
  </g>
</svg>
`;

writeSVG('flowers', 'red-tulip', generateTulip('Red Tulip', '#e3242b', '#b31017', '#ff5252'));
writeSVG('flowers', 'white-tulip', generateTulip('White Tulip', '#ffffff', '#e6e3da', '#f0ede4'));
writeSVG('flowers', 'purple-tulip', generateTulip('Purple Tulip', '#8e44ad', '#5b2c6f', '#c39bd3'));


// 3. LILIES
const generateLily = (name, lColor1, lColor2, spotColor) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 400" width="250" height="400">
  <defs>
    <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#447539" />
      <stop offset="100%" stop-color="#1f3d18" />
    </linearGradient>
    <linearGradient id="lilyPetal" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${lColor1}" />
      <stop offset="100%" stop-color="${lColor2}" />
    </linearGradient>
  </defs>
  
  <!-- Stem -->
  <path d="M 125 150 Q 120 280 125 400" fill="none" stroke="url(#stemGrad)" stroke-width="6" stroke-linecap="round" />
  
  <!-- Lily Leaves -->
  <path d="M 124 230 C 160 210 180 230 170 240 C 150 250 130 240 124 235" fill="#447539" />
  <path d="M 126 280 C 85 270 70 290 80 300 C 95 310 115 295 126 285" fill="#447539" />
  
  <!-- Lily Bloom (6 star-like petals) -->
  <g transform="translate(125, 140)">
    <!-- Back petals -->
    <path d="M 0 0 C -40 -60 -10 -120 0 -130 C 10 -120 40 -60 0 0" fill="url(#lilyPetal)" />
    <path d="M 0 0 C -70 -10 -120 -40 -130 -30 C -120 -20 -70 10 0 0" fill="url(#lilyPetal)" transform="rotate(60)" />
    <path d="M 0 0 C -70 -10 -120 -40 -130 -30 C -120 -20 -70 10 0 0" fill="url(#lilyPetal)" transform="rotate(120)" />
    <path d="M 0 0 C -70 -10 -120 -40 -130 -30 C -120 -20 -70 10 0 0" fill="url(#lilyPetal)" transform="rotate(180)" />
    <path d="M 0 0 C -70 -10 -120 -40 -130 -30 C -120 -20 -70 10 0 0" fill="url(#lilyPetal)" transform="rotate(240)" />
    <path d="M 0 0 C -70 -10 -120 -40 -130 -30 C -120 -20 -70 10 0 0" fill="url(#lilyPetal)" transform="rotate(300)" />
    
    <!-- Speckles/Spots on Lily petals -->
    <circle cx="10" cy="-60" r="1.5" fill="${spotColor}" />
    <circle cx="-10" cy="-70" r="1.5" fill="${spotColor}" />
    <circle cx="5" cy="-80" r="1" fill="${spotColor}" />
    
    <circle cx="-50" cy="-30" r="1.5" fill="${spotColor}" transform="rotate(60)" />
    <circle cx="-60" cy="-10" r="1" fill="${spotColor}" transform="rotate(60)" />
    
    <!-- Pistil & Stamens -->
    <path d="M 0 0 Q -10 -40 -20 -70" fill="none" stroke="#a2d149" stroke-width="3" stroke-linecap="round" />
    <circle cx="-20" cy="-70" r="4" fill="#a0522d" />
    
    <path d="M 0 0 Q 10 -45 20 -75" fill="none" stroke="#a2d149" stroke-width="3" stroke-linecap="round" />
    <circle cx="20" cy="-75" r="4" fill="#a0522d" />
    
    <path d="M 0 0 Q 0 -50 0 -85" fill="none" stroke="#82c129" stroke-width="4" stroke-linecap="round" />
    <path d="M -5 -85 L 5 -85 L 0 -80 Z" fill="#4a701b" />
  </g>
</svg>
`;

writeSVG('flowers', 'white-lily', generateLily('White Lily', '#ffffff', '#e8f2e6', '#c89d7c'));
writeSVG('flowers', 'orange-lily', generateLily('Orange Lily', '#ff7f32', '#ff5722', '#5e2300'));


// 4. SUNFLOWER
const sunflowerSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 450" width="250" height="450">
  <defs>
    <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#43773a" />
      <stop offset="100%" stop-color="#194012" />
    </linearGradient>
    <linearGradient id="sunPetal" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffeb3b" />
      <stop offset="100%" stop-color="#f57f17" />
    </linearGradient>
    <radialGradient id="sunCenter" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2e1a08" />
      <stop offset="70%" stop-color="#3e2723" />
      <stop offset="100%" stop-color="#1b0c02" />
    </radialGradient>
  </defs>
  
  <!-- Stem -->
  <path d="M 125 150 Q 120 300 125 450" fill="none" stroke="url(#stemGrad)" stroke-width="9" stroke-linecap="round" />
  
  <!-- Leaves -->
  <path d="M 123 250 C 170 230 190 270 160 290 C 140 300 130 280 123 255" fill="#43773a" stroke="#194012" stroke-width="1.5" />
  <path d="M 127 310 C 80 290 60 330 90 350 C 110 360 120 340 127 315" fill="#43773a" stroke="#194012" stroke-width="1.5" />
  
  <!-- Sunflower Bloom -->
  <g transform="translate(125, 140)">
    <!-- Outer Petals Layer 1 (24 Petals) -->
    ${Array.from({ length: 24 }).map((_, i) => `
    <path d="M 0 0 C -15 -40 -12 -90 0 -105 C 12 -90 15 -40 0 0" fill="url(#sunPetal)" transform="rotate(${i * 15})" />
    `).join('')}
    
    <!-- Inner Petals Layer 2 (smaller & shifted) -->
    ${Array.from({ length: 24 }).map((_, i) => `
    <path d="M 0 0 C -10 -30 -8 -75 0 -85 C 8 -75 10 -30 0 0" fill="#f57f17" opacity="0.9" transform="rotate(${i * 15 + 7.5})" />
    `).join('')}
    
    <!-- Flower Center Disc -->
    <circle cx="0" cy="0" r="45" fill="url(#sunCenter)" stroke="#5d4037" stroke-width="3" />
    
    <!-- Seeds Texture (Faux) -->
    <circle cx="0" cy="0" r="35" fill="none" stroke="#f57f17" stroke-width="1" stroke-dasharray="2, 5" opacity="0.4" />
    <circle cx="0" cy="0" r="25" fill="none" stroke="#ffeb3b" stroke-width="1" stroke-dasharray="3, 4" opacity="0.3" />
    <circle cx="0" cy="0" r="15" fill="none" stroke="#ffeb3b" stroke-width="1" stroke-dasharray="2, 3" opacity="0.3" />
  </g>
</svg>
`;
writeSVG('flowers', 'sunflower', sunflowerSVG);


// 5. DAISY
const daisySVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400" width="200" height="400">
  <defs>
    <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#558b2f" />
      <stop offset="100%" stop-color="#2e7d32" />
    </linearGradient>
    <linearGradient id="daisyPetal" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f5f5f5" />
    </linearGradient>
  </defs>
  
  <!-- Stem -->
  <path d="M 100 120 L 100 400" fill="none" stroke="url(#stemGrad)" stroke-width="5" stroke-linecap="round" />
  
  <!-- Bloom -->
  <g transform="translate(100, 110)">
    <!-- Radiating White Petals (18 Petals) -->
    ${Array.from({ length: 18 }).map((_, i) => `
    <path d="M 0 0 C -8 -20 -6 -65 0 -70 C 6 -65 8 -20 0 0" fill="url(#daisyPetal)" stroke="#e0e0e0" stroke-width="0.5" transform="rotate(${i * 20})" />
    `).join('')}
    
    <!-- Yellow Disc Center -->
    <circle cx="0" cy="0" r="20" fill="#ffca28" stroke="#f57f17" stroke-width="1.5" />
    <!-- Seed Dots -->
    <circle cx="0" cy="0" r="12" fill="none" stroke="#f57f17" stroke-width="1" stroke-dasharray="1, 3" />
  </g>
</svg>
`;
writeSVG('flowers', 'daisy', daisySVG);


// 6. ORCHID
const orchidSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400" width="200" height="400">
  <defs>
    <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#388e3c" />
      <stop offset="100%" stop-color="#1b5e20" />
    </linearGradient>
    <linearGradient id="orchidPetal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e040fb" />
      <stop offset="100%" stop-color="#7b1fa2" />
    </linearGradient>
  </defs>
  
  <!-- Stem -->
  <path d="M 100 130 Q 98 270 100 400" fill="none" stroke="url(#stemGrad)" stroke-width="5" stroke-linecap="round" />
  
  <!-- Orchid Flower Center -->
  <g transform="translate(100, 120)">
    <!-- Three Outer Sepals -->
    <path d="M 0 0 C -15 -30 -5 -70 0 -75 C 5 -70 15 -30 0 0" fill="url(#orchidPetal)" />
    <path d="M 0 0 C -15 -30 -5 -70 0 -75 C 5 -70 15 -30 0 0" fill="url(#orchidPetal)" transform="rotate(120)" />
    <path d="M 0 0 C -15 -30 -5 -70 0 -75 C 5 -70 15 -30 0 0" fill="url(#orchidPetal)" transform="rotate(240)" />
    
    <!-- Two Large Inner Petals -->
    <path d="M 0 0 C -40 -20 -60 20 -45 35 C -30 45 -10 15 0 0" fill="#ea80fc" stroke="#7b1fa2" stroke-width="0.5" />
    <path d="M 0 0 C 40 -20 60 20 45 35 C 30 45 10 15 0 0" fill="#ea80fc" stroke="#7b1fa2" stroke-width="0.5" />
    
    <!-- Lip / Labellum (Vibrant Center) -->
    <path d="M 0 -5 C -15 15 -25 45 0 50 C 25 45 15 15 0 -5" fill="#ff1744" />
    <path d="M 0 10 C -8 15 -10 30 0 35 C 10 30 8 15 0 10" fill="#ffea00" />
  </g>
</svg>
`;
writeSVG('flowers', 'orchid', orchidSVG);


// 7. PEONY
const peonySVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400" width="200" height="400">
  <defs>
    <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3c7c34" />
      <stop offset="100%" stop-color="#1b4715" />
    </linearGradient>
    <radialGradient id="peonyGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff8da1" />
      <stop offset="60%" stop-color="#ff4081" />
      <stop offset="100%" stop-color="#c2185b" />
    </radialGradient>
  </defs>
  
  <!-- Stem -->
  <path d="M 100 135 Q 96 280 100 400" fill="none" stroke="url(#stemGrad)" stroke-width="6" stroke-linecap="round" />
  
  <!-- Peony Bloom (Fluffy layers) -->
  <g transform="translate(100, 125)">
    <!-- Outer Fluffy Leaves (12 ruffles) -->
    ${Array.from({ length: 12 }).map((_, i) => `
    <path d="M 0 0 C -25 -25 -20 -65 0 -55 C 20 -65 25 -25 0 0" fill="url(#peonyGrad)" opacity="0.85" transform="rotate(${i * 30})" />
    `).join('')}
    
    <!-- Mid Fluffy Leaves (10 ruffles, smaller) -->
    ${Array.from({ length: 10 }).map((_, i) => `
    <path d="M 0 0 C -18 -18 -15 -50 0 -42 C 15 -50 18 -18 0 0" fill="#ff4081" opacity="0.95" transform="rotate(${i * 36 + 18})" />
    `).join('')}
    
    <!-- Inner tight ruffles -->
    ${Array.from({ length: 8 }).map((_, i) => `
    <path d="M 0 0 C -12 -12 -10 -35 0 -30 C 10 -35 12 -12 0 0" fill="#ff8da1" transform="rotate(${i * 45})" />
    `).join('')}
    
    <!-- Golden Core points -->
    <circle cx="0" cy="0" r="8" fill="#ffd700" opacity="0.9" />
    <circle cx="-3" cy="-3" r="2" fill="#ff8f00" />
    <circle cx="3" cy="2" r="1.5" fill="#ff8f00" />
  </g>
</svg>
`;
writeSVG('flowers', 'peony', peonySVG);


// 8. LAVENDER
const lavenderSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 400" width="150" height="400">
  <defs>
    <linearGradient id="lavenderStem" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4a7c59" />
      <stop offset="100%" stop-color="#2c5e3b" />
    </linearGradient>
  </defs>
  
  <!-- Stem -->
  <path d="M 75 80 L 75 400" fill="none" stroke="url(#lavenderStem)" stroke-width="4.5" stroke-linecap="round" />
  
  <!-- Lavender Flower Clusters (stacked little buds) -->
  <g fill="#9575cd" stroke="#5e35b1" stroke-width="0.5">
    <!-- Stacked clusters going up -->
    ${Array.from({ length: 12 }).map((_, idx) => {
      const y = 80 + idx * 16;
      const scale = Math.max(0.4, 1 - idx * 0.05);
      return `
      <g transform="translate(75, ${y}) scale(${scale})">
        <!-- Center Bud -->
        <ellipse cx="0" cy="-5" rx="5" ry="8" fill="#7986cb" />
        <!-- Left Side Buds -->
        <ellipse cx="-10" cy="0" rx="7" ry="5" transform="rotate(-15)" />
        <ellipse cx="-18" cy="3" rx="5" ry="4" transform="rotate(-30)" fill="#b39ddb" />
        <!-- Right Side Buds -->
        <ellipse cx="10" cy="0" rx="7" ry="5" transform="rotate(15)" />
        <ellipse cx="18" cy="3" rx="5" ry="4" transform="rotate(30)" fill="#b39ddb" />
      </g>
      `;
    }).join('')}
    
    <!-- Top bud -->
    <ellipse cx="75" cy="65" rx="5" ry="7" fill="#b39ddb" />
  </g>
</svg>
`;
writeSVG('flowers', 'lavender', lavenderSVG);


// 9. BABY'S BREATH
const babysBreathSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400" width="200" height="400">
  <!-- Delicate Branching System -->
  <path d="M 100 400 Q 95 300 100 240" fill="none" stroke="#7bb274" stroke-width="4" stroke-linecap="round" />
  
  <!-- Primary splits -->
  <path d="M 100 240 Q 70 180 50 130" fill="none" stroke="#7bb274" stroke-width="2.5" />
  <path d="M 100 240 Q 130 180 150 130" fill="none" stroke="#7bb274" stroke-width="2.5" />
  <path d="M 98 210 Q 95 150 90 90" fill="none" stroke="#7bb274" stroke-width="2" />

  <!-- Sub splits -->
  <!-- Left Side branches -->
  <path d="M 75 185 Q 50 160 30 140" fill="none" stroke="#8dc785" stroke-width="1.5" />
  <path d="M 58 150 Q 40 120 25 100" fill="none" stroke="#8dc785" stroke-width="1.2" />
  <path d="M 50 130 Q 65 100 70 80" fill="none" stroke="#8dc785" stroke-width="1.2" />

  <!-- Right Side branches -->
  <path d="M 125 185 Q 150 160 170 140" fill="none" stroke="#8dc785" stroke-width="1.5" />
  <path d="M 142 150 Q 160 120 175 100" fill="none" stroke="#8dc785" stroke-width="1.2" />
  <path d="M 150 130 Q 135 100 130 80" fill="none" stroke="#8dc785" stroke-width="1.2" />

  <!-- Center branches -->
  <path d="M 95 160 Q 110 130 115 100" fill="none" stroke="#8dc785" stroke-width="1.2" />
  
  <!-- Tiny White Flower Heads (clutter of little dots) -->
  <g fill="#ffffff" stroke="#e0e0e0" stroke-width="0.3">
    <!-- Group of dots at terminals -->
    <!-- Branch Left Terminals -->
    <circle cx="30" cy="140" r="3.5" /> <circle cx="27" cy="137" r="2.5" fill="#f5f5f5" />
    <circle cx="25" cy="100" r="3" /> <circle cx="22" cy="102" r="2.2" />
    <circle cx="70" cy="80" r="3.5" /> <circle cx="73" cy="77" r="2" />
    
    <!-- Branch Right Terminals -->
    <circle cx="170" cy="140" r="3.5" /> <circle cx="173" cy="143" r="2.5" fill="#f5f5f5" />
    <circle cx="175" cy="100" r="3" /> <circle cx="178" cy="98" r="2.2" />
    <circle cx="130" cy="80" r="3.5" /> <circle cx="127" cy="77" r="2" />

    <!-- Center Terminals -->
    <circle cx="90" cy="90" r="4" /> <circle cx="86" cy="88" r="2.5" />
    <circle cx="115" cy="100" r="3.5" /> <circle cx="118" cy="103" r="2" />
    
    <!-- Intermediate dots -->
    <circle cx="58" cy="150" r="2.5" />
    <circle cx="142" cy="150" r="2.5" />
    <circle cx="75" cy="185" r="3" />
    <circle cx="125" cy="185" r="3" />
  </g>
</svg>
`;
writeSVG('flowers', 'babys-breath', babysBreathSVG);


// ==========================================
// LEAVES GENERATION
// ==========================================

// 1. EUCALYPTUS
const eucalyptusSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 400" width="150" height="400">
  <defs>
    <linearGradient id="eucStem" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#708d81" />
      <stop offset="100%" stop-color="#4f6d61" />
    </linearGradient>
    <radialGradient id="eucLeaf" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#94b0a5" />
      <stop offset="80%" stop-color="#708d81" />
      <stop offset="100%" stop-color="#5c786c" />
    </radialGradient>
  </defs>
  
  <!-- Stem -->
  <path d="M 75 50 L 75 400" fill="none" stroke="url(#eucStem)" stroke-width="5" stroke-linecap="round" />
  
  <!-- Pairs of Rounded leaves -->
  <g>
    ${Array.from({ length: 8 }).map((_, idx) => {
      const y = 80 + idx * 38;
      const sizeX = 35 - idx * 1.5;
      const sizeY = 25 - idx * 1.0;
      const rot = 10 - (idx % 2) * 20; // alternating slight tilt
      return `
      <!-- Pair at y = ${y} -->
      <g transform="translate(75, ${y}) rotate(${rot})">
        <!-- Left Leaf -->
        <ellipse cx="-28" cy="0" rx="${sizeX}" ry="${sizeY}" fill="url(#eucLeaf)" stroke="#5c786c" stroke-width="1" />
        <!-- Right Leaf -->
        <ellipse cx="28" cy="0" rx="${sizeX}" ry="${sizeY}" fill="url(#eucLeaf)" stroke="#5c786c" stroke-width="1" />
        <!-- Central connection node -->
        <circle cx="0" cy="0" r="4.5" fill="#4f6d61" />
      </g>
      `;
    }).join('')}
    
    <!-- Top terminal leaf -->
    <ellipse cx="75" cy="50" rx="15" ry="18" fill="url(#eucLeaf)" stroke="#5c786c" stroke-width="1" />
  </g>
</svg>
`;
writeSVG('leaves', 'eucalyptus', eucalyptusSVG);


// 2. FERN
const fernSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 400" width="150" height="400">
  <defs>
    <linearGradient id="fernColor" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2e7d32" />
      <stop offset="100%" stop-color="#1b5e20" />
    </linearGradient>
  </defs>
  
  <!-- Stem / Rachis -->
  <path d="M 75 50 Q 72 230 75 400" fill="none" stroke="#1b5e20" stroke-width="4.5" stroke-linecap="round" />
  
  <!-- Symmetrical Pinnae (fern leaflets) -->
  <g fill="url(#fernColor)" stroke="#0d3c12" stroke-width="0.5">
    ${Array.from({ length: 18 }).map((_, idx) => {
      const y = 60 + idx * 18;
      const length = Math.max(10, 50 - Math.abs(idx - 10) * 1.5);
      return `
      <!-- Left Leaflet -->
      <path d="M 74 ${y} C ${74 - length * 0.8} ${y - length * 0.4} ${74 - length} ${y + 5} 74 ${y + 10}" />
      <!-- Right Leaflet -->
      <path d="M 76 ${y} C ${76 + length * 0.8} ${y - length * 0.4} ${76 + length} ${y + 5} 76 ${y + 10}" />
      `;
    }).join('')}
    
    <!-- Tip leaflet -->
    <path d="M 75 50 C 70 30 75 10 75 5 C 75 10 80 30 75 50 Z" />
  </g>
</svg>
`;
writeSVG('leaves', 'fern', fernSVG);


// 3. PALM
const palmSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400" width="200" height="400">
  <defs>
    <linearGradient id="palmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3c763d" />
      <stop offset="50%" stop-color="#2b542c" />
      <stop offset="100%" stop-color="#1b3d1c" />
    </linearGradient>
  </defs>
  
  <!-- Stem -->
  <path d="M 100 400 L 100 150" fill="none" stroke="#1b3d1c" stroke-width="6" stroke-linecap="round" />
  
  <!-- Palm Fronds -->
  <g fill="url(#palmGrad)" stroke="#132c14" stroke-width="0.5">
    ${Array.from({ length: 15 }).map((_, i) => {
      const angle = -70 + i * 10;
      return `
      <g transform="translate(100, 160) rotate(${angle})">
        <path d="M 0 0 C -4 -40 -6 -180 0 -220 C 6 -180 4 -40 0 0" />
      </g>
      `;
    }).join('')}
    
    <!-- Base wrap -->
    <path d="M 85 155 Q 100 145 115 155 C 110 170 90 170 85 155 Z" fill="#1b3d1c" />
  </g>
</svg>
`;
writeSVG('leaves', 'palm', palmSVG);


// 4. SILVER DOLLAR LEAF
const silverDollarSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 400" width="150" height="400">
  <defs>
    <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#607d8b" />
      <stop offset="100%" stop-color="#37474f" />
    </linearGradient>
    <radialGradient id="leafGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#b0bec5" />
      <stop offset="75%" stop-color="#78909c" />
      <stop offset="100%" stop-color="#546e7a" />
    </radialGradient>
  </defs>
  
  <!-- Stem -->
  <path d="M 75 40 L 75 400" fill="none" stroke="url(#stemGrad)" stroke-width="4.5" stroke-linecap="round" />
  
  <!-- Large circular leaves -->
  <g>
    ${Array.from({ length: 7 }).map((_, idx) => {
      const y = 70 + idx * 45;
      const leftSide = idx % 2 === 0;
      const rot = leftSide ? -25 : 25;
      const cx = leftSide ? -24 : 24;
      const r = 32 - idx * 1.5;
      return `
      <g transform="translate(75, ${y}) rotate(${rot})">
        <path d="M 0 0 L ${cx} 0" stroke="url(#stemGrad)" stroke-width="3" />
        <circle cx="${cx}" cy="0" r="${r}" fill="url(#leafGrad)" stroke="#37474f" stroke-width="1.5" />
        <path d="M ${cx} ${-r + 2} Q ${cx + (leftSide ? -5 : 5)} 0 ${cx} ${r - 2}" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1" />
      </g>
      `;
    }).join('')}
    
    <!-- Top single leaf -->
    <circle cx="75" cy="40" r="22" fill="url(#leafGrad)" stroke="#37474f" stroke-width="1.5" />
  </g>
</svg>
`;
writeSVG('leaves', 'silver-dollar', silverDollarSVG);


// 5. IVY LEAF
const ivySVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 400" width="150" height="400">
  <defs>
    <linearGradient id="ivyColor" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4caf50" />
      <stop offset="100%" stop-color="#1b5e20" />
    </linearGradient>
  </defs>
  
  <!-- Stem -->
  <path d="M 75 40 Q 78 220 75 400" fill="none" stroke="#1b5e20" stroke-width="4" stroke-linecap="round" />
  
  <!-- Ivy leaves alternating -->
  <g>
    ${Array.from({ length: 6 }).map((_, idx) => {
      const y = 80 + idx * 52;
      const leftSide = idx % 2 === 0;
      const rot = leftSide ? -45 : 45;
      const transX = leftSide ? -18 : 18;
      const scale = 1 - idx * 0.08;
      return `
      <g transform="translate(75, ${y}) rotate(${rot}) scale(${scale})">
        <path d="M 0 0 L ${transX} 5" stroke="#1b5e20" stroke-width="2" />
        <g transform="translate(${transX}, 5) rotate(${leftSide ? 90 : -90})">
          <path d="M 0 -25 L -18 -8 L -12 18 L 12 18 L 18 -8 Z" fill="url(#ivyColor)" stroke="#0d3c12" stroke-width="1.5" />
          <path d="M 0 -25 Q -25 -5 0 25 Q 25 -5 0 -25" fill="url(#ivyColor)" />
          <!-- Veins -->
          <path d="M 0 20 L 0 -22" fill="none" stroke="#a5d6a7" stroke-width="1.5" opacity="0.6" />
          <path d="M 0 0 L -12 -12" fill="none" stroke="#a5d6a7" stroke-width="1" opacity="0.5" />
          <path d="M 0 0 L 12 -12" fill="none" stroke="#a5d6a7" stroke-width="1" opacity="0.5" />
          <path d="M 0 10 L -10 5" fill="none" stroke="#a5d6a7" stroke-width="1" opacity="0.5" />
          <path d="M 0 10 L 10 5" fill="none" stroke="#a5d6a7" stroke-width="1" opacity="0.5" />
        </g>
      </g>
      `;
    }).join('')}
  </g>
</svg>
`;
writeSVG('leaves', 'ivy', ivySVG);


// ==========================================
// WRAPS GENERATION (600x700px)
// ==========================================

// 1. KRAFT PAPER WRAP
const kraftWrap = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="600" height="700">
  <defs>
    <linearGradient id="kraftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bf9a75" />
      <stop offset="40%" stop-color="#d4b594" />
      <stop offset="80%" stop-color="#bf9a75" />
      <stop offset="100%" stop-color="#9e7b57" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="10" stdDeviation="15" flood-opacity="0.25"/>
    </filter>
  </defs>
  
  <g filter="url(#shadow)">
    <!-- Base Wrap Paper -->
    <path d="M 150 150 L 450 150 L 520 600 Q 300 680 80 600 Z" fill="url(#kraftGrad)" stroke="#9e7b57" stroke-width="2" />
    
    <!-- Folds & Creases -->
    <path d="M 80 600 C 180 500 220 300 150 150 C 250 200 350 450 320 650 Q 200 650 80 600 Z" fill="#cfa780" stroke="#9e7b57" stroke-width="1" opacity="0.9" />
    <path d="M 520 600 C 420 500 380 300 450 150 C 350 200 250 450 280 650 Q 400 650 520 600 Z" fill="#b08a65" stroke="#7e5d3c" stroke-width="1" opacity="0.8" />
    
    <path d="M 120 180 Q 220 280 180 400" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" />
    <path d="M 480 180 Q 380 280 420 400" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1.5" />
  </g>
</svg>
`;
writeSVG('wraps', 'kraft-paper', kraftWrap);


// 2. WHITE WRAP
const whiteWrap = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="600" height="700">
  <defs>
    <linearGradient id="whitePaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="70%" stop-color="#f5f5f5" />
      <stop offset="100%" stop-color="#e0e0e0" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <g filter="url(#shadow)">
    <path d="M 130 140 L 470 140 L 530 620 Q 300 690 70 620 Z" fill="url(#whitePaperGrad)" stroke="#dcdcdc" stroke-width="1.5" />
    <path d="M 70 620 C 180 520 230 250 130 140 C 230 200 360 400 330 660 Q 200 660 70 620 Z" fill="#fafafa" stroke="#e3e3e3" stroke-width="1" opacity="0.9" />
    <path d="M 530 620 C 420 520 370 250 470 140 C 370 200 240 400 270 660 Q 400 660 530 620 Z" fill="#ededed" stroke="#d5d5d5" stroke-width="1" opacity="0.8" />
  </g>
</svg>
`;
writeSVG('wraps', 'white-wrap', whiteWrap);


// 3. PINK WRAP
const pinkWrap = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="600" height="700">
  <defs>
    <linearGradient id="pinkPaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffd5e5" />
      <stop offset="60%" stop-color="#ffb3ba" />
      <stop offset="100%" stop-color="#ffa3b1" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <g filter="url(#shadow)">
    <path d="M 130 140 L 470 140 L 530 620 Q 300 690 70 620 Z" fill="url(#pinkPaperGrad)" stroke="#ffa3b1" stroke-width="1.5" />
    <path d="M 70 620 C 180 520 230 250 130 140 C 230 200 360 400 330 660 Q 200 660 70 620 Z" fill="#ffe0ed" stroke="#ffa3b1" stroke-width="1" opacity="0.9" />
    <path d="M 530 620 C 420 520 370 250 470 140 C 370 200 240 400 270 660 Q 400 660 530 620 Z" fill="#ffccd5" stroke="#f096a6" stroke-width="1" opacity="0.8" />
  </g>
</svg>
`;
writeSVG('wraps', 'pink-wrap', pinkWrap);


// 4. LUXURY BLACK WRAP
const blackWrap = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="600" height="700">
  <defs>
    <linearGradient id="blackPaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2a2a2a" />
      <stop offset="50%" stop-color="#1c1c1c" />
      <stop offset="100%" stop-color="#0a0a0a" />
    </linearGradient>
    <linearGradient id="goldEdge" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffd700" />
      <stop offset="50%" stop-color="#d4af37" />
      <stop offset="100%" stop-color="#aa7c11" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <g filter="url(#shadow)">
    <path d="M 130 140 L 470 140 L 530 620 Q 300 690 70 620 Z" fill="url(#blackPaperGrad)" stroke="url(#goldEdge)" stroke-width="3" />
    <path d="M 70 620 C 180 520 230 250 130 140 C 230 200 360 400 330 660 Q 200 660 70 620 Z" fill="#252525" stroke="url(#goldEdge)" stroke-width="1.5" opacity="0.95" />
    <path d="M 530 620 C 420 520 370 250 470 140 C 370 200 240 400 270 660 Q 400 660 530 620 Z" fill="#151515" stroke="url(#goldEdge)" stroke-width="1.5" opacity="0.9" />
  </g>
</svg>
`;
writeSVG('wraps', 'luxury-black-wrap', blackWrap);


// 5. GOLDEN WRAP
const goldenWrap = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="600" height="700">
  <defs>
    <linearGradient id="goldPaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff275" />
      <stop offset="30%" stop-color="#ffd700" />
      <stop offset="70%" stop-color="#d4af37" />
      <stop offset="100%" stop-color="#b8860b" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity="0.2"/>
    </filter>
  </defs>
  
  <g filter="url(#shadow)">
    <path d="M 130 140 L 470 140 L 530 620 Q 300 690 70 620 Z" fill="url(#goldPaperGrad)" stroke="#b8860b" stroke-width="2" />
    <path d="M 70 620 C 180 520 230 250 130 140 C 230 200 360 400 330 660 Q 200 660 70 620 Z" fill="#ffeb3b" stroke="#d4af37" stroke-width="1.5" opacity="0.85" />
    <path d="M 530 620 C 420 520 370 250 470 140 C 370 200 240 400 270 660 Q 400 660 530 620 Z" fill="#cfab2c" stroke="#aa7c11" stroke-width="1.5" opacity="0.8" />
  </g>
</svg>
`;
writeSVG('wraps', 'golden-wrap', goldenWrap);


// 6. TRANSPARENT CELLOPHANE WRAP
const transparentWrap = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="600" height="700">
  <defs>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-opacity="0.1"/>
    </filter>
  </defs>
  
  <g filter="url(#shadow)">
    <path d="M 130 140 L 470 140 L 530 620 Q 300 690 70 620 Z" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2" />
    <path d="M 130 140 L 250 350 L 120 500" fill="none" stroke="rgba(255, 255, 255, 0.35)" stroke-width="3" stroke-linecap="round" />
    <path d="M 470 140 L 350 350 L 480 500" fill="none" stroke="rgba(255, 255, 255, 0.35)" stroke-width="3" stroke-linecap="round" />
    <path d="M 300 200 Q 320 400 300 600" fill="none" stroke="rgba(255, 255, 255, 0.2)" stroke-width="2" />
    <path d="M 70 620 C 180 520 230 250 130 140 Q 230 250 330 660 Z" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255,255,255,0.25)" stroke-width="1" />
    <path d="M 530 620 C 420 520 370 250 470 140 Q 370 250 270 660 Z" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255,255,255,0.25)" stroke-width="1" />
  </g>
</svg>
`;
writeSVG('wraps', 'transparent-wrap', transparentWrap);


// ==========================================
// RIBBONS GENERATION (200x150px)
// ==========================================

const generateRibbon = (name, colorLeft, colorRight, shadowColor) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
  <defs>
    <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colorLeft}" />
      <stop offset="100%" stop-color="${colorRight}" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="${shadowColor}" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <g filter="url(#shadow)">
    <path d="M 100 60 Q 60 90 40 140 L 55 145 Q 75 100 100 80 Z" fill="url(#ribbonGrad)" stroke="rgba(0,0,0,0.1)" stroke-width="0.5" />
    <path d="M 100 60 Q 140 90 160 140 L 145 145 Q 125 100 100 80 Z" fill="url(#ribbonGrad)" stroke="rgba(0,0,0,0.1)" stroke-width="0.5" />
    <path d="M 100 60 C 70 30 30 40 45 70 C 55 85 85 75 100 60 Z" fill="url(#ribbonGrad)" stroke="rgba(0,0,0,0.15)" stroke-width="0.5" />
    <path d="M 100 60 C 130 30 170 40 155 70 C 145 85 115 75 100 60 Z" fill="url(#ribbonGrad)" stroke="rgba(0,0,0,0.15)" stroke-width="0.5" />
    <rect x="88" y="50" width="24" height="20" rx="6" fill="${colorRight}" stroke="${colorLeft}" stroke-width="1.5" />
  </g>
</svg>
`;

writeSVG('ribbons', 'red-ribbon', generateRibbon('Red Ribbon', '#e53935', '#b71c1c', '#3e0606'));
writeSVG('ribbons', 'white-ribbon', generateRibbon('White Ribbon', '#ffffff', '#e0e0e0', '#a0a0a0'));
writeSVG('ribbons', 'gold-ribbon', generateRibbon('Gold Ribbon', '#ffd700', '#c5a019', '#4d3d04'));
writeSVG('ribbons', 'pink-ribbon', generateRibbon('Pink Ribbon', '#ff8da1', '#e91e63', '#4a0018'));
writeSVG('ribbons', 'purple-ribbon', generateRibbon('Purple Ribbon', '#ab47bc', '#6a1b9a', '#210036'));
writeSVG('ribbons', 'satin-black-ribbon', generateRibbon('Satin Black Ribbon', '#37474f', '#10171a', '#000000'));

console.log("All static botanical SVG assets successfully generated!");
