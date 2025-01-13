import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

/**
 * Returns the last day of the month
 * @param {string} year
 * @param {string} month (1-indexed)
 * @returns {string} (0-padded)
 */
export const lastDayOfMonthInString = (year: string, month: string): string => {
  return new Date(Number(year), Number(month), 0)
    .getDate()
    .toString()
    .padStart(2, '0')
}
