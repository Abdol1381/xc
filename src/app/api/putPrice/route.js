import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { address, amount } = await req.json();
    await dbConnect();

    const updatedUser = await UsersModel.findOneAndUpdate(
      { address },
      { $inc: { price: -amount } }
    );

    revalidatePath("/withdraw", "page");

    return NextResponse.json({
      message: "successful decrement from price",
      updatedUser,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
