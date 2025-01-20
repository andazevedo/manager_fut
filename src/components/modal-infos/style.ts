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
    fontSize: 14,
    color: "#fff",
  },
  emailListContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },

  separator: {
    height: 1,
    backgroundColor: "#27272A",
    marginVertical: 16,
  },
  formContainer: {
    flexDirection: "column",
    gap: 8,
  },

  detailsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 3,
    justifyContent: "center",
  },
  detailsElements: {
    alignItems: "center",
    flexDirection: "row",
    gap: 3,
  },

  insertButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#A3E635",
    borderRadius: 8,
    alignItems: "center",
  },
  insertButtonText: {
    color: "#27272A",
    fontWeight: "600",
  },

  deleteButton: {
    marginTop: 20,
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
