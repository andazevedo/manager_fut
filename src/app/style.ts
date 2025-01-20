import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    padding: 24,
  },
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
  separator: {
    height: 1,
    backgroundColor: "#27272A",
    marginVertical: 16,
  },
  listContainer: {
    width: "100%",
  },
  listHeader: {
    fontSize: 24,
    backgroundColor: "#27272A",
    color: "#FFFFFF",
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  horizontalList: {
    flexDirection: "row",
    flexWrap: "nowrap",
    overflow: "scroll", // Permite rolagem horizontal
    marginBottom: 16,
    paddingHorizontal: 8,
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
