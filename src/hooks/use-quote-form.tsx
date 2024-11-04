import { quoteFormtype } from "@/types";
import { createContext, useContext } from "react";

//minimal formcontext for now

export const FormContext = createContext<
  | {
      formData: quoteFormtype;
      setFormData: React.Dispatch<React.SetStateAction<quoteFormtype>>;
    }
  | undefined
>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
