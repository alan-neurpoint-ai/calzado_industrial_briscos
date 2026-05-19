import { memo } from "react";

const MetricCard = memo(
  ({ title, value }: { title: string; value: string | number }) => (
    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
      <p className="text-stone-500 text-sm">{title}</p>
      <p className="text-2xl font-bold text-stone-800">{value}</p>
    </div>
  ),
);

interface MetricCardsProps {
  metrics: {
    totalLeads: number;
    conversacionesLogradas: number;
    pendientes: number;
    interesados: number;
  };
  loading: boolean;
}

export const MetricCards = memo(({ metrics, loading }: MetricCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <MetricCard
        title="Total Leads"
        value={loading ? "..." : metrics.totalLeads}
      />
      <MetricCard
        title="Conversaciones Logradas"
        value={loading ? "..." : metrics.conversacionesLogradas}
      />
      <MetricCard
        title="Pendientes"
        value={loading ? "..." : metrics.pendientes}
      />
      <MetricCard
        title="Interesados"
        value={loading ? "..." : metrics.interesados}
      />
    </div>
  );
});
