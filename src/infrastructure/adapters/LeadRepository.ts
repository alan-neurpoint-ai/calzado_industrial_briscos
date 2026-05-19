import { supabase } from "./supabaseClient";
import type { ILeadRepository } from "../../domain/ports/out/ILeadRepository";
import type { Lead } from "../../domain/entities/Lead";

export class LeadRepository implements ILeadRepository {
  private tableName = "leads_brisco";

  async findAll(): Promise<Lead[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  }

  async findById(id: number): Promise<Lead | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .eq("id_registro", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(error.message);
    }
    return data;
  }

  async create(lead: Partial<Lead>): Promise<Lead> {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(lead)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: number, lead: Partial<Lead>): Promise<Lead> {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(lead)
      .eq("id_registro", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq("id_registro", id);

    if (error) throw new Error(error.message);
  }
}

export const leadRepository = new LeadRepository();
