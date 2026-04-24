import { Colors } from '@/constants/Constants';
import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CalendarPicker } from './CalendarPicker';
import { Location, LocationPicker } from './LocationPicker';
import { TimePicker } from './TimePicker';

interface NovoAgendamentoModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (data: AgendamentoFormData) => void;
}

export interface AgendamentoFormData {
  data: Date | null;
  horario: string | null;
  motivo: string | null;
  outroMotivo: string;
  local: string | null;
}

const MOTIVOS = [
  'Manutenção preventiva',
  'Manutenção corretiva',
  'Troca de óleo',
  'Revisão completa',
  'Alinhamento e balanceamento',
  'Troca de pneus',
];

const HORARIOS_DISPONIVEIS = ['10H', '10H30', '11H', '11H30', '12H', '12H30', '13H', '13H30', '14H', '14H30',
 '15H', '16H', '16H30', '17H'];

const LOCAIS_MOCK: Location[] = [
  {
    id: '1',
    distancia: '1,5KM',
    endereco: 'R. Alagoas, 41 - Centro, São Caetano do Sul - SP, 0952...',
    maisProxima: true,
  },
  {
    id: '2',
    distancia: '2,5KM',
    endereco: 'R. Alagoas, 41 - Centro, São Caetano do Sul - SP, 0952...',
  },
  {
    id: '3',
    distancia: '2,5KM',
    endereco: 'R. Alagoas, 41 - Centro, São Caetano do Sul - SP, 0952...',
  },
  {
    id: '4',
    distancia: '2,5KM',
    endereco: 'R. Alagoas, 41 - Centro, São Caetano do Sul - SP, 0952...',
  },
];

