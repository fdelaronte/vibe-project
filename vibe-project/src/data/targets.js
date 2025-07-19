export const targets = [
  {
    id: 'infantry',
    title: 'Infantry Soldier',
    category: 'Light infantry',
    description: 'Baseline dismounted rifleman.',
    xp: 10,
    img: '/target-images/infantry.avif',
  },
  {
    id: 'btr82a',
    title: 'BTR‑82A APC',
    category: 'Armoured personnel carrier',
    description: 'Wheeled troop carrier with 30 mm cannon; lightly armoured.',
    xp: 150,
    img: '/target-images/btr82a.jpg',
  },
  {
    id: 'bmp3',
    title: 'BMP‑3 IFV',
    category: 'Infantry fighting vehicle',
    description: 'Amphibious IFV with 100 mm and 30 mm guns.',
    xp: 200,
    img: '/target-images/bmp3.jpg',
  },
  {
    id: 't72b3',
    title: 'T‑72B3 (M2016)',
    category: 'Main battle tank',
    description: 'Mass‑fielded MBT; upgraded ERA and 125 mm gun.',
    xp: 500,
    img: '/target-images/t72b3.jpg',
  },
  {
    id: 't90m',
    title: 'T‑90M “Proryv”',
    category: 'Main battle tank',
    description: 'Russia’s newest operational MBT with Relikt ERA.',
    xp: 525,
    img: '/target-images/t90m.jpg',
  },
  {
    id: 'torm2',
    title: 'Tor‑M2 (SA‑15)',
    category: 'Short‑range SAM',
    description: 'Tracked TELAR specialised for drone/PGM defence.',
    xp: 520,
    img: '/target-images/torm2.jpg',
  },
  {
    id: 'pantsir',
    title: 'Pantsir‑S1',
    category: 'Gun‑missile SAM',
    description: 'Hybrid cannon‑missile point‑defence system.',
    xp: 525,
    img: '/target-images/pantsir.jpg',
  },
  {
    id: 'bukm2',
    title: 'Buk‑M2 (SA‑17)',
    category: 'Medium‑range SAM',
    description: 'Self‑propelled missile system with 45 km reach.',
    xp: 550,
    img: '/target-images/bukm2.jpg',
  },
  {
    id: 'nebo',
    title: '1L119 “Nebo‑M” AESA',
    category: 'Early‑warning radar',
    description: 'Long‑range L‑band AESA radar on heavy chassis.',
    xp: 600,
    img: '/target-images/nebo.webp',
  },
];

// targets.js  (keep the array above…)

// ---------------------------------------------------------------------
// British Army rank ladder (lowest → highest)
// Step: 3 000 XP per rank
// ---------------------------------------------------------------------
const RANKS = [
  'Recruit',
  'Private',
  'Lance Corporal',
  'Corporal',
  'Sergeant',
  'Staff Sergeant',
  'Warrant Officer Class 2',
  'Warrant Officer Class 1',
  '2nd Lieutenant',
  'Lieutenant',
  'Captain',
  'Major',
  'Lieutenant Colonel',
  'Colonel',
  'Brigadier',
  'Major General',
  'Lieutenant General',
  'General',
  'Field Marshal'
];

// ---------------------------------------------------------------------
// Helper: convert XP → rank
// ---------------------------------------------------------------------
export function getRank(score) {
  // One rank every 3 000 XP
  const step = 3000;
  const index = Math.min(Math.floor(score / step), RANKS.length - 1);
  return RANKS[index];
}
