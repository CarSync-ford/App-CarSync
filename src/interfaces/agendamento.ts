import { IAgendamento, Historico, Location } from '../types/agendamento';;

export interface AgendamentoCardProps {
    agendamento: IAgendamento;
}

export interface AgendamentosListProps {
    agendamentos: IAgendamento[];
}

export interface HistoricoCardProps {
    historico: Historico;
}

export interface HistoricoListProps {
    historicos: Historico[];
}

export interface LocationPickerProps {
    selectedLocation: string | null;
    onSelectLocation: (locationId: string) => void;
    locations: Location[];
}

export interface NovoAgendamentoModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (data: IAgendamento) => void;
}
