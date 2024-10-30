import { validateQuery } from "@/lib/solarExpert";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { query } = await req.json();
  if (!query) {
    return new NextResponse("Query is missing", { status: 400 });
  }

  if (!validateQuery(query as string)) {
    return NextResponse.json({
      message: "Looks like your query does not relate to my expertise. Sorry!",
    });
  }

  return NextResponse.json({
    message: "Let me think...",
  });
};
