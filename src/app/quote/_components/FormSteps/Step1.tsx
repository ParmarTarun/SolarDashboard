import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getZones } from "@/lib/electricityMap";
import { FormDataSchema } from "@/lib/schemas/QuoteForm";
import { formStepComponentProps, zone } from "@/types";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { SelectInput } from "../SelectInput";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

interface Step1Props extends formStepComponentProps {
  setValue: UseFormSetValue<z.infer<typeof FormDataSchema>>;
  zone: string;
}

const Step1: FC<Step1Props> = ({ register, errors, setValue, zone }) => {
  const { data: zones, isLoading } = useQuery({
    queryKey: ["zones"],
    queryFn: getZones,
  });

  return (
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
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Your name
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
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="sm:col-span-4">
          <Label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Zone
          </Label>
          {isLoading ? (
            <Loader className="animate-spin" />
          ) : (
            <div className="mt-2">
              <SelectInput
                options={zones}
                selectedValue={zone}
                id="zone"
                onSelect={(v) => setValue("zone", v)}
              />
              {errors.zone?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.zone.message}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1;
