import coachPortrait from "../assets/kerry-ann-walker.jpeg";
import tocFood from "../assets/toc-food.jpg";
import coachDoes from "../assets/coach-does.jpg";
import coachDoesNew from "../assets/coach-does-new.jpg";
import balancedDiet from "../assets/balanced-diet.jpg";
import balancedPlate from "../assets/balanced-plate.jpg";
import betterCarbs from "../assets/better-carbs.jpg";
import betterProtein from "../assets/better-protein.jpg";
import betterVegetables from "../assets/better-vegetables.jpg";
import calcPart3 from "../assets/calc-part3.jpg";
import carbsCaloriesSweets from "../assets/carbs-calories-sweets.jpg";
import lessIdealProtein from "../assets/less-ideal-protein.jpg";
import lessIdealVegetables from "../assets/less-ideal-vegetables.jpg";
import fruitCalories from "../assets/fruit-calories.jpg";
import macroTraceMinerals from "../assets/macro-trace-minerals.jpg";
import nutritionLabel1st from "../assets/nutrition-label-1st.jpeg";
import nutritionLabel2nd from "../assets/nutrition-label-2nd.jpeg";
import healthyPlate from "../assets/healthy-plate.jpeg";
import healthyFats from "../assets/healthy-fats.jpg";
import broccoliCheese from "../assets/broccoli-cheese.jpg";
import proteinNew from "../assets/protein-new.jpeg";
import carbsNew from "../assets/carbs-new.webp";
import carbs1 from "../assets/carbs-1.jpg";
import fatCalorie from "../assets/fat-calorie-new.jpg";
import mineralsNew from "../assets/minerals-new.webp";
import supplementsNew from "../assets/supplements-new.jpg";
import combinedMacrosNew from "../assets/combined-macros-new.jpg";
import carbs2 from "../assets/carbs-2-new.jpg";
import healthyImageNew from "../assets/healthy-image-new.jpg";
import fatCalories2 from "../assets/fat-calories-2.jpg";
import smartShopping from "../assets/smart-shopping.webp";
import fishAndMilk from "../assets/fish-and-milk.jpg";
import balancedPlateNew from "../assets/balanced-plate-new.jpg";

// Premium curated Unsplash photo IDs that map uniquely to slide topics.
// Returned as full URLs at a sensible size with absolutely no duplicates.

const U = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

