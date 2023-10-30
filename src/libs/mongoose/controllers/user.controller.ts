import Users from "../models/users.model";
import connectMongoDB from "../config/db.config";
import md5 from "md5";
import { NextApiRequest, NextApiResponse } from "next";

const userController: {
  login: (req: NextApiRequest, res: NextApiResponse) => any;
  register: (req: NextApiRequest, res: NextApiResponse) => any;
} = {
  login: async (req, res) => {
    if (req.method !== "POST") {
      return res
        .status(400)
        .json({ message: req.method + " Is Not Supported" });
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
          return res
            .status(401)
            .json({ message: "Email Or Password Incorrect" });
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
  },

  register: async (req, res) => {
    if (req.method !== "POST") {
      return res
        .status(400)
        .json({ message: req.method + " Is Not Supported" });
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
  },
};

export default userController;
