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

  const getAccountAddresses = async (accountAddresses: string[]) => {
    const requestBody = {
      _stake_addresses: accountAddresses,
      _first_only: false,
      _empty: false,
    };

    const request: AxiosRequestConfig = {
      method: "POST",
      url: Endpoint.Koios.getAccountAddresses.Base,
      data: requestBody,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.Koios.getAccountAddresses.Base, requestBody);
  };

  const getAccountTransaction = async (stakeAddress: string) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.Koios.getAccountTransaction.Base}?_stake_address=${stakeAddress}`,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.Koios.getAccountTransaction.Base);
  };

  const getBlockList = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: Endpoint.Koios.getBlockList.Base,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.Koios.getBlockList.Base);
  };

  return {
    getTip,
    getAccountAddresses,
    getAccountTransaction,
    getBlockList,
  };
}
