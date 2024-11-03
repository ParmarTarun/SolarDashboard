import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import React from "react";

// mock data
const billInfo = [
  { month: "October", usage: 460, cost: 55.2 },
  { month: "September", usage: 480, cost: 57.6 },
  { month: "August", usage: 520, cost: 62.4 },
  { month: "July", usage: 500, cost: 60.0 },
  { month: "June", usage: 475, cost: 57.0 },
  { month: "May", usage: 450, cost: 54.0 },
  { month: "April", usage: 426.9, cost: 52.7 },
  { month: "March", usage: 400, cost: 48.0 },
  { month: "February", usage: 300, cost: 36.0 },
  { month: "January", usage: 350, cost: 42.0 },
  { month: "December", usage: 420, cost: 50.4 },
  { month: "November", usage: 440, cost: 52.8 },
];
const ElectricityBillInfo = () => {
  const latest = billInfo[0];
  return (
    <Card className="h-[550px]">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-xl">My Electricity Bill</CardTitle>
        <Badge variant="destructive" className="text-md">
          {latest.month}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="w-max text-3xl font-bold text-chart-2">
            ${latest.cost}
          </h2>
          <span className="ml-4 text-2xl text-chart-1">
            ({latest.usage} kWh)
          </span>
        </div>
        <ScrollArea className="h-[400px] flex-grow space-y-4 p-4">
          {billInfo.slice(1).map((bill, i) => (
            <Accordion type="single" collapsible key={bill.month}>
              <AccordionItem value={`item-${i}`}>
                <AccordionTrigger className="hover:no-underline">
                  <Badge variant="destructive">{bill.month}</Badge>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-4">
                    <h4 className="text-md font-semibold text-chart-1">
                      Cost: ${bill.cost}
                    </h4>{" "}
                    <DividerVerticalIcon height={24} />
                    <p className="text-md font-semibold text-chart-2">
                      Usage: {bill.usage} kWh
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ElectricityBillInfo;
