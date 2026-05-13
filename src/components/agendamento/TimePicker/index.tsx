import { Colors } from '@/constants/Constants';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { TimePickerProps } from "@/src/interfaces/agendamento";

export function TimePicker({ selectedTime, onSelectTime, availableTimes }: TimePickerProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
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
