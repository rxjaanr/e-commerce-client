import ClientAPI from "./api.config";

export const authHandler = ({
  type,
  data,
}: {
  type: "register" | "login";
  data: {} | any;
}) => {
  return ClientAPI.post(`/auth/${type}`, data);
};
