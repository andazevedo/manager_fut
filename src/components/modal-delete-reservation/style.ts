import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 320,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: "#18181B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  subHeaderText: {
    textAlign: "justify",
    fontSize: 14,
    color: "#A1A1A1",
  },
  emailListContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  emailChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#27272A",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  emailText: {
    color: "#D4D4D8",
  },
  separator: {
    height: 1,
    backgroundColor: "#27272A",
    marginVertical: 16,
  },
  formContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  inputContainer: {
    width: "100%",
    height: 150,
    color: "#e8e8e8", // Cor do texto
    borderWidth: 1, // Borda para destacar o input
    borderColor: "#A1A1A1", // Cor da borda
    borderRadius: 8, // Bordas arredondadas
    paddingVertical: 10, // Espaçamento vertical interno
    paddingHorizontal: 12, // Espaçamento horizontal interno
    backgroundColor: "#2C2C2C", // Cor de fundo
    textAlignVertical: "top", // Alinhamento vertical do texto
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
  },
  insertButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A3E635",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  insertButtonText: {
    color: "#27272A",
    fontWeight: "600",
    marginRight: 8,
  },
  viewContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
  },
  deleteButton: {
    width: "100%",

    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#E11D48",
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
