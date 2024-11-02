"use client";

import React, { FC } from "react";
import HistoryPowerChart from "./charts/HistoryPowerChart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LivePowerChart from "./charts/LivePowerChart";
import ElectricityBillInfo from "./ElectricityBillInfo";

interface ChartsGridProps {
  zone: string;
}

const ChartsGrid: FC<ChartsGridProps> = ({ zone }) => {
  const zoneValue = zone.split("|")[0]; // get only value

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <HistoryPowerChart zone={zoneValue} />
        </div>
        <div className="col-span-9">
          <LivePowerChart zone={zoneValue} />
        </div>
        <div className="col-span-3">
          <ElectricityBillInfo />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default ChartsGrid;
