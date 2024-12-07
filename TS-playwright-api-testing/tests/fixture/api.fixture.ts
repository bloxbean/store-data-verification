import { RestClient } from "@api-common/api/rest-client";
import APIHelper from "@api-helpers/api/api.helper";
import { APIRequestContext, test as baseTest } from "@playwright/test";

export type ApiFixtureType = {
  createRestClient: (apiRequestContext: APIRequestContext) => RestClient;
  apiHelper: APIHelper;
};

type ExtendParams = Parameters<typeof baseTest.extend<ApiFixtureType>>;

export const apiFixture: ExtendParams[0] = {
  createRestClient: async ({}, use) => {
    const func = (apiRequestContext: APIRequestContext) => {
      return new RestClient(apiRequestContext);
    };

    await use(func);
  },
  apiHelper: async ({}, use) => {
    const apiHelper = new APIHelper();
    await use(apiHelper);
  },
};

export default apiFixture;
