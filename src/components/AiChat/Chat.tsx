import React, { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, MessageSquareMore, Send } from "lucide-react";
import { useState } from "react";
import { fetchMessages, sendQuery } from "@/lib/solarExpert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Chat = () => {
  const queryClient = useQueryClient();
  const [inputMessage, setInputMessage] = useState("");
  const { toast } = useToast();
  const { userId } = useAuth();

  const { isLoading: chatLoading, data: messages } = useQuery({
    queryKey: ["aichat"],
    queryFn: fetchMessages,
    staleTime: Infinity,
  });
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: sendQuery,
    onSuccess: ({ reply }) => {
      setInputMessage("");
      // add ai reply in the chat
      queryClient.setQueryData(
        ["aichat"],
        [
          ...messages,
          {
            id: messages.length,
            text: reply,
            sender: "ai",
          },
        ],
      );
    },
    onError: (error) => {
      toast({
        title: "Oops",
        description: error.message,
      });
    },
  });
  const lastMsgElement = Array.from(
    document.getElementsByClassName("chatmsg"),
  ).pop();
  lastMsgElement?.scrollIntoView({ behavior: "smooth" });

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // handle the ctrl + enter key for better UX
    if ((e.key === "Enter" && e.ctrlKey) || e.key === "Enter") {
      await handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.length) return;
    // add users message in the chat
    queryClient.setQueryData(
      ["aichat"],
      [
        ...messages,
        { id: messages.length, sender: "user", text: inputMessage },
      ],
    );
    sendMessage(inputMessage);
  };

  useEffect(() => {
    if (!userId) {
      toast({
        title: "A Tip",
        description: "Log In to retain your chats!",
      });
    }
  }, []);

  return (
    <div className="flex h-[60vh] flex-col">
      <ScrollArea className="flex-grow space-y-4 p-4">
        {chatLoading && <Loader className="mx-auto animate-spin" />}
        {!chatLoading &&
          messages.map((message) => (
            <div
              key={message.id}
              className={`chatmsg flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`my-2 max-w-[80%] rounded-lg p-2 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        {isPending && (
          <div className="flex justify-start">
            <div className="my-2 max-w-[80%] rounded-lg bg-gray-200 p-2 text-gray-800">
              <MessageSquareMore className="animate-pulse" />
            </div>
          </div>
        )}
      </ScrollArea>
      <div className="mt-2 flex items-center">
        <Input
          type="text"
          placeholder="Ask anything about solar tech..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow"
        />
        <Button onClick={handleSendMessage} className="ml-2">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
