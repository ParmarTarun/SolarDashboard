import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AccountModal from "./_components/AccountModal";

import Link from "next/link";

import { PlusCircle } from "lucide-react";
import AccountCard from "./_components/AccountCard";

const Dashboard = async () => {
  const { userId } = await auth();

  // one user can have multiple accounts
  const userAccounts = await db.account.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {userAccounts.map((account) => (
        <Link
          href={`/dashboard/${account.accountName}`}
          key={account.id}
          className="group"
        >
          <AccountCard account={account} />
        </Link>
      ))}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex h-full min-h-[200px] flex-col items-center justify-center bg-secondary text-lg text-primary hover:bg-primary hover:text-secondary">
            <PlusCircle className="mb-2 h-12 w-12" />
            Create Account
          </Button>
        </DialogTrigger>
        <AccountModal />
      </Dialog>
    </div>
  );
};

export default Dashboard;
