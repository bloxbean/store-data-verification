import * as BaseApi from "@common/api/third-party-api";
import * as Endpoint from "@common/helpers/endpoints/endpoints.helper";
import axios, { AxiosRequestConfig } from "axios";

export function yaciGovernanceRuleApi() {
  const getGovActionRatifier = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: Endpoint.YaciStore.getGovActionRatifier.Base,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.YaciStore.getGovActionRatifier.Base
    );
  };

  const getRatificationResult = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: Endpoint.YaciStore.getRatificationResult.Base,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.YaciStore.getRatificationResult.Base
    );
  };

  const getRatificationResultForNoConfidenceAction = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: Endpoint.YaciStore.getRatificationResultForNoConfidenceAction.Base,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.YaciStore.getRatificationResultForNoConfidenceAction.Base
    );
  };

  const getRatificationResultForUpdateCommitteeAction = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: Endpoint.YaciStore.getRatificationResultForUpdateCommitteeAction
        .Base,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.YaciStore.getRatificationResultForUpdateCommitteeAction.Base
    );
  };

  const getRatificationResultForHardForkInitiationAction = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: Endpoint.YaciStore.getRatificationResultForHardForkInitiationAction
        .Base,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.YaciStore.getRatificationResultForHardForkInitiationAction.Base
    );
  };

  const getRatificationResultForNewConstitutionAction = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: Endpoint.YaciStore.getRatificationResultForNewConstitutionAction
        .Base,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.YaciStore.getRatificationResultForNewConstitutionAction.Base
    );
  };

  const getRatificationResultForTreasuryWithdrawalsAction = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: Endpoint.YaciStore.getRatificationResultForTreasuryWithdrawalsAction
        .Base,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.YaciStore.getRatificationResultForTreasuryWithdrawalsAction.Base
    );
  };

  const getRatificationResultForParameterChangeAction = async () => {
    const request: AxiosRequestConfig = {
      method: "GET",
      url: Endpoint.YaciStore.getRatificationResultForParameterChangeAction
        .Base,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    };

    return BaseApi.returnLoggedResponse(
      await axios(request),
      Endpoint.YaciStore.getRatificationResultForParameterChangeAction.Base
    );
  };

  return {
    getGovActionRatifier,
    getRatificationResult,
    getRatificationResultForNoConfidenceAction,
    getRatificationResultForUpdateCommitteeAction,
    getRatificationResultForHardForkInitiationAction,
    getRatificationResultForNewConstitutionAction,
    getRatificationResultForTreasuryWithdrawalsAction,
    getRatificationResultForParameterChangeAction,
  };
}
