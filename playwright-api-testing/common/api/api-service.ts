import { TimeOut } from "@common/constants/project.constants";
import { APIRequestContext, request as pwrequest } from "@playwright/test";

export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
}

export interface Response {
  status: number;
  body: any;
  headers: Record<string, string>;
  cookies: Record<string, string>;
}

export class APIService implements Disposable {
  private baseUrl: string;

  private headers: Record<string, string> = {};

  private queries: Record<string, any> = {};

  private data: string | Record<string, any> = {};

  private context!: APIRequestContext;

  private response!: Response;

  constructor(url: string) {
    this.baseUrl = url;
  }

  getResponse(): Response {
    return this.response;
  }

  uri(endpoint: string): APIService {
    this.baseUrl += endpoint;
    return this;
  }

  withDefaultHeaders(): APIService {
    const defaultHeaders = {
      "Content-Type": "application/json",
    };
    this.headers = defaultHeaders;
    return this;
  }

  addHeader(headers: Record<string, string>): APIService {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  addBody(body: string | Record<string, any>): APIService {
    this.data = body;
    return this;
  }

  addQuery(queries: Record<string, any>): APIService {
    this.queries = { ...this.queries, ...queries };
    return this;
  }

  private async request(
    url: string,
    httpMethod: HttpMethod,
    headers?: Record<string, string>,
    queries?: Record<string, any>,
    body?: string | Record<string, any>
  ) {
    const queryString = queries ? new URLSearchParams(queries).toString() : "";
    const requestUrl = queryString ? `${url}?${queryString}` : url;
    this.context = await pwrequest.newContext();
    return this.context.fetch(requestUrl, {
      timeout: TimeOut.ONE_MINUTE,
      method: httpMethod,
      headers: headers ?? {},
      data: JSON.stringify(body),
    });
  }

  async send(httpMethod: HttpMethod) {
    try {
      const response = await this.request(this.baseUrl, httpMethod, this.headers, this.queries, this.data);
      const status = response.status();
      if (httpMethod == HttpMethod.Put) {
        return;
      }

      const contentType = response.headers()["content-type"];
      const body = contentType.includes("text/plain") ? await response.text() : await response.json();
      const headers = response.headers();

      const cookies: Record<string, string> = await this.extractFirstCookieFromHeaders(headers);

      return (this.response = {
        status,
        body,
        headers,
        cookies,
      });
    } catch (error) {
      console.log(`Failed to send ${httpMethod} request to ${this.baseUrl}: ${error}`);
    }
  }

  async extractFirstCookieFromHeaders(headers: Record<string, string>): Promise<Record<string, string>> {
    const cookies: Record<string, string> = {};
    if ("set-cookie" in headers) {
      const setCookieHeader: string = headers["set-cookie"];
      const cookieValues: string[] = setCookieHeader.split("\n");
      const firstCookie: string = cookieValues[0];
      cookies.Cookie = firstCookie;
    }
    return cookies;
  }

  async dispose() {
    await this.context.dispose();
  }

  async [Symbol.dispose]() {
    await this.dispose();
  }
}
