import axios from "axios";

axios.defaults.baseURL = "/api/";

export const registerHandler =
  (newData: any, callback: CallableFunction) => async (e: Event) => {
    e.preventDefault();
    await axios
      .post("/auth/register", newData)
      .then((res) => {
        callback(null, res);
      })
      .catch((err) => {
        callback(err);
      });
  };

export const loginHandler =
  (newData: any, callback: CallableFunction) => async (e: Event) => {
    e.preventDefault();
    await axios
      .post("/auth/login", newData)
      .then((res) => callback(null, res))
      .catch((err) => callback(err));
  };
