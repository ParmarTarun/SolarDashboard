"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ZoneInput from "@/components/ZoneInput";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AccountModal = () => {
  const [accountName, setAccountName] = useState("");
  const [zone, setZone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleCreate = async () => {
    if (!accountName.trim() || !zone.trim()) {
      toast({
        title: "Invalid Input!",
        description: "Please check the inputs!",
      });
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("/api/account", {
        accountName,
        zone,
      });
      router.push(`/dashboard/${accountName}`);
    } catch (error) {
      console.log(error);
      toast({
        title: "Oops!",
        description: "Failed to create account.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>New Account</DialogTitle>
        <DialogDescription>
          Provide the following details to setup an account.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-4 gap-4 py-4">
        <div className="col-span-4">
          <Label htmlFor="name" className="text-right">
            Account Name
          </Label>
          <Input
            placeholder="Ex. Malibu House"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="name" className="text-right">
            Zone
          </Label>
          <ZoneInput zone={zone} setZone={(v: string) => setZone(v)} />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleCreate} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AccountModal;
