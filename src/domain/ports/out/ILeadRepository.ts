import type { Lead, CreateLeadDTO, UpdateLeadDTO } from "../../entities/Lead";

export interface ILeadRepository {
  findAll(): Promise<Lead[]>;
  findById(id: number): Promise<Lead | null>;
  create(lead: CreateLeadDTO): Promise<Lead>;
  update(id: number, lead: UpdateLeadDTO): Promise<Lead>;
  delete(id: number): Promise<void>;
  findByVapiCallId(vapiCallId: string): Promise<Lead | null>;
}
