import { TabTriggerSlotProps } from "expo-router/ui";
import { Icon } from '../types/navigation';;

export interface TabButtonProps extends TabTriggerSlotProps {
      icon: Icon;
      label: string;
}
