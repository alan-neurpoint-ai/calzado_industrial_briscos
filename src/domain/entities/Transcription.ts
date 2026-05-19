export interface TranscriptionData {
  vapi_call_id: string;
  fecha_registro: string;
  agente: string;
  comercial?: {
    id_cliente?: string;
    empresa?: string;
    contacto?: string;
    telefono?: string;
    interes?: string;
    detalles_interes?: string;
    conversion?: boolean | null;
    objecion?: string;
    detalles_objecion?: string;
    accion_siguiente?: string;
    resumen?: string;
  };
  rendimiento?: {
    costo_total_usd?: number;
    duracion_segundos?: number;
  };
  texto?: {
    transcripcion_limpia?: string;
  };
}