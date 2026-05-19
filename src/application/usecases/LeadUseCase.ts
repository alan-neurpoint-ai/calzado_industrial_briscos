import type {
  Lead,
  CreateLeadDTO,
  UpdateLeadDTO,
} from "../../domain/entities/Lead";
import type { ILeadUseCase } from "../../domain/ports/in/ILeadUseCase";
import type { ILeadRepository } from "../../domain/ports/out/ILeadRepository";

export class LeadUseCase implements ILeadUseCase {
  private repository: ILeadRepository;

  constructor(repository: ILeadRepository) {
    this.repository = repository;
  }

  async getAll(): Promise<Lead[]> {
    return this.repository.findAll();
  }

  async getById(id: number): Promise<Lead | null> {
    return this.repository.findById(id);
  }

  async create(dto: CreateLeadDTO): Promise<Lead> {
    this.validate(dto);
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateLeadDTO): Promise<Lead> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error("Lead no encontrado");
    }
    return this.repository.update(id, dto);
  }

  async delete(id: number): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error("Lead no encontrado");
    }
    return this.repository.delete(id);
  }

  async getByVapiCallId(vapiCallId: string): Promise<Lead | null> {
    return this.repository.findByVapiCallId(vapiCallId);
  }

  private validate(dto: CreateLeadDTO): void {
    if (!dto.nombre_completo?.trim()) {
      throw new Error("Nombre completo es requerido");
    }
    if (!dto.telefono || dto.telefono.toString().length < 10) {
      throw new Error("Teléfono inválido");
    }
    if (!dto.nombre_empresa?.trim()) {
      throw new Error("Nombre de empresa es requerido");
    }
    if (!dto.vapi_call_id) {
      throw new Error("vapi_call_id es requerido");
    }
    if (!dto.interes_cliente) {
      throw new Error("Interés del cliente es requerido");
    }
    if (!dto.accion_seguimiento) {
      throw new Error("Acción de seguimiento es requerida");
    }
  }
}
