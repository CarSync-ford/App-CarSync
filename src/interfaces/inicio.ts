import { ReactNode } from 'react';
import { DimensionValue } from 'react-native';
import { Segment, InfoItem } from '../types/inicio';;

export interface CardProps {
    title: string;
    icon?: ReactNode;
    width: DimensionValue;
    children?: ReactNode;
    iconColor: string;
    height?: DimensionValue;
}

export interface Notification { 
    id: number; 
    segments: Segment[]; 
    time: string; 
}

export interface OtherInfosProps {
    infos: InfoItem[];
}
