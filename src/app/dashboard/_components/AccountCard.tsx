"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalize } from "@/lib/utils";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import React, { FC } from "react";

interface AccountCardProps {
  account: {
    id: string;
    accountName: string;
    zone: string;
  };
}

const AccountCard: FC<AccountCardProps> = ({ account }) => {
  return (
    <Card className="flex h-[200px] flex-col justify-between transition-shadow hover:border-primary hover:shadow-lg">
      <CardHeader className="">
        <CardTitle className="text-xl transition-colors group-hover:text-primary">
          {capitalize(account.accountName)}
        </CardTitle>
        <Badge variant="default" className="text-md w-max">
          {account.zone.split("|")[1]}
        </Badge>
      </CardHeader>
      <CardFooter className="flex-row justify-end gap-4">
        {/* // TODO implement the api */}
        {/* <Button variant="outline" onClick={handleEditProject}>
          <Edit2Icon />
        </Button>
        <Button variant="destructive" onClick={handleDeleteProject}>
          <Trash2Icon />
        </Button> */}
      </CardFooter>
    </Card>
  );
};

export default AccountCard;
