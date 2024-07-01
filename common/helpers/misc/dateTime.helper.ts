import { DateTime, DurationUnit } from 'luxon';

export default class DateTimeHelper {
  /**
   * Generates a date string based on the current date and specified adjustments.
   * This function uses the Luxon library for date manipulation (https://moment.github.io/luxon/#/formatting).
   * 
   * @param format The date format string according to Luxon formatting guidelines.
   *               This format is used for outputting the generated date.
   * @param days (Optional) The number of days to add to or subtract from the current date.
   *             Positive values increment the date, while negative values decrement it.
   * @param months (Optional) The number of months to add or subtract from the current date, similar to days.
   * @param years (Optional) The number of years to add or subtract from the current date, similar to days.
   * 
   * @returns A string representing the generated date in the specified format.
   */
  public static dateGenerator(format: string, days: number = 0, months: number = 0, years: number = 0): string {
    const date = DateTime.now().plus({ days, months, years }).toFormat(format);
    return date;
  }

  /**
   * Adjusts a given date by specified increments or decrements of days, months, and years.
   * Utilizes Luxon library for date manipulation (https://moment.github.io/luxon/#/formatting).
   * 
   * @param date The initial date in string format to be adjusted. 
   *             Ensure this date string matches the specified format.
   * @param format The date format string according to Luxon formatting guidelines.
   *               This format is used for both parsing the input date and outputting the adjusted date.
   * @param days (Optional) The number of days to add to or subtract from the date. 
   *             Positive values increment the date, while negative values decrement it.
   * @param months (Optional) The number of months to add or subtract, similar to days.
   * 
   * @param years (Optional) The number of years to add or subtract, similar to days.
   * 
   * @returns A string representing the adjusted date in the specified format.
   */
  public static dateCustomizer(date: string, format: string, days: number = 0, months: number = 0, years: number = 0): string {
    const customDate = DateTime.fromFormat(date, format).plus({ days, months, years }).toFormat(format);
    return customDate;
  }

  /**
   * Generates time in hr:min format based on the input
   * @param hours increment OR decrement the hours
   * @param minutes increment OR decrement the minutes
   * @param format time format https://moment.github.io/luxon/#/formatting
   * @returns
   */
  public static timeGenerator(hours: number, minutes: number, format: string = "yyyy-MM-dd'T'TTZZ"): string {
    // const time = dayjs().add(minutes, "m").add(hours, "h").format(format);
    const time = DateTime.now().plus({ hours, minutes }).toFormat(format);
    return time;
  }

  /**
   * Check if format of date is correct or incorrect
   * @param date increment OR decrement the hours
   * @param format time format https://moment.github.io/luxon/#/formatting
   * @returns
   */
  public static validateFormat(date: string, format: string) {
    return DateTime.fromFormat(date, format).toFormat(format) === date;
  }

  public static getDateDiff(date1: string, date2: string, unit: DurationUnit = 'day', format: string): number {
    const d1 = DateTime.fromFormat(date1, format);
    const d2 = DateTime.fromFormat(date2, format);

    return d2.diff(d1, unit).get(unit);
  }

  public static changeFormatDate(sDate: string, oldFormat: string, newFormat: string): string {
    return DateTime.fromFormat(sDate, oldFormat).toFormat(newFormat);
  }

  /**
 * Calculates and returns a date adjusted by a specified number of days.
 * This function takes a dayOffset value and uses it to add or subtract days from the current date.
 * A positive dayOffset value calculates a future date, while a negative value calculates a past date.
 * 
 * @param {number} dayOffset - The number of days to add or subtract from the current date.
 * @returns {string} A string representing the adjusted date in the format 'YYYY-MM-DD'.
 */
  public static getAdjustedDate(dayOffset: number): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + dayOffset);

    // Define constants for clarity
    const monthAdjustment = 1; // Used to adjust the month number (0-11) to (1-12)
    const twoDigitFormat = 2; // Used to specify the desired length in padStart

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + monthAdjustment).padStart(twoDigitFormat, "0");
    const day = String(currentDate.getDate()).padStart(twoDigitFormat, "0");

    const adjustedDate = `${year}-${month}-${day}`;
    return adjustedDate;
  }

  public static isDateBeforeCurrent(dateString: string): boolean {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
    return inputDate < currentDate;
  }

  public static isDateAfterCurrent(dateString: string): boolean {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
    return inputDate > currentDate;
  }

  /**
 * Calculates the number of days between two dates.
 * 
 * This function takes two date strings as input and returns the number of days between them.
 * The dates should be in 'YYYY-MM-DD' format. It calculates the difference in milliseconds
 * between the start and end dates and then converts this to days.
 *
 * @param {string} startDate - The start date in 'YYYY-MM-DD' format.
 * @param {string} endDate - The end date in 'YYYY-MM-DD' format.
 * @returns {number} - The number of days between the start and end dates.
 */
  public static countDaysBetweenDates(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return Math.round(differenceInDays);
  }
}
