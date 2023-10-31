import productsController from "@/libs/mongoose/controllers/products.controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      productsController.getAllProduct(req, res);
      break;
    case "POST":
      productsController.addProduct(req, res);
      break;
    default:
      return res.status(404).json({
        message: req.method + "Is Not Supported",
      });
      break;
  }
}
