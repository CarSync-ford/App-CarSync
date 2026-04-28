import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FordinhoBanner } from '@/src/components/agendamento/FordinhoBanner';
import { NovoAgendamentoButton } from '@/src/components/agendamento/NovoAgendamentoButton';
import { AgendamentosList } from '@/src/components/agendamento/AgendamentosList';
import { HistoricoList } from '@/src/components/agendamento/HistoricoList';
import { NovoAgendamentoModal, AgendamentoFormData } from '@/src/components/agendamento/NovoAgendamentoModal';
import { Agendamento as AgendamentoData } from '@/src/components/agendamento/AgendamentoCard';
import { Historico } from '@/src/components/agendamento/HistoricoCard';
import { Colors } from '@/constants/Constants';

const AGENDAMENTOS_MOCK: AgendamentoData[] = [
  {
    id: '1',
    data: '13/04/2026',
    horario: '16H',
    tipo: 'Manutenção preventiva',
    local: 'R. Alagoas, 41 - Centro, São Caetano do Sul - SP, 09521-050',
  },
  {
    id: '2',
    data: '13/04/2026',
    horario: '16H',
    tipo: 'Manutenção preventiva',
    local: 'R. Alagoas, 41 - Centro, São Caetano do Sul - SP, 09521-050',
  },
  {
    id: '3',
    data: '13/04/2026',
    horario: '16H',
    tipo: 'Manutenção preventiva',
    local: 'R. Alagoas, 41 - Centro, São Caetano do Sul - SP, 09521-050',
  },
  {
    id: '4',
    data: '13/04/2026',
    horario: '16H',
    tipo: 'Manutenção preventiva',
    local: 'R. Alagoas, 41 - Centro, São Caetano do Sul - SP, 09521-050',
  },
];

const HISTORICOS_MOCK: Historico[] = [
  {
    id: '1',
    data: '16/12/2025',
    tipo: 'Troca óleo',
    realizado: true,
  },
  {
    id: '2',
    data: '16/12/2025',
    tipo: 'Troca óleo',
    realizado: false,
  },
  {
    id: '3',
    data: '16/12/2025',
    tipo: 'Troca óleo',
    realizado: true,
  },
  {
    id: '4',
    data: '16/12/2025',
    tipo: 'Troca óleo',
    realizado: true,
  },
  {
    id: '5',
    data: '16/12/2025',
    tipo: 'Troca óleo',
    realizado: true,
  },
];

export default function Agendamento() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = (data: AgendamentoFormData) => {
    // Futuramente: salvar no backend/estado global
    console.log('Novo agendamento:', data);
    setModalVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <FordinhoBanner />

        <NovoAgendamentoButton onPress={() => setModalVisible(true)} />

        <AgendamentosList agendamentos={AGENDAMENTOS_MOCK} />

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
    paddingTop: 75,
    gap: 16,
  },
});
