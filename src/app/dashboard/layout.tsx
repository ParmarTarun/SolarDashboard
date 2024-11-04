"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { capitalize } from "@/lib/utils";
import { ChevronRight, HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <div className="h-100 mx-auto mt-5 w-full py-8">
      <Breadcrumb className="flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={"/"} aria-label="Dashboard">
              <HomeIcon className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          {paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join("/")}`;
            const isLast = index === paths.length - 1;
            const title = capitalize(decodeURIComponent(path));

            return (
              <React.Fragment key={path}>
                <BreadcrumbItem className="text-lg font-semibold">
                  {isLast ? (
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      {children}
    </div>
  );
};

export default DashboardLayout;
