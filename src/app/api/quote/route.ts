import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  zone: z.string().min(1, { message: "Zone is required" }),
  noOfPeople: z.number(),
  hasSolarPanel: z.boolean(),
  acRegularyUsed: z.boolean(),
  swimminPool: z.boolean(),
  electricVehicle: z.boolean(),
  utilityBill: z
    .number()
    .positive({ message: "Utility bill amount must be positive" }),
  stayHome: z.boolean(),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    schema.parse(body);

    const {
      name,
      email,
      zone,
      noOfPeople,
      hasSolarPanel,
      acRegularyUsed,
      swimminPool,
      electricVehicle,
      utilityBill,
      stayHome,
    } = body;

    await db.quote.create({
      data: {
        name,
        email,
        zone,
        noOfPeople,
        hasSolarPanel,
        acRegularyUsed,
        swimminPool,
        electricVehicle,
        utilityBill,
        stayHome,
      },
    });
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
