import type { Lead } from "../../entities/Lead";

export interface ILeadRepository {
  findAll(): Promise<Lead[]>;
  findById(id: number): Promise<Lead | null>;
  create(lead: Partial<Lead>): Promise<Lead>;
  update(id: number, lead: Partial<Lead>): Promise<Lead>;
  delete(id: number): Promise<void>;
}
