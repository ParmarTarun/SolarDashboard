"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLivePowerBreakdown } from "@/lib/electricityMap";
import { Badge } from "@/components/ui/badge";
import LoadingPlaceholder from "../../../../components/LoadingPlaceholder";
import { CircleDot, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const chartConfig = {
  produced: {
    label: "Production",
    color: "hsl(var(--chart-1))",
  },
  consumed: {
    label: "Consumption",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface LivePowerChartProps {
  zone: string;
}

const LivePowerChart: FC<LivePowerChartProps> = ({ zone }) => {
  const { isLoading, data: liveData } = useQuery({
    queryKey: ["power-breakdown", "live", zone],
    queryFn: () => getLivePowerBreakdown(zone), // pass only the value
    staleTime: 3600000, // fetch every hour
  });

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle className="flex items-center text-2xl">
            <CircleDot className="mr-2 h-8 w-8 text-chart-1" /> Live Production
            / Consumption (in MW)
          </CardTitle>
          <CardDescription className="ml-10">
            Compare power production and consumption in your zone
          </CardDescription>
        </div>
        <Badge
          variant="outline"
          className="border border-primary text-lg font-semibold"
        >
          {liveData.lastUpdated}
        </Badge>
      </CardHeader>
      <CardContent>
        {liveData.error && (
          <Alert variant="destructive" className="mx-auto w-max">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>{liveData.error}</AlertDescription>
          </Alert>
        )}
        {!liveData.error && (
          <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
            <BarChart accessibilityLayer data={liveData.live}>
              <ChartLegend content={<ChartLegendContent />} />
              <CartesianGrid vertical={false} />
              <XAxis dataKey="type" tickLine={true} />
              <YAxis tickLine={true} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="produced" fill="var(--color-produced)" radius={4} />
              <Bar dataKey="consumed" fill="var(--color-consumed)" radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter>
        {!liveData.error && (
          <div className="flex w-full items-start gap-2">
            <div className="grid gap-2">
              <div className="flex items-center gap-4 text-lg font-semibold leading-none">
                <Badge variant="destructive" className="text-lg">
                  Renewable {liveData.renewableAverage.toPrecision(4)} %
                </Badge>
                <Badge variant="outline" className="text-lg">
                  Fossil Free {liveData.fossilFreeAverage.toPrecision(4)} %
                </Badge>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default LivePowerChart;
