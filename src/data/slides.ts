export type Slide = (
  | { kind: "cover"; title: string; subtitle: string; tagline: string; contact: { phone: string; email: string; site: string } }
  | { kind: "intro"; eyebrow: string; title: string; lead: string; quote: string; body: string }
  | { kind: "toc"; title: string; items: { n: string; label: string }[] }
  | { kind: "coach-profile"; title: string; name: string; role: string; body: string[] }
  | { kind: "definition"; eyebrow: string; title: string; body: string[]; quote?: string }
  | { kind: "bullets"; eyebrow?: string; title: string; lead?: string; bullets: string[]; quote?: string }
  | { kind: "nutrients"; title: string; items: { icon: string; name: string; desc: string; color: "orange" | "green" }[] }
  | { kind: "balanced"; title: string; lead: string; items: string[]; tag: string }
  | { kind: "dangers"; eyebrow?: string; title: string; lead: string; items: string[]; quote: string }
  | { kind: "label"; title: string; lead: string; items: string[]; note: string }
  | { kind: "dv-table"; title: string; intro: string; formula: string; rows: { name: string; value: string }[]; foot: string }
  | { kind: "calc-card"; title: string; food: { label: string; value: string }[]; formula: string; steps: string[]; total: string; rounded?: string }
  | { kind: "calc-pair"; title: string; pairs: { name: string; dv: string; calc: string; result: string }[] }
  | { kind: "macro-break"; title: string; macros: { name: string; g: string }[]; dv: { name: string; pct: string }[]; example: { name: string; calc: string }[]; foot: string }
  | { kind: "compare-foods"; title: string; lead: string; items: { n: number; name: string; rule: string; desc: string }[] }
  | { kind: "thresholds"; title: string; high: { label: string; verdict: "good" | "limit" }[]; low: { label: string; verdict: "good" | "bad" }[] }
  | { kind: "look-for"; title: string; good: string[]; red: string[] }
  | { kind: "formula"; title: string; lead: string; formula: string; example: { food: string; per100: string; eat: string; calc: string; result: string } }
  | { kind: "choices"; title: string; eyebrow: string; tone: "better" | "less"; items: string[] }
  | { kind: "veg-groups"; title: string; nonStarchy: string[]; starchy: string[] }
  | { kind: "small-changes"; title: string; lead: string; items: string[]; quote: string }
  | { kind: "responsibility"; title: string; body: string }
  | { kind: "cal-list"; title: string; eyebrow?: string; groups: { name: string; tone: "low" | "mid" | "high"; items: { f: string; c: string }[] }[] }
  | { kind: "micros-intro"; title: string; body: string; supports: string[] }
  | { kind: "vitamins-split"; title: string; water: { name: string; note: string; items: string[] }; fat: { name: string; note: string; items: string[] } }
  | { kind: "vitamin-cards"; title: string; lead?: string; items: { name: string; desc: string; sources: string }[]; pattern?: string[] }
  | { kind: "macros-overview"; title: string; items: { n: string; name: string; desc: string; examples: string; color: "orange" | "green" }[] }
  | { kind: "balanced-plate"; title: string; lead: string; portions: { pct: string; label: string; desc: string; color: "green" | "orange" | "cream" | "amber" }[]; hands: { label: string; portion: string }[] }
  | { kind: "conclusion"; title: string; body: string; quote: string; contact: { phone: string; email: string; site: string } }
) & { imageIndex: number };

