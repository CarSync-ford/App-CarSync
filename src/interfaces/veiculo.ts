import { PressaoPneus, InfoVeiculo } from '../types/veiculo';;

export interface IVeiculo {
  velocidade: number;
  combustivel: number;
  pressaoPneus: PressaoPneus;
  nivelOleo: number;
  outrasInfos: InfoVeiculo[];
}
