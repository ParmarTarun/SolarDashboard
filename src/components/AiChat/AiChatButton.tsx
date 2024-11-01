"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

import Chat from "./Chat";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function AIChatButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button
            className={`fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg ${!isModalOpen && "animate-bounce"}`}
            aria-label="Open chat"
          >
            <Bot className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Solar Expert</DialogTitle>
          </DialogHeader>
          <Chat />
        </DialogContent>
      </Dialog>
    </QueryClientProvider>
  );
}
