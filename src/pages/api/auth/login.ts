import userController from "@/libs/mongoose/controllers/user.controller";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  userController.login(req, res);
}
