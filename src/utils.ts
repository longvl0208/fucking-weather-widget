export const fToC = (temp: number) => {
  // T(°C) = (T(°F) - 32) × 5/9
  return Math.round(((temp - 32) * 5) / 9);
};

export const computeTemp = (value: number, tempType: string) => {
  return tempType === "C" ? fToC(value) : value;
};
