import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "flex-start", 
    paddingTop: 50,
    alignItems: "center" 
  },
  title:{ 
    fontSize: 24,
    fontWeight: "600",
    paddingBottom: 10,
  },
  text: { 
    fontSize: 15, 
    padding: 3,
  },
  paletteTitle: {
    marginTop: 60,
    fontSize: 20,
    fontWeight: "600",
  },
  palette: {
    flexDirection: "row",
    marginTop: 20,
  },
  colorBox: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
});

export default styles;