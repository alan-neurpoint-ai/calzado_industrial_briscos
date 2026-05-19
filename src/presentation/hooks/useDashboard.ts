import { useState, useCallback, useEffect, useRef } from "react";
import { leadUseCase } from "../../application/usecases/LeadUseCase";
import type { Lead } from "../../domain/entities/Lead";

interface DashboardData {
  allLeads: Lead[];
  tableLeads: Lead[];
  loading: boolean;
  chartLoading: boolean;
  error: string | null;
  fetchChartData: () => Promise<void>;
}

export const useDashboard = (): DashboardData => {
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [tableLeads, setTableLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isInitialLoad = useRef(true);
  const isChartRefreshing = useRef(false);

  const fetchLeads = useCallback(async (isChartRefresh = false) => {
    if (isChartRefresh && isChartRefreshing.current) return;
    if (isChartRefresh) {
      isChartRefreshing.current = true;
      setChartLoading(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const leadsData = await leadUseCase.getAll();

      if (isChartRefresh) {
        setAllLeads(leadsData);
      } else {
        setAllLeads(leadsData);
        if (isInitialLoad.current) {
          setTableLeads(leadsData);
          isInitialLoad.current = false;
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
      if (isChartRefresh) {
        isChartRefreshing.current = false;
        setChartLoading(false);
      }
    }
  }, []);

  const fetchChartData = useCallback(async () => {
    await fetchLeads(true);
  }, [fetchLeads]);

  useEffect(() => {
    let mounted = true;
    let hasLoaded = false;

    const loadData = async () => {
      if (hasLoaded) return;
      hasLoaded = true;

      setLoading(true);
      setError(null);

      try {
        const leadsData = await leadUseCase.getAll();

        if (!mounted) return;

        setAllLeads(leadsData);
        setTableLeads(leadsData);
        isInitialLoad.current = false;
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Error desconocido");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    allLeads,
    tableLeads,
    loading,
    chartLoading,
    error,
    fetchChartData,
  };
};

export const calculateMetrics = leadUseCase.calculateMetrics.bind(leadUseCase);
export const calculateStatusChart =
  leadUseCase.calculateStatusChart.bind(leadUseCase);
export const calculateInteresChart =
  leadUseCase.calculateInteresChart.bind(leadUseCase);
export const calculateCallsByMonth =
  leadUseCase.calculateCallsByMonth.bind(leadUseCase);
export const calculateObjecionesChart =
  leadUseCase.calculateObjecionesChart.bind(leadUseCase);
