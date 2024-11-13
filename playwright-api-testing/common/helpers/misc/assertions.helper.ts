import Logger from "@helpers/logger/logger.helper";
import { expect } from "@playwright/test";

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
  static assertNotEqual(
    actualText: unknown,
    expectedText: unknown,
    message: string
  ) {
    try {
      expect(actualText).not.toBe(expectedText);
      Logger.info(
        `Assertion passed: ${message}\nActual Result:   '${actualText}'\nExpected Result: '${expectedText}'`
      );
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
  static assertEqual(
    actualText: unknown,
    expectedText: unknown,
    message: string
  ) {
    try {
      expect(actualText).toBe(expectedText);
      Logger.info(
        `Assertion passed: ${message}\nActual Result:   '${actualText}'\nExpected Result: '${expectedText}'`
      );
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
      Logger.info(
        `Assertion passed: ${message}\nActual Result:   ${actualValue}\nExpected Result: true`
      );
    } catch (error) {
      Logger.error(
        `Assertion failed: ${message}\nActual Result:   ${actualValue}\nExpected Result: true`
      );
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
      Logger.info(
        `Assertion passed: ${message}\nActual Result:   ${actualValue}\nExpected Result: true`
      );
    } catch (error) {
      Logger.error(
        `Assertion failed: ${message}\nActual Result:   ${actualValue}\nExpected Result: true`
      );
      throw error;
    }
  }

  /**
   * Asserts that the actual JSON object contains the expected JSON object.
   * This function logs a message and throws an error if the assertion fails.
   *
   * @param actualJson - The actual JSON object to be compared.
   * @param expectedJson - The expected JSON object to match.
   * @param message - A message to log for the assertion result.
   * @example
   * Assertions.assertJsonContain(actualJson, expectedJson, 'JSON object contains expected JSON.');
   */
  static assertJsonContain(
    actualJson: unknown,
    expectedJson: unknown,
    message: string
  ) {
    try {
      const actualJsonString = JSON.stringify(actualJson);
      const expectedJsonString = JSON.stringify(expectedJson);
      const contains = actualJsonString.includes(expectedJsonString);

      if (contains) {
        Logger.info(
          `Assertion passed: ${message}\nActual Result:   ${actualJsonString}\nExpected Result: ${expectedJsonString}`
        );
      } else {
        Logger.error(
          `Assertion failed: ${message}\nActual Result:   ${actualJsonString}\nExpected Result: ${expectedJsonString}`
        );
        throw new Error(`Assertion failed: ${message}`);
      }
    } catch (error) {
      Logger.error(`Error occurred during assertion: ${error}`);
      throw error;
    }
  }

  /**
   * Asserts that the actual JSON object not contains the expected JSON object.
   * This function logs a message and throws an error if the assertion fails.
   *
   * @param actualJson - The actual JSON object to be compared.
   * @param expectedJson - The expected JSON object to match.
   * @param message - A message to log for the assertion result.
   * @example
   * Assertions.assertNotJsonContain(actualJson, expectedJson, 'JSON object contains expected JSON.');
   */
  static assertNotJsonContain(
    actualJson: unknown,
    expectedJson: unknown,
    message: string
  ) {
    try {
      const actualJsonString = JSON.stringify(actualJson);
      const expectedJsonString = JSON.stringify(expectedJson);
      const contains = actualJsonString.includes(expectedJsonString);

      if (!contains) {
        Logger.info(
          `Assertion passed: ${message}\nActual Result:   ${actualJsonString}\nExpected Result: ${expectedJsonString}`
        );
      } else {
        Logger.error(
          `Assertion failed: ${message}\nActual Result:   ${actualJsonString}\nExpected Result: ${expectedJsonString}`
        );
        throw new Error(`Assertion failed: ${message}`);
      }
    } catch (error) {
      Logger.error(`Error occurred during assertion: ${error}`);
      throw error;
    }
  }

  /**
   * Asserts that a value is null.
   * This function logs a message and throws an error if the assertion fails.
   *
   * @param actualValue - The value to be asserted as false.
   * @param message - A message to log for the assertion result.
   * @example
   * Assertions.assertNull(empty, 'Value should be null.');
   */
  static assertNull(actualValue: unknown, message: string) {
    try {
      expect(actualValue).toBeNull;
      Logger.info(
        `Assertion passed: ${message}\nActual Result:   ${actualValue}\nExpected Result: true`
      );
    } catch (error) {
      Logger.error(
        `Assertion failed: ${message}\nActual Result:   ${actualValue}\nExpected Result: true`
      );
      throw error;
    }
  }

  /**
   * Asserts that a value is not null.
   * This function logs a message and throws an error if the assertion fails.
   *
   * @param actualValue - The value to be asserted as false.
   * @param message - A message to log for the assertion result.
   * @example
   * Assertions.assertNull(empty, 'Value should not null.');
   */
  static assertNotNull(actualValue: unknown, message: string) {
    try {
      expect(actualValue).not.toBeNull;
      Logger.info(
        `Assertion passed: ${message}\nActual Result:   ${actualValue}\nExpected Result: true`
      );
    } catch (error) {
      Logger.error(
        `Assertion failed: ${message}\nActual Result:   ${actualValue}\nExpected Result: true`
      );
      throw error;
    }
  }
}
