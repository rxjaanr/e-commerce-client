import userController from "@/libs/mongoose/controllers/user.controller";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).json({ message: req.method + " Is Not Supported" });
  }
  userController.register(req, res);
}
