import axios, { AxiosRequestConfig } from "axios";
import * as BaseApi from "@common/api/thirdPartyApi";
import * as Endpoint from "@common/helpers/endpoints/endpoints.helper";

export function yaciApi() {
  const getTransaction = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: Endpoint.YaciStore.getTransaction.Base,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getTransaction.Base);
  };

  const getBlockList = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: Endpoint.YaciStore.getBlockList.Base,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getBlockList.Base);
  };

  const getBlockLatestInformation = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: Endpoint.YaciStore.getBlockLatestInformation.Base,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getBlockLatestInformation.Base);
  };

  const getBlockInformationByHash = async (hash: unknown) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.YaciStore.getBlockList.Base}/${hash}`,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getBlockList.Base);
  };

  return {
    getTransaction,
    getBlockList,
    getBlockLatestInformation,
    getBlockInformationByHash,
  };
}
