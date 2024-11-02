"use client";

import React from "react";
import HistoryPowerChart from "./_components/charts/HistoryPowerChart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LivePowerChart from "./_components/charts/LivePowerChart";
import ElectricityBillInfo from "./_components/ElectricityBillInfo";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-100 mx-auto mt-5 h-full w-4/5 py-8">
        <div className="flex items-center justify-between">
          <h2 className="mb-4 flex items-center text-3xl font-semibold text-primary">
            <DashboardIcon className="mr-4 h-8 w-8" />
            My Solar Dashboard
          </h2>
          <Badge variant="outline" className="text-lg">
            <p>Zone: US-NY-NYIS</p>
          </Badge>
        </div>

        <div className="grid w-full grid-cols-12 gap-8">
          <div className="col-span-12">
            <HistoryPowerChart zone="US-NY-NYIS" />
          </div>
          <div className="col-span-9">
            <LivePowerChart zone="US-NY-NYIS" />
          </div>
          <div className="col-span-3">
            <ElectricityBillInfo />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Dashboard;
