import { Colors } from '@/constants/Constants';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { Location } from '@/src/types/agendamento';
import { LocationPickerProps } from '@/src/interfaces/agendamento';;

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
        nestedScrollEnabled={true}
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
