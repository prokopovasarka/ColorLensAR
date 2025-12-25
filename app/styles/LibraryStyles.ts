import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  colorBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    margin: 10,
  },
  noColor: {
    color: "#fff",
    fontSize: 16,
  },
  grid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "flex-start", 
  },
  selectedBox: {
    borderColor: "#ff0",
    borderWidth: 3,
  },
  selectedMode: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default styles;