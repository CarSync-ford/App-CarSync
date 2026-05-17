export type FuelGaugeProps = {
    level: number;
};

export type Segment = { text: string; highlight?: boolean };

export type OilLevelProps = {
    level: number;
};

export type InfoItem = {
    label: string;
    value: string | number;
};

export type SpeedChartProps = {
    speed: number;
    maxSpeed?: number;
};

export type TirePressureProps = {
    fl: number;
    fr: number;
    rl: number;
    rr: number;
};
