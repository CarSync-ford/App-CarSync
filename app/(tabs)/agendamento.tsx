import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FordinhoBanner } from "@/src/components/agendamento/FordinhoBanner";
import { NovoAgendamentoButton } from "@/src/components/agendamento/NovoAgendamentoButton";
import { AgendamentosList } from "@/src/components/agendamento/AgendamentosList";
import { HistoricoList } from "@/src/components/agendamento/HistoricoList";
import { NovoAgendamentoModal } from "@/src/components/agendamento/NovoAgendamentoModal";
import { Colors } from "@/constants/Constants";
import { IAgendamento, Historico } from '@/src/types/agendamento';;
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { agendamentosMock, historicosMock } from '@/src/data/agendamentosMock';

var AGENDAMENTOS_MOCK: IAgendamento[] = agendamentosMock;
var HISTORICOS_MOCK: Historico[] = historicosMock;

export default function Agendamento() {
  const insets = useSafeAreaInsets();
  const headerHeight = insets.top + 64;
  const [modalVisible, setModalVisible] = useState(false);

  const [agendamentos, setAgendamentos] = useState(AGENDAMENTOS_MOCK);

  const handleConfirm = (data: IAgendamento) => {
    // Futuramente: salvar no backend/estado global
    console.log("Novo agendamento:", { ...data, id: AGENDAMENTOS_MOCK.length });
    setAgendamentos([
      { ...data, id: (agendamentos.length + 1).toString() },
      ...agendamentos,
    ]);
    console.log("lista de agendamento: ", agendamentos);

    setModalVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <FordinhoBanner />

        <NovoAgendamentoButton onPress={() => setModalVisible(true)} />

        <AgendamentosList agendamentos={agendamentos} />
         
        <HistoricoList historicos={HISTORICOS_MOCK} />

        {/* Spacer para garantir passagem da tabbar sem sobreposição */}
        <View style={{ height: 100 }} />
      </ScrollView>

      <NovoAgendamentoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 19,
    gap: 16,
  },
});
