export interface CardProps {
    title: string;
    icon?: ReactNode;
    width: DimensionValue;
    children?: ReactNode;
    iconColor: string;
    height?: DimensionValue;
}

export interface FuelGaugeProps {
    level: number;
}

export type Segment = { text: string; highlight?: boolean };
export type Notification = { id: number; segments: Segment[]; time: string };

export interface OilLevelProps {
    level: number;
}

export interface InfoItem {
    label: string;
    value: string | number;
}

export interface OtherInfosProps {
    infos: InfoItem[];
}

export interface SpeedChartProps {
    speed: number;
    maxSpeed?: number;
}

export interface TirePressureProps {
    fl: number;
    fr: number;
    rl: number;
    rr: number;
}
