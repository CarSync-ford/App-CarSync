/**
 * authEvents.ts
 * Singleton de eventos para comunicação entre api.ts e AuthContext.
 * Permite que a camada de serviço dispare um "logout forçado"
 * sem depender diretamente do contexto React.
 */

type Listener = () => void;

class AuthEventEmitter {
  private listeners: Listener[] = [];

  /** Registra um listener para o evento de logout forçado */
  onForceLogout(listener: Listener): () => void {
    this.listeners.push(listener);
    // Retorna função de unsubscribe
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /** Dispara o evento de logout forçado para todos os listeners */
  emitForceLogout(): void {
    this.listeners.forEach((l) => l());
  }
}

export const authEvents = new AuthEventEmitter();
