"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormContext } from "@/hooks/use-quote-form";
import { quoteFormtype } from "@/types";
import BasicDetails from "./FormSteps/BasicDetails";
import HouseholdDetails from "./FormSteps/HouseholdDetails";
import { Badge } from "@/components/ui/badge";
import { Loader, MoveRight } from "lucide-react";
import UtilityDetails from "./FormSteps/UtilityDetails";
import QuoteResults from "./FormSteps/QuoteResults";
import ThankYou from "./FormSteps/Thankyou";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const formInitialValues = {
  name: "",
  email: "",
  acRegularyUsed: false,
  electricVehicle: false,
  hasSolarPanel: false,
  noOfPeople: 1,
  stayHome: false,
  swimminPool: false,
  utilityBill: 50,
  zone: "",
};

const QuoteForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<quoteFormtype>(formInitialValues);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const steps = [
    { title: "Personal Information", component: <BasicDetails /> },
    { title: "Household Information", component: <HouseholdDetails /> },
    { title: "Utitlity Details", component: <UtilityDetails /> },
    {
      title: "Your Results",
      component: <QuoteResults choosePlan={() => setCompleted(true)} />,
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // final step
    if (step === 2) {
      setLoading(true);
      try {
        await axios.post("/api/quote", formData);
        handleNext();
      } catch (e) {
        console.log(e);
        toast({
          title: "Oops!",
          description: "Failed to submit your details.",
        });
      } finally {
        setLoading(false);
      }
    } else {
      handleNext();
    }
  };

  const handleReset = () => {
    setFormData(formInitialValues);
    setStep(0);
    setCompleted(false);
  };

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-4xl font-semibold">Price Estimator</h2>
        <Button variant="destructive" onClick={handleReset}>
          RESET
        </Button>
      </div>
      <Card className="min-h-[70vh]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="mx-auto my-2 flex gap-4">
              {steps.map((el, i) => {
                let style = "text-lg font-medium border-primary";
                if (i <= step) {
                  // if completed or current
                  style += " bg-primary text-secondary";
                }
                return (
                  <div key={i} className="flex items-center gap-4">
                    <Badge variant="outline" className={style}>
                      {el.title}
                    </Badge>
                    {i < steps.length - 1 && <MoveRight />}
                  </div>
                );
              })}
            </CardTitle>
          </CardHeader>
          {completed ? (
            <ThankYou />
          ) : (
            <CardContent className="flex-1 flex-grow">
              <div className="mx-auto h-full w-1/2">
                <h2 className="mb-4 text-2xl font-semibold">
                  {steps[step].title}
                </h2>
                <hr className="mb-4 border-primary" />
              </div>
              {steps[step].component}
            </CardContent>
          )}
          {step <= 2 && (
            <CardFooter className="mx-auto flex w-1/2 justify-center gap-6">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
              )}
              <Button type="submit" disabled={loading}>
                {step === 2 ? (
                  <>
                    {loading && <Loader className="animate-spin" />}
                    Submit
                  </>
                ) : (
                  "Next"
                )}
              </Button>
            </CardFooter>
          )}
        </form>
      </Card>
    </FormContext.Provider>
  );
};
export default QuoteForm;
