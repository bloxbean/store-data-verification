import axios, { AxiosRequestConfig } from "axios";
import * as BaseApi from "@common/api/thirdPartyApi";
import * as Endpoint from "@common/helpers/endpoints/endpoints.helper";

export function koiosApi() {
  const getTip = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: Endpoint.Koios.getTip.Base,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.Koios.getTip.Base);
  };

  const getAccountAddresses = async (accountAddresses: string) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: Endpoint.Koios.getAccountAddresses.Base,
      params: {
        stake_address: accountAddresses,
        addresses: [],
      },
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.Koios.getAccountAddresses.Base);
  };

  return {
    getTip,
    getAccountAddresses,
  };
}
