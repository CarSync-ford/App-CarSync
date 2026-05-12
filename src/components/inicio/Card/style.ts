import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.52)",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    gap: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.preto,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
});
