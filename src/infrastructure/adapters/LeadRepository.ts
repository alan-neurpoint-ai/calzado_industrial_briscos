import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  Lead,
  CreateLeadDTO,
  UpdateLeadDTO,
} from "../../domain/entities/Lead";
import type { ILeadRepository } from "../../domain/ports/out/ILeadRepository";

const TABLE_NAME = "leads_brisco";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Variables de entorno de Supabase faltantes");
}

const supabaseInstance = createClient(supabaseUrl, supabaseKey);

export class LeadRepository implements ILeadRepository {
  private client: SupabaseClient;

  constructor() {
    this.client = supabaseInstance;
  }

  async findAll(): Promise<Lead[]> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data ?? [];
  }

  async findById(id: number): Promise<Lead | null> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .select("*")
      .eq("id_registro", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(error.message);
    }
    return data;
  }

  async create(lead: CreateLeadDTO): Promise<Lead> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .insert(lead)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: number, lead: UpdateLeadDTO): Promise<Lead> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .update(lead)
      .eq("id_registro", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async delete(id: number): Promise<void> {
    const { error } = await this.client
      .from(TABLE_NAME)
      .delete()
      .eq("id_registro", id);

    if (error) throw new Error(error.message);
  }

  async findByVapiCallId(vapiCallId: string): Promise<Lead | null> {
    const { data, error } = await this.client
      .from(TABLE_NAME)
      .select("*")
      .eq("vapi_call_id", vapiCallId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(error.message);
    }
    return data;
  }
}
