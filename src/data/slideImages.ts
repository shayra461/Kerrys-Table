// Curated Unsplash photo IDs that map to slide topics.
// Returned as full URLs at a sensible size.

const U = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const POOL = {
  plate: U("photo-1490645935967-10de6ba17061"),       // healthy bowl
  greens: U("photo-1540420773420-3366772f4999"),      // greens
  fruits: U("photo-1610832958506-aa56368176cf"),      // fruit bowl
  berries: U("photo-1488477181946-6428a0291777"),     // berries
  citrus: U("photo-1547514701-42782101795e"),         // citrus
  avocado: U("photo-1601493700631-2b16ec4b4716"),     // avocado
  salmon: U("photo-1467003909585-2f8a72700288"),      // salmon
  nuts: U("photo-1604908176997-125f25cc6f3d"),        // nuts/seeds
  grains: U("photo-1586201375761-83865001e31c"),      // grains
  bread: U("photo-1509440159596-0249088772ff"),       // bread
  water: U("photo-1548839140-29a749e1cf4d"),          // water
  cooking: U("photo-1556909114-f6e7ad7d3136"),        // cooking
  salad: U("photo-1512621776951-a57141f2eefd"),       // salad
  market: U("photo-1488459716781-31db52582fe9"),      // market produce
  herbs: U("photo-1466637574441-749b8f19452f"),       // herbs
  eggs: U("photo-1506976785307-8732e854ad03"),        // eggs
  yogurt: U("photo-1488477181946-6428a0291777"),      // yogurt-ish
  chicken: U("photo-1604908176997-125f25cc6f3d"),     // protein
  oil: U("photo-1474979266404-7eaacbcd87c5"),         // olive oil
  vegetablesMix: U("photo-1567306226416-28f0efdc88ce"), // mixed veg
  coach: U("photo-1559757148-5c350d0d3c56"),          // coach/portrait
  label: U("photo-1606787366850-de6330128bfc"),       // nutrition label
  calc: U("photo-1554224155-6726b3ff858f"),           // calculator
  heart: U("photo-1532635241-17e820acc59f"),          // heart/health
  warning: U("photo-1490818387583-1baba5e638af"),     // fast food
  smoothie: U("photo-1502740479091-635887520276"),    // smoothie
  vitamins: U("photo-1584308666744-24d5c474f2ae"),    // vitamins
  hands: U("photo-1505252585461-04db1eb84625"),       // hands holding
};

// Map by index for deterministic, content-relevant images.
const BY_INDEX: Record<number, string> = {
  0: POOL.plate,           // cover
  1: POOL.market,          // intro chapter 1
  2: POOL.cooking,         // TOC
  3: POOL.coach,           // coach profile
  4: POOL.hands,           // what a coach does
  5: POOL.fruits,          // what is good nutrition
  6: POOL.heart,           // why nutrition matters
  7: POOL.plate,           // key nutrients
  8: POOL.salad,           // balanced diet
  9: POOL.warning,         // dangers
  10: POOL.label,          // labels
  11: POOL.label,          // DV table
  12: POOL.calc,           // calc card
  13: POOL.calc,           // calc pair 1
  14: POOL.calc,           // calc pair 2
  15: POOL.calc,           // calc pair 3
  16: POOL.calc,           // macro break
  17: POOL.market,         // compare foods
  18: POOL.label,          // thresholds
  19: POOL.label,          // important label
  20: POOL.label,          // look-for
  21: POOL.smoothie,       // formula
  22: POOL.cooking,        // healthy eating tips
  23: POOL.grains,         // better carbs
  24: POOL.bread,          // less carbs
  25: POOL.avocado,        // better fats
  26: POOL.warning,        // less fats
  27: POOL.salmon,         // better protein
  28: POOL.warning,        // less protein
  29: POOL.greens,         // better veg
  30: POOL.vegetablesMix,  // less veg
  31: POOL.water,          // small changes
  32: POOL.heart,          // responsibility
  33: POOL.berries,        // fruit cal 1
  34: POOL.fruits,         // fruit cal 2
  35: POOL.greens,         // veg cal 1
  36: POOL.vegetablesMix,  // veg cal 2
  37: POOL.chicken,        // protein cal 1
  38: POOL.salmon,         // protein cal 2
  39: POOL.nuts,           // protein cal 3
  40: POOL.grains,         // carb cal 1
  41: POOL.fruits,         // carb cal 2
  42: POOL.warning,        // carb cal 3
  43: POOL.oil,            // fat cal 1
  44: POOL.avocado,        // fat cal 2
  45: POOL.vitamins,       // micros intro
  46: POOL.vitamins,       // vitamins-split 1
  47: POOL.vitamins,       // vitamins-split 2
  48: POOL.greens,         // vitamin cards 1
  49: POOL.citrus,         // vitamin cards 2
  50: POOL.plate,          // macros overview
  51: POOL.grains,         // good carbs
  52: POOL.chicken,        // good protein
  53: POOL.avocado,        // good fats
  54: POOL.plate,          // balanced plate
  55: POOL.heart,          // conclusion
};

export function imageFor(index: number): string {
  return BY_INDEX[index] ?? POOL.plate;
}
