import { IAgendamento, Historico } from '@/src/types/agendamento';;

export const agendamentosMock: IAgendamento[] = [];

export const historicosMock: Historico[] = [
  { id: '1', data: '16/12/2025', tipo: 'Troca óleo', realizado: true },
  { id: '2', data: '16/12/2025', tipo: 'Troca óleo', realizado: false },
  { id: '3', data: '16/12/2025', tipo: 'Troca óleo', realizado: true },
  { id: '4', data: '16/12/2025', tipo: 'Troca óleo', realizado: true },
  { id: '5', data: '16/12/2025', tipo: 'Troca óleo', realizado: true },
];
