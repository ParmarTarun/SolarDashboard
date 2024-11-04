import { chatSession } from "@/lib/gemini";
import { formatQuery } from "@/lib/solarExpert";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  query: z.string().min(1, { message: "Query can not be empty" }),
});

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    const body = await req.json();

    schema.parse(body);

    const { query } = body;

    // Validate query based on business logic
    // if (!validateQuery(query as string)) {
    //   return NextResponse.json({
    //     message: "Looks like your query does not relate to my expertise. Sorry!",
    //   });
    // }

    // format query for better prompt to gemini
    const formattedQuery = formatQuery(query);

    const resp = await chatSession.sendMessage(formattedQuery);
    const reply = resp.response.text();

    // save query and reply in case the user is logged in
    if (userId) {
      await db.aiChat.createMany({
        data: [
          {
            sender: "user",
            text: query,
            userId,
          },
          { sender: "ai", text: reply, userId: userId },
        ],
      });
    }

    return NextResponse.json({ reply });
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
