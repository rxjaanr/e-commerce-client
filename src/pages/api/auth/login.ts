import connectMongoDB from "@/libs/mongoose/config/db.config";
import Users from "@/libs/mongoose/models/users.model";
import md5 from "md5";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).json({ message: req.method + " Is Not Supported" });
  }
  const { email, password } = req.body;

  try {
    connectMongoDB();
    const errorValidations: {
      email?: {
        message?: string;
      };
      password?: {
        message?: string;
      };
    } = {};
    if (!email) {
      errorValidations.email = {
        message: "Path email is Required",
      };
    }
    if (!password) {
      errorValidations.password = {
        message: "Path password is required",
      };
    }
    if (!email || !password) {
      return res.status(422).json({ errors: errorValidations });
    }
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(422).json({ message: "Email Or Password Incorrect" });
    }
    user.comparePassword(password, function (err: Error, result: boolean) {
      if (!result) {
        return res.status(401).json({ message: "Email Or Password Incorrect" });
      }
      user.login_tokens = md5(user.name);
      user.save();
      return res.status(200).json({
        message: "Login Succesfully",
        data: {
          name: user.name,
          email: user.email,
          address: user.address,
          role: user.role,
          login_tokens: user.login_tokens,
        },
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
}
