import connectMongoDB from "@/server/db/db.config";
import Users from "@/server/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    connectMongoDB();
    const emailHasUsed = await Users.findOne({ email: body.email });
    if (emailHasUsed) {
      return NextResponse.json(
        {
          email: {
            name: "ValidatorError",
            message: "Email has used by another user",
            properties: {
              message: "Email has used by another user",
              type: "unique",
              path: "email",
            },
            kind: "unique",
            path: "email",
          },
        },
        { status: 422 }
      );
    }
    const user = new Users(body);
    await user.save();
    return NextResponse.json({ message: "Register Successs" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 422 });
  }
}
