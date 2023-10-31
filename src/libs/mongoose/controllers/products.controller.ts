import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "../config/db.config";
import Users from "../models/users.model";
import Products from "../models/products.model";

type Data = {
  name: string;
  description: string;
  category: string;
  price: string;
  stock: string;
  url?: string;
};
const productsController: {
  addProduct: (req: NextApiRequest, res: NextApiResponse) => any;
  updateProduct: (req: NextApiRequest, res: NextApiResponse) => any;
  getAllProduct: (req: NextApiRequest, res: NextApiResponse) => any;
} = {
  addProduct: async (req, res) => {
    try {
      await connectMongoDB();
      const user = await Users.findOne({
        login_tokens: req.query?.token,
      });
      if (!user || !req.query.token) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      const { name, description, category, price, stock } = req.body;
      const data: Data = {
        name: name,
        description: description,
        category: category,
        price: price,
        stock: stock,
      };
      const products = await new Products(data).save();
      if (products) {
        res.status(200).json({
          message: products,
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  },
  updateProduct: async (req, res) => {
    try {
      await connectMongoDB();
      const user = await Users.findOne({
        login_tokens: req.query?.token,
      });
      if (!user || !req.query.token) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      const { id, url } = req.body;

      const products = await Products.findOneAndUpdate(
        { _id: id },
        {
          url: url,
        }
      );
      if (products) {
        return res.status(200).json({
          message: "Product Updated",
        });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getAllProduct: async (req, res) => {
    try {
      await connectMongoDB();
      const user = await Users.findOne({
        login_tokens: req.query?.token,
      });
      if (!user || !req.query.token) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      const products = await Products.find();
      if (products.length === 0) {
        return res.status(400).json({
          message: "Product Not Found",
        });
      }
      return res.status(200).json({
        data: products,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

export default productsController;
