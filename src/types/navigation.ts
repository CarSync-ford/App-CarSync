import { FontAwesome6 as FontAwesome } from "@expo/vector-icons";
import * as React from "react";

export type Icon = React.ComponentProps<typeof FontAwesome>["name"];
