import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId } = await auth();
  const { accountName, zone } = await req.json();

  // TODO: Error handling
  await db.account.create({
    data: {
      accountName,
      zone,
      userId,
    },
  });
  revalidatePath("/dashboard");
  return NextResponse.json({ message: "success" }, { status: 200 });
};
