import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormDataSchema } from "./lib/schemas/QuoteForm";
import { z } from "zod";

export type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

export type formStep = {
  id: string;
  name: string;
  fields?: string[];
};

export type formStepComponentProps = {
  register: UseFormRegister<z.infer<typeof FormDataSchema>>;
  errors: FieldErrors<z.infer<typeof FormDataSchema>>;
};

export type zone = {
  name: string;
  value: string;
};
