"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPastPowerBreakdown } from "@/lib/electricityMap";
import { powerType } from "@/types";
import { capitalize, createSelectOptions, powerTypes } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import LoadingPlaceholder from "../LoadingPlaceholder";
import { LightningBoltIcon } from "@radix-ui/react-icons";

const chartConfig = {
  consumed: {
    label: "Consumed",
    color: "hsl(var(--chart-1))",
  },
  produced: {
    label: "Production",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface HistoryPowerChartProps {
  zone: string;
}

const HistoryPowerChart: FC<HistoryPowerChartProps> = ({ zone }) => {
  const [powerType, setPowerType] = useState<powerType>("solar");
  const { isLoading, data: historyData } = useQuery({
    queryKey: ["power-breakdown", "history", zone, `${powerType}`],
    queryFn: () => getPastPowerBreakdown(zone, `${powerType}`),
    staleTime: 3600000, // 1 hour
  });

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <div className="w-max">
          <CardTitle className="flex text-2xl">
            <LightningBoltIcon className="mr-2 h-8 w-8 text-chart-1" />
            Power Production / Consumption (Last 24 hours in MW)
          </CardTitle>
          <CardDescription className="ml-10">
            Compare power production and consumption in your zone
          </CardDescription>
        </div>

        <Select
          onValueChange={(v) => setPowerType(v as powerType)}
          value={powerType}
        >
          <SelectTrigger className="w-[200px] text-lg">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Source</SelectLabel>
              {powerTypes.map((type) => (
                <SelectItem value={type} key={type}>
                  {capitalize(type)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
          <LineChart
            accessibilityLayer
            data={historyData.history}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <ChartLegend content={<ChartLegendContent />} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
            />
            <YAxis tickLine={true} axisLine={true} tickMargin={8} />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Line
              dataKey="produced"
              type="monotone"
              stroke="var(--color-produced)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="consumed"
              type="monotone"
              stroke="var(--color-consumed)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2">
          <div className="grid gap-2">
            <div className="flex items-center gap-4 text-lg font-semibold leading-none">
              <Badge variant="destructive" className="text-lg">
                Renewable {historyData.renewableAverage.toPrecision(4)} %
              </Badge>
              <Badge variant="outline" className="text-lg">
                Fossil Free {historyData.fossilFreeAverage.toPrecision(4)} %
              </Badge>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default HistoryPowerChart;
