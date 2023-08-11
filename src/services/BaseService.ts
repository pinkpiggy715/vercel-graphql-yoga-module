import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Header } from '../enums/shared.enum';
import { createHttpAgent, createHttpsAgent } from '../utils/httpAgents';
import Logger from '../utils/log';

export default class BaseService {
  private axiosInstance: AxiosInstance;

  public readonly name: string;

  constructor(name: string, axiosRequestConfig: AxiosRequestConfig) {
    this.name = name;
    this.axiosInstance = axios.create({
      httpAgent: createHttpAgent(),
      httpsAgent: createHttpsAgent(),
      ...axiosRequestConfig,
    });
    this.axiosConfig();
  }

  // TODO: ADFS Config
  request = async <T>({
    requestConfig,
    txId,
  }: {
    requestConfig: AxiosRequestConfig;
    txId: string;
  }): Promise<AxiosResponse<T>> => {
    await this.formatHeaders({ requestConfig, txId });
    try {
      return await this.axiosInstance.request(requestConfig);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  private formatHeaders = async ({
    requestConfig,
    txId,
  }: {
    requestConfig: AxiosRequestConfig;
    txId: string;
  }): Promise<void> => {
    if (!requestConfig.headers) {
      requestConfig.headers = {};
    }
    if (requestConfig.data && !requestConfig.headers[Header.CONTENT_TYPE]) {
      requestConfig.headers[Header.CONTENT_TYPE] = 'application/json';
    }
    requestConfig.headers[Header.X_REQUEST_ID] = txId;
  };

  private axiosConfig = () => {
    this.axiosInstance.interceptors.request.use((config) => {
      if (config.headers) {
        config.headers[Header.REQUEST_START_TIME] = Date.now();
      }
      Logger.logOutgoingRequest(config);
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => {
        const startTime = response.config.headers[Header.REQUEST_START_TIME];
        if (startTime) {
          response.headers[Header.REQUEST_DURATION] = Date.now() - Number(startTime);
        }
        Logger.logIncomingResponse(response);
        return response;
      },
      (error) => {
        Logger.logIncomingErrorResponse(
          error,
          (error?.config?.headers?.[Header.X_REQUEST_ID] || '') as string,
        );
        return error;
      },
    );
  };
}
