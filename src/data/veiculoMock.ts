import { IVeiculo } from '@/src/interfaces';;

export const veiculoMock: IVeiculo = {
  velocidade: 12,
  combustivel: 80,
  pressaoPneus: {
    dianteiroEsquerdo: 32,
    dianteiroDireito: 20,
    traseiroEsquerdo: 32,
    traseiroDireito: 32,
  },
  nivelOleo: 64,
  outrasInfos: [
    { label: 'Temperatura do motor', value: '95ºC' },
    { label: 'Carga do motor', value: 1.96 },
    { label: 'Fuel trim short', value: -5.46 },
    { label: 'Fuel trim long', value: 11.71 },
    { label: 'Pressão do coletor', value: 31 },
    { label: 'RPM', value: 758 },
    { label: 'Temperatura do ar', value: 51 },
    { label: 'Avanço de ignição', value: 8.5 },
    { label: 'Posição do acelerador', value: 13.72 },
    { label: 'Pressão barométrica', value: 993 },
    { label: 'Tensão da ECU', value: 13.93 },
  ],
};
