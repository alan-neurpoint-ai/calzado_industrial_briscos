import type { Lead } from "../../entities/Lead";

export interface LeadMetrics {
  totalLeads: number;
  conversacionesLogradas: number;
  pendientes: number;
  interesados: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface ILeadUseCase {
  getAll(): Promise<Lead[]>;
  getById(id: number): Promise<Lead | null>;
  calculateMetrics(leads: Lead[]): LeadMetrics;
  calculateStatusChart(leads: Lead[]): ChartData[];
  calculateInteresChart(leads: Lead[]): ChartData[];
  calculateCallsByMonth(leads: Lead[]): ChartData[];
  calculateObjecionesChart(leads: Lead[]): ChartData[];
}
