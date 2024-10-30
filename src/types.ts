export type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

export type ResponseType<T> = {
  error: null | string;
  data: T;
};
