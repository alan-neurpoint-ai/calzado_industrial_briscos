import type { ILeadUseCase } from "../../domain/ports/in/ILeadUseCase";
import type { Lead, LeadMetrics, ChartData } from "../../domain/entities/Lead";
import { leadRepository } from "../../infrastructure/adapters/LeadRepository";

export type { LeadMetrics, ChartData };

export class LeadUseCase implements ILeadUseCase {
  async getAll(): Promise<Lead[]> {
    return leadRepository.findAll();
  }

  async getById(id: number): Promise<Lead | null> {
    return leadRepository.findById(id);
  }

  calculateMetrics(leads: Lead[]): LeadMetrics {
    return {
      totalLeads: leads.length,
      conversacionesLogradas: leads.filter((l) => l.conversacion_lograda)
        .length,
      pendientes: leads.filter((l) => l.status_procesos === "PENDIENTE").length,
      interesados: leads.filter(
        (l) => l.interes_cliente && l.interes_cliente !== "NINGUNO",
      ).length,
    };
  }

  calculateStatusChart(leads: Lead[]): ChartData[] {
    const statusCounts = leads.reduce(
      (acc, lead) => {
        const status = lead.status_procesos || "Desconocido";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));
  }

  calculateInteresChart(leads: Lead[]): ChartData[] {
    const interesCounts = leads.reduce(
      (acc, lead) => {
        const interes = lead.interes_cliente || "No especificado";
        acc[interes] = (acc[interes] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    return Object.entries(interesCounts)
      .map(([name, value]) => ({ name, value }))
      .slice(0, 5);
  }

  calculateCallsByMonth(leads: Lead[]): ChartData[] {
    const monthCounts: Record<string, number> = {};
    leads.forEach((lead) => {
      if (lead.created_at) {
        const date = new Date(lead.created_at);
        const month = date.toLocaleString("es-ES", { month: "short" });
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      }
    });
    return Object.entries(monthCounts).map(([name, value]) => ({
      name,
      value,
    }));
  }

  calculateObjecionesChart(leads: Lead[]): ChartData[] {
    const objCounts = leads.reduce(
      (acc, lead) => {
        const obj = lead.objeccion_principal || "NINGUNA";
        acc[obj] = (acc[obj] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    return Object.entries(objCounts)
      .map(([name, value]) => ({ name, value }))
      .slice(0, 5);
  }
}

export const leadUseCase = new LeadUseCase();
