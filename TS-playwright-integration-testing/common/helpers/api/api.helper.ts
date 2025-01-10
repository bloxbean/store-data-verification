export default class APIHelper {
  private cookieAsHeader: Record<string, string> = {};

  public setCookieAsHeader(cookieAsHeader: Record<string, string>): void {
    this.cookieAsHeader = cookieAsHeader;
  }
}
