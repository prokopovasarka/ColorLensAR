import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PixelRatio,
  findNodeHandle,
  Alert,
} from "react-native";
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroARPlaneSelector,
  ViroSphere,
  ViroQuad,
  ViroMaterials
} from "@reactvision/react-viro";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { captureRef } from "react-native-view-shot";
import { useNavigation } from "@react-navigation/native";
import PixelColor from "react-native-pixel-color";

const SceneAR: React.FC<any> = (props) => {
  const arRef = useRef<any>(null);
  const [placedPos, setPlacedPos] = useState<[number, number, number] | null>(null);
  const [materialName, setMaterialName] = useState("sphereColor");
  const [placedText, setPlacedText] = useState<string>(""); 
  const [trackingOK, setTrackingOK] = useState(false);

  const reportStatus = props.sceneNavigator?.viroAppProps?.reportStatus ?? (() => {});
  const registerPlaceAtPoint = props.sceneNavigator?.viroAppProps?.registerPlaceAtPoint ?? (() => {});

  const distanceToCamera = placedPos
  ? Math.sqrt(placedPos[0]**2 + placedPos[1]**2 + placedPos[2]**2)
  : 1;

  const textScale = 0.1 * distanceToCamera;
  const sphereRadius = 0.03 * distanceToCamera;

  ViroMaterials.createMaterials({
  sphereColor: {
    diffuseColor: "#ffffff", 
  },
  backdrop: {
    diffuseColor: "#000000",
  },
  });

  useEffect(() => {
    registerPlaceAtPoint(async (x: number, y: number, color: string) => {
      if (!trackingOK || !arRef.current) {
        reportStatus("Not ready: no tracking");
        return false;
      }
      try {
        const results = await arRef.current.performARHitTestWithPoint(x, y);
        const hit =
          results?.find((r: any) => r.type === "ExistingPlaneUsingExtent") ||
          results?.find((r: any) => r.type === "ExistingPlane") ||
          results?.find((r: any) => String(r.type || "").includes("Estimated")) ||
          results?.find((r: any) => r.type === "FeaturePoint");

        if (hit?.transform?.position) {
          setPlacedPos(hit.transform.position as [number, number, number]);
          setPlacedText(color || "");
          props.sceneNavigator?.viroAppProps?.setSelectedColor?.(color || "");

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

  useEffect(() => {
    if (!placedText) return;

    const newName = `sphere_${placedText.replace("#", "")}`;
    ViroMaterials.createMaterials({
      [newName]: { diffuseColor: placedText }
    });
    setMaterialName(newName);
  }, [placedText]);

  const onTrackingUpdated = (state: number) => {
    const ok = state === ViroTrackingStateConstants.TRACKING_NORMAL;
    setTrackingOK(ok);
    reportStatus(
      ok
        ? "Tap to place"
        : state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE
        ? "Tracking unavailable"
        : "Initializing…"
    );
  };

  return (
    <ViroARScene ref={arRef} onTrackingUpdated={onTrackingUpdated}>
      {placedPos && (
        <>
      <ViroText
        text={placedText}
        position={[placedPos[0], placedPos[1] + 0.05, placedPos[2]]} 
        scale={[textScale, textScale, textScale]}
        style={styles.arText}
        outerStroke={{type:"Outline", width:8, color:'#000000'}}          
        transformBehaviors={["billboard"]}
      />
    
      <ViroSphere
        key={placedText}
        position={placedPos}
        radius={sphereRadius}      
        materials={[materialName]}
        opacity={1}
      />
      </>
      )}

    </ViroARScene>
  );
};

export default function CameraScreen() {
  const [status, setStatus] = useState("Initializing…");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const navigation = useNavigation();
  const controlsDisabled = !selectedColor;

  const placeAtPointRef = useRef<
    null | ((x: number, y: number, color?: string) => Promise<boolean>)
  >(null);
  const viewRef = useRef<View>(null);

// handling tap on screen
  const handleTap = async (e: any) => {
    const px = PixelRatio.get();
    const x = Math.round(e.nativeEvent.locationX * px);
    const y = Math.round(e.nativeEvent.locationY * px);

    try {
      const tag = findNodeHandle(viewRef.current);
      if (!tag) throw new Error("View ref not found");

      const uri = await captureRef(tag, { format: "png", quality: 1 });

      const color = await PixelColor.getHex(uri, { x, y });

      console.log("Pixel color:", color);

      const ok = await placeAtPointRef.current?.(x, y, color);
      if (!ok) setStatus((s) => (s.startsWith("Placed") ? s : "No surface at tap"));
      else setStatus(`Placed`);
    } catch (err) {
      console.warn("Pixel read error:", err);
      setStatus("Pixel read failed");
    }
  };

  // saving colors
  const saveColor = async (color: string) => {
    try {
      const saved = await AsyncStorage.getItem("savedColors");
      const colors = saved ? JSON.parse(saved) : [];

      colors.push(color); 
      await AsyncStorage.setItem("savedColors", JSON.stringify(colors));

      Alert.alert(
      "Saved!",
      `Saved!`,
        [
        { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: true }
      );
    } catch (e) {
      console.warn("Error saving color:", e);
    }
  };

  return (
    <View style={styles.fullScreen} ref={viewRef} collapsable={false}>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>{status}</Text>
      </View>

      <ViroARSceneNavigator
        style={styles.flex}
        autofocus
        initialScene={{ scene: SceneAR as any }}
        viroAppProps={{
          reportStatus: (msg: string) => setStatus(msg),
          registerPlaceAtPoint: (
            fn: (x: number, y: number, color?: string) => Promise<boolean>
          ) => {
            placeAtPointRef.current = fn;
          },
          setSelectedColor: (color: string) => setSelectedColor(color), 
        }}
      />

      <Pressable onPress={handleTap} style={StyleSheet.absoluteFill} />
        
      <View style={styles.controlsWrapper} pointerEvents={controlsDisabled ? "none" : "auto"}>
        <Pressable style={[styles.controlButton, controlsDisabled && { opacity: 0.5 }]} onPress={() => saveColor(selectedColor)}>
          <Text style={styles.controlEmoji}>💾</Text>
        </Pressable>

        <Pressable style={[styles.controlButton, controlsDisabled && { opacity: 0.5 }]} onPress={() => (navigation as any).navigate("ColorDetail", { color: selectedColor })}>
          <Text style={styles.controlEmoji}>🎨</Text>
        </Pressable>
      </View>
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
    alignSelf: "center",
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
});