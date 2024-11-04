import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  accountName: z.string().min(1, { message: "Account name is required" }),
  zone: z.string().min(1, { message: "Zone is required" }),
});

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    const body = await req.json();

    schema.parse(body);

    const { accountName, zone } = body;

    await db.account.create({
      data: {
        accountName,
        zone,
        userId,
      },
    });
    revalidatePath("/dashboard");
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
