import axios, { AxiosRequestConfig } from "axios";
import * as BaseApi from "@common/api/third-party-api";
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

  const getStakeRegistrations = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.YaciStore.getStakeRegistrations.Base}`,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getStakeRegistrations.Base);
  };

  const getStakeDeregistrations = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.YaciStore.getStakeDeregistrations.Base}`,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getStakeDeregistrations.Base);
  };

  const getStakeDelegations = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.YaciStore.getStakeDelegations.Base}`,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getStakeDelegations.Base);
  };

  return {
    getTransaction,
    getBlockList,
    getBlockLatestInformation,
    getBlockInformationByHash,
    getStakeRegistrations,
    getStakeDeregistrations,
    getStakeDelegations,
  };
}
