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

  return {
    getTransaction,
  };
}
