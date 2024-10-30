import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquareMore, Send } from "lucide-react";
import { useState } from "react";
import { Message } from "@/types";
import { sendQuery } from "@/lib/solarExpert";
import { useToast } from "@/hooks/use-toast";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hello there! How can I help you today?",
      sender: "ai",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // handle the ctrl + enter key for better UX
    if (e.key === "Enter" && e.ctrlKey) {
      await handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    //TODO: scroll the scroll area to the bottom

    if (!inputMessage.length) return;
    // create new message
    const newMessage: Message = {
      id: messages.length, // mock id
      sender: "user",
      text: inputMessage,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    //TODO: rafactor to work with react-query and avoid maintaining loading state
    setIsLoading(true);
    const { data, error } = await sendQuery(inputMessage);
    if (error) {
      toast({
        title: "Oops",
        description: error,
      });
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          text: data,
          sender: "ai",
        },
      ]);
    }
    setIsLoading(false);

    // scroll up  (TODO: refactor & do better, avoid using query selector)
    setTimeout(() => {
      document
        .getElementById(`msg-${messages.length + 1}`)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  };

  return (
    <div className="flex h-[60vh] flex-col">
      <ScrollArea className="flex-grow space-y-4 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            id={`msg-${message.id}`}
            className={`flex ${
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
        {isLoading && (
          <div className="flex justify-start">
            <div className="my-2 max-w-[80%] rounded-lg bg-gray-200 p-2 text-gray-800">
              <MessageSquareMore className="animate-pulse" />
            </div>
          </div>
        )}
      </ScrollArea>
      <div className="flex items-center">
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
