import axios from "axios";

axios.defaults.baseURL = "/api/";

export const registerHandler = async (newData: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/register", newData)
      .then((res) => resolve(res as any))
      .catch((err) => reject(err));
  });
};

export const loginHandler = (newData: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/login", newData)
      .then((res) => resolve(res as any))
      .catch((err) => reject(err));
  });
};
