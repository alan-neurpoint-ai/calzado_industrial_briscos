import { memo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "./ChartContainer";

interface AreaChartWidgetProps {
  data: { name: string; value: number }[];
  title: string;
  refreshKey?: number;
}

export const AreaChartWidget = memo(
  ({ data, title, refreshKey }: AreaChartWidgetProps) => (
    <ChartContainer title={title}>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart key={`area-${refreshKey}`} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#f97316"
            fill="#fed7aa"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  ),
);
