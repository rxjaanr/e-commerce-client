import productsController from "@/libs/mongoose/controllers/products.controller";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  productsController.updateProduct(req, res);
}
