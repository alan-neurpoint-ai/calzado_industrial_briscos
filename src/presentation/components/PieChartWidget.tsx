import { memo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer } from "./ChartContainer";

const COLORS = ["#f97316", "#fb923c", "#fdba74", "#fed7aa", "#ffedd5"];

interface PieChartWidgetProps {
  data: { name: string; value: number }[];
  title: string;
  refreshKey?: number;
}

export const PieChartWidget = memo(
  ({ data, title, refreshKey }: PieChartWidgetProps) => (
    <ChartContainer title={title}>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            key={`pie-${refreshKey}`}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
            labelLine={{ strokeWidth: 1 }}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  ),
);
