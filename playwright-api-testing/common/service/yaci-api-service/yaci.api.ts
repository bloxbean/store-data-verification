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

  const getWithdrawals = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.YaciStore.getTransaction.Base}/withdrawals`,
      headers: {
        Accept: "*/*",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getTransaction.Base);
  };

  const getDetailTransaction = async (txHash: unknown) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.YaciStore.getTransaction.Base}/${txHash}`,
      headers: {
        Accept: "*/*",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getTransaction.Base);
  };

  const getWitnesses = async (txHash: unknown) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.YaciStore.getTransaction.Base}/${txHash}/witnesses`,
      headers: {
        Accept: "*/*",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getTransaction.Base);
  };

  const getDetailsWithdrawals = async (txHash: unknown) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.YaciStore.getTransaction.Base}/${txHash}/withdrawals`,
      headers: {
        Accept: "*/*",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getTransaction.Base);
  };

  const submitTransaction = async (txHash: unknown, index: number) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.YaciStore.getUtxo.Base}/${txHash}/${index}`,
      headers: {
        Accept: "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getUtxo.Base);
  };

  const submitUtxo = async (txHash: unknown, index: number) => {
    const requestBody = {
      tx_hash: txHash,
      output_index: index,
    };

    const request: AxiosRequestConfig = {
      method: "POST",
      url: Endpoint.YaciStore.getUtxo.Base,
      data: requestBody,
      headers: {
        Accept: "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getUtxo.Base);
  };

  const getEpochParameter = async (number: number) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.YaciStore.getEpoch.Base}/${number}/parameters`,
      headers: {
        Accept: "*/*",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getEpoch.Base);
  };

  const getLatestEpoch = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.YaciStore.getEpoch.Base}/latest`,
      headers: {
        Accept: "*/*",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getEpoch.Base);
  };

  const getLatestEpochParameters = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.YaciStore.getEpoch.Base}/latest/parameters`,
      headers: {
        Accept: "*/*",
      },
    };

    return BaseApi.returnLoggedResponse(await axios(request), Endpoint.YaciStore.getEpoch.Base);
  };

  return {
    getTransaction,
    getBlockList,
    getBlockLatestInformation,
    getBlockInformationByHash,
    getStakeRegistrations,
    getStakeDeregistrations,
    getStakeDelegations,
    getWithdrawals,
    getDetailTransaction,
    getWitnesses,
    getDetailsWithdrawals,
    submitTransaction,
    submitUtxo,
    getLatestEpochParameters,
    getEpochParameter,
    getLatestEpoch,
  };
}
