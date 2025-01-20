import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#18181B",
    zIndex: 100,
  },
  modalContainer: {
    borderRadius: 16,
    width: "90%",
    paddingStart: 8,
    paddingEnd: 8,
    paddingVertical: 20,
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
    fontSize: 14,
    color: "#A1A1A1",
    marginBottom: 16,
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
    color: "#e8e8e8", // Cor do texto
    borderWidth: 1, // Borda para destacar o input
    borderColor: "#A1A1A1", // Cor da borda
    borderRadius: 8, // Bordas arredondadas
    paddingVertical: 10, // Espaçamento vertical interno
    paddingHorizontal: 12, // Espaçamento horizontal interno
    backgroundColor: "#2C2C2C", // Cor de fundo
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
  },
  insertButton: {
    width: "50%",
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A3E635",

    borderRadius: 8,
  },
  insertButtonText: {
    color: "#27272A",
    fontWeight: "600",
    marginRight: 8,
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
  },
  scrollContainer: {
    maxHeight: 100, // Limita a altura do conteúdo com rolagem
    borderRadius: 8,
    overflow: "hidden",
  },
  pickerOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
  },
  picker: {
    borderRadius: 8,
    maxHeight: 100,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#18181B",
  },
  closePickerButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#E11D48",
    borderRadius: 8,
    alignItems: "center",
  },
  closePickerButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  pickerItem: {
    color: "#18181B",
    backgroundColor: "#FFFFFF",
    maxHeight: 100,
  },
});
