import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "flex-end",
  },
  keyboardView: {
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 30,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.cinza,
    alignSelf: "center",
    marginBottom: 16,
  },
  scrollContent: {
    gap: 18,
    paddingBottom: 12,
  },
  rowFields: {
    flexDirection: "row",
    gap: 12,
  },
  fieldHalf: {
    flex: 1,
    gap: 6,
  },
  fieldSmall: {
    width: "35%",
    gap: 6,
  },
  fieldFull: {
    gap: 6,
  },
  fieldDisabled: {
    opacity: 0.35,
    pointerEvents: "none",
  },
  label: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: Colors.azul,
  },
  inputButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  inputText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.light.preto,
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  textInput: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.light.preto,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  dropdownContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  dropdownItemSelected: {
    backgroundColor: Colors.azul_claro + "25",
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.light.preto,
  },
  dropdownTextSelected: {
    fontFamily: "Inter_700Bold",
    color: Colors.azul,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.cinza,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  confirmButton: {
    flex: 1.3,
    backgroundColor: Colors.azul,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  confirmText: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
  },
});
