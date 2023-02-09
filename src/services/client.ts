import axios, { AxiosResponse } from 'axios';
import { SERVER_URL } from './config';

const instance = axios.create({
  baseURL: SERVER_URL,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const request = {
  get: <T>(url: string) => instance.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => instance.post<T>(url, body).then(responseBody),
};
