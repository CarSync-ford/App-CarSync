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

export default function Home() {
  const dadosDoVeiculo = {
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
      { label: "Temperatura do motor", value: "95ºC" },
      { label: "Carga do motor", value: 1.96 },
      { label: "Fuel trim short", value: -5.46 },
      { label: "Fuel trim long", value: 11.71 },
      { label: "Pressão do coletor", value: 31 },
      { label: "RPM", value: 758 },
      { label: "Temperatura do ar", value: 51 },
      { label: "Avanço de ignição", value: 8.5 },
      { label: "Posição do acelerador", value: 13.72 },
      { label: "Pressão barométrica", value: 993 },
      { label: "Tensão da ECU", value: 13.93 },
    ],
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
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
          height={"80%"}
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
        >
          <OtherInfos infos={dadosDoVeiculo.outrasInfos} />
        </Card>
      </View>

      {/* Spacer para garantir passagem da tabbar sem sobreposição */}
      <View style={{ height: 70 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 19,
    paddingTop: 75,
    gap: 21,
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowFull: {
    width: "100%",
  },
});
