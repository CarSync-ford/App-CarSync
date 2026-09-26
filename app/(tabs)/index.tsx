import { Colors } from "@/constants/Constants";
import TirePressureIcon from "@/src/components/icons/TirePressureIcon";
import { Card } from "@/src/components/inicio/Card";
import CardCarro, { ConexaoCarro } from "@/src/components/inicio/CardCarro";
import { ConexaoStatus } from "@/src/components/inicio/ConexaoStatus";
import { FuelGauge } from "@/src/components/inicio/FuelGauge";
import { OilLevel } from "@/src/components/inicio/OilLevel";
import { OtherInfos } from "@/src/components/inicio/OtherInfos";
import { SpeedChart } from "@/src/components/inicio/SpeedChart";
import { TirePressure } from "@/src/components/inicio/TirePressure";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { veiculoMock } from '@/src/data/veiculoMock';
import { useVeiculoSimulado } from '@/src/hooks/useVeiculoSimulado';
import { useNotifications } from '@/src/contexts/NotificationContext';

const COMBUSTIVEL_LIMITE_AVISO = 40;

export default function Home() {
  const insets = useSafeAreaInsets();
  // altura do header = status bar + padding superior (10) + conteúdo (~44px) + padding inferior (10)
  const headerHeight = insets.top + 64;
  const dadosDoVeiculo = veiculoMock;
  const { adicionarNotificacao } = useNotifications();

  const [conexao, setConexao] = useState<ConexaoCarro>('idle');
  const conectado = conexao === 'connected';

  const { velocidade, combustivel } = useVeiculoSimulado(
    dadosDoVeiculo.velocidade,
    dadosDoVeiculo.combustivel,
    conectado
  );

  const avisouCombustivelBaixo = useRef(false);

  useEffect(() => {
    if (conectado && combustivel <= COMBUSTIVEL_LIMITE_AVISO && !avisouCombustivelBaixo.current) {
      avisouCombustivelBaixo.current = true;
      adicionarNotificacao([
        { text: 'O nível de ' },
        { text: 'combustível', highlight: true },
        { text: ' está abaixo da média' },
      ]);
    }
  }, [conectado, combustivel]);

  const handleConectar = () => {
    setConexao('connecting');
    setTimeout(() => setConexao('connected'), 2000);
  };

  return (

      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <CardCarro status={conexao} onConnect={handleConectar} />

        <View style={styles.cardContainer}>
          <Card
            title="Velocidade"
            icon={
              <FontAwesome5
                name="tachometer-alt"
                size={18}
                color={Colors.light.preto}
              />
            }
            width="47%"
            iconColor={Colors.azul_claro}
          >
            {conectado ? (
              <SpeedChart speed={velocidade} maxSpeed={220} />
            ) : (
              <ConexaoStatus status={conexao === 'connecting' ? 'connecting' : 'idle'} />
            )}
          </Card>

          <Card
            title="Pressão pneus"
            icon={
              <TirePressureIcon
                width={24}
                height={24}
                color={Colors.light.preto}
              />
            }
            width="47%"
            iconColor={Colors.amarelo}
          >
            {conectado ? (
              <TirePressure
                fl={dadosDoVeiculo.pressaoPneus.dianteiroEsquerdo}
                fr={dadosDoVeiculo.pressaoPneus.dianteiroDireito}
                rl={dadosDoVeiculo.pressaoPneus.traseiroEsquerdo}
                rr={dadosDoVeiculo.pressaoPneus.traseiroDireito}
              />
            ) : (
              <ConexaoStatus status={conexao === 'connecting' ? 'connecting' : 'idle'} />
            )}
          </Card>
        </View>

        <View style={styles.rowFull}>
          <Card
            title="Combustível"
            icon={
              <FontAwesome5
                name="gas-pump"
                size={16}
                color={Colors.light.preto}
              />
            }
            width="100%"
            iconColor={Colors.vermelho}
          >
            {conectado ? (
              <FuelGauge level={combustivel} />
            ) : (
              <ConexaoStatus status={conexao === 'connecting' ? 'connecting' : 'idle'} />
            )}
          </Card>
        </View>

        <View style={styles.cardContainer}>
          <Card
            title="Nível óleo"
            icon={
              <FontAwesome5 name="oil-can" size={16} color={Colors.light.preto} />
            }
            width="40%"
            iconColor={Colors.verde}
            height={300}
          >
            {conectado ? (
              <OilLevel level={dadosDoVeiculo.nivelOleo} />
            ) : (
              <ConexaoStatus status={conexao === 'connecting' ? 'connecting' : 'idle'} />
            )}
          </Card>

          <Card
            title="Outras infos"
            icon={
              <FontAwesome5 name="car" size={16} color={Colors.light.preto} />
            }
            width="54%"
            iconColor={Colors.roxo}
            height={300}
          >
            {conectado ? (
              <OtherInfos infos={dadosDoVeiculo.outrasInfos} />
            ) : (
              <ConexaoStatus status={conexao === 'connecting' ? 'connecting' : 'idle'} />
            )}
          </Card>
        </View>

        {/* Spacer para garantir passagem da tabbar sem sobreposição */}
        <View style={{ height: 100 }} />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 19,
    gap: 21,
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowFull: {
    width: "100%",
  }
});
