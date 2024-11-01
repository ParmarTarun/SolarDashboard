import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormDataSchema } from "@/lib/schemas/QuoteForm";
import { formStepComponentProps } from "@/types";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";

interface Step1Props extends formStepComponentProps {
  setValue: UseFormSetValue<z.infer<typeof FormDataSchema>>;
  zoneValue: string;
}

const Step1: FC<Step1Props> = ({ register, errors, setValue, zoneValue }) => (
  <div className="animate-ease-in">
    <h2 className="text-base font-semibold leading-7 text-gray-900">
      Basic Information
    </h2>
    <p className="mt-1 text-sm leading-6 text-gray-600">
      Provide your personal details.
    </p>
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <Label
          htmlFor="firstName"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          First name
        </Label>
        <div className="mt-2">
          <Input type="text" id="name" {...register("name")} />
          {errors.name?.message && (
            <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>
      </div>

      <div className="sm:col-span-4">
        <Label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </Label>
        <div className="mt-2">
          <Input
            id="email"
            type="email"
            {...register("email")}
            autoComplete="email"
          />
          {errors.email?.message && (
            <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="sm:col-span-4">
        <Label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </Label>
        <div className="mt-2">
          <Select onValueChange={(v) => setValue("zone", v)} value={zoneValue}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select your zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          {errors.zone?.message && (
            <p className="mt-2 text-sm text-red-400">{errors.zone.message}</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Step1;
