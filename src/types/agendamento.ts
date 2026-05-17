export type IAgendamento = {
    id?: string;
    data: null | Date;
    horario: string | null;
    motivo: string | null;
    outroMotivo?: string;
    local: string | null;
};

export type CalendarPickerProps = {
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
};

export type Historico = {
    id: string;
    data: string;
    tipo: string;
    realizado: boolean;
};

export type Location = {
    id: string;
    distancia: string;
    endereco: string;
    maisProxima?: boolean;
};

export type NovoAgendamentoButtonProps = {
    onPress: () => void;
};

export type TimePickerProps = {
    selectedTime: string | null;
    onSelectTime: (time: string) => void;
    availableTimes: string[];
};
