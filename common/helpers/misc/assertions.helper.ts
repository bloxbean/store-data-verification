import { Locator, expect } from "@playwright/test";
import Logger from "@helpers/logger/logger.helper";

export class Assertions {
  /**
   * Asserts that the actual text is not equal to the expected text.
   * This function logs a message and throws an error if the assertion fails.
   *
   * @param actualText - The text content to be compared.
   * @param expectedText - The expected text content to match.
   * @param message - A message to log for the assertion result.
   * @example
   * Assertions.assertNotEqual(await page.locator('.example').textContent(), 'Expected Text', 'Text content matches expected.');
   */
  static assertNotEqual(actualText: unknown, expectedText: unknown, message: string) {
    try {
      expect(actualText).not.toBe(expectedText);
      Logger.info(`Assertion passed: ${message}\nActual Result:   '${actualText}'\nExpected Result: '${expectedText}'`);
    } catch (error) {
      Logger.error(
        `Assertion failed: ${message}\nActual Result:   '${actualText}'\nExpected Result: '${expectedText}'`
      );
      throw error;
    }
  }

  /**
   * Asserts that the actual text is equal to the expected text.
   * This function logs a message and throws an error if the assertion fails.
   *
   * @param actualText - The text content to be compared.
   * @param expectedText - The expected text content to match.
   * @param message - A message to log for the assertion result.
   * @example
   * Assertions.assertEqual(await page.locator('.example').textContent(), 'Expected Text', 'Text content matches expected.');
   */
  static assertEqual(actualText: unknown, expectedText: unknown, message: string) {
    try {
      expect(actualText).toBe(expectedText);
      Logger.info(`Assertion passed: ${message}\nActual Result:   '${actualText}'\nExpected Result: '${expectedText}'`);
    } catch (error) {
      Logger.error(
        `Assertion failed: ${message}\nActual Result:   '${actualText}'\nExpected Result: '${expectedText}'`
      );
      throw error;
    }
  }

  /**
   * Asserts that a boolean value is true.
   * This function logs a message and throws an error if the assertion fails.
   *
   * @param actualValue - The boolean value to be asserted as true.
   * @param message - A message to log for the assertion result.
   * @example
   * Assertions.assertTrue(user.isLoggedIn, 'User should be logged in.');
   */
  static assertTrue(actualValue: boolean, message: string) {
    try {
      expect(actualValue).toBeTruthy();
      Logger.info(`Assertion passed: ${message}\nActual Result:   ${actualValue}\nExpected Result: true`);
    } catch (error) {
      Logger.error(`Assertion failed: ${message}\nActual Result:   ${actualValue}\nExpected Result: true`);
      throw error;
    }
  }

  /**
   * Asserts that a boolean value is false.
   * This function logs a message and throws an error if the assertion fails.
   *
   * @param actualValue - The boolean value to be asserted as false.
   * @param message - A message to log for the assertion result.
   * @example
   * Assertions.assertFalse(user.isLoggedIn, 'User should be logged in.');
   */
  static assertFalse(actualValue: boolean, message: string) {
    try {
      expect(actualValue).toBeFalsy();
      Logger.info(`Assertion passed: ${message}\nActual Result:   ${actualValue}\nExpected Result: true`);
    } catch (error) {
      Logger.error(`Assertion failed: ${message}\nActual Result:   ${actualValue}\nExpected Result: true`);
      throw error;
    }
  }

  /**
   * Asserts that the actual text is equal to the expected text.
   * This function logs a message and throws an error if the assertion fails.
   *
   * @param actualText - The text content to be compared.
   * @param expectedText - The expected text content to match.
   * @param message - A message to log for the assertion result.
   * @example
   * Assertions.assertContain(await page.locator('.example').textContent(), 'Expected Text', 'Text content matches expected.');
   */
  static async assertContain(actualTextLocator: Locator, expectedText: string, message: string) {
    let actualText = "";
    try {
      actualText = await actualTextLocator.innerText();
      const regex = new RegExp(expectedText);
      await expect(actualTextLocator).toHaveText(regex);
      Logger.info(`Assertion passed: ${message}\nActual Result:   '${actualText}'\nExpected Result: '${expectedText}'`);
    } catch (error) {
      Logger.error(
        `Assertion failed: ${message}\nActual Result:   '${actualText}'\nExpected Result: '${expectedText}'\nError: ${error}`
      );
      throw error;
    }
  }
}
