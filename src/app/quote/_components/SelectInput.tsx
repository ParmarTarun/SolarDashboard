"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { capitalize, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SelectInputProps {
  name: string;
  selectedValue?: string;
  onSelect: (v: string) => void;
  options: { name: string; value: string }[];
}

export const SelectInput: React.FC<SelectInputProps> = ({
  name,
  onSelect,
  options,
  selectedValue,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-lg"
        >
          {selectedValue
            ? capitalize(
                options.find((option) => option.value === selectedValue)?.name,
              )
            : `Select ${name}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search...`} />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    // setValue(currentValue);
                    setOpen(false);
                    onSelect(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-lg",
                      selectedValue === framework.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {capitalize(framework.name)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