const IMAGES: Record<number, string> = {
  // Ch 1: The Coach & The Mission
  0: U("photo-1546069901-ba9599a7e63c"), // Cover (gorgeous fresh healthy salad bowl)
  1: U("photo-1498837167922-ddd27525d352"), // Intro (organic ingredients and fresh produce)
  2: tocFood, // TOC (premium wellness ingredients)
  3: coachPortrait, // Meet Your Coach (real photo of Coach Kerry)

  // Ch 2: Foundations of Good Nutrition
  4: coachDoesNew, // What a Nutrition Coach Does (meal planning - client-provided)
  5: U("photo-1512621776951-a57141f2eefd"), // What Is Good Nutrition? (vibrant colorful salad greens bowl)
  6: U("photo-1490645935967-10de6ba17061"), // Why Nutrition Is Important (healthy foods & lifestyle - no smoothie focus)
  7: macroTraceMinerals, // Key Nutrients Your Body Needs (reused beef, greens, nuts flatlay - client-provided)
  8: balancedDiet, // What Is a Balanced Diet? (Canada Food Guide plate with labels - client-provided)
  9: U("photo-1561758033-d89a9ad46330"), // The Dangers of Poor Nutrition (highly processed fast-food burger/fries)

  // Ch 3: Reading Nutrition Labels & Calculations
  10: nutritionLabel1st, // Understanding Nutrition Labels — 1st nutrition label (client-provided)
  11: U("photo-1606787366850-de6330128bfc"), // How % Daily Value Is Calculated (focused nutrition label close-up)
  12: U("photo-1554224155-6726b3ff858f"), // Nutrition Label Calculation (worked example with stylish clipboard)
  13: U("photo-1434030216411-0b793f4b4173"), // Calc pair 1
  14: U("photo-1454165804606-c3d57bc86b40"), // Calc pair 2
  15: calcPart3, // Calc pair 3 — Coach Kerry portrait (head fix via object-top)
  16: U("photo-1511690656952-34342bb7c2f2"), // Macro breakdown
  17: nutritionLabel2nd, // Comparing Foods — 2nd nutrition label (client-provided)
  18: U("photo-1505576399279-565b52d4ac71"), // Evaluate Nutrition Labels Quickly (old slide-11 image — reading label on bottle)
  19: U("photo-1490474418585-ba9bad8fd0ea"), // Important label thresholds (two contrasting breakfast bowls)
  20: smartShopping, // Key Indicators for Smart Shopping — healthy plate (client-provided)
  21: coachDoes, // Simple Formula (smart kitchen scale & food tracker tablet - client-provided)

  // Ch 4: Better vs Less-Ideal Choices
  22: U("photo-1504754524776-8f4f37790ca0"), // Healthy Eating Tips (healthy meal prep container - unique)
  23: betterCarbs, // Better Carb Choices (oats, brown rice, quinoa bowls - client-provided)
  24: U("photo-1509440159596-0249088772ff"), // Less-Ideal Carb Choices (refined white bread, sugary croissants)
  25: healthyFats, // Better Fat Choices — healthy fats image (client-provided)
  26: U("photo-1534422298391-e4f8c172dddb"), // Less-Ideal Fat Choices (deep-fried greasy french fries/tempura)
  27: betterProtein, // Better Protein Choices (salmon with asparagus/quinoa - client-provided)
  28: lessIdealProtein, // Less-Ideal Protein Choices (sausages/cured meats on board - client-provided)
  29: betterVegetables, // Better Vegetable Choices (fresh colorful salad bowl - client-provided)
  30: broccoliCheese, // Less-Ideal Vegetable Choices — broccoli in cheese sauce (client-provided)
  31: U("photo-1602143407151-7111542de6e8"), // Small Changes Matter (premium reusable water bottle)
  32: healthyImageNew, // Your Health Is Your Responsibility (attractive healthy food image - client-provided)

  // Ch 5: Calorie Reference Guide
  33: fruitCalories, // Fruit Calories Low (mixed berries bowl - client-provided)
  34: U("photo-1610832958506-aa56368176cf"), // Fruit Calories Moderate (sliced oranges, kiwis, mangoes)
  35: U("photo-1540420773420-3366772f4999"), // Vegetable Calories Low (fresh vegetable assortment)
  36: U("photo-1597362925123-77861d3fbac7"), // Vegetable Calories Starchy (celery, zucchini, carrots, potatoes)
  37: proteinNew, // Protein Calories Lean (lean grilled chicken breast sliced - client-provided)
  38: fishAndMilk, // Protein Calories Fish/Dairy (fish & milk - client-provided)
  39: U("photo-1604908176997-125f25cc6f3d"), // Protein Calories Plant/Nuts (organic pumpkin seeds, almonds, walnuts)
  40: carbsNew, // Carbohydrate Calories Grains (baked sweet potatoes - client-provided)
  41: carbs1, // Carbohydrate Calories Legumes/Fruits (appropriate carbs 1 - client-provided)
  42: carbsCaloriesSweets, // Carbohydrate Calories Sweets (soda glass with sugar - client-provided)
  43: fatCalorie, // Fat Calories Oils (avocado, olive oil, almonds - client-provided)
  44: fatCalories2, // Fat Calories Seeds, Avocado & Fatty Meats (client-provided)

  // Ch 6: Micronutrients & Vitamins
  45: U("photo-1584017911766-d451b3d0e843"), // What Are Micronutrients? (vibrant fresh vegetables and lemons)
  46: U("photo-1584308666744-24d5c474f2ae"), // Water- and Fat-Soluble Vitamins (vitamins & supplements)
  47: mineralsNew, // Macro and Trace Minerals (minerals image - client-provided)
  48: supplementsNew, // Vitamins for Ongoing Health (supplements image - client-provided)
  49: U("photo-1471864190281-a93a3070b6de"), // Essential Daily Vitamins (supplement capsules/wellness)

  // Ch 7: Macros, Good Foods & The Plate
  50: combinedMacrosNew, // Macronutrients Overview (combined protein, carbohydrates, and fats - client-provided)
  51: carbs2, // Good Carbohydrates (carbohydrates 2 image - client-provided)
  52: U("photo-1506976785307-8732e854ad03"), // Good Protein (healthy organic free-range eggs in a bowl)
  53: U("photo-1519708227418-c8fd9a32b7a2"), // Good Fats (healthy salmon dish - unique)
  54: balancedPlateNew, // A Balanced Plate (plate split into 50% veg, 25% protein, 25% carb - client-provided)
  55: U("photo-1506126613408-eca07ce68773"), // Conclusion (stunning sunset celebration of healthy life)
};

export function imageFor(index: number): string {
  return IMAGES[index] ?? IMAGES[0];
}
