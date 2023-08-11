import appConfig from "../configs";
import * as types from "../interfaces/services/JSONPlaceholder.interface";
import BaseService from "./BaseService";

export default class JsonPlaceholder extends BaseService {
  constructor() {
    super("User", {
      baseURL: appConfig.serviceURLs.userService,
    });
  }

  health = async (txId: string) =>
    this.request({
      requestConfig: {
        url: "/",
      },
      txId,
    });

  getPostByPostId = async (txId: string, postId: number) =>
    this.request<types.getPostByPostIdResponse>({
      requestConfig: {
        url: `/posts/${postId}`,
      },
      txId,
    });

  getPostByUserId = async (txId: string, userId: number) =>
    this.request<types.getPostByUserIdResponse>({
      requestConfig: {
        params: {
          userId,
        },
        url: `/posts`,
      },
      txId,
    });

  getUserByUserId = async (txId: string, userId: number) =>
    this.request<types.getUserByUserIdResponse>({
      requestConfig: {
        url: `/users/${userId}`,
      },
      txId,
    });
}
