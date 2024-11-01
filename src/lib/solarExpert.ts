import axios from "axios";
import { Message } from "@/types";

export const validateQuery = (query: string): boolean => {
  return query.includes("solar");
};

export const sendQuery = async (query: string) => {
  const res = await axios.post<{ reply: string }>("/api/chat/query", {
    query,
  });
  return res.data;
};

export const fetchMessages = async () => {
  const resp = await axios.get<{ messages: Message[] }>("/api/chat");
  return resp.data.messages;
};

export const formatQuery = (query: string): string => {
  return query + ". Keep it brief and under 200 characters";
};
