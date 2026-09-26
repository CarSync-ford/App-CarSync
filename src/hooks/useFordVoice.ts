import { useEffect, useRef, useState } from 'react';
import { ActionPayload, FordVoiceClient, VoiceStatus } from '../services/FordVoiceClient';

export function useFordVoice(url: string, vin: string) {
  const clientRef = useRef<FordVoiceClient | null>(null);
  
  const [status, setStatus] = useState<VoiceStatus>('disconnected');
  const [transcript, setTranscript] = useState<string>('');
  const [lastAction, setLastAction] = useState<ActionPayload | null>(null);
  const [aiResponse, setAiResponse] = useState<{text: string, timestamp: number} | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Inicializa o cliente
    const client = new FordVoiceClient(
      url,
      vin,
      (newStatus) => setStatus(newStatus),
      (newTranscript) => setTranscript(newTranscript),
      (action) => setLastAction(action),
      (errMsg) => setError(errMsg),
      (aiText) => setAiResponse({ text: aiText, timestamp: Date.now() })
    );

    client.connect();
    clientRef.current = client;

    return () => {
      client.disconnect();
      clientRef.current = null;
    };
  }, [url, vin]);

  return {
    status,
    transcript,
    lastAction,
    aiResponse,
    error,
    client: clientRef.current,
  };
}
