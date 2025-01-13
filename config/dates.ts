const firstYear = 2024

// Create an array of years from 2020 to the current year
export const years = Array.from(
  { length: new Date().getFullYear() - firstYear + 1 },
  (_, i) => firstYear + i
)

export const months = Array.from({ length: 12 }, (_, i) => i + 1)
