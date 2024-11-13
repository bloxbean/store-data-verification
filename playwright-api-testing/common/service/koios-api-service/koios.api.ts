import * as BaseApi from "@common/api/third-party-api";
import * as Endpoint from "@common/helpers/endpoints/endpoints.helper";
import axios, { AxiosRequestConfig } from "axios";

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

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.Koios.getTip.Base
    );
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

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.Koios.getAccountAddresses.Base,
      requestBody
    );
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

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.Koios.getAccountTransaction.Base
    );
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

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.Koios.getBlockList.Base
    );
  };

  const getBlockTransactions = async (blockHashes: string[]) => {
    const requestBody = {
      _block_hashes: blockHashes,
    };

    const request: AxiosRequestConfig = {
      method: "POST",
      url: Endpoint.Koios.getBlockTransaction.Base,
      data: requestBody,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.Koios.getBlockTransaction.Base,
      requestBody
    );
  };

  const getTransactionInformation = async (txHashes: string[]) => {
    const requestBody = {
      _tx_hashes: txHashes,
    };

    const request: AxiosRequestConfig = {
      method: "POST",
      url: Endpoint.Koios.getTransactionInformation.Base,
      data: requestBody,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.Koios.getTransactionInformation.Base,
      requestBody
    );
  };

  const getTransactionStatus = async (txHashes: string[]) => {
    const requestBody = {
      _tx_hashes: txHashes,
    };

    const request: AxiosRequestConfig = {
      method: "POST",
      url: Endpoint.Koios.getTransactionStatus.Base,
      data: requestBody,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.Koios.getTransactionStatus.Base,
      requestBody
    );
  };

  const getEpochInformation = async (number: number, isInclude: boolean) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.Koios.getEpochInformation.Base}?_epoch_no=${number}&_include_next_epoch=${isInclude}`,
      headers: {
        accept: "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.Koios.getEpochInformation.Base
    );
  };

  const getEpochParameter = async (number: number) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.Koios.getEpochProtocolParameters.Base}?_epoch_no=${number}`,
      headers: {
        accept: "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.Koios.getEpochProtocolParameters.Base
    );
  };

  const getEpochBlockProtocols = async (number: number) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.Koios.getEpochBlockProtocols.Base}?_epoch_no=${number}`,
      headers: {
        accept: "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.Koios.getEpochBlockProtocols.Base
    );
  };

  const getAssetUtxos = async (assetList: string[], isExtended: boolean) => {
    const requestBody = {
      _asset_list: assetList,
      _extended: isExtended,
    };

    const request: AxiosRequestConfig = {
      method: "POST",
      url: Endpoint.Koios.getAssetUtxos.Base,
      data: requestBody,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.Koios.getAssetUtxos.Base,
      requestBody
    );
  };

  const getAssetHistory = async (assetPolicy: string, assetName: string) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.Koios.getAssetHistory.Base}?_asset_policy=${assetPolicy}&_asset_name=${assetName}`,
      headers: {
        accept: "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.Koios.getAssetHistory.Base
    );
  };

  const getPoolRegistration = async (number: unknown) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.Koios.getPoolRegistration.Base}?_epoch_no=${number}`,
      headers: {
        accept: "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.Koios.getEpochBlockProtocols.Base
    );
  };

  const getScriptRedeemers = async (script_hash: unknown) => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: `${Endpoint.Koios.getScriptRedeemers.Base}?_script_hash=${script_hash}`,
      headers: {
        accept: "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.Koios.getScriptRedeemers.Base
    );
  };

  return {
    getTip,
    getAccountAddresses,
    getAccountTransaction,
    getBlockList,
    getBlockTransactions,
    getTransactionInformation,
    getTransactionStatus,
    getEpochInformation,
    getEpochParameter,
    getEpochBlockProtocols,
    getAssetUtxos,
    getAssetHistory,
    getPoolRegistration,
    getScriptRedeemers,
  };
}
