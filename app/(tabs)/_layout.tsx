import { FontAwesome6 as FontAwesome } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import {
  TabList,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from "expo-router/ui";
import { forwardRef } from "react";
import { Pressable, Text, View } from "react-native";
import { Colors } from "../../constants/Constants";
import { Header } from "../../src/components/inicio/Header";
import { Icon } from '@/src/types/navigation';
import { TabButtonProps } from '@/src/interfaces/navigation';;

const TabButton = forwardRef<View, TabButtonProps>(
  ({ icon, label, isFocused, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...props}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome
          name={icon}
          size={24}
          color={isFocused ? Colors.azul : "#C0C0C2"}
        />
        <Text
          style={{
            fontSize: 12,
            color: isFocused ? Colors.azul : "#C0C0C2",
          }}
        >
          {label}
        </Text>
      </Pressable>
    );
  },
);

export default function TabLayout() {
  const pathname = usePathname();
  const showHeader = !pathname.includes("/chat");

  const showTabs = !pathname.includes('/chat');

  return (
    <Tabs style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <TabSlot style={{ flex: 1 }} />
        {showHeader && <Header />}
      </View>

      <TabList
        style={{
          display: showTabs ? 'flex' : 'none',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          backgroundColor: "#FFFFFF",
          margin: 23,
          borderRadius: 16,
          height: 65,
          borderColor: Colors.cinza,
          borderWidth: 1,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.16,
          shadowRadius: 10.7,
          elevation: 8,
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
