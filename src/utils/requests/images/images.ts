import API from "../config";

export const uploadImage = async ({
  data,
  token,
}: {
  data: any;
  token: string;
}) => {
  return API.post("/images", data, {
    headers: {
      Authorization: token,
    },
  });
};
