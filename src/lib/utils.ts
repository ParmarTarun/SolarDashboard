import { powerType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const electricityMapBaseUrl = "https://api.electricitymap.org/v3";

export const powerTypes: powerType[] = [
  "biomass",
  "coal",
  "gas",
  "geothermal",
  "hydro",
  "hydro discharge",
  "battery discharge",
  "nuclear",
  "oil",
  "solar",
  "wind",
];

// utility function to convert array to selectInput object
export const createSelectOptions = (arr: string[]) => {
  return arr.map((el) => {
    return {
      name: el,
      value: el,
    };
  });
};

// function to capitalize the first character
export const capitalize = (word: string): string => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};
