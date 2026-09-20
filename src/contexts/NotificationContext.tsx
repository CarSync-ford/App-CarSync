import React, { createContext, useContext, useState } from 'react';
import { Notification } from '@/src/interfaces/inicio';
import { Segment } from '@/src/types/inicio';
import { notificacoesMock } from '@/src/data/notificacoesMock';

interface NotificationContextType {
  notificacoes: Notification[];
  temNaoLidas: boolean;
  marcarComoLida: (id: number) => void;
  adicionarNotificacao: (segments: Segment[]) => void;
}

const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notificacoes, setNotificacoes] = useState<Notification[]>(notificacoesMock);

  const marcarComoLida = (id: number) => {
    setNotificacoes((prev) => prev.map((n) => (n.id === id ? { ...n, lida: true } : n)));
  };

  const adicionarNotificacao = (segments: Segment[]) => {
    const agora = new Date();
    const time = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;

    setNotificacoes((prev) => [{ id: Date.now(), segments, time, lida: false }, ...prev]);
  };

  const temNaoLidas = notificacoes.some((n) => !n.lida);

  return (
    <NotificationContext.Provider
      value={{ notificacoes, temNaoLidas, marcarComoLida, adicionarNotificacao }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
