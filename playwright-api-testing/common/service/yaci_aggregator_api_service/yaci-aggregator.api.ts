import axios, { AxiosRequestConfig } from "axios";
import * as BaseApi from "@common/api/third-party-api";
import * as Endpoint from "@common/helpers/endpoints/endpoints.helper";

export function yaciAggregatorApi() {
  const getAddressBalance = async (address: unknown) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.YaciStoreAggregator.getAggregatorAddresses.Base}/${address}/balance`,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStoreAggregator.getAggregatorAddresses.Base);
  };

  const getAddressAmounts = async (address: unknown) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.YaciStoreAggregator.getAggregatorAddresses.Base}/${address}`,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStoreAggregator.getAggregatorAddresses.Base);
  };

  return {
    getAddressBalance,
    getAddressAmounts,
  };
}
