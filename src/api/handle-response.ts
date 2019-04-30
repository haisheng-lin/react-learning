import { AxiosResponse } from 'axios';

interface ServerResponse {
  code: number;
  data: any;
  msg: string;
}

/**
 * 通过判断服务端的响应码决定是否抛出错误
 * 如果 code == '0' 说明没有错误，其他均为异常；错误信息在 message 字段
 *
 * @param {AxiosResponse} axiosResponse
 * @returns {any}
 */
export function handleResponse (axiosResponse: AxiosResponse): any {
  if (axiosResponse && axiosResponse.data) {
    const { code, msg, data } = axiosResponse.data as ServerResponse;
    if (code === 200) {
      return data;
    } else {
      throw new Error(msg);
    }
  } else {
    throw new Error('无任何响应数据');
  }
}
