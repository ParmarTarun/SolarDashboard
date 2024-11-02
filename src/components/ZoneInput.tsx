"use client";

import React, { FC, useEffect, useState } from "react";
import { getZones } from "@/lib/electricityMap";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

interface ZoneInputProps {
  zone: string;
  setZone: (v: string) => void;
}

const ZoneInput: FC<ZoneInputProps> = ({ zone, setZone }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [zones, setZones] = useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  // using basic fetch call instead of useQuery since we need to fetch only once (no need to use big guns for small problems)
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const res = await getZones();
        setZones(res);
      } catch (e) {
        console.log(e);
        toast({
          title: "Oops! An Error Occurred",
          description: "Failed to get zones",
        });
        setZones([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between overflow-clip"
        >
          {zone
            ? capitalize(zones.find((option) => option === zone).split("|")[1])
            : `Select a zone`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder={`Search...`} />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {zones.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    setOpen(false);
                    setZone(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-lg",
                      zone === option ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {capitalize(option.split("|")[1])}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ZoneInput;
