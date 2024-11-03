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

export type powerType =
  | "biomass"
  | "coal"
  | "gas"
  | "geothermal"
  | "hydro"
  | "hydro discharge"
  | "battery discharge"
  | "nuclear"
  | "oil"
  | "solar"
  | "wind";

export type quoteFormtype = {
  name: string;
  email: string;
  zone: string;
  noOfPeople: number;
  hasSolarPanel: boolean;
  acRegularyUsed: boolean;
  swimminPool: boolean;
  electricVehicle: boolean;
  utilityBill: number;
  stayHome: boolean;
};
