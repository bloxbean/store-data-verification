export interface ApiHeader {
  [headers: string | number | symbol]: unknown;
}

export interface ApiRequest {
  header?: ApiHeader;
  data?: unknown;
}

export class ApiRequestBuilder {
  private readonly _apiRequest: ApiRequest;

  constructor() {
    this._apiRequest = {};
    this._apiRequest.header = {};
  }

  build() {
    return this._apiRequest;
  }

  addData(data: unknown): ApiRequestBuilder {
    this._apiRequest.data = data;
    return this;
  }
}
