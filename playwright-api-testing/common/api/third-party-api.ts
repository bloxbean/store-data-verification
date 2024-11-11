import Logger from "@common/helpers/logger/logger.helper";
import axios, { AxiosResponse } from "axios";

export const returnLoggedResponse = async (
  response: AxiosResponse,
  endpoint: string,
  payload?: object,
  isBodyNotSecret = true
) => {
  Logger.info(`Request URL: ${endpoint}`);
  if (typeof payload !== "undefined" && isBodyNotSecret)
    Logger.info(`Request params/body:\n${JSON.stringify(payload, null, 2)}`);
  Logger.info(`Response status: ${response.status}`);
  if (response.headers["content-type"]?.includes("application/json"))
    Logger.info(`Response body:\n${JSON.stringify(response.data, null, 2)}`);
  return response;
};

export const del = async (
  endpoint: string,
  data?: object,
  headers?: { [key: string]: string }
) =>
  returnLoggedResponse(
    await axios.delete(endpoint, {
      data,
      headers,
    }),
    endpoint,
    data
  );

export const getData = async (
  endpoint: string,
  params?: { [key: string]: string | number | boolean },
  headers?: { [key: string]: string },
  isBodyNotSecret = true
) =>
  returnLoggedResponse(
    await axios.get(endpoint, {
      headers,
      params,
    }),
    endpoint,
    params,
    isBodyNotSecret
  );

export const postData = async (
  endpoint: string,
  data?: object,
  headers?: { [key: string]: string },
  isBodyNotSecret = true
) =>
  returnLoggedResponse(
    await axios.post(endpoint, data, {
      headers,
    }),
    endpoint,
    data,
    isBodyNotSecret
  );

export const postForm = async (
  endpoint: string,
  form?: { [key: string]: string },
  headers?: { [key: string]: string },
  isBodyNotSecret = true
) =>
  returnLoggedResponse(
    await axios.post(endpoint, new URLSearchParams(form), {
      headers,
    }),
    endpoint,
    form,
    isBodyNotSecret
  );
