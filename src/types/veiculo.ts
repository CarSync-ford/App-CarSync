import { ImageSourcePropType } from 'react-native';

export type InfoVeiculo = {
  label: string;
  value: string | number;
};

export type PressaoPneus = {
  dianteiroEsquerdo: number;
  dianteiroDireito: number;
  traseiroEsquerdo: number;
  traseiroDireito: number;
};

export type Vehicle = {
  id: string;
  nome: string;
  imagem: ImageSourcePropType;
};
