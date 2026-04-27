import { Colors } from '@/constants/Constants';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TimePickerProps {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  availableTimes: string[];
}

export function TimePicker({ selectedTime, onSelectTime, availableTimes }: TimePickerProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {availableTimes.map((time) => {
          const isSelected = selectedTime === time;

          return (
            <TouchableOpacity
              key={time}
              style={[styles.timeItem, isSelected && styles.selectedItem]}
              onPress={() => onSelectTime(time)}
              activeOpacity={0.7}
            >
              <Text style={[styles.timeText, isSelected && styles.selectedText]}>
                {time}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    maxHeight: 220,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: 2,
  },
  timeItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: Colors.azul_claro + '30',
  },
  timeText: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: Colors.light.preto,
  },
  selectedText: {
    fontFamily: 'Inter_700Bold',
    color: Colors.azul,
  },
});
