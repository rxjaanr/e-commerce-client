import connectMongoDB from "@/libs/mongoose/config/db.config";
import Users from "@/libs/mongoose/models/users.model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).json({ message: req.method + " Is Not Supported" });
  }
  const { name, email, password, address } = req.body;
  interface iData {
    name: string;
    address: string;
    email: string;
    password: string;
  }
  const data: iData = {
    name: name,
    address: address,
    email: email,
    password: password,
  };
  try {
    connectMongoDB();
    const emailHasUsed = await Users.findOne({ email: email });
    if (emailHasUsed) {
      return res.status(422).json({
        errors: {
          email: {
            message: "Email Has Been Used by Another User",
          },
        },
      });
    }
    const user = await new Users(data);
    await user.save();
    res.status(200).json({ message: "Register Success" });
  } catch (error) {
    return res.status(422).json(error);
  }
}
