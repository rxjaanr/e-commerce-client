import axios from "axios";

const API = axios.create({
  baseURL: "http://c-server.vercel.app/api/v1",
});

export default API;
