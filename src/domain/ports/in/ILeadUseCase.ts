import type { Lead, CreateLeadDTO, UpdateLeadDTO } from "../../entities/Lead";

export interface ILeadUseCase {
  getAll(): Promise<Lead[]>;
  getById(id: number): Promise<Lead | null>;
  create(lead: CreateLeadDTO): Promise<Lead>;
  update(id: number, lead: UpdateLeadDTO): Promise<Lead>;
  delete(id: number): Promise<void>;
  getByVapiCallId(vapiCallId: string): Promise<Lead | null>;
}
