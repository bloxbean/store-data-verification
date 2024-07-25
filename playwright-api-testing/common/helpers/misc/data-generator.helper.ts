export class DataGenerator {
  /**
   * Generates and returns a random user name with the current timestamp appended.
   * @returns A string representing a random user name with the format "User" followed by the current timestamp.
   * @example
   * // Example usage:
   * const randomUsername = DataGenerator.randomUsernameWithTimestamp();
   * console.log(randomUsername); // Outputs something like "User1635614523979"
   */
  static randomUsernameWithTimestamp(): string {
    const currentTime = Date.now();
    return `User${currentTime}`;
  }

  /**
   * Generates and returns a random user name with uppercase letters only.
   * @returns A string representing a random user name with uppercase letters.
   * @example
   * // Example usage:
   * const randomFullName = DataGenerator.randomFullName();
   * console.log(randomFullName); // Outputs something like "ABXYZ GHDJK"
   */
  static randomFullName(): string {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomFirstName = Array.from({ length: 5 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join(
      ""
    );
    const randomLastName = Array.from({ length: 5 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join(
      ""
    );
    return `${randomFirstName} ${randomLastName}`;
  }

  /**
   * Generates and returns a random ID with a length of 10 characters, including numbers (0-9) and uppercase letters (A-Z).
   * @returns A string representing a random ID.
   * @example
   * // Example usage:
   * const randomID = DataGenerator.randomID();
   * console.log(randomID); // Outputs something like "1A3B5C7D9"
   */
  static randomID(): string {
    const lengthOfId = 10;
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length: lengthOfId }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
  }

  /**
   * Generates and returns a string consisting of 6 random uppercase letters followed by the current date in the format of month/day.
   * This function is useful for generating unique identifiers that include a date stamp.
   * @returns A string in the format "XXXXXX mm/dd", where X is a random uppercase letter.
   * @example
   * // Example usage:
   * const randomFormAndRevDate = DataGenerator.randomFormAndRevDate();
   * console.log(randomFormAndRevDate); // Outputs something like "ABCDEF 11/06"
   */
  static randomFormAndRevDate(): string {
    const lengthOfCode = 6;
    const alphabetCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = Array.from(
      { length: lengthOfCode },
      () => alphabetCharacters[Math.floor(Math.random() * alphabetCharacters.length)]
    ).join("");

    const currentDate = new Date();

    // Define constants for clarity
    const monthAdjustment = 1; // Used to adjust the month number (0-11) to (1-12)
    const twoDigitFormat = 2; // Used to specify the desired length in padStart

    // Adjust month and format date
    const twoDigitMonth = (currentDate.getMonth() + monthAdjustment).toString().padStart(twoDigitFormat, "0");
    const twoDigitDay = currentDate.getDate().toString().padStart(twoDigitFormat, "0");

    const formattedDate = `${twoDigitMonth}/${twoDigitDay}`;

    return `${randomLetters} ${formattedDate}`;
  }

  /**
   * Generates a random US phone number in the format 'XXX-XXX-XXXX +', where X is a digit from 0 to 9.
   * The first part (area code) ranges from 200 to 999, ensuring it doesn't start with 0 or 1.
   * The second part ranges from 100 to 999, and the third part ranges from 1000 to 9999.
   * The format represents a typical US phone number with a '+' sign at the end.
   * @returns A string representing a random US phone number.
   * @example
   * // Example usage:
   * const usPhoneNumber = generateUSPhoneNumber();
   * console.log(usPhoneNumber); // Outputs something like "212-555-1234 +"
   */
  static generateUSPhoneNumber(): string {
    // Define variables for the limits
    const areaCodeMin = 200;
    const areaCodeMax = 999;
    const midSectionMin = 100;
    const midSectionMax = 999;
    const lastSectionMin = 1000;
    const lastSectionMax = 9999;

    // Generate each part of the phone number
    const areaCodepart = this.generateRandomNumber(areaCodeMin, areaCodeMax);
    const midSectionpart = this.generateRandomNumber(midSectionMin, midSectionMax);
    const lastSectionpart = this.generateRandomNumber(lastSectionMin, lastSectionMax);

    // Return the formatted phone number
    return `${areaCodepart}-${midSectionpart}-${lastSectionpart}+`;
  }

  // Helper function to generate a random number
  static generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
