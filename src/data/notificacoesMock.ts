import { Notification } from '@/src/interfaces/inicio';;

export const notificacoesMock: Notification[] = [
  {
    id: 1,
    segments: [
      { text: 'A pressão do ' },
      { text: 'pneu dianteiro', highlight: true },
      { text: ' direito está abaixo do esperado' },
    ],
    time: '09:40',
  },
  {
    id: 2,
    segments: [
      { text: 'Você tem um ' },
      { text: 'agendamento', highlight: true },
      { text: ' para amanhã' },
    ],
    time: '09:40',
  },
];
