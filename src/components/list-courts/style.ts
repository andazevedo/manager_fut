import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    maxWidth: "80%",
  },
  subHeaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 2,
    marginTop: 8,
  },
  subHeaderText: {
    fontSize: 14,
    color: "#A1A1A1",
  },

  listContainer: {
    width: "100%",
  },
  listHeader: {
    fontWeight: "800",
    fontSize: 18,
    color: "#f4f4f4",
    marginTop: 20,
    marginBottom: 5,
  },

  card: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#27272A",
    alignItems: "center",
    justifyContent: "center",
    width: 120, // Define o tamanho dos cards
  },
  cardTitle: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
