export interface IAgendamento {
    id?: string;
    data: null | Date;
    horario: string | null;
    motivo: string | null;
    outroMotivo?: string;
    local: string | null;
}

export interface AgendamentoCardProps {
    agendamento: IAgendamento;
}

export interface AgendamentosListProps {
    agendamentos: IAgendamento[];
}

export interface CalendarPickerProps {
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
}

export interface Historico {
    id: string;
    data: string;
    tipo: string;
    realizado: boolean;
}

export interface HistoricoCardProps {
    historico: Historico;
}

export interface HistoricoListProps {
    historicos: Historico[];
}

export interface Location {
    id: string;
    distancia: string;
    endereco: string;
    maisProxima?: boolean;
}

export interface LocationPickerProps {
    selectedLocation: string | null;
    onSelectLocation: (locationId: string) => void;
    locations: Location[];
}

export interface NovoAgendamentoButtonProps {
    onPress: () => void;
}

export interface NovoAgendamentoModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (data: IAgendamento) => void;
}

export interface TimePickerProps {
    selectedTime: string | null;
    onSelectTime: (time: string) => void;
    availableTimes: string[];
}
