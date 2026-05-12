import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 15,
    backgroundColor: "transparent",
    zIndex: 10,
  },
  backButton: {
    padding: 10,
    marginLeft: -10, // Para compensar o padding e alinhar com a margem
  },
  centerGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 10,
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF", // Fundo branco caso a imagem tenha transparência
  },
  textContainer: {
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: Colors.azul,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.light.preto,
  },
  bellContainer: {
    position: "relative",
    padding: 5,
    marginRight: -5,
  },
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.azul,
    borderWidth: 1.5,
    borderColor: "#DCE7F5", // Cor do fundo da tela (para criar o gap em volta da bolinha)
  },
});
