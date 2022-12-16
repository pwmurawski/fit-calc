type Keys = "protein" | "fat" | "carbs";

const kcalToGrams = (grams: number, macronutrient: Keys) => {
  const oneGramHowManyKcal = {
    protein: 4,
    fat: 9,
    carbs: 4,
  };

  return grams / oneGramHowManyKcal[macronutrient];
};

export default kcalToGrams;
