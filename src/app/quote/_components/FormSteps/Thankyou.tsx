import { PartyPopper } from "lucide-react";
import React from "react";

const ThankYou = () => {
  return (
    <div className="mx-auto mt-8 w-2/5">
      <h2 className="text-center text-4xl">
        Congrats on taking the next step towards a Smart Enegery home{" "}
        <PartyPopper className="inline h-12 w-12 text-red-600" />
      </h2>
      <p className="mt-8 text-center">
        We&apos;ll send you a curated report of your preferred Smart Energy plan
        that you can hand to out solar retailer.
      </p>
    </div>
  );
};

export default ThankYou;
