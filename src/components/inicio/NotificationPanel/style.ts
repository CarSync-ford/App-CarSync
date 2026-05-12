import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 24,
    zIndex: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    color: Colors.azul,
    marginBottom: 12,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    gap: 14,
    borderBottomColor: Colors.cinza,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  itemLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
  text: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: Colors.light.preto,
  },
  time: {
    fontSize: 14,
    color: Colors.light.cinza,
    fontFamily: "Inter_600SemiBold",
  },
  textHighlight: {
    color: Colors.amarelo,
  },
});