export const slides: Slide[] = [
  // --- Chapter 1: The Coach & The Mission ---
  {
    kind: "cover",
    imageIndex: 0,
    title: "Kerry's Table",
    subtitle: "Nutrition Coaching",
    tagline: "Real Food. Real Results. Real You.",
    contact: { phone: "954-496-4142", email: "kerrystablenutrition@gmail.com", site: "www.kerrystable.com" },
  },
  {
    kind: "intro",
    imageIndex: 1,
    eyebrow: "Chapter 01",
    title: "Good Nutrition & Its Importance for a Healthy Life",
    lead: "Good Nutrition = Good Health.",
    quote: "We are what we eat.",
    body: "Welcome, and thank you for being here. Today we explore how nutrition shapes the way we feel, function, and live every single day — because what we feed our bodies internally is reflected in our external health.",
  },
  {
    kind: "coach-profile",
    imageIndex: 3,
    title: "Meet Your Coach",
    name: "Kerry-Ann Walker",
    role: "Founder of Kerry’s Table and Kerry’s Nutrition",
    body: [
      "I am a passionate and dedicated Nutrition Coach with a strong love for food, nutrition, cooking, and healthy living.",
      "I am committed to helping individuals and families create healthier lifestyles through balanced nutrition, mindful eating and sustainable wellness habits to flourish from the inside out with confidence.",
      "Lastly, Through Kerry’s Table and Kerry’s Nutrition, my mission is rooted in simplicity, consistency and wellness that supports both physical and emotional wellbeing.",
    ],
  },
  {
    kind: "toc",
    imageIndex: 2,
    title: "Table of Contents",
    items: [
      { n: "01", label: "The Role of a Nutrition Coach" },
      { n: "02", label: "Foundations of Good Nutrition" },
      { n: "03", label: "Key Nutrients & A Balanced Diet" },
      { n: "04", label: "Reading Nutrition Labels" },
      { n: "05", label: "%DV — Daily Values Decoded" },
      { n: "06", label: "Better vs Less-Ideal Choices" },
      { n: "07", label: "Calorie Reference Guide" },
      { n: "08", label: "Micronutrients & Vitamins" },
      { n: "09", label: "Macros, Good Foods & The Plate" },
      { n: "10", label: "Your Health, Your Responsibility" },
    ],
  },

  // --- Chapter 2: The Role of a Nutrition Coach ---
  {
    kind: "definition",
    imageIndex: 4,
    eyebrow: "Chapter 02 · The Coach",
    title: "What a Nutrition Coach Does",
    body: [
      "A Nutrition Coach assesses a client's current habits and needs, then designs meal plans and recommendations that bridge where they are with where they want to be.",
      "Coaching is a collaborative process — together, coach and client identify outcomes, build strategies, and overcome obstacles. It changes not only behaviors, but mindsets.",
      "Coaches specialize in food-related guidance: meal planning, grocery shopping, cooking, eating behaviors, vitamins, and special diets.",
    ],
  },

  // --- Chapter 3: Foundations of Good Nutrition ---
  {
    kind: "definition",
    imageIndex: 5,
    eyebrow: "Chapter 03 · Foundations",
    title: "What Is Good Nutrition?",
    body: [
      "Good nutrition means giving your body the right balance of nutrients it needs to function properly — proteins, carbohydrates, fats, vitamins, minerals, and water.",
    ],
    quote: "Food is not just something we eat — it is fuel for our body.",
  },
  {
    kind: "bullets",
    imageIndex: 6,
    eyebrow: "Chapter 03 · Why It Matters",
    title: "Why Nutrition Is Important",
    lead: "Good nutrition helps you to:",
    bullets: [
      "Maintain a healthy weight",
      "Improve energy levels",
      "Support brain function",
      "Strengthen the immune system",
      "Reduce risk of diabetes, heart disease & obesity",
    ],
    quote: "What we eat today affects how we feel tomorrow.",
  },
  {
    kind: "dangers",
    imageIndex: 9,
    eyebrow: "Chapter 03 · The Risks",
    title: "The Dangers of Poor Nutrition",
    lead: "Poor eating habits can lead to:",
    items: ["Weight gain or obesity", "Low energy", "High blood pressure", "Diabetes", "Heart disease"],
    quote: "Many of these conditions can be prevented with better food choices.",
  },

  // --- Chapter 4: Key Nutrients & A Balanced Diet ---
  {
    kind: "nutrients",
    imageIndex: 7,
    title: "Key Nutrients Your Body Needs",
    items: [
      { icon: "photo-1574316071802-0d684efa7bf5", name: "Carbohydrates", desc: "Your primary source of energy", color: "orange" },
      { icon: "photo-1467003909585-2f8a72700288", name: "Protein", desc: "Muscle repair and growth", color: "green" },
      { icon: "photo-1523049673857-eb18f1d7b578", name: "Healthy Fats", desc: "Brain & hormone function", color: "orange" },
      { icon: "photo-1576045057995-568f588f82fb", name: "Vitamins & Minerals", desc: "Overall health & immunity", color: "green" },
      { icon: "photo-1548839140-29a888b159bc", name: "Water", desc: "Hydration & digestion", color: "orange" },
    ],
  },
  {
    kind: "balanced",
    imageIndex: 8,
    title: "What Is a Balanced Diet?",
    lead: "A balanced diet includes a variety of foods:",
    items: ["Fruits & vegetables", "Whole grains", "Lean proteins", "Healthy fats"],
    tag: "The goal is balance — not perfection.",
  },

  // --- Chapter 5: Reading Nutrition Labels ---
  {
    kind: "label",
    imageIndex: 10,
    title: "Understanding Nutrition Labels",
    lead: "Nutrition labels help us understand what's in our food. Key things to check:",
    items: ["Serving size", "Calories", "Sugars — especially added sugars", "Fat and sodium", "% Daily Value"],
    note: "This helps you make smarter choices.",
  },
  {
    kind: "compare-foods",
    imageIndex: 17,
    title: "When Comparing Two Foods, Look At:",
    lead: "Six quick checks that separate a great choice from a mediocre one.",
    items: [
      { n: 1, name: "Fiber", rule: "Higher = better", desc: "Slows digestion, stabilizes blood sugar, increases fullness." },
      { n: 2, name: "Added Sugar", rule: "Lower = better", desc: "Aim for under 10% DV per serving." },
      { n: 3, name: "Sodium", rule: "Lower = better", desc: "Especially important for packaged foods." },
      { n: 4, name: "Protein", rule: "Higher = better", desc: "Supports fullness and blood-sugar control." },
      { n: 5, name: "Calories", rule: "Context matters", desc: "Compare snacks vs. meals." },
      { n: 6, name: "Ingredients", rule: "Shorter = better", desc: "Look for whole foods at the top." },
    ],
  },
  {
    kind: "thresholds",
    imageIndex: 18,
    title: "How to Evaluate Nutrition Labels Quickly",
    high: [
      { label: "Fiber", verdict: "good" },
      { label: "Protein", verdict: "good" },
      { label: "Vitamins / Minerals", verdict: "good" },
      { label: "Sodium (High sodium is not ideal)", verdict: "limit" },
      { label: "Added Sugar (High sugar is not ideal)", verdict: "limit" },
      { label: "Saturated Fat (High saturated fat is not ideal)", verdict: "limit" },
    ],
    low: [
      { label: "Sodium", verdict: "good" },
      { label: "Added Sugar", verdict: "good" },
      { label: "Saturated Fat", verdict: "good" },
      { label: "Fiber (Low fiber is not ideal)", verdict: "bad" },
      { label: "Protein (Low protein is not filling)", verdict: "bad" },
    ],
  },
  {
    kind: "look-for",
    imageIndex: 20,
    title: "Key Indicators for Smart Shopping",
    good: [
      "Fiber: 10%+ is good, 20%+ is excellent",
      "Added sugar: under 10% per serving",
      "Sodium: under 10% per serving",
      "Protein: 10–20% is solid",
      "Ingredients: short list, whole foods first",
    ],
    red: [
      "Added sugar in the first 3 ingredients",
      "Sodium above 20% per serving",
      "Trans fats",
      "Long ingredient lists with chemicals",
      '"Fruit-flavored" instead of real fruit',
    ],
  },

  // --- Chapter 6: %DV — Daily Values Decoded ---
  {
    kind: "dv-table",
    imageIndex: 11,
    title: "How % Daily Value Is Calculated",
    intro: "Every %DV is based on a standard reference set by the FDA, based on a 2,000-calorie diet.",
    formula: "%DV = (Amount in food ÷ Daily Value reference) × 100",
    rows: [
      { name: "Carbs", value: "275 g" },
      { name: "Fiber", value: "28 g" },
      { name: "Added Sugar", value: "50 g" },
      { name: "Sodium", value: "2,300 mg" },
      { name: "Protein", value: "50 g" },
      { name: "Total Fat", value: "78 g" },
      { name: "Saturated Fat", value: "20 g" },
      { name: "Cholesterol", value: "300 mg" },
    ],
    foot: "These are the standard values used on all U.S. nutrition labels.",
  },
  {
    kind: "calc-card",
    imageIndex: 12,
    title: "Nutrition Label Calculation",
    food: [
      { label: "Carbs", value: "32 g" },
      { label: "Protein", value: "4 g" },
      { label: "Fat", value: "7 g" },
      { label: "Fiber", value: "3 g" },
      { label: "Added Sugar", value: "12 g" },
      { label: "Sodium", value: "450 mg" },
      { label: "Saturated Fat", value: "1 g" },
      { label: "Cholesterol", value: "30 mg" },
    ],
    formula: "Carbs × 4 + Protein × 4 + Fat × 9",
    steps: ["Carbs: 32 × 4 = 128", "Protein: 4 × 4 = 16", "Fat: 7 × 9 = 63"],
    total: "128 + 16 + 63 = 207 calories",
    rounded: "Rounded on a label → 210 calories",
  },
  {
    kind: "calc-pair",
    imageIndex: 13,
    title: "Nutrition Label Calculations: Part 1",
    pairs: [
      { name: "Carbs", dv: "275 g", calc: "32 ÷ 275 × 100 = 11.6%", result: "12% DV" },
      { name: "Fiber", dv: "28 g", calc: "3 ÷ 28 × 100 = 10.7%", result: "11% DV" },
    ],
  },
  {
    kind: "calc-pair",
    imageIndex: 14,
    title: "Nutrition Label Calculations: Part 2",
    pairs: [
      { name: "Added Sugar", dv: "50 g", calc: "12 ÷ 50 × 100", result: "24% DV" },
      { name: "Sodium", dv: "2,300 mg", calc: "450 ÷ 2,300 × 100 = 19.5%", result: "20% DV" },
    ],
  },
  {
    kind: "calc-pair",
    imageIndex: 15,
    title: "Nutrition Label Calculations: Part 3",
    pairs: [
      { name: "Protein", dv: "50 g", calc: "4 ÷ 50 × 100", result: "8% DV" },
      { name: "Total Fat", dv: "78 g", calc: "7 ÷ 78 × 100 = 8.97%", result: "9% DV" },
      { name: "Saturated Fat", dv: "20 g", calc: "1 ÷ 20 × 100", result: "5% DV" },
      { name: "Cholesterol", dv: "300 mg", calc: "30 ÷ 300 × 100", result: "10% DV" },
    ],
  },
  {
    kind: "macro-break",
    imageIndex: 16,
    title: "Nutrition Facts Breakdown — Macros",
    macros: [
      { name: "Carbs", g: "28 g" },
      { name: "Protein", g: "6 g" },
      { name: "Fat", g: "4 g" },
      { name: "Fiber", g: "5 g" },
      { name: "Added Sugar", g: "8 g" },
      { name: "Sodium", g: "300 mg" },
    ],
    dv: [
      { name: "Carbs", pct: "10%" },
      { name: "Fiber", pct: "18%" },
      { name: "Added Sugar", pct: "16%" },
      { name: "Sodium", pct: "13%" },
    ],
    example: [
      { name: "Carbs", calc: "28 ÷ 275 = 10%" },
      { name: "Fiber", calc: "5 ÷ 28 = 18%" },
      { name: "Added Sugar", calc: "8 ÷ 50 = 16%" },
      { name: "Sodium", calc: "300 ÷ 2,300 = 13%" },
    ],
    foot: "Total Calories: 172 → 170 calories. This is exactly how nutrition labels calculate %DV.",
  },
  {
    kind: "formula",
    imageIndex: 21,
    title: "Simple Formula for Nutrition Calculations",
    lead: "When calculating nutrition for meals, use this simple formula.",
    formula: "(Nutrient per 100 g ÷ 100) × grams consumed",
    example: {
      food: "Banana",
      per100: "100 g banana = 89 calories",
      eat: "You eat = 50 g",
      calc: "(89 ÷ 100) × 50 = 0.89 × 50",
      result: "44.5 calories",
    },
  },

  // --- Chapter 7: Better vs Less-Ideal Choices ---
  {
    kind: "bullets",
    imageIndex: 22,
    eyebrow: "Healthy Eating",
    title: "Healthy Eating Tips",
    lead: "Here are simple ways to improve your diet:",
    bullets: [
      "Eat more whole foods",
      "Reduce added sugars",
      "Drink more water",
      "Cook more meals at home",
      "Read nutrition labels",
    ],
  },
  {
    kind: "choices",
    imageIndex: 23,
    title: "Better Carb Choices",
    eyebrow: "Carbohydrates",
    tone: "better",
    items: [
      "Oats", "Quinoa", "Brown rice", "Sweet potatoes",
      "Beans & lentils", "Chickpeas", "Whole-grain bread", "Whole-grain pasta",
      "Barley", "Farro", "Bulgur", "Berries, apples, pears, oranges",
      "All non-starchy vegetables", "Corn", "Peas",
    ],
  },
  {
    kind: "choices",
    imageIndex: 24,
    title: "Less-Ideal Carb Choices",
    eyebrow: "Carbohydrates",
    tone: "less",
    items: [
      "White bread", "White pasta", "White rice (lower fiber)",
      "Pastries", "Cakes, cookies", "Sugary cereals",
      "Candy", "Soda", "Juice with added sugar",
      "Sweetened yogurt", "Granola bars with added sugar", "Chips", "Crackers (refined flour)",
    ],
  },
  {
    kind: "choices",
    imageIndex: 25,
    title: "Better Fat Choices",
    eyebrow: "Fats — Heart-Healthy",
    tone: "better",
    items: [
      "Avocado", "Olive oil", "Avocado oil",
      "Almonds, walnuts, cashews, pistachios",
      "Chia, flax, hemp, pumpkin, sunflower seeds",
      "Natural nut butters", "Salmon, sardines, mackerel",
      "Olives", "Coconut (in moderation)",
    ],
  },
  {
    kind: "choices",
    imageIndex: 26,
    title: "Less-Ideal Fat Choices",
    eyebrow: "Fats — Inflammatory",
    tone: "less",
    items: [
      "Trans fats (partially hydrogenated oils)",
      "Vegetable shortening", "Deep-fried foods", "Fast-food fries",
      "Older margarine", "Highly processed snacks",
      "Excess bacon / sausage", "Processed meats",
      "Cheap vegetable oils used in frying",
    ],
  },
  {
    kind: "choices",
    imageIndex: 27,
    title: "Better Protein Choices",
    eyebrow: "Protein — Lean & Nutrient-Dense",
    tone: "better",
    items: [
      "Chicken breast", "Turkey", "Salmon", "Tuna", "Sardines",
      "Eggs", "Greek yogurt", "Cottage cheese",
      "Tofu", "Tempeh", "Lentils", "Beans", "Chickpeas", "Edamame",
      "Lean beef (sirloin, tenderloin)", "Protein powders (whey, pea, soy)",
    ],
  },
  {
    kind: "choices",
    imageIndex: 28,
    title: "Less-Ideal Protein Choices",
    eyebrow: "Protein — Processed",
    tone: "less",
    items: [
      "Hot dogs", "Sausages", "Bacon", "Deli meats",
      "Breaded / fried chicken", "Processed frozen meats",
      "High-fat beef cuts (occasionally fine)",
      "Protein bars with added sugar",
    ],
  },
  {
    kind: "veg-groups",
    imageIndex: 29,
    title: "Better Vegetable Choices",
    nonStarchy: [
      "Broccoli", "Spinach", "Kale", "Swiss chard", "Arugula", "Romaine",
      "Cabbage", "Cauliflower", "Brussels sprouts", "Zucchini", "Bell peppers",
      "Tomatoes", "Cucumbers", "Mushrooms", "Asparagus", "Green beans",
      "Eggplant", "Onions", "Garlic",
    ],
    starchy: ["Sweet potatoes", "Squash", "Pumpkin", "Beets", "Carrots", "Corn", "Peas"],
  },
  {
    kind: "choices",
    imageIndex: 30,
    title: "Less-Ideal Vegetable Choices",
    eyebrow: "Usually Due to Preparation",
    tone: "less",
    items: [
      "Vegetables fried in oil",
      "Creamed spinach",
      "Tempura vegetables",
      "Canned vegetables with added sodium",
      "Vegetables drenched in butter or cheese sauces",
      "Note: there are no 'bad' vegetables — only preparation.",
    ],
  },
  {
    kind: "small-changes",
    imageIndex: 31,
    title: "Small Changes Matter",
    lead: "You don't have to change everything overnight. Start small:",
    items: ["Swap soda for water", "Add more vegetables", "Reduce processed foods"],
    quote: "Small changes lead to big results.",
  },

  // --- Chapter 8: Calorie Reference Guide ---
  {
    kind: "cal-list",
    imageIndex: 33,
    title: "Fruit Calories",
    eyebrow: "Low to Moderate Volume",
    groups: [
      {
        name: "Low-calorie (under 60)", tone: "low",
        items: [
          { f: "Strawberries — 1 cup", c: "~50" }, { f: "Blueberries — ½ cup", c: "~42" },
          { f: "Raspberries — ½ cup", c: "~32" }, { f: "Blackberries — ½ cup", c: "~31" },
          { f: "Watermelon — 1 cup", c: "~46" }, { f: "Cantaloupe — 1 cup", c: "~53" },
          { f: "Peach — 1 medium", c: "~58" }, { f: "Plum — 1 medium", c: "~30" },
          { f: "Clementine — 1", c: "~35" }, { f: "Kiwi — 1", c: "~42" },
        ],
      },
      {
        name: "Moderate (60–100)", tone: "mid",
        items: [
          { f: "Apple — 1 medium", c: "~95" }, { f: "Orange — 1 medium", c: "~62" },
          { f: "Pear — 1 medium", c: "~100" }, { f: "Pineapple — 1 cup", c: "~82" },
          { f: "Mango — 1 cup", c: "~99" }, { f: "Papaya — 1 cup", c: "~55" },
          { f: "Guava — 1 fruit", c: "~68" },
        ],
      },
    ],
  },
  {
    kind: "cal-list",
    imageIndex: 34,
    title: "Fruit Calories",
    eyebrow: "Higher Calorie & Dried",
    groups: [
      {
        name: "Higher-calorie (100+)", tone: "high",
        items: [
          { f: "Banana — 1 medium", c: "~105" }, { f: "Avocado — 1 whole", c: "~240" },
          { f: "Pomegranate — 1 whole", c: "~234" }, { f: "Dates — 1 Medjool", c: "~66" },
          { f: "Plantain — 1 medium", c: "~220" },
        ],
      },
      {
        name: "Dried fruit (calorie-dense)", tone: "high",
        items: [
          { f: "Raisins — ¼ cup", c: "~108" }, { f: "Craisins — ¼ cup", c: "~123" },
          { f: "Dried apricots — ¼ cup", c: "~78" }, { f: "Dried figs — 2", c: "~90" },
        ],
      },
    ],
  },
  {
    kind: "cal-list",
    imageIndex: 35,
    title: "Vegetable Calories",
    eyebrow: "Volume Eating",
    groups: [
      {
        name: "Very low (5–25 cal)", tone: "low",
        items: [
          { f: "Spinach — 1 cup raw", c: "7" }, { f: "Lettuce — 1 cup", c: "5" },
          { f: "Cucumber — ½ cup", c: "8" }, { f: "Celery — 1 stalk", c: "10" },
          { f: "Zucchini — ½ cup", c: "10" }, { f: "Mushrooms — ½ cup", c: "8" },
          { f: "Radishes — ½ cup", c: "9" }, { f: "Cabbage — ½ cup", c: "11" },
          { f: "Bell peppers — ½ cup", c: "15" }, { f: "Tomatoes — ½ cup", c: "16" },
        ],
      },
      {
        name: "Low (25–50 cal)", tone: "mid",
        items: [
          { f: "Broccoli — ½ cup", c: "27" }, { f: "Cauliflower — ½ cup", c: "25" },
          { f: "Green beans — ½ cup", c: "31" }, { f: "Asparagus — 5 spears", c: "20" },
          { f: "Brussels sprouts — ½ cup", c: "28" }, { f: "Kale — 1 cup raw", c: "33" },
          { f: "Carrots — ½ cup", c: "25" }, { f: "Onions — ½ cup", c: "32" },
          { f: "Eggplant — ½ cup", c: "20" },
        ],
      },
    ],
  },
  {
    kind: "cal-list",
    imageIndex: 36,
    title: "Vegetable Calories",
    eyebrow: "Starchier & Prepared",
    groups: [
      {
        name: "Moderate (50–120 cal)", tone: "mid",
        items: [
          { f: "Corn — ½ cup", c: "66" }, { f: "Peas — ½ cup", c: "62" },
          { f: "Beets — ½ cup", c: "37" }, { f: "Butternut squash — ½ cup", c: "41" },
          { f: "Acorn squash — ½ cup", c: "56" }, { f: "Sweet potato — 1 med", c: "103" },
          { f: "White potato — 1 med", c: "110" }, { f: "Plantain — ½ cup", c: "90" },
        ],
      },
      {
        name: "Higher — due to preparation", tone: "high",
        items: [
          { f: "Fried vegetables — ½ cup", c: "150–250" },
          { f: "Tempura vegetables — ½ cup", c: "160–300" },
          { f: "Creamed spinach — ½ cup", c: "120–150" },
          { f: "Mashed potatoes w/ butter", c: "110–150" },
          { f: "Veg in cheese sauce — ½ cup", c: "100–180" },
        ],
      },
    ],
  },
  {
    kind: "cal-list",
    imageIndex: 37,
    title: "Protein Calories",
    eyebrow: "Animal Proteins",
    groups: [
      {
        name: "Lean animal proteins", tone: "low",
        items: [
          { f: "Chicken breast — 3 oz", c: "~140" }, { f: "Turkey breast — 3 oz", c: "~125" },
          { f: "Egg — 1 large", c: "~70" }, { f: "Egg whites — 3 tbsp", c: "~25" },
          { f: "Pork tenderloin — 3 oz", c: "~120" },
          { f: "Lean ground turkey — 3 oz", c: "~170" },
          { f: "Lean ground beef 90% — 3 oz", c: "~180" },
        ],
      },
      {
        name: "Higher-fat animal proteins", tone: "high",
        items: [
          { f: "Ribeye steak — 3 oz", c: "~240" }, { f: "Ground beef 80% — 3 oz", c: "~230" },
          { f: "Lamb — 3 oz", c: "~250" }, { f: "Duck — 3 oz", c: "~200" },
        ],
      },
    ],
  },
  {
    kind: "cal-list",
    imageIndex: 38,
    title: "Protein Calories",
    eyebrow: "Fish, Seafood & Dairy",
    groups: [
      {
        name: "Fish and seafood", tone: "mid",
        items: [
          { f: "Salmon — 3 oz", c: "~175" }, { f: "Tuna — 3 oz", c: "~100" },
          { f: "Cod — 3 oz", c: "~70" }, { f: "Shrimp — 3 oz", c: "~85" },
          { f: "Sardines — 3 oz", c: "~180" },
        ],
      },
      {
        name: "Dairy-based proteins", tone: "mid",
        items: [
          { f: "Greek yogurt nonfat — 1 cup", c: "~100" },
          { f: "Greek yogurt whole — 1 cup", c: "~220" },
          { f: "Cottage cheese low-fat — 1 cup", c: "~160" },
          { f: "Milk skim — 1 cup", c: "~90" }, { f: "Milk whole — 1 cup", c: "~150" },
        ],
      },
    ],
  },
  {
    kind: "cal-list",
    imageIndex: 39,
    title: "Protein Calories",
    eyebrow: "Plant-Based & Powders",
    groups: [
      {
        name: "Plant-based proteins", tone: "mid",
        items: [
          { f: "Lentils — 1 cup", c: "~230" }, { f: "Black beans — 1 cup", c: "~225" },
          { f: "Chickpeas — 1 cup", c: "~270" }, { f: "Edamame — 1 cup", c: "~190" },
          { f: "Tofu — ½ cup", c: "~90" }, { f: "Tempeh — ½ cup", c: "~160" },
          { f: "Quinoa — 1 cup", c: "~220" },
        ],
      },
      {
        name: "Nuts, seeds & nut butters", tone: "high",
        items: [
          { f: "Almonds — ¼ cup", c: "~200" }, { f: "Peanuts — ¼ cup", c: "~210" },
          { f: "Walnuts — ¼ cup", c: "~190" }, { f: "Peanut butter — 2 tbsp", c: "~190" },
          { f: "Almond butter — 2 tbsp", c: "~200" }, { f: "Chia seeds — 2 tbsp", c: "~140" },
        ],
      },
      {
        name: "Protein powders", tone: "low",
        items: [
          { f: "Whey — 1 scoop", c: "110–150" }, { f: "Plant — 1 scoop", c: "120–170" },
          { f: "Collagen — 2 scoops", c: "~70" },
        ],
      },
    ],
  },
  {
    kind: "cal-list",
    imageIndex: 40,
    title: "Carbohydrate Calories",
    eyebrow: "Grains, Starches & Starchy Veg",
    groups: [
      {
        name: "Grains & starches", tone: "mid",
        items: [
          { f: "White rice — 1 cup", c: "~205" }, { f: "Brown rice — 1 cup", c: "~215" },
          { f: "Quinoa — 1 cup", c: "~220" }, { f: "Oatmeal — 1 cup", c: "~150" },
          { f: "Pasta — 1 cup", c: "~200" }, { f: "Bread — 1 slice", c: "70–100" },
          { f: "Bagel — 1 medium", c: "250–300" }, { f: "Flour tortilla — 1 med", c: "120–150" },
          { f: "Cereal — 1 cup", c: "100–200" },
        ],
      },
      {
        name: "Starchy vegetables", tone: "mid",
        items: [
          { f: "White potato — 1 med", c: "~110" }, { f: "Sweet potato — 1 med", c: "~103" },
          { f: "Corn — 1 cup", c: "~132" }, { f: "Peas — 1 cup", c: "~134" },
          { f: "Butternut squash — 1 cup", c: "~82" }, { f: "Plantain — 1 med", c: "~220" },
        ],
      },
    ],
  },
  {
    kind: "cal-list",
    imageIndex: 41,
    title: "Carbohydrate Calories",
    eyebrow: "Legumes & Fruits",
    groups: [
      {
        name: "Legumes (carbs + protein + fiber)", tone: "mid",
        items: [
          { f: "Lentils — 1 cup", c: "~230" }, { f: "Black beans — 1 cup", c: "~225" },
          { f: "Chickpeas — 1 cup", c: "~270" }, { f: "Kidney beans — 1 cup", c: "~225" },
        ],
      },
      {
        name: "Fruits (natural carbs)", tone: "low",
        items: [
          { f: "Apple — 1 med", c: "~95" }, { f: "Banana — 1 med", c: "~105" },
          { f: "Orange — 1 med", c: "~62" }, { f: "Grapes — 1 cup", c: "~104" },
          { f: "Berries — 1 cup", c: "50–85" }, { f: "Pineapple — 1 cup", c: "~82" },
          { f: "Mango — 1 cup", c: "~99" },
        ],
      },
    ],
  },
  {
    kind: "cal-list",
    imageIndex: 42,
    title: "Carbohydrate Calories",
    eyebrow: "Sweets & Drinks",
    groups: [
      {
        name: "Sweets & refined carbs", tone: "high",
        items: [
          { f: "Sugar — 1 tbsp", c: "48" }, { f: "Honey — 1 tbsp", c: "64" },
          { f: "Cookie — 1 medium", c: "50–80" }, { f: "Candy — fun size", c: "60–90" },
          { f: "Chocolate bar — regular", c: "200–250" },
        ],
      },
      {
        name: "Drinks (liquid carbs)", tone: "high",
        items: [
          { f: "Soda — 12 oz", c: "~150" }, { f: "Fruit juice — 1 cup", c: "110–150" },
          { f: "Sports drink — 20 oz", c: "~140" }, { f: "Sweet tea — 12 oz", c: "~120" },
        ],
      },
    ],
  },
  {
    kind: "cal-list",
    imageIndex: 43,
    title: "Fat Calories",
    eyebrow: "Oils, Nuts & Butters",
    groups: [
      {
        name: "Oils & cooking fats (1 tbsp)", tone: "high",
        items: [
          { f: "Olive oil", c: "~120" }, { f: "Avocado oil", c: "~120" },
          { f: "Coconut oil", c: "~120" }, { f: "Butter", c: "~100" },
          { f: "Ghee", c: "~120" }, { f: "Margarine", c: "~100" },
        ],
      },
      {
        name: "Nuts & nut butters", tone: "mid",
        items: [
          { f: "Almonds — ¼ cup", c: "~200" }, { f: "Walnuts — ¼ cup", c: "~190" },
          { f: "Cashews — ¼ cup", c: "~180" }, { f: "Pistachios — ¼ cup", c: "~170" },
          { f: "Peanut butter — 2 tbsp", c: "~190" }, { f: "Almond butter — 2 tbsp", c: "~200" },
        ],
      },
    ],
  },
  {
    kind: "cal-list",
    imageIndex: 44,
    title: "Fat Calories",
    eyebrow: "Seeds, Avocado & Fatty Meats",
    groups: [
      {
        name: "Seeds", tone: "mid",
        items: [
          { f: "Chia — 2 tbsp", c: "~140" }, { f: "Flaxseed — 2 tbsp", c: "~110" },
          { f: "Pumpkin — ¼ cup", c: "~180" }, { f: "Sunflower — ¼ cup", c: "~200" },
        ],
      },
      {
        name: "Avocado", tone: "mid",
        items: [
          { f: "Avocado — ½ medium", c: "~120" }, { f: "Whole avocado", c: "~240" },
        ],
      },
      {
        name: "Fatty meats & fish", tone: "high",
        items: [
          { f: "Salmon — 3 oz", c: "~175" }, { f: "Sardines — 3 oz", c: "~180" },
          { f: "Ribeye — 3 oz", c: "~240" }, { f: "Pork belly — 3 oz", c: "~300+" },
          { f: "Bacon — 1 slice", c: "~40–50" },
        ],
      },
    ],
  },

  // --- Chapter 8: Micronutrients & Vitamins ---
  {
    kind: "micros-intro",
    imageIndex: 45,
    title: "What Are Micronutrients?",
    body: "Micronutrients are the vitamins and minerals your body needs in small amounts for energy, immunity, metabolism, and overall health. They fall into four groups: water-soluble vitamins, fat-soluble vitamins, macro-minerals, and trace minerals.",
    supports: [
      "Energy production",
      "Immune function",
      "Bone health",
      "Hormone balance",
      "Nerve & muscle function",
      "Healthy skin, hair & nails",
    ],
  },
  {
    kind: "vitamins-split",
    imageIndex: 46,
    title: "Water- and Fat-Soluble Vitamins",
    water: {
      name: "Water-soluble",
      note: "Dissolve in water — not stored well in the body.",
      items: [
        "B1 — Thiamine", "B2 — Riboflavin", "B3 — Niacin", "B5 — Pantothenic acid",
        "B6 — Pyridoxine", "B7 — Biotin", "B9 — Folate / Folic acid",
        "B12 — Cobalamin", "C — Ascorbic acid",
      ],
    },
    fat: {
      name: "Fat-soluble",
      note: "Dissolve in fat — stored in the body.",
      items: ["Vitamin A", "Vitamin D", "Vitamin E", "Vitamin K"],
    },
  },
  {
    kind: "vitamins-split",
    imageIndex: 47,
    title: "Macro and Trace Minerals",
    water: {
      name: "Macro-minerals",
      note: "Needed in larger amounts.",
      items: ["Calcium", "Magnesium", "Potassium", "Sodium", "Phosphorus", "Chloride", "Sulfur"],
    },
    fat: {
      name: "Trace minerals",
      note: "Needed in small amounts — still essential.",
      items: ["Iron", "Zinc", "Copper", "Selenium", "Iodine", "Manganese", "Fluoride", "Chromium", "Molybdenum"],
    },
  },
  {
    kind: "vitamin-cards",
    imageIndex: 48,
    title: "Vitamins for Ongoing Health",
    lead: "Stored in the body but still important to consume regularly.",
    items: [
      { name: "Vitamin A", desc: "Supports vision, immunity & skin health.", sources: "Carrots, sweet potatoes, spinach, eggs." },
      { name: "Vitamin D", desc: "Supports bones, immunity & mood.", sources: "Salmon, egg yolks, fortified milk, sunlight." },
      { name: "Vitamin E", desc: "Antioxidant & immune support.", sources: "Nuts, seeds, spinach, vegetable oils." },
      { name: "Vitamin K", desc: "Supports blood clotting & bone strength.", sources: "Leafy greens, broccoli, Brussels sprouts." },
    ],
    pattern: [
      "A serving of fruit",
      "A serving of vegetables, especially leafy greens",
      "A lean protein source",
      "A whole grain or starchy vegetable",
      "A small amount of healthy fats",
      "A fortified food (milk or plant milk)",
    ],
  },
  {
    kind: "vitamin-cards",
    imageIndex: 49,
    title: "Essential Daily Vitamins",
    items: [
      { name: "Vitamin C", desc: "Immunity, skin health & iron absorption.", sources: "Citrus, berries, peppers, broccoli." },
      { name: "B1 — Thiamine", desc: "Converts food into energy.", sources: "Whole grains, beans, nuts, pork." },
      { name: "B2 — Riboflavin", desc: "Supports metabolism & cell function.", sources: "Dairy, eggs, almonds, lean meats." },
      { name: "B3 — Niacin", desc: "Important for energy production.", sources: "Chicken, tuna, peanuts, whole grains." },
      { name: "B6", desc: "Supports brain function & metabolism.", sources: "Salmon, bananas, potatoes, chickpeas." },
      { name: "B9 — Folate", desc: "Cell growth & red blood cell formation.", sources: "Leafy greens, beans, lentils, citrus." },
      { name: "B12", desc: "Supports nerve function & energy production.", sources: "Meat, fish, eggs, dairy." },
    ],
  },

  // --- Chapter 9: Macros, Good Foods & The Plate ---
  {
    kind: "macros-overview",
    imageIndex: 50,
    title: "Macronutrients",
    items: [
      { n: "01", name: "Protein", desc: "Supports muscle repair, metabolism, fullness, and immune function.", examples: "Chicken, turkey, fish, eggs, Greek yogurt, tofu, beans, lentils.", color: "green" },
      { n: "02", name: "Carbohydrates", desc: "Provide energy for the brain and body — especially during exercise.", examples: "Fruit, oats, rice, potatoes, quinoa, whole-grain bread, beans.", color: "orange" },
      { n: "03", name: "Fats", desc: "Support hormones, brain health, vitamin absorption, and long-lasting energy.", examples: "Avocado, olive oil, nuts, seeds, nut butters, salmon, sardines.", color: "green" },
    ],
  },
  {
    kind: "choices",
    imageIndex: 51,
    title: "Good Carbohydrates",
    eyebrow: "Fiber · Vitamins · Stable Blood Sugar",
    tone: "better",
    items: [
      "Oats", "Brown rice", "Quinoa", "Potatoes", "Sweet potatoes",
      "Whole-grain bread or wraps", "Whole-grain pasta",
      "Beans", "Lentils", "Berries, apples, bananas, oranges",
    ],
  },
  {
    kind: "choices",
    imageIndex: 52,
    title: "Good Protein",
    eyebrow: "Lean & Filling — Fullness · Muscle · Metabolism",
    tone: "better",
    items: [
      "Chicken breast", "Turkey", "Lean ground beef or turkey",
      "Eggs", "Greek yogurt", "Cottage cheese",
      "Fish (salmon, tuna, cod)", "Shrimp",
      "Tofu", "Beans & lentils",
    ],
  },
  {
    kind: "choices",
    imageIndex: 53,
    title: "Good Fats",
    eyebrow: "Heart-Healthy — Hormones · Brain · Satiety",
    tone: "better",
    items: [
      "Avocado", "Olive oil",
      "Almonds, walnuts, cashews",
      "Chia, flax, pumpkin, sunflower seeds",
      "Nut butters",
      "Fatty fish (salmon, sardines, mackerel)",
    ],
  },
  {
    kind: "balanced-plate",
    imageIndex: 54,
    title: "A Balanced Plate",
    lead: "A clear, everyday plate looks like this:",
    portions: [
      { pct: "½", label: "Vegetables", desc: "Broccoli, spinach, mixed greens, peppers, zucchini.", color: "green" },
      { pct: "¼", label: "Lean Protein", desc: "Grilled chicken, salmon, tofu, beans, or eggs.", color: "orange" },
      { pct: "¼", label: "Smart Carbs", desc: "Brown rice, quinoa, sweet potato, whole-grain pasta.", color: "amber" },
      { pct: "+", label: "Healthy Fats", desc: "Olive oil, avocado, nuts, seeds — in small amounts.", color: "cream" },
    ],
    hands: [
      { label: "Protein", portion: "1 palm" },
      { label: "Carbs", portion: "1 fist" },
      { label: "Healthy fats", portion: "1 thumb" },
      { label: "Veggies", portion: "2 cupped hands" },
    ],
  },

  // --- Chapter 10: Conclusion & Responsibility ---
  {
    kind: "responsibility",
    imageIndex: 32,
    title: "Your Health Is Your Responsibility",
    body: "Taking care of your body and mind helps you feel good, stay strong, and live your best life. At the end of the day, your health is in your hands — the choices you make daily will determine your future health.",
  },
  {
    kind: "conclusion",
    imageIndex: 55,
    title: "Conclusion",
    body: "Good nutrition is not about restriction — it's about making better choices, understanding your food, and taking control of your health.",
    quote: "Remember — your body deserves the best.",
    contact: { phone: "954-496-4142", email: "kerrystablenutrition@gmail.com", site: "www.kerrystable.com" },
  },
];
