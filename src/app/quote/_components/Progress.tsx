import { formStep } from "@/types";
import React, { FC } from "react";

interface ProgressProps {
  steps: formStep[];
  currentStep: number;
}

const Progress: FC<ProgressProps> = ({ steps, currentStep }) => {
  return (
    <nav className="col-span-4 flex flex-col gap-12">
      <h2 className="text-4xl">Solar Estimator</h2>
      {steps.map((step, index) => (
        <div key={step.name}>
          {/* completed */}
          {currentStep > index + 1 && (
            <div className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-sky-600 transition-colors">
                {step.id}
              </span>
              <span className="text-sm font-medium">{step.name}</span>
            </div>
          )}
          {/* current */}
          {currentStep === index + 1 && (
            <div className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-sky-600">
                {step.id}
              </span>
              <span className="text-sm font-medium">{step.name}</span>
            </div>
          )}
          {/* to be completed */}
          {currentStep < index + 1 && (
            <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-gray-500 transition-colors">
                {step.id}
              </span>
              <span className="text-sm font-medium">{step.name}</span>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Progress;
