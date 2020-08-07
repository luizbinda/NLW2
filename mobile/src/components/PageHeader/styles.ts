import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 30,
    paddingBottom: 30,
    backgroundColor: "#8257e5",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Archivo_700Bold",
    color: "#fff",
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 180,
    marginVertical: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default styles;
