"use client";

import { useMemo, useState } from "react";

import { z } from "zod";
import { FormDataSchema } from "@/lib/schemas/QuoteForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import Progress from "./Progress";
import Step1 from "./FormSteps/Step1";
import Step2 from "./FormSteps/Step2";
import Step3 from "./FormSteps/Step3";
import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Basic Information",
    fields: ["name", "email", "zone"],
  },
  {
    id: "Step 2",
    name: "Address",
    fields: ["country", "state", "city", "street", "zip"],
  },
  { id: "Step 3", name: "Complete" },
];

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const queryClient = new QueryClient();

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });
  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep - 1].fields;
    // validate
    const output = await trigger(fields as FieldName[], { shouldFocus: true });
    if (!output) return;

    if (currentStep === steps.length) {
      handleSubmit(processForm);
    } else {
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto mt-12 grid grid-cols-12 gap-8">
        <Progress steps={steps} currentStep={currentStep} />
        <div className="col-span-8">
          <form onSubmit={handleSubmit(processForm)}>
            {currentStep === 1 && (
              <Step1
                errors={errors}
                register={register}
                setValue={setValue}
                zone={getValues("zone")}
              />
            )}

            {currentStep === 2 && <Step2 errors={errors} register={register} />}

            {currentStep === 3 && <Step3 />}
          </form>

          <div className="mt-8 pt-5">
            <div className="flex gap-4">
              <Button type="button" onClick={prev} disabled={currentStep === 1}>
                Back
              </Button>
              <Button
                type="button"
                onClick={next}
                disabled={currentStep === steps.length}
              >
                NEXT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
