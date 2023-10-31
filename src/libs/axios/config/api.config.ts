import axios from "axios";

axios.defaults.baseURL = "/api/";

export const registerHandler = async ({ newData }: { newData: any }) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/register", newData)
      .then((res) => resolve(res as any))
      .catch((err) => reject(err));
  });
};

export const loginHandler = ({ newData }: { newData: any }) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/login", newData)
      .then((res) => resolve(res as any))
      .catch((err) => reject(err));
  });
};

export const addProductHandler = ({
  newData,
  token,
}: {
  newData: any;
  token: string;
}) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/products", newData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => resolve(res as any))
      .catch((err) => reject(err));
  });
};

export const updateProductHandler = ({
  newData,
  token,
  id,
}: {
  newData: any;
  token: string;
  id: string;
}) => {
  return new Promise((resolve, reject) => {
    axios
      .put("/products/" + id, newData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => resolve(res as any))
      .catch((err) => reject(err));
  });
};

export const getAllProductHandler = ({ token }: { token: string }) => {
  return new Promise((resolve, reject) => {
    axios
      .get("/products", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => resolve(res as any))
      .catch((err) => reject(err));
  });
};
