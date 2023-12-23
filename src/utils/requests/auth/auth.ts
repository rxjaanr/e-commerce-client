import { AxiosRequestConfig } from "axios";
import API from "../config";

export const authHandler = ({
  type,
  data,
  options,
}: {
  type: string;
  data: {} | any;
  options: AxiosRequestConfig;
}) => {
  return API.post(`/auth/${type}`, data, options ?? null);
};
