import { Colors } from "@/constants/Constants";
import TirePressureIcon from "@/src/components/icons/TirePressureIcon";
import { Card } from "@/src/components/inicio/Card";
import CardCarro from "@/src/components/inicio/CardCarro";
import { FuelGauge } from "@/src/components/inicio/FuelGauge";
import { OilLevel } from "@/src/components/inicio/OilLevel";
import { OtherInfos } from "@/src/components/inicio/OtherInfos";
import { SpeedChart } from "@/src/components/inicio/SpeedChart";
import { TirePressure } from "@/src/components/inicio/TirePressure";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { veiculoMock } from '@/src/data/veiculoMock';

export default function Home() {
  const insets = useSafeAreaInsets();
  // altura do header = status bar + padding superior (10) + conteúdo (~44px) + padding inferior (10)
  const headerHeight = insets.top + 64;
  const dadosDoVeiculo = veiculoMock;

  return (

      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <CardCarro />

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
            <SpeedChart speed={dadosDoVeiculo.velocidade} maxSpeed={220} />
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
            <TirePressure
              fl={dadosDoVeiculo.pressaoPneus.dianteiroEsquerdo}
              fr={dadosDoVeiculo.pressaoPneus.dianteiroDireito}
              rl={dadosDoVeiculo.pressaoPneus.traseiroEsquerdo}
              rr={dadosDoVeiculo.pressaoPneus.traseiroDireito}
            />
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
            <FuelGauge level={dadosDoVeiculo.combustivel} />
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
            <OilLevel level={dadosDoVeiculo.nivelOleo} />
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
            <OtherInfos infos={dadosDoVeiculo.outrasInfos} />
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
