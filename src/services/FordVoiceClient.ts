import { AudioQueuePlayer } from './AudioQueuePlayer';
import * as base64 from 'base64-js';

export type VoiceStatus = 'disconnected' | 'ready' | 'sending' | 'transcribing' | 'thinking' | 'speaking';

export interface ActionPayload {
  type: string;
  params: any;
}

export class FordVoiceClient {
  private socket: WebSocket | null = null;
  private audioPlayer: AudioQueuePlayer;
  private isIntentionalDisconnect = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private url: string,
    private vin: string,
    private onStatusChange: (status: VoiceStatus) => void,
    private onTranscript: (text: string) => void,
    private onActionTriggered: (action: ActionPayload) => void,
    private onError: (msg: string) => void,
    private onAiResponse?: (text: string) => void
  ) {
    this.audioPlayer = new AudioQueuePlayer((audioStatus) => {
      if (audioStatus === 'speaking') {
        this.onStatusChange('speaking');
      } else if (audioStatus === 'ready') {
        this.onStatusChange('ready');
      }
    });
  }

  public connect() {
    this.isIntentionalDisconnect = false;
    this._doConnect();
  }

  private _doConnect() {
    if (this.isIntentionalDisconnect) return;

    const wsUrl = `${this.url}?vin=${this.vin}`;
    console.log(`[FordVoiceClient] 🔌 Conectando ao WebSocket (tentativa ${this.reconnectAttempts + 1}): ${wsUrl}`);
    
    try {
      this.socket = new WebSocket(wsUrl);
    } catch (e) {
      console.error('[FordVoiceClient] Falha ao criar WebSocket:', e);
      this._scheduleReconnect();
      return;
    }
    
    this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = () => {
      console.log('[FordVoiceClient] 🟢 WebSocket Aberto com sucesso!');
      this.reconnectAttempts = 0; // Reset ao conectar com sucesso
      this.onStatusChange('ready');
    };

    this.socket.onmessage = (event) => {
      if (typeof event.data === 'string') {
        try {
          const msg = JSON.parse(event.data);
          console.log(`[FordVoiceClient] 📩 Recebeu JSON do servidor:`, msg);
          this.handleJsonMessage(msg);
        } catch (e) {
          console.error('Falha ao dar parse na mensagem WS:', event.data);
        }
      } else if (event.data instanceof ArrayBuffer) {
        const byteArray = new Uint8Array(event.data);
        const base64Data = base64.fromByteArray(byteArray);
        if (base64Data) {
          console.log(`[FordVoiceClient] 🔊 Recebeu chunk de áudio binário (${base64Data.length} bytes)`);
          this.audioPlayer.enqueueChunkBase64(base64Data);
        }
      }
    };

    this.socket.onclose = (event) => {
      console.log(`[FordVoiceClient] 🔴 WebSocket fechado. Código: ${event.code}, Razão: ${event.reason}`);
      if (!this.isIntentionalDisconnect) {
        this.onStatusChange('disconnected');
        this._scheduleReconnect();
      }
    };

    this.socket.onerror = (err) => {
      console.error('[FordVoiceClient] ❌ Erro no WebSocket:', err);
      // onclose será chamado após onerror automaticamente
    };
  }

  private _scheduleReconnect() {
    if (this.isIntentionalDisconnect) return;
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('[FordVoiceClient] ❌ Número máximo de reconexões atingido.');
      this.onError('Não foi possível reconectar ao assistente Ford. Reinicie o app.');
      return;
    }

    // Backoff exponencial: 1s, 2s, 4s, 8s, ... até 30s
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    this.reconnectAttempts++;
    console.log(`[FordVoiceClient] ⏳ Reconectando em ${delay}ms (tentativa ${this.reconnectAttempts})...`);
    
    if (this.reconnectTimeoutId) clearTimeout(this.reconnectTimeoutId);
    this.reconnectTimeoutId = setTimeout(() => {
      this._doConnect();
    }, delay);
  }

  public disconnect() {
    this.isIntentionalDisconnect = true;
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
      this.reconnectTimeoutId = null;
    }
    this.audioPlayer.stopAll();
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.reconnectAttempts = 0;
  }

  // Enviar comando de voz como binário (ArrayBuffer)
  public sendVoiceCommandBase64(base64Audio: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.onStatusChange('sending');
      const byteArray = base64.toByteArray(base64Audio);
      console.log(`[FordVoiceClient] 📤 Enviando áudio binário para a API (${byteArray.length} bytes)`);
      this.socket.send(byteArray.buffer); // Envia bytes puros
    }
  }

  public triggerBargeIn() {
    // Interrompe totalmente o áudio atual conforme aprovado
    this.audioPlayer.stopAll();
    
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ event: 'barge_in' }));
    }
  }

  private handleJsonMessage(msg: any) {
    switch (msg.event) {
      case 'status':
        console.log(`[FordVoiceClient] 🔄 Status: ${msg.status}`);
        this.onStatusChange(msg.status as VoiceStatus);
        break;
      case 'transcript':
        console.log(`[FordVoiceClient] 📝 Transcript: "${msg.text}"`);
        if (msg.text) this.onTranscript(msg.text);
        break;
      case 'metadata':
        console.log(`[FordVoiceClient] 📊 Metadata recebido:`, JSON.stringify(msg));
        if (msg.action) {
          console.log(`[FordVoiceClient] ⚙️ Action:`, msg.action);
          this.onActionTriggered(msg.action);
        }
        // Aceita qualquer string, inclusive "" (string vazia) não é tratada como erro
        if (typeof msg.response_text === 'string' && msg.response_text.length > 0) {
          console.log(`[FordVoiceClient] 🤖 response_text: "${msg.response_text}"`);
          if (this.onAiResponse) {
            this.onAiResponse(msg.response_text);
          } else {
            console.warn('[FordVoiceClient] ⚠️ onAiResponse não está definido!');
          }
        } else {
          console.warn(`[FordVoiceClient] ⚠️ response_text vazio ou ausente no metadata:`, msg.response_text);
        }
        break;
      case 'barge_in_confirmed':
        console.log('[FordVoiceClient] ⏮️ Barge-in confirmado');
        this.audioPlayer.stopAll();
        this.onStatusChange('ready');
        break;
      case 'error':
        console.error('[FordVoiceClient] ❌ Erro do servidor:', msg.message);
        this.onError(msg.message || 'Erro no servidor');
        break;
      default:
        console.log(`[FordVoiceClient] ❓ Evento desconhecido: ${msg.event}`, msg);
    }
  }
}
