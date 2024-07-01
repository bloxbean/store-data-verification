import Logger from './logger.helper';

export default class LogHelper {
  static logResult(message: string, actualResult: any, expectedResult: any) {
    Logger.info(`${message}\nActual Result: ${actualResult}\nExpected Result: ${expectedResult}`);
  }

  static logResultVisible(message: string, actualResult: any) {
    Logger.info(`${message}\nActual Result: ${actualResult} is visible`);
  }
}
