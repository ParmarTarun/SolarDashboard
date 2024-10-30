import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import Link from "next/link";
import React from "react";

const navLinks = [
  { label: "What it does?", to: "/details" },
  { label: "Pricing", to: "/pricing" },
  { label: "Get a quote", to: "/quote" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between bg-primary px-4 text-secondary lg:px-6">
      <Link className="flex items-center justify-center" href="/">
        <Sun className="h-8 w-8 text-yellow-500" />
        <span className="ml-2 flex items-center gap-1 text-3xl font-bold">
          EXERGI
        </span>
      </Link>
      <nav className="flex gap-4 sm:gap-6">
        {navLinks.map((nav) => (
          <Link
            className="text-lg font-medium underline-offset-4 hover:underline"
            href={nav.to}
          >
            {nav.label}
          </Link>
        ))}
      </nav>
      <Button variant={"secondary"}>Login</Button>
    </header>
  );
};

export default Header;
