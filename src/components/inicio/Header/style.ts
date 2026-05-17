import { Colors } from '@/constants/Constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 10,
    backgroundColor: "rgba(227, 226, 232, 0.85)",
    overflow: "hidden",
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileCircle: {
    width: 44,
    height: 44,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
  },
  nameText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: Colors.azul,
  },
  subtitleText: {
    fontSize: 10,
    fontFamily: "Inter_600SemiBold",
    color: Colors.light.preto,
    textDecorationLine: "underline",
  },
  bellContainer: {
    position: "relative",
    padding: 5,
  },
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.azul,
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  logoutButton: {
    padding: 5,
  },
});
