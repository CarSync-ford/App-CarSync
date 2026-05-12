import { Colors } from '@/constants/Constants';
import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

interface CalendarPickerProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

const DAYS_OF_WEEK = ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sá'];
const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function CalendarPicker({ selectedDate, onSelectDate }: CalendarPickerProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);

  const prevMonthDays: number[] = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    prevMonthDays.push(daysInPrevMonth - i);
  }

  const currentMonthDays: number[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push(i);
  }

  const totalCells = prevMonthDays.length + currentMonthDays.length;
  const nextMonthDays: number[] = [];
  const remaining = 7 - (totalCells % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      nextMonthDays.push(i);
    }
  }

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const getDayColor = (dayIndex: number) => {
    if (dayIndex === 0) return Colors.azul; // Domingo
    if (dayIndex === 6) return Colors.azul;  // Sábado
    return Colors.light.preto;
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentYear(currentYear - 1)} style={styles.navButton}>
          <FontAwesome name="chevron-left" size={14} color={Colors.azul} />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {currentYear}
        </Text>
        <TouchableOpacity onPress={() => setCurrentYear(currentYear + 1)} style={styles.navButton}>
          <FontAwesome name="chevron-right" size={14} color={Colors.azul} />
        </TouchableOpacity>
      </View>
      </View>
      {/* Header com navegação */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPrevMonth} style={styles.navButton}>
          <FontAwesome name="chevron-left" size={14} color={Colors.azul} />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {MONTH_NAMES[currentMonth]}
        </Text>
        <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
          <FontAwesome name="chevron-right" size={14} color={Colors.azul} />
        </TouchableOpacity>
      </View>

      {/* Dias da semana */}
      <View style={styles.weekRow}>
        {DAYS_OF_WEEK.map((day, index) => (
          <Text
            key={`header-${index}`}
            style={[styles.weekDay, { color: getDayColor(index) }]}
          >
            {day}
          </Text>
        ))}
      </View>

      {/* Grid de dias */}
      <View style={styles.daysGrid}>
        {/* Dias do mês anterior */}
        {prevMonthDays.map((day, index) => (
          <View key={`prev-${index}`} style={styles.dayCell}>
            <Text style={styles.dayTextFaded}>{day}</Text>
          </View>
        ))}

        {/* Dias do mês atual */}
        {currentMonthDays.map((day) => {
          const dayIndex = (firstDay + day - 1) % 7;
          const selected = isSelected(day);

          return (
            <TouchableOpacity
              key={`curr-${day}`}
              style={[styles.dayCell, selected && styles.selectedDay]}
              onPress={() => onSelectDate(new Date(currentYear, currentMonth, day))}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dayText,
                  { color: getDayColor(dayIndex) },
                  selected && styles.selectedDayText,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Dias do próximo mês */}
        {nextMonthDays.map((day, index) => (
          <View key={`next-${index}`} style={styles.dayCell}>
            <Text style={styles.dayTextFaded}>{day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
