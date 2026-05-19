import { useNavigate } from "react-router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Lead } from "../../domain/entities/Lead";
import { Loading } from "./Loading";

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const ITEMS_PER_PAGE = 10;

export const LeadsTable = ({
  leads,
  loading,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: LeadsTableProps) => {
  const navigate = useNavigate();
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = leads.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-stone-200 flex justify-between items-center">
        <h3 className="font-semibold text-stone-700">
          Leads - Tabla Principal
        </h3>
        <span className="text-xs text-stone-500">
          Datos cargados inicialmente
        </span>
      </div>
      <div className="overflow-x-auto h-150">
        <table className="w-full">
          <thead className="bg-orange-500 text-white sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Empresa</th>
              <th className="px-4 py-2 text-left">Teléfono</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Interés</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <Loading message="Cargando leads..." size="sm" />
                </td>
              </tr>
            ) : currentData.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-stone-500">
                  No hay datos
                </td>
              </tr>
            ) : (
              currentData.map((lead) => (
                <tr
                  key={lead.id_registro}
                  className="border-b border-stone-100 hover:bg-stone-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/lead/${lead.id_registro}`)}
                >
                  <td className="px-4 py-2 text-stone-700">
                    {lead.id_registro}
                  </td>
                  <td className="px-4 py-2 text-stone-700">
                    {lead.nombre_completo}
                  </td>
                  <td className="px-4 py-2 text-stone-700">
                    {lead.nombre_empresa}
                  </td>
                  <td className="px-4 py-2 text-stone-700">{lead.telefono}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        lead.status_procesos === "PENDIENTE"
                          ? "bg-yellow-100 text-yellow-700"
                          : lead.status_procesos === "COMPLETADO"
                            ? "bg-green-100 text-green-700"
                            : "bg-stone-100 text-stone-700"
                      }`}
                    >
                      {lead.status_procesos}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-stone-700">
                    {lead.interes_cliente || "No especificado"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-stone-200 flex justify-between items-center">
        <span className="text-stone-600 text-sm">
          {loading
            ? "..."
            : `Mostrando ${startIndex + 1}-${Math.min(
                startIndex + ITEMS_PER_PAGE,
                leads.length,
              )} de ${leads.length}`}
        </span>
        <div className="flex gap-2">
          <button
            onClick={onPrevPage}
            disabled={currentPage === 1 || loading}
            className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-stone-300 disabled:cursor-not-allowed"
          >
            <FaChevronLeft />
          </button>
          <span className="px-3 py-1 text-stone-700">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={onNextPage}
            disabled={currentPage >= totalPages || loading}
            className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-stone-300 disabled:cursor-not-allowed"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};
