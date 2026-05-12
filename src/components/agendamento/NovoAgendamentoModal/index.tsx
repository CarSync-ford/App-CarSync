import { Colors } from "@/constants/Constants";
import { FontAwesome6 as FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CalendarPicker } from "../CalendarPicker";
import { Location, LocationPicker } from "../LocationPicker";
import { TimePicker } from "../TimePicker";
import { IAgendamento } from "../AgendamentoCard";
import { styles } from './style';

interface NovoAgendamentoModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (data: IAgendamento) => void;
}

const MOTIVOS = [
  "Manutenção preventiva",
  "Manutenção corretiva",
  "Troca de óleo",
  "Revisão completa",
  "Alinhamento e balanceamento",
  "Troca de pneus",
  "Outro motivo",
];

const HORARIOS_DISPONIVEIS = [
  "10H",
  "10H30",
  "11H",
  "11H30",
  "12H",
  "12H30",
  "13H",
  "13H30",
  "14H",
  "14H30",
  "15H",
  "16H",
  "16H30",
  "17H",
];

const LOCAIS_MOCK: Location[] = [
  {
    id: "0",
    distancia: "1,5KM",
    endereco: "R. Alagoas, 41 - Centro, São Caetano do Sul - SP, 0952...",
    maisProxima: true,
  },
  {
    id: "1",
    distancia: "2,5KM",
    endereco: "R. Alagoas, 41 - Centro, São Caetano do Sul - SP, 0952...",
  },
  {
    id: "2",
    distancia: "2,5KM",
    endereco: "R. Alagoas, 41 - Centro, São Caetano do Sul - SP, 0952...",
  },
  {
    id: "3",
    distancia: "2,5KM",
    endereco: "R. Alagoas, 41 - Centro, São Caetano do Sul - SP, 0952...",
  },
];

export function NovoAgendamentoModal({
  visible,
  onClose,
  onConfirm,
}: NovoAgendamentoModalProps) {
  const [formData, setFormData] = useState<IAgendamento>({
    data: new Date(),
    horario: "",
    motivo: "",
    outroMotivo: "",
    local: "",
  });

  const [localPicker, setLocalPicker] = useState("0")

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showMotivoPicker, setShowMotivoPicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 4,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: Dimensions.get("window").height,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setModalVisible(false));
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) translateY.setValue(gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 80) {
          handleClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 4,
          }).start();
        }
      },
    })
  ).current;

  const formatDate = (date: Date | null) => {
    if (!date) return "00/00/0000";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleConfirm = () => {
    onConfirm(formData);
    setFormData({
      data: null,
      horario: null,
      motivo: null,
      outroMotivo: "",
      local: null,
    });
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

  const selectedLocationObj = LOCAIS_MOCK.find((l) => l.id === localPicker);

  return (
    <Modal
      visible={modalVisible}
      animationType="none"
      transparent
      onRequestClose={handleClose}
    >
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <Animated.View
            style={[styles.sheet, { transform: [{ translateY }] }]}
          >
            <View style={styles.handle} {...panResponder.panHandlers} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
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
                    <FontAwesome
                      name="calendar-days"
                      size={16}
                      color={Colors.azul}
                    />
                    <Text style={styles.inputText}>
                      {formatDate(formData.data)}
                    </Text>
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
                      {formData.horario || "00H00"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

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
                    {formData.motivo || "Selecione"}
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
                        formData.motivo === motivo &&
                          styles.dropdownItemSelected,
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
                          formData.motivo === motivo &&
                            styles.dropdownTextSelected,
                        ]}
                      >
                        {motivo}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Outro Motivo */}
              <View
                style={[
                  styles.fieldFull,
                  formData.motivo !== "Outro motivo" && styles.fieldDisabled,
                ]}
              >
                <Text style={styles.label}>Outro motivo</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Digite aqui"
                    placeholderTextColor={Colors.cinza}
                    value={formData.outroMotivo}
                    editable={formData.motivo === "Outro motivo"}
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
                      : "Digite ou selecione um local"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Location Picker Inline */}
              {showLocationPicker && (
                <LocationPicker
                  selectedLocation={localPicker}
                  onSelectLocation={(locationId) => {
                    setFormData({ ...formData, local: LOCAIS_MOCK[parseInt(locationId)].endereco });
                    setLocalPicker(locationId);
                    setShowLocationPicker(false);
                    console.log(localPicker);
                    
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
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}
