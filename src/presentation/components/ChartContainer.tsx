import { memo } from "react";
import type { ReactNode } from "react";

interface ChartContainerProps {
  title: string;
  children: ReactNode;
}

export const ChartContainer = memo(
  ({ title, children }: ChartContainerProps) => (
    <div className="bg-white p-4 rounded-lg shadow-md h-64">
      <h3 className="font-semibold text-stone-700 mb-2">{title}</h3>
      {children}
    </div>
  ),
);
