import { useState, useCallback, useRef, useEffect } from "react"; // ◄ Incluimos useEffect
import type {
  Lead,
  CreateLeadDTO,
  UpdateLeadDTO,
} from "../../domain/entities/Lead";
import { leadUseCase } from "../../application/LeadFactory";

type LeadsState = Lead[] | null;

export const useLeads = () => {
  const [leads, setLeads] = useState<LeadsState>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  // 🛡️ BLINDAJE 1: Control estricto sobre el ciclo de vida del montaje del componente.
  // Evita fugas de memoria e intentos de actualizar el estado si el usuario cambia de pestaña.
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchLeads = useCallback(async () => {
    // 🛡️ BLINDAJE 2: Cortafuegos de concurrencia.
    // Si ya hay una petición en vuelo, bloquea peticiones simultáneas previniendo bucles.
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const data = await leadUseCase.getAll();
      if (isMounted.current) {
        setLeads(data); // Asignación directa y limpia
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 🛡️ BLINDAJE 3: Array de dependencias vacío real para congelar de forma absoluta la referencia.

  const createLead = useCallback(async (dto: CreateLeadDTO): Promise<Lead> => {
    const newLead = await leadUseCase.create(dto);
    setLeads((prev) => (prev ? [newLead, ...prev] : [newLead]));
    return newLead;
  }, []);

  const updateLead = useCallback(
    async (id: number, dto: UpdateLeadDTO): Promise<Lead> => {
      const updatedLead = await leadUseCase.update(id, dto);
      setLeads((prev) =>
        prev ? prev.map((l) => (l.id_registro === id ? updatedLead : l)) : null,
      );
      return updatedLead;
    },
    [],
  );

  const deleteLead = useCallback(async (id: number): Promise<void> => {
    await leadUseCase.delete(id);
    setLeads((prev) =>
      prev ? prev.filter((l) => l.id_registro !== id) : null,
    );
  }, []);

  return {
    leads,
    loading,
    error,
    fetchLeads,
    createLead,
    updateLead,
    deleteLead,
  };
};
