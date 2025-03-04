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
  separator: {
    height: 1,
    backgroundColor: "#27272A",
    marginVertical: 16,
  },
  calendar: {
    backgroundColor: "transparent",
  },
  selected: {
    color: "#fff",
    fontSize: 20,
    marginTop: 42,
  },
  dayText: {
    color: "#e8e8e8",
  },
  day: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  disabled: {
    color: "#717171",
  },
  today: {
    color: "#f06543",
    fontWeight: "bold",
  },
  selectedDay: {
    backgroundColor: "#f06543",
    fontWeight: "bold",
  },

  listContainer: {
    width: "100%",
  },

  listItemContainer: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },

  listItemText: {
    fontSize: 16,
    color: "#333",
  },

  listSeparator: {
    height: 4,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
  },
});
