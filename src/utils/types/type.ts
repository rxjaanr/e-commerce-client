export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  login_tokens: string;
};

export type ProductType = {
  name: string;
  slug: string;
  desciption: string;
  category: string;
  price: number;
  qty: number;
  image: { url: string; imageId: string }[];
};