export function NovoAgendamentoModal({ visible, onClose, onConfirm }: NovoAgendamentoModalProps) {
  const [formData, setFormData] = useState<AgendamentoFormData>({
    data: null,
    horario: null,
    motivo: null,
    outroMotivo: '',
    local: null,
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showMotivoPicker, setShowMotivoPicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return '00/00/0000';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleConfirm = () => {
    onConfirm(formData);
    setFormData({ data: null, horario: null, motivo: null, outroMotivo: '', local: null });
    setShowCalendar(false);
    setShowTimePicker(false);
    setShowMotivoPicker(false);
    setShowLocationPicker(false);
  };

  const handleClose = () => {
    onClose();
    setShowCalendar(false);
    setShowTimePicker(false);
    setShowMotivoPicker(false);
    setShowLocationPicker(false);
  };

  const selectedLocationObj = LOCAIS_MOCK.find((l) => l.id === formData.local);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.sheet}>
            <View style={styles.handle} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >

              {/* Calendar Picker Inline */}
              {showCalendar && (
                <CalendarPicker
                  selectedDate={formData.data}
                  onSelectDate={(date) => {
                    setFormData({ ...formData, data: date });
                    setShowCalendar(false);
                  }}
                />
              )}

              {/* Data e Horário */}
              <View style={styles.rowFields}>
                <View style={styles.fieldHalf}>
                  <Text style={styles.label}>Data do agendamento</Text>
                  <TouchableOpacity
                    style={styles.inputButton}
                    onPress={() => {
                      setShowCalendar(!showCalendar);
                      setShowTimePicker(false);
                      setShowMotivoPicker(false);
                      setShowLocationPicker(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <FontAwesome name="calendar-days" size={16} color={Colors.azul} />
                    <Text style={styles.inputText}>{formatDate(formData.data)}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.fieldSmall}>
                  <Text style={styles.label}>Horário</Text>
                  <TouchableOpacity
                    style={styles.inputButton}
                    onPress={() => {
                      setShowTimePicker(!showTimePicker);
                      setShowCalendar(false);
                      setShowMotivoPicker(false);
                      setShowLocationPicker(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <FontAwesome name="clock" size={16} color={Colors.azul} />
                    <Text style={styles.inputText}>
                      {formData.horario || '00H00'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>



              {/* Time Picker Inline */}
              {showTimePicker && (
                <TimePicker
                  selectedTime={formData.horario}
                  onSelectTime={(time) => {
                    setFormData({ ...formData, horario: time });
                    setShowTimePicker(false);
                  }}
                  availableTimes={HORARIOS_DISPONIVEIS}
                />
              )}

              {/* Motivo */}
              <View style={styles.fieldFull}>
                <Text style={styles.label}>Motivo</Text>
                <TouchableOpacity
                  style={styles.inputButton}
                  onPress={() => {
                    setShowMotivoPicker(!showMotivoPicker);
                    setShowCalendar(false);
                    setShowTimePicker(false);
                    setShowLocationPicker(false);
                  }}
                  activeOpacity={0.7}
                >
                  <FontAwesome
                    name="chevron-down"
                    size={14}
                    color={Colors.light.preto}
                  />
                  <Text style={styles.inputText}>
                    {formData.motivo || 'Selecione'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Motivo Picker Dropdown */}
              {showMotivoPicker && (
                <View style={styles.dropdownContainer}>
                  {MOTIVOS.map((motivo) => (
                    <TouchableOpacity
                      key={motivo}
                      style={[
                        styles.dropdownItem,
                        formData.motivo === motivo && styles.dropdownItemSelected,
                      ]}
                      onPress={() => {
                        setFormData({ ...formData, motivo });
                        setShowMotivoPicker(false);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.dropdownText,
                          formData.motivo === motivo && styles.dropdownTextSelected,
                        ]}
                      >
                        {motivo}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Outro Motivo */}
              <View style={styles.fieldFull}>
                <Text style={styles.label}>Outro motivo</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Digite aqui"
                    placeholderTextColor={Colors.cinza}
                    value={formData.outroMotivo}
                    onChangeText={(text) =>
                      setFormData({ ...formData, outroMotivo: text })
                    }
                  />
                </View>
              </View>

              {/* Local */}
              <View style={styles.fieldFull}>
                <Text style={styles.label}>Local</Text>
                <TouchableOpacity
                  style={styles.inputButton}
                  onPress={() => {
                    setShowLocationPicker(!showLocationPicker);
                    setShowCalendar(false);
                    setShowTimePicker(false);
                    setShowMotivoPicker(false);
                  }}
                  activeOpacity={0.7}
                >
                  <FontAwesome
                    name="chevron-down"
                    size={14}
                    color={Colors.light.preto}
                  />
                  <Text style={styles.inputText} numberOfLines={1}>
                    {selectedLocationObj
                      ? `${selectedLocationObj.distancia} - ${selectedLocationObj.endereco}`
                      : 'Digite ou selecione um local'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Location Picker Inline */}
              {showLocationPicker && (
                <LocationPicker
                  selectedLocation={formData.local}
                  onSelectLocation={(locationId) => {
                    setFormData({ ...formData, local: locationId });
                    setShowLocationPicker(false);
                  }}
                  locations={LOCAIS_MOCK}
                />
              )}
            </ScrollView>

            {/* Botões */}
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleClose}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
                activeOpacity={0.85}
              >
                <Text style={styles.confirmText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 30,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.cinza,
    alignSelf: 'center',
    marginBottom: 16,
  },
  scrollContent: {
    gap: 18,
    paddingBottom: 12,
  },
  rowFields: {
    flexDirection: 'row',
    gap: 12,
  },
  fieldHalf: {
    flex: 1,
    gap: 6,
  },
  fieldSmall: {
    width: '35%',
    gap: 6,
  },
  fieldFull: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.azul,
  },
  inputButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  inputText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.light.preto,
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  textInput: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.light.preto,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  dropdownItemSelected: {
    backgroundColor: Colors.azul_claro + '25',
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.light.preto,
  },
  dropdownTextSelected: {
    fontFamily: 'Inter_700Bold',
    color: Colors.azul,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.cinza,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  confirmButton: {
    flex: 1.3,
    backgroundColor: Colors.azul,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
  },
});
