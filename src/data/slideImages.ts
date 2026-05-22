// Premium curated Unsplash photo IDs that map uniquely to slide topics.
// Returned as full URLs at a sensible size with absolutely no duplicates.

const U = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

const IMAGES: Record<number, string> = {
  // Ch 1: The Coach & The Mission
  0: U("photo-1546069901-ba9599a7e63c"), // Cover (gorgeous fresh healthy salad bowl)
  1: U("photo-1498837167922-ddd27525d352"), // Intro (organic ingredients and fresh produce)
  2: U("photo-1543362906-acfc16c67564"), // TOC (healthy meal preparation)
  3: U("photo-1571019613454-1cb2f99b2d8b"), // Meet Your Coach (professional wellness coach consulting)

  // Ch 2: Foundations of Good Nutrition
  4: U("photo-1506084868230-bb9d95c24759"), // What a Nutrition Coach Does (premium coaching & fresh ingredients)
  5: U("photo-1512621776951-a57141f2eefd"), // What Is Good Nutrition? (vibrant colorful salad greens bowl)
  6: U("photo-1505252585461-04db1eb84625"), // Why Nutrition Is Important (hands holding fresh wholesome figs/berries)
  7: U("photo-1543339308-43e59d6b73a6"), // Key Nutrients Your Body Needs (salmon, eggs, avocado, greens array)
  8: U("photo-1490645935967-10de6ba17061"), // What Is a Balanced Diet? (beautiful balanced meal)
  9: U("photo-1561758033-d89a9ad46330"), // The Dangers of Poor Nutrition (highly processed fast-food burger/fries)

  // Ch 3: Reading Nutrition Labels & Calculations
  10: U("photo-1505576399279-565b52d4ac71"), // Understanding Nutrition Labels (reading a clean glass bottle package)
  11: U("photo-1606787366850-de6330128bfc"), // How % Daily Value Is Calculated (focused nutrition label close-up)
  12: U("photo-1554224155-6726b3ff858f"), // Nutrition Label Calculation (worked example with stylish clipboard)
  13: U("photo-1434030216411-0b793f4b4173"), // Calc pair 1 (writing calculations/assessing nutrition details)
  14: U("photo-1454165804606-c3d57bc86b40"), // Calc pair 2 (analyzing food values sheets)
  15: U("photo-1551836022-d5d88e9218df"), // Calc pair 3 (explaining calculations professionally)
  16: U("photo-1511690656952-34342bb7c2f2"), // Macro breakdown (top-down view of partitioned clean meal prep)
  17: U("photo-1490474418585-ba9bad8fd0ea"), // Comparing foods (two contrasting breakfast bowls)
  18: U("photo-1542838132-92c53300491e"), // Evaluating nutrition labels (scanning packaging)
  19: U("photo-1505751172876-fa1923c5c528"), // Important label thresholds (assessing boxes in kitchen)
  20: U("photo-1540420773420-3366772f4999"), // Red flags & What to look for (fresh green whole produce)
  21: U("photo-1502740479091-635887520276"), // Simple Formula (measuring fresh organic ingredients on a scale)

  // Ch 4: Better vs Less-Ideal Choices
  22: U("photo-1556909114-f6e7ad7d3136"), // Healthy Eating Tips (person cooking fresh vegetable stir-fry)
  23: U("photo-1551028150-64b9f398f678"), // Better Carb Choices (oats, quinoa, brown rice in glass jars)
  24: U("photo-1509440159596-0249088772ff"), // Less-Ideal Carb Choices (refined white bread, sugary croissants)
  25: U("photo-1601493700631-2b16ec4b4716"), // Better Fat Choices (fresh cut avocados, olive oil, almonds)
  26: U("photo-1534422298391-e4f8c172dddb"), // Less-Ideal Fat Choices (deep-fried greasy french fries/tempura)
  27: U("photo-1467003909585-2f8a72700288"), // Better Protein Choices (fresh grilled salmon fillet with asparagus)
  28: U("photo-1555939594-58d7cb561ad1"), // Less-Ideal Protein Choices (processed hot dogs, deli meats, sausage)
  29: U("photo-1576045057995-568f588f82fb"), // Better Vegetable Choices (dark leafy greens, broccoli, spinach)
  30: U("photo-1549590143-d5855148a9d5"), // Less-Ideal Vegetable Choices (greasy tempura vegetables, creamed sauced veg)
  31: U("photo-1523362628745-0c100150b504"), // Small Changes Matter (refreshing ice water infused with citrus)
  32: U("photo-1476480862126-209bfaa8edc8"), // Your Health Is Your Responsibility (active group hiking/exercising outdoors)

  // Ch 5: Calorie Reference Guide
  33: U("photo-1488477181946-6428a0291777"), // Fruit Calories Low (strawberries, blueberries, berries mix)
  34: U("photo-1610832958506-aa56368176cf"), // Fruit Calories Moderate (sliced oranges, kiwis, mangoes)
  35: U("photo-1617040619263-41c5a9ca7521"), // Vegetable Calories Low (cucumber, broccoli, peppers - strictly vegetables, no fruits)
  36: U("photo-1597362925123-77861d3fbac7"), // Vegetable Calories Starchy (celery, zucchini, carrots, potatoes)
  37: U("photo-1604503468506-a8da13d82791"), // Protein Calories Lean (lean grilled chicken breast sliced)
  38: U("photo-1551024601-bec78aea704b"), // Protein Calories Fish/Dairy (greek yogurt bowl with honey and almonds)
  39: U("photo-1604908176997-125f25cc6f3d"), // Protein Calories Plant/Nuts (organic pumpkin seeds, almonds, walnuts)
  40: U("photo-1586444248902-2f64eddc13df"), // Carbohydrate Calories Grains (brown rice, whole grains, oatmeal)
  41: U("photo-1551183053-bf91a1d81141"), // Carbohydrate Calories Legumes/Fruits (lentils, sweet potatoes)
  42: U("photo-1513558161293-cdaf765ed2fd"), // Carbohydrate Calories Sweets (sweet sugary carbonated soda with ice)
  43: U("photo-1474979266404-7eaacbcd87c5"), // Fat Calories Oils (extra virgin olive oil bottle being poured)
  44: U("photo-1599599810769-bcde5a160d32"), // Fat Calories Avocado/Meats (fresh avocado halves, nuts)

  // Ch 6: Micronutrients & Vitamins
  45: U("photo-1584017911766-d451b3d0e843"), // What Are Micronutrients? (vibrant fresh vegetables and lemons)
  46: U("photo-1547514701-42782101795e"), // Water- and Fat-Soluble Vitamins (assorted citrus fruits and avocados)
  47: U("photo-1464454709131-ffd692591ee5"), // Macro and Trace Minerals (mineral-rich foods like nuts, spinach, seeds)
  48: U("photo-1535498730771-e735b998cd64"), // Vitamins for Ongoing Health (leafy spinach greens, sweet potato, salmon)
  49: U("photo-1615485290382-441e4d049cb5"), // Essential Daily Vitamins (strawberries, citrus, broccoli)

  // Ch 7: Macros, Good Foods & The Plate
  50: U("photo-1540189549336-e6e99c3679fe"), // Macronutrients Overview (protein, carbs, fats together in one meal)
  51: U("photo-1542990253-0d0f5be5f0ed"), // Good Carbohydrates (sweet potatoes, whole grains, oats)
  52: U("photo-1506976785307-8732e854ad03"), // Good Protein (healthy organic free-range eggs in a bowl)
  53: U("photo-1523049673857-eb18f1d7b578"), // Good Fats (chia seeds, flaxseeds, healthy plant oils)
  54: U("photo-1551248429-40975aa4de74"), // A Balanced Plate (gorgeous visual balanced portion bowl, 50% greens, 25% protein, 25% grains)
  55: U("photo-1506126613408-eca07ce68773"), // Conclusion (stunning sunset celebration of healthy life)
};

export function imageFor(index: number): string {
  return IMAGES[index] ?? IMAGES[0];
}
