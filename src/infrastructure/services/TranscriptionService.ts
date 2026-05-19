import type { TranscriptionData } from "../../domain/entities/Transcription";

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

if (!N8N_WEBHOOK_URL) {
  console.warn("VITE_N8N_WEBHOOK_URL no está configurada");
}

export class TranscriptionService {
  async getTranscription(callId: string): Promise<TranscriptionData | null> {
    if (!N8N_WEBHOOK_URL) {
      throw new Error("URL de webhook de transcripción no configurada");
    }

    const response = await fetch(`${N8N_WEBHOOK_URL}?call_id=${callId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data[0] : data;
  }
}

export const transcriptionService = new TranscriptionService();
