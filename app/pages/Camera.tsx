import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, PixelRatio } from "react-native";
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroARPlaneSelector,
} from "@reactvision/react-viro";

const SceneAR: React.FC<any> = (props) => {
  const arRef = useRef<any>(null);
  const [placedPos, setPlacedPos] = useState<[number, number, number] | null>(null);
  const [trackingOK, setTrackingOK] = useState(false);

  const reportStatus = props.sceneNavigator?.viroAppProps?.reportStatus ?? (() => {});
  const registerPlaceAtPoint = props.sceneNavigator?.viroAppProps?.registerPlaceAtPoint ?? (() => {});

  useEffect(() => {
    registerPlaceAtPoint(async (x: number, y: number) => {
      if (!trackingOK || !arRef.current) { reportStatus("Not ready: no tracking"); return false; }
      try {
        const results = await arRef.current.performARHitTestWithPoint(x, y);
        const hit =
          results?.find((r: any) => r.type === "ExistingPlaneUsingExtent") ||
          results?.find((r: any) => r.type === "ExistingPlane") ||
          results?.find((r: any) => String(r.type || "").includes("Estimated")) ||
          results?.find((r: any) => r.type === "FeaturePoint");

        if (hit?.transform?.position) {
          setPlacedPos(hit.transform.position as [number, number, number]);
          reportStatus("Placed");
          return true;
        }
        reportStatus("No surface at tap");
        return false;
      } catch {
        reportStatus("Hit-test failed");
        return false;
      }
    });
  }, [trackingOK, registerPlaceAtPoint, reportStatus]);

  const onTrackingUpdated = (state: number) => {
    const ok = state === ViroTrackingStateConstants.TRACKING_NORMAL;
    setTrackingOK(ok);
    reportStatus(
      ok ? "Tap to place"
         : state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE
         ? "Tracking unavailable"
         : "Initializing…"
    );
  };

  return (
    <ViroARScene ref={arRef} onTrackingUpdated={onTrackingUpdated}>
      <ViroARPlaneSelector />
      {placedPos && (
        <ViroText
          text="Hello"
          position={placedPos}
          scale={[0.2, 0.2, 0.2]}
          style={styles.arText}
        />
      )}
    </ViroARScene>
  );
};

export default function CameraScreen() {
  const [status, setStatus] = useState("Initializing…");
  const placeAtPointRef = useRef<null | ((x: number, y: number) => Promise<boolean>)>(null);

  const handleTap = async (e: any) => {
    const px = PixelRatio.get();
    const x = Math.round(e.nativeEvent.locationX * px); 
    const y = Math.round(e.nativeEvent.locationY * px);
    const ok = await placeAtPointRef.current?.(x, y);
    if (!ok) setStatus((s) => (s.startsWith("Placed") ? s : "No surface at tap"));
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.statusBar}><Text style={styles.statusText}>{status}</Text></View>

      <ViroARSceneNavigator
        style={styles.flex}
        autofocus
        initialScene={{ scene: SceneAR as any }}
        viroAppProps={{
          reportStatus: (msg: string) => setStatus(msg),
          registerPlaceAtPoint: (fn: (x: number, y: number) => Promise<boolean>) => {
            placeAtPointRef.current = fn;
          },
        }}
      />

      <Pressable onPress={handleTap} style={StyleSheet.absoluteFill} />
    </View>
  );
}

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
    top: 0, left: 0, right: 0,
    zIndex: 10,
    paddingVertical: 10,
  },
  statusText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "600" },
});