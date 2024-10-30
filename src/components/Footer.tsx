import { DividerVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 SOLAR. All rights reserved.
      </p>
      <span>
        <DividerVerticalIcon />
      </span>
      <nav className="flex gap-4 sm:gap-6">
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Privacy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
