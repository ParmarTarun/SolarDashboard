import { db } from "@/server/db";
import { Message } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { userId } = await auth();

  // start with default msg
  const conversation: Message[] = [
    { id: 0, sender: "ai", text: "Hello there! How can I help you today?" },
  ];

  // if user is logged in, add his chats
  if (userId) {
    const rows = await db.aiChat.findMany({
      where: {
        userId,
      },
    });
    conversation.push(
      ...rows.map((row, index) => {
        return {
          id: index + 1,
          sender: row.sender as Message["sender"],
          text: row.text,
        };
      }),
    );
  }
  return NextResponse.json({
    messages: conversation,
  });
};
