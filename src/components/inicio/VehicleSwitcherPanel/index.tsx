import { useEffect, useRef, useState } from "react";
import { Animated, Image, Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { FontAwesome6 as FontAwesome } from "@expo/vector-icons";
import { Colors } from '@/constants/Constants';
import { useVehicle } from '@/src/contexts/VehicleContext';
import { styles } from './style';

interface VehicleSwitcherPanelProps {
  visible: boolean;
  onClose: () => void;
  topOffset?: number;
}

export function VehicleSwitcherPanel({ visible, onClose, topOffset }: VehicleSwitcherPanelProps) {
  const translateY = useRef(new Animated.Value(-10)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const { veiculos, perfilIcones, veiculoSelecionado, perfilIconeSelecionado, salvarPreferencias } = useVehicle();

  const [veiculoId, setVeiculoId] = useState(veiculoSelecionado.id);
  const [perfilIconeId, setPerfilIconeId] = useState<string | null>(perfilIconeSelecionado?.id ?? null);
  const [showDropdown, setShowDropdown] = useState(false);

  const panelTop = topOffset ?? 64;

  useEffect(() => {
    if (visible) {
      setVeiculoId(veiculoSelecionado.id);
      setPerfilIconeId(perfilIconeSelecionado?.id ?? null);
      setShowDropdown(false);
    }
  }, [visible]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: visible ? 0 : -10,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  const veiculoDraft = veiculos.find((v) => v.id === veiculoId) ?? veiculos[0];

  const handleSave = async () => {
    await salvarPreferencias(veiculoId, perfilIconeId);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[styles.panel, { top: panelTop, opacity, transform: [{ translateY }] }]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Trocar veículo</Text>

          <Text style={styles.label}>Veículo</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowDropdown((v) => !v)}
            activeOpacity={0.7}
          >
            <Image source={veiculoDraft.imagem} style={styles.selectImage} resizeMode="contain" />
            <Text style={styles.selectText}>{veiculoDraft.nome}</Text>
            <FontAwesome
              name={showDropdown ? "chevron-up" : "chevron-down"}
              size={14}
              color={Colors.light.preto}
            />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownContainer}>
              {veiculos.map((v) => (
                <TouchableOpacity
                  key={v.id}
                  style={[styles.dropdownItem, v.id === veiculoId && styles.dropdownItemSelected]}
                  onPress={() => {
                    setVeiculoId(v.id);
                    setShowDropdown(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Image source={v.imagem} style={styles.dropdownImage} resizeMode="contain" />
                  <Text style={[styles.dropdownText, v.id === veiculoId && styles.dropdownTextSelected]}>
                    {v.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.label}>Foto de perfil</Text>
          <View style={styles.iconsRow}>
            {perfilIcones.map((icone) => (
              <TouchableOpacity
                key={icone.id}
                style={[styles.iconWrapper, icone.id === perfilIconeId && styles.iconWrapperSelected]}
                onPress={() => setPerfilIconeId(icone.id)}
                activeOpacity={0.7}
              >
                <Image source={icone.imagem} style={styles.iconImage} resizeMode="cover" />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.85}>
            <Text style={styles.saveText}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}
