import type { APIRequestContext } from "@playwright/test";
import * as process from "process";

import * as BaseApi from "@common/api/thirdPartyApi";
import * as Endpoint from "@common/helpers/endpoints/endpoints.helper";

export function koiosApi(request: APIRequestContext) {
  const getTip = async () => {
    return BaseApi.getData(request, Endpoint.Koios.getTip.Base, {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/json",
    });
  };

  const getAccountAddresses = async (accountAddresses: string) => {
    return BaseApi.getData(
      request,
      Endpoint.Koios.getAccountAddresses.Base,
      {
        stake_address: accountAddresses,
        addresses: [] as unknown as string | number | boolean,
      },
      {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      }
    );
  };

  return {
    getTip,
    getAccountAddresses,
  };
}
