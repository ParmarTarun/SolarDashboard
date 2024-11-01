import axios from "axios";
import { electricityMapBaseUrl } from "./utils";
import { zone } from "@/types";

export const getZones = async (): Promise<zone[]> => {
  const { data } = await axios.get<{ [key: string]: { zoneName: string } }>(
    `${electricityMapBaseUrl}/zones`,
  );

  const zones: zone[] = Object.entries(data).map(([value, { zoneName }]) => {
    return { name: zoneName, value: zoneName + " " + value };
  });

  return zones;
};
