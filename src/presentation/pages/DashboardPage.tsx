import { useState, useMemo, useCallback } from "react";
import { Topbar } from "../components/Topbar";
import { Footer } from "../components/Footer";
import { MetricCards } from "../components/MetricCards";
import {
  BarChartWidget,
  PieChartWidget,
  AreaChartWidget,
} from "../components/Charts";
import { LeadsTable } from "../components/LeadsTable";
import {
  useDashboard,
  calculateMetrics,
  calculateStatusChart,
  calculateInteresChart,
  calculateCallsByMonth,
  calculateObjecionesChart,
} from "../hooks/useDashboard";

const ITEMS_PER_PAGE = 10;

export const DashboardPage = () => {
  const { allLeads, tableLeads, loading, chartLoading, error, fetchChartData } =
    useDashboard();
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(async () => {
    setRefreshKey((k) => k + 1);
    await fetchChartData();
  }, [fetchChartData]);

  const totalPages = Math.max(1, Math.ceil(tableLeads.length / ITEMS_PER_PAGE));

  const goToPrevPage = useCallback(
    () => setCurrentPage((p) => Math.max(1, p - 1)),
    [],
  );
  const goToNextPage = useCallback(
    () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
    [totalPages],
  );

  const metrics = useMemo(() => calculateMetrics(allLeads), [allLeads]);
  const statusChartData = useMemo(
    () => calculateStatusChart(allLeads),
    [allLeads],
  );
  const interesChartData = useMemo(
    () => calculateInteresChart(allLeads),
    [allLeads],
  );
  const callsByMonth = useMemo(
    () => calculateCallsByMonth(allLeads),
    [allLeads],
  );
  const objecionesChartData = useMemo(
    () => calculateObjecionesChart(allLeads),
    [allLeads],
  );

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Topbar onRefresh={handleRefresh} refreshing={chartLoading} />

      <main className="flex-1 p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            Error: {error}
          </div>
        )}

        <MetricCards metrics={metrics} loading={loading} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <BarChartWidget
            data={callsByMonth}
            title="Llamadas por Mes"
            refreshKey={refreshKey}
          />
          <PieChartWidget
            data={statusChartData}
            title="Estado Procesos"
            refreshKey={refreshKey}
          />
          <AreaChartWidget
            data={interesChartData}
            title="Interés del Cliente"
            refreshKey={refreshKey}
          />
          <BarChartWidget
            data={objecionesChartData}
            title="Objeciones Principales"
            fill="#78716c"
            refreshKey={refreshKey}
          />
        </div>

        <LeadsTable
          leads={tableLeads}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={goToPrevPage}
          onNextPage={goToNextPage}
        />
      </main>

      <Footer />
    </div>
  );
};
