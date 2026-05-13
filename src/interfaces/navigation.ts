import { FontAwesome6 as FontAwesome } from "@expo/vector-icons";
import { TabTriggerSlotProps } from "expo-router/ui";
import * as React from "react";

export type Icon = React.ComponentProps<typeof FontAwesome>["name"];
export type TabButtonProps = TabTriggerSlotProps & {
      icon: Icon;
      label: string;
    };
