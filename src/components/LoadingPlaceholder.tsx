import { Skeleton } from "@/components/ui/skeleton";
import React, { FC } from "react";

interface LoadingPlaceholderProps {
  height?: number;
}

const LoadingPlaceholder: FC<LoadingPlaceholderProps> = ({ height = 30 }) => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[400px] w-full rounded-xl" />
    </div>
  );
};

export default LoadingPlaceholder;
