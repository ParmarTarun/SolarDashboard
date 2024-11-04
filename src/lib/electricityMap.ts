import axios from "axios";
import { electricityMapBaseUrl, powerTypes } from "./utils";
import moment from "moment";

export const getZones = async (): Promise<string[]> => {
  const { data } = await axios.get<{ [key: string]: { zoneName: string } }>(
    `${electricityMapBaseUrl}/zones`,
  );
  //filter for US only & format the data
  const zones: string[] = Object.entries(data)
    .filter(([v]) => v.split("-")[0].toUpperCase() === "US")
    .map(([value, { zoneName }]) => {
      return value + "|" + zoneName; // format zone as string with label and value separated by delimiter
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
  console.log("fetching live");
  try {
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
  } catch (error) {
    let msg = "Failed to get live data";
    console.log(error);
    if (axios.isAxiosError(error)) {
      msg = error.response.data.error;
    }
    return {
      live: [],
      renewableAverage: 0,
      fossilFreeAverage: 0,
      lastUpdated: moment(Date.now()).calendar(),
      error: msg,
    };
  }
};
