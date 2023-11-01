import productsController from "@/libs/mongoose/controllers/products.controller";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT":
      productsController.updateProduct(req, res);
      break;
    case "DELETE":
      productsController.deleteProduct(req, res);
      break;
    default:
      res.send({ message: req.method + "Is Not SUpported" });
      break;
  }
}
