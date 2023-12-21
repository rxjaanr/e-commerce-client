import axios from "axios";

const ClientAPI = axios.create({ baseURL: "/api" });

export default ClientAPI;
