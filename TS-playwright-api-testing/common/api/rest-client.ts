import { APIRequestContext } from "@playwright/test";
import { ApiRequestBuilder } from "./api-request-builder";

export type Serializable = unknown;

export interface PlaywrightRestOptions {
  /**
   * Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string
   * and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type`
   * header will be set to `application/octet-stream` if not explicitly set.
   */
  data?: string | Buffer | Serializable;
  /**
   * Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status
   * codes.
   */
  failOnStatusCode?: boolean;
  /**
   * Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent
   * as this request body. If this parameter is specified `content-type` header will be set to
   * `application/x-www-form-urlencoded` unless explicitly provided.
   */
  form?: { [key: string]: string | number | boolean };
  /**
   * Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by
   * it.
   */
  headers?: { [key: string]: string };
  /**
   * Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
   */
  ignoreHTTPSErrors?: boolean;
  /**
   * Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is
   * exceeded. Defaults to `20`. Pass `0` to not follow redirects.
   */
  maxRedirects?: number;
  /**
   * Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this
   * request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless
   * explicitly provided. File values can be passed either as
   * [`fs.ReadStream`](https://nodejs.org/api/fs.html#fs_class_fs_readstream) or as file-like object containing file
   * name, mime-type and its content.
   */
  multipart?: {
    [key: string]:
      | string
      | number
      | boolean
      | {
          /**
           * File name
           */
          name: string;

          /**
           * File type
           */
          mimeType: string;

          /**
           * File content
           */
          buffer: Buffer;
        };
  };
  /**
   * Query parameters to be sent with the URL.
   */
  params?: { [key: string]: string | number | boolean };
  /**
   * Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
   */
  timeout?: number;
}

export class RestClient {
  private _requestContext: APIRequestContext;
  private _apiReqBuilder: ApiRequestBuilder;

  constructor(requestContext: APIRequestContext) {
    this._requestContext = requestContext;
    this._apiReqBuilder = new ApiRequestBuilder();
  }

  requestBuilder() {
    return this._apiReqBuilder;
  }

  async get(url: string, options?: PlaywrightRestOptions) {
    console.log(`Sending GET request to ${url}:`);
    // console.debug(`with options ${options.toString()}`);
    return await this._requestContext.get(url, options);
  }

  async post(url: string, options?: PlaywrightRestOptions) {
    console.log(`Sending POST request to ${url}:`);
    // console.debug(`with options ${options.toString()}`);
    if (options?.data)
      console.log(`JSON request: ${JSON.stringify(options.data)}`);
    return await this._requestContext.post(url, options);
  }

  async put(url: string, options?: PlaywrightRestOptions) {
    console.log(`Sending PUT request to ${url}:`);
    // console.debug(`with options ${options.toString()}`);
    if (options?.data)
      console.log(`JSON request: ${JSON.stringify(options.data)}`);
    return await this._requestContext.put(url, options);
  }

  async delete(url: string, options?: PlaywrightRestOptions) {
    console.log(`Sending DELETE request to ${url}:`);
    // console.debug(`with options ${options.toString()}`);
    if (options?.data)
      console.log(`JSON request: ${JSON.stringify(options.data)}`);
    return await this._requestContext.delete(url, options);
  }

  async disposeClient() {
    await this._requestContext.dispose();
  }
}

export async function createRestClient(apiRequestContext: APIRequestContext) {
  return new RestClient(apiRequestContext);
}
