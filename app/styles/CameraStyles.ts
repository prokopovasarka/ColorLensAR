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
  galleryButton: {
    marginHorizontal: 10,
    position: "absolute",
    left: 30,
  },
  unselectButton: {
    marginHorizontal: 10,
    position: "absolute",
    right: 30,
  },
  controlEmoji: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
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
  },
  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  innerCircle: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#fff",
  },
  staticView: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: [{ translateX: -60 }, { translateY: -45 }],
    alignItems: "center",
  },
  staticBox: {
    width: 140,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 3,
  },
  staticName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  staticHEX: {
    color: "#fff",
    fontSize: 11,
    textAlign: "center",
  },
  staticCircle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 8,
  },
});

export default styles;