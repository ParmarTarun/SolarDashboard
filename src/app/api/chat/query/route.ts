import { chatSession } from "@/lib/gemini";
import { formatQuery } from "@/lib/solarExpert";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId } = await auth();
  const { query } = await req.json();
  if (!query) {
    return new NextResponse("Query is missing", { status: 400 });
  }

  // if (!validateQuery(query as string)) {
  //   return NextResponse.json({
  //     message: "Looks like your query does not relate to my expertise. Sorry!",
  //   });
  // }

  const formattedQuery = formatQuery(query);

  const resp = await chatSession.sendMessage(formattedQuery);
  const reply = resp.response.text();
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

  return NextResponse.json({
    reply,
  });
};
