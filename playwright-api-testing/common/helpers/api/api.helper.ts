import { APIService, HttpMethod } from "@common/api/apiService";
import { Env, Credentials } from "playwright-api-testing/env/env";

export default class APIHelper {
  private cookieAsHeader: Record<string, string> = {};

  public setCookieAsHeader(cookieAsHeader: Record<string, string>): void {
    this.cookieAsHeader = cookieAsHeader;
  }
}
