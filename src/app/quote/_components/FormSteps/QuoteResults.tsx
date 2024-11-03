"use client";

import * as React from "react";
import {
  BatteryCharging,
  DollarSign,
  Droplets,
  ReceiptText,
  Sun,
  TimerIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PricingTier {
  icon: React.ReactNode[];
  name: string;
  description: string;
  savings: number;
  newBill: number;
  systemCost: number;
  paybackTime: number;
  details: string;
}

const pricingTiers: PricingTier[] = [
  {
    icon: [<Sun key={1} />],
    name: "Basic",
    description: "Solar (10 kW)",
    savings: 3020,
    newBill: -15,
    systemCost: 11000,
    paybackTime: 4,
    details:
      "The Basic plan is perfect for individuals and small teams just getting started. It provides essential features to help you manage your projects efficiently.",
  },
  {
    icon: [<Sun key={1} />, <BatteryCharging key={2} />],
    name: "Battery Powered",
    description: "Solar (10 kW) + Battery (3kWh)",
    savings: 3170,
    newBill: -30,
    systemCost: 15000,
    paybackTime: 5,
    details:
      "The Pro plan is designed for growing businesses that need more power and flexibility. It includes advanced features to help you scale your operations.",
  },
  {
    icon: [<Sun key={1} />, <Droplets key={3} />],
    name: "With Heat Pump",
    description: "Solar (10 kW) + Heat Pump",
    savings: 3260,
    newBill: -20,
    systemCost: 14000,
    paybackTime: 4,
    details:
      "The Enterprise plan is tailored for large organizations with complex needs. It offers unlimited resources and customization options to fit your specific requirements.",
  },
];

interface QuoteResultsProps {
  choosePlan: () => void;
}

const QuoteResults: React.FC<QuoteResultsProps> = ({ choosePlan }) => {
  return (
    <div className="mx-auto flex w-3/4 gap-4">
      {pricingTiers.map((tier) => (
        <Card
          key={tier.name}
          className="w-full hover:border-primary hover:shadow-lg"
        >
          <CardHeader className="flex">
            <div className="flex gap-2">
              {tier.icon.map((icon, i) => (
                <React.Fragment key={i}>{icon}</React.Fragment>
              ))}
            </div>
            <CardTitle className="text-2xl">{tier.name}</CardTitle>
            <CardDescription className="text-lg">
              {tier.description}
            </CardDescription>
            <hr className="w-4/5" />
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-3xl font-bold">
              ${tier.savings}
              <span className="ml-2 text-sm font-normal">Savings per year</span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center">
                <ReceiptText className="mr-2 h-5 w-5" />
                New Monthly Bill
                <Badge
                  variant="default"
                  className="ml-2 bg-green-400 text-primary"
                >
                  {tier.newBill}
                </Badge>
              </li>
              <li className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Approx. System Cost
                <Badge variant="destructive" className="ml-2">
                  ${tier.systemCost}
                </Badge>
              </li>
              <li className="flex items-center">
                <TimerIcon className="mr-2 h-5 w-5" />
                Payback time
                <Badge variant="default" className="ml-2">
                  {`${tier.paybackTime} years`}
                </Badge>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch">
            <Button className="mb-2 w-full" onClick={choosePlan}>
              Choose {tier.name}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export default QuoteResults;
