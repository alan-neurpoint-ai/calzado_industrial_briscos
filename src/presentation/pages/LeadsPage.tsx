import { useEffect } from "react";
import { useLeads } from "../hooks/useLeads";
import { FaEdit, FaTrash, FaSync } from "react-icons/fa";

export const LeadsPage = () => {
  const { leads, loading, error, fetchLeads, deleteLead } = useLeads();
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este lead?")) {
      await deleteLead(id);
    }
  };

  if (error) {
    return (
      <div className="p-8">
        <div className="text-red-500">Error: {error}</div>
        <button
          onClick={fetchLeads}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leads Brisco</h1>
        <button
          onClick={fetchLeads}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          <FaSync className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {loading && leads === null ? (
        <div className="text-center py-8">Cargando leads de Supabase...</div>
      ) : leads === null ? (
        <div className="text-center py-8">
          <p className="mb-4">No se han podido inicializar los datos.</p>
        </div>
      ) : leads.length === 0 ? (
        <p>No hay leads registrados</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Nombre</th>
                <th className="px-4 py-2 border">Empresa</th>
                <th className="px-4 py-2 border">Teléfono</th>
                <th className="px-4 py-2 border">Estado Proceso</th>
                <th className="px-4 py-2 border">Interés</th>
                <th className="px-4 py-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id_registro} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{lead.nombre_completo}</td>
                  <td className="px-4 py-2 border">{lead.nombre_empresa}</td>
                  <td className="px-4 py-2 border">{lead.telefono}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        lead.status_procesos === "PENDIENTE"
                          ? "bg-yellow-100"
                          : "bg-green-100"
                      }`}
                    >
                      {lead.status_procesos}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">{lead.interes_cliente}</td>
                  <td className="px-4 py-2 border">
                    <button className="mr-2 text-blue-500">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() =>
                        lead.id_registro && handleDelete(lead.id_registro)
                      }
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
