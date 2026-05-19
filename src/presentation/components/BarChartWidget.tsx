import { memo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "./ChartContainer";

interface BarChartWidgetProps {
  data: { name: string; value: number }[];
  title: string;
  fill?: string;
  refreshKey?: number;
}

export const BarChartWidget = memo(
  ({ data, title, fill = "#f97316", refreshKey }: BarChartWidgetProps) => (
    <ChartContainer title={title}>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart key={`bar-${refreshKey}`} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Bar dataKey="value" fill={fill} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  ),
);
