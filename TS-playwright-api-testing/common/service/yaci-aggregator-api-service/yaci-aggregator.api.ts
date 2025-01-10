import * as BaseApi from "@api-common/api/third-party-api";
import * as Endpoint from "@api-common/helpers/endpoints/endpoints.helper";
import axios, { AxiosRequestConfig } from "axios";

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

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.YaciStoreAggregator.getAggregatorAddresses.Base
    );
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

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.YaciStoreAggregator.getAggregatorAddresses.Base
    );
  };

  return {
    getAddressBalance,
    getAddressAmounts,
  };
}
