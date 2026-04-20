import { FontAwesome6 as FontAwesome } from '@expo/vector-icons';
import { TabList, Tabs, TabSlot, TabTrigger, TabTriggerSlotProps } from 'expo-router/ui';
import { forwardRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Colors } from '../../constants/Constants';

type Icon = React.ComponentProps<typeof FontAwesome>['name'];

type TabButtonProps = TabTriggerSlotProps & {
  icon: Icon;
  label: string;
};

const TabButton = forwardRef<View, TabButtonProps>(
  ({ icon, label, isFocused, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...props}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FontAwesome
          name={icon}
          size={24}
          color={isFocused ? Colors.azul : "#C0C0C2"}
        />
        <Text style={{
          fontSize: 12,
          color: isFocused ? Colors.azul : "#C0C0C2"
        }}>
          {label}
        </Text>
      </Pressable>
    );
  }
);

export default function TabLayout() {
  return (
    <Tabs>
      <TabSlot />

      <TabList
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          backgroundColor: Colors.light.branco_cards,
          margin: 23,
          borderRadius: 16,
          height: 65,
          borderColor: Colors.cinza,
          borderWidth: 1,
        }}
      >
        <TabTrigger name="index" href="/(tabs)" asChild>
          <TabButton icon="house" label="Início" />
        </TabTrigger>

        <TabTrigger name="agendamento" href="/(tabs)/agendamento" asChild>
          <TabButton icon="calendar-days" label="Agendamento" />
        </TabTrigger>

        <TabTrigger name="chat" href="/(tabs)/chat" asChild>
          <TabButton icon="comments" label="Chat IA" />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
