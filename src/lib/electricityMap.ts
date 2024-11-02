import axios from "axios";
import { electricityMapBaseUrl, powerTypes } from "./utils";
import { zone } from "@/types";
import moment from "moment";

export const getZones = async (): Promise<zone[]> => {
  const { data } = await axios.get<{ [key: string]: { zoneName: string } }>(
    `${electricityMapBaseUrl}/zones`,
  );

  const zones: zone[] = Object.entries(data).map(([value, { zoneName }]) => {
    return { name: zoneName, value: zoneName + " " + value };
  });

  return zones;
};

export const getPastPowerBreakdown = async (zone: string, source: string) => {
  const { data } = await axios.get(
    `${electricityMapBaseUrl}/power-breakdown/history?zone=${zone}`,
    {
      headers: {
        "auth-token": "3hkUc4lFDdhoP",
      },
    },
  );
  const records = data.history;
  let renewableAverage = 0;
  let fossilFreeAverage = 0;
  const history = records.map((record: any) => {
    const date = moment(record.datetime).format("LT");
    const produced = record.powerProductionBreakdown[source] || 0;
    const consumed = record.powerConsumptionBreakdown[source] || 0;
    renewableAverage += record.renewablePercentage;
    fossilFreeAverage += record.fossilFreePercentage;
    return {
      date,
      produced,
      consumed,
    };
  });
  renewableAverage /= history.length;
  fossilFreeAverage /= history.length;
  console.log({ history });
  return { history, renewableAverage, fossilFreeAverage };
};

export const getLivePowerBreakdown = async (zone: string) => {
  const { data } = await axios.get(
    `${electricityMapBaseUrl}/power-breakdown/latest?zone=${zone}`,
    {
      headers: {
        "auth-token": "3hkUc4lFDdhoP",
      },
    },
  );

  const live = powerTypes.map((type) => {
    return {
      type,
      produced: data.powerProductionBreakdown[type] || 0,
      consumed: data.powerConsumptionBreakdown[type] || 0,
    };
  });
  const renewableAverage = data.renewablePercentage;
  const fossilFreeAverage = data.fossilFreePercentage;
  const lastUpdated = moment(data.updatedAt).calendar();
  console.log({ live });

  return { live, renewableAverage, fossilFreeAverage, lastUpdated };
};
