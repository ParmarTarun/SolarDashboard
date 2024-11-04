import React from "react";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";
import ChartsGrid from "../_components/ChartsGrid";

const AccountDashboard = async ({ params }) => {
  const { userId } = await auth();
  const { accountNameSlug } = params;
  const accountName = decodeURIComponent(accountNameSlug);

  const account = await db.account.findUnique({
    where: {
      userId_accountName: {
        userId,
        accountName,
      },
    },
  });

  if (!account) {
    return (
      <h1>
        No such account{userId}
        {accountName}
      </h1>
    );
  }

  return (
    <>
      <div className="my-4 flex items-center justify-between">
        <Badge variant="secondary" className="text-lg">
          <p>{account.zone.split("|")[1]}</p>
        </Badge>
      </div>
      <ChartsGrid zone={account.zone} />
    </>
  );
};

export default AccountDashboard;
