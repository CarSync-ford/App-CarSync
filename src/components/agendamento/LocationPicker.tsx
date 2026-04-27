import { Colors } from '@/constants/Constants';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface Location {
  id: string;
  distancia: string;
  endereco: string;
  maisProxima?: boolean;
}

interface LocationPickerProps {
  selectedLocation: string | null;
  onSelectLocation: (locationId: string) => void;
  locations: Location[];
}

export function LocationPicker({
  selectedLocation,
  onSelectLocation,
  locations,
}: LocationPickerProps) {
  const closest = locations.filter((l) => l.maisProxima);
  const others = locations.filter((l) => !l.maisProxima);

  const renderItem = (location: Location) => {
    const isSelected = selectedLocation === location.id;

    return (
      <TouchableOpacity
        key={location.id}
        style={[
          styles.locationItem,
          isSelected && styles.selectedItem,
          location.maisProxima && styles.closestItem,
        ]}
        onPress={() => onSelectLocation(location.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.distanceText}>{location.distancia}</Text>
        <Text style={styles.addressText} numberOfLines={1}>
          {' - '}
          {location.endereco}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {closest.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Mais próxima de você</Text>
            {closest.map(renderItem)}
          </>
        )}

        {others.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Outros</Text>
            {others.map(renderItem)}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    maxHeight: 250,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.light.preto,
    marginBottom: 6,
    marginTop: 4,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 4,
  },
  closestItem: {
    borderColor: Colors.amarelo,
    backgroundColor: Colors.amarelo + '10',
  },
  selectedItem: {
    borderColor: Colors.azul_claro,
    backgroundColor: Colors.azul_claro + '15',
  },
  distanceText: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    color: Colors.light.preto,
  },
  addressText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: Colors.light.preto,
  },
});
