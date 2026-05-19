import { useState } from "react";
import { FaFileAlt, FaSpinner } from "react-icons/fa";
import type { TranscriptionData } from "../../domain/entities/Transcription";
import { transcriptionService } from "../../infrastructure/services/TranscriptionService";
import { Modal } from "./Modal";
import { Loading } from "./Loading";

interface TranscriptionViewerProps {
  vapiCallId: string | null;
}

export const TranscriptionViewer = ({
  vapiCallId,
}: TranscriptionViewerProps) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState<TranscriptionData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const fetchTranscription = async () => {
    if (!vapiCallId) return;

    setLoading(true);
    setError(null);
    setTranscription(null);

    try {
      const data = await transcriptionService.getTranscription(vapiCallId);
      setTranscription(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar transcripción",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    if (!transcription) {
      fetchTranscription();
    }
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleOpen();
        }}
        disabled={loading || !vapiCallId}
        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-stone-300 disabled:cursor-not-allowed"
      >
        {loading ? <FaSpinner className="animate-spin" /> : <FaFileAlt />}
        Ver Transcripción
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Transcripción de Llamada"
      >
        {error ? (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
            <button
              onClick={fetchTranscription}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Reintentar
            </button>
          </div>
        ) : loading ? (
          <Loading message="Cargando transcripción..." size="md" />
        ) : transcription?.texto?.transcripcion_limpia ? (
          <div className="bg-stone-50 p-6 rounded-lg text-stone-700 whitespace-pre-wrap leading-relaxed">
            {transcription.texto.transcripcion_limpia}
          </div>
        ) : (
          <p className="text-center text-stone-500 py-8">
            No hay transcripción disponible
          </p>
        )}
      </Modal>
    </>
  );
};
