import { AxiosRequestConfig } from "axios";
import { ProductType } from "../../types/type";
import API from "../config";

export const getProducts = async (option?: AxiosRequestConfig) => {
  return API.get("/product", option ?? {});
};

export const getProduct = async (slug: string) => {
  return API.get("/product/" + slug);
};

export const createProduct = async ({
  data,
  token,
}: {
  data: ProductType;
  token: string;
}) => {
  return API.post("/product", data, {
    headers: {
      Authorization: token,
    },
  });
};

export const updateProduct = async ({
  slug,
  data,
  token,
}: {
  slug: string;
  data: any;
  token: string;
}) => {
  return API.put("/product/" + slug, data, {
    headers: {
      Authorization: token,
    },
  });
};
