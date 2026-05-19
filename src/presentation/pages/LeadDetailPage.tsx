import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { supabase } from "../../infrastructure/adapters/supabaseClient";
import type { Lead } from "../../domain/entities/Lead";
import { FaArrowLeft } from "react-icons/fa";
import { TranscriptionViewer } from "../components/TranscriptionViewer";
import { LoadingPage } from "../components/Loading";

export const LeadDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLead = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        const { data, error: supabaseError } = await supabase
          .from("leads_brisco")
          .select("*")
          .eq("id_registro", Number(id))
          .single();

        if (supabaseError) throw new Error(supabaseError.message);
        setLead(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-600">Lead no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-orange-500 text-white px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:text-stone-200"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-bold">Detalle del Lead</h1>
      </header>

      <main className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <TranscriptionViewer vapiCallId={lead.vapi_call_id} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-stone-500">Nombre Completo</h3>
              <p className="text-lg font-semibold text-stone-800">
                {lead.nombre_completo}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-stone-500">Empresa</h3>
              <p className="text-lg font-semibold text-stone-800">
                {lead.nombre_empresa}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-stone-500">Teléfono</h3>
              <p className="text-lg font-semibold text-stone-800">
                {lead.telefono}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-stone-500">VAPI Call ID</h3>
              <p className="text-sm font-semibold text-stone-800">
                {lead.vapi_call_id}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-stone-500">Estado Proceso</h3>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  lead.status_procesos === "PENDIENTE"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {lead.status_procesos}
              </span>
            </div>
            <div>
              <h3 className="text-sm text-stone-500">Llamada VAPI</h3>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  lead.vapi_call_status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-stone-100 text-stone-700"
                }`}
              >
                {lead.vapi_call_status}
              </span>
            </div>
            <div>
              <h3 className="text-sm text-stone-500">Conversación Lograda</h3>
              <p className="text-lg font-semibold text-stone-800">
                {lead.conversacion_lograda ? "Sí" : "No"}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-stone-500">Interés del Cliente</h3>
              <p className="text-lg font-semibold text-stone-800">
                {lead.interes_cliente}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-stone-500">Objeción Principal</h3>
              <p className="text-lg font-semibold text-stone-800">
                {lead.objeccion_principal}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-stone-500">Fecha de Creación</h3>
              <p className="text-lg font-semibold text-stone-800">
                {new Date(lead.created_at).toLocaleString("es-ES")}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-stone-500">Fecha Última Compra</h3>
              <p className="text-lg font-semibold text-stone-800">
                {lead.fecha_ultima_compra || "Sin datos"}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-stone-500">Producto Última Compra</h3>
              <p className="text-lg font-semibold text-stone-800">
                {lead.producto_ultima_compra || "Sin datos"}
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm text-stone-500">
                Descripción del Interés
              </h3>
              <p className="text-stone-700">
                {lead.descripcion_interes_cliente || "Sin descripción"}
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm text-stone-500">Acción de Seguimiento</h3>
              <p className="text-stone-700">
                {lead.accion_seguimiento || "Sin acción"}
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm text-stone-500">
                Descripción Acción de Seguimiento
              </h3>
              <p className="text-stone-700">
                {lead.descripcion_accion_seguimiento || "Sin descripción"}
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm text-stone-500">Resumen de Llamada</h3>
              <p className="text-stone-700">
                {lead.resumen_llamada || "Sin resumen"}
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm text-stone-500">Descripción Objeción</h3>
              <p className="text-stone-700">
                {lead.descripcion_objeccion_principal || "Sin descripción"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
