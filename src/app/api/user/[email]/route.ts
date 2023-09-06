import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const {
    params: { email },
  } = req;
  console.log(email);
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    console.log({ user });
    return NextResponse.json(
      { data: user },
      { message: "Sucessfully found user" },
      { status: 200 },
    );
  } catch (error) {
    console.log("Failed to get user.", error);
  }
}
