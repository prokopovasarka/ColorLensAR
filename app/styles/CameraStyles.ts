import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  fullScreen: { flex: 1 },
  flex: { flex: 1 },
  arText: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlign: "center",
    textAlignVertical: "center",
  },
  statusBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingVertical: 10,
  },
  statusText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  controlsWrapper: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",       
    justifyContent: "space-around", 
    width: "100%",               
    alignItems: "center",
  },
  controlButton: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  controlEmoji: {
    fontSize: 24,
    color: "#fff",
  },
  topControls: {
  position: "absolute",
  top: 40,
  left: 0,
  right: 0,
  flexDirection: "row",
  justifyContent: "center",
  gap: 20,
  zIndex: 10,
  }
});

export default styles;