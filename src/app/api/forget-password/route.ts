import prisma from "@/db";
import crypto from "crypto";
import sendEmail from "@/libs/email";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    return new NextResponse("Email doesn't exist.", { status: 400 });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const passwordResetExpires = Date.now() + 360000;

  existingUser.resetToken = passwordResetToken;
  existingUser.resetTokenExpiry = passwordResetExpires;
  const resetUrl = `localhost:3000/reset-password/${resetToken}`;
  const body = "Reset Password by clicking on following url: " + resetUrl;

  await sendEmail({
    to: email,
    subject: "Reset Password",
    text: body,
  })
    .then(
      () => new NextResponse("Reset password email is sent.", { status: 200 }),
    )
    .catch(async (error) => {
      existingUser.resetToken = null;
      existingUser.resetTokenExpiry = null;
      return new NextResponse("Failed sending email, try again", {
        status: 400,
      });
    });
}
