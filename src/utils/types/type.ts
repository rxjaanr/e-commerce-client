export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  login_tokens: string;
};

export type ProductType = {
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  qty: number;
  images: { url: string; imageId: string }[];
  discount: number;
};

export interface iProducts extends ProductType {
  _id: string;
  likedBy: [];
  discount: number;
}
