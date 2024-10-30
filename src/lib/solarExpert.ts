import axios from "axios";
import { ResponseType } from "@/types";

export const validateQuery = (query: string): boolean => {
  return query.includes("solar");
};

export const sendQuery = async (query: string) => {
  const resp: ResponseType<string> = {
    data: "",
    error: null,
  };

  try {
    const { data } = await axios.post("/api/chat/query", {
      query,
    });
    resp.data = data.message;
  } catch (e) {
    console.log(e);
    resp.error = "Failed to get a reply";
    if (axios.isAxiosError(e) && e.response?.data) {
      resp.error = e.response?.data;
    }
  }
  return resp;
};
