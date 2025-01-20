import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

export function Loading(props: ActivityIndicatorProps) {
  return <ActivityIndicator color={"#27272A"} {...props} />;
}
