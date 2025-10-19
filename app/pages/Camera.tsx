import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PixelRatio,
  findNodeHandle,
  Image,
  Alert,
} from "react-native";
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroSphere,
  ViroFlexView,
  ViroMaterials
} from "@reactvision/react-viro";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { captureRef } from "react-native-view-shot";
import { useNavigation } from "@react-navigation/native";
import PixelColor from "react-native-pixel-color";
import useColorData from "./ColorData";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { launchImageLibrary } from "react-native-image-picker";

import styles from "../styles/CameraStyles";

const SceneAR: React.FC<any> = (props) => {
  const arRef = useRef<any>(null);
  const [placedPos, setPlacedPos] = useState<[number, number, number] | null>(null);
  const [materialName, setMaterialName] = useState("sphereColor");
  const [placedName, setPlacedName] = useState<string>("");
  const [placedHEX, setPlacedHEX] = useState<string>("");
  const [placedHSL, setPlacedHSL] = useState<string>("");
  const [trackingOK, setTrackingOK] = useState(false);

  const reportStatus = props.sceneNavigator?.viroAppProps?.reportStatus ?? (() => { });
  const registerPlaceAtPoint = props.sceneNavigator?.viroAppProps?.registerPlaceAtPoint ?? (() => { });
  const colorData = useColorData(placedHEX || "#ffffff");

  const distanceToCamera = placedPos
    ? Math.sqrt(placedPos[0] ** 2 + placedPos[1] ** 2 + placedPos[2] ** 2)
    : 1;
  const sphereRadius = 0.03 * distanceToCamera;

  ViroMaterials.createMaterials({
    sphereColor: { diffuseColor: "#ffffff" },
    labelBackground: { diffuseTexture: require("../assets/infoBox.png") },
  });

  useEffect(() => {
    registerPlaceAtPoint(async (x: number, y: number, color: string) => {
      if (!trackingOK || !arRef.current) {
        reportStatus("Not ready");
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
          setPlacedHEX(color);
          setPlacedName(colorData.colorName);
          setPlacedHSL(colorData.hslString);
          props.sceneNavigator?.viroAppProps?.setSelectedColor?.(color);
          reportStatus("Placed");
          return true;
        }
        return false;
      } catch {
        reportStatus("Hit-test failed");
        return false;
      }
    });
  }, [trackingOK]);

  useEffect(() => {
    if (!placedHEX) return;
    const newName = `sphere_${placedHEX.replace("#", "")}`;
    ViroMaterials.createMaterials({ [newName]: { diffuseColor: placedHEX } });
    setTimeout(() => {
      setMaterialName(newName);
      setPlacedName(colorData.colorName);
      setPlacedHSL(colorData.hslString);
    }, 50);
  }, [placedHEX]);

  const onTrackingUpdated = (state: number) => {
    const ok = state === ViroTrackingStateConstants.TRACKING_NORMAL;
    setTrackingOK(ok);
    reportStatus(ok ? "Tap to place" : "Initializing…");
  };

  return (
    <ViroARScene ref={arRef} onTrackingUpdated={onTrackingUpdated}>
      {placedPos && (
        <>
          <ViroFlexView
            position={[placedPos[0], placedPos[1] + 0.3, placedPos[2]]}
            width={0.3}
            height={0.2}
            materials={["labelBackground"]}
            transformBehaviors={["billboard"]}
          >
            <ViroText
              text={`${placedName}`}
              style={{ fontSize: 30, color: "#fff", textAlign: "center" }}
              scale={[0.07, 0.07, 0.07]}
              width={3}
              position={[0, 0.03, 0]}
            />
            <ViroText
              text={`HEX: ${placedHEX}`}
              style={{ fontSize: 30, color: "#fff", textAlign: "center" }}
              scale={[0.07, 0.07, 0.07]}
              width={3}
              position={[0, -0.03, 0]}
            />
          </ViroFlexView>
          <ViroSphere position={placedPos} radius={sphereRadius} materials={[materialName]} />
        </>
      )}
    </ViroARScene>
  );
};

export default function CameraScreen() {
  const [status, setStatus] = useState("Initializing…");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [uiVisible, setUiVisible] = useState(true);

  const navigation = useNavigation();
  const placeAtPointRef = useRef<any>(null);
  const viewRef = useRef<View>(null);

  const handleTap = async (e: any) => {
    const px = PixelRatio.get();
    const x = Math.round(e.nativeEvent.locationX * px);
    const y = Math.round(e.nativeEvent.locationY * px);
    try {
      const tag = findNodeHandle(viewRef.current);
      if (!tag) throw new Error("View ref not found");
      const uri = capturedPhoto || (await captureRef(tag, { format: "png", quality: 1 }));
      const color = await PixelColor.getHex(uri, { x, y });
      await placeAtPointRef.current?.(x, y, color);
    } catch (err) {
      console.warn("Pixel read error:", err);
      setStatus("Pixel read failed");
    }
  };

  const takePhoto = async () => {
    try {
      setUiVisible(false);
      await new Promise((r) => setTimeout(r, 100));

      const tag = findNodeHandle(viewRef.current);
      if (!tag) throw new Error("View ref not found");
      const uri = await captureRef(tag, { format: "jpg", quality: 1 });

      setCapturedPhoto(uri);
      setStatus("Photo captured");
    } catch {
      Alert.alert("Error", "Failed to capture photo");
    } finally {
      setUiVisible(true);
    }
  };

  const savePhoto = async () => {
    if (!capturedPhoto) return;
    try {
      await CameraRoll.saveAsset(capturedPhoto, {
        type: "photo",
        album: "ColorFinder",
      });

      Alert.alert("Saved!", "Photo saved to gallery.");
      setCapturedPhoto(null);
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to save photo");
    }
  };

  const pickFromGallery = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: "photo" });
      if (result.didCancel || !result.assets?.[0]?.uri) return;
      setCapturedPhoto(result.assets[0].uri);
      setStatus("Photo loaded");
    } catch {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const discardPhoto = () => {
    setCapturedPhoto(null);
    setStatus("Camera ready");
  };

  const saveColor = async (color: string) => {
    try {
      const saved = await AsyncStorage.getItem("savedColors");
      const colors = saved ? JSON.parse(saved) : [];
      colors.push(color);
      await AsyncStorage.setItem("savedColors", JSON.stringify(colors));
      Alert.alert("Saved!", "Color saved successfully.");
    } catch {
      console.warn("Error saving color");
    }
  };

  return (
    <View style={styles.fullScreen} ref={viewRef} collapsable={false}>
      {uiVisible && (
        <View style={styles.statusBar}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      )}

      {capturedPhoto ? (
        <Image source={{ uri: capturedPhoto }} style={styles.flex} resizeMode="cover" />
      ) : (
        <ViroARSceneNavigator
          style={styles.flex}
          autofocus
          initialScene={{ scene: SceneAR as any }}
          viroAppProps={{
            reportStatus: (msg: string) => setStatus(msg),
            registerPlaceAtPoint: (fn: any) => (placeAtPointRef.current = fn),
            setSelectedColor: (color: string) => setSelectedColor(color),
          }}
        />
      )}

      <Pressable onPress={handleTap} style={StyleSheet.absoluteFill} />

      {uiVisible && (
        <View style={{ position: "absolute", bottom: 30, width: "100%", alignItems: "center" }}>
          <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10 }}>
            <Pressable
              style={[styles.controlButton, !selectedColor && { opacity: 0.5 }]}
              onPress={() => saveColor(selectedColor)}
              disabled={!selectedColor}
            >
              <Text style={styles.controlEmoji}>💾</Text>
            </Pressable>
            <Pressable
              style={[styles.controlButton, !selectedColor && { opacity: 0.5 }]}
              onPress={() =>
                (navigation as any).navigate("ColorDetail", { color: selectedColor })
              }
              disabled={!selectedColor}
            >
              <Text style={styles.controlEmoji}>🎨</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            {capturedPhoto ? (
              <>
                <Pressable style={styles.controlButton} onPress={discardPhoto}>
                  <Text style={styles.controlEmoji}>❌</Text>
                </Pressable>
                <Pressable style={styles.controlButton} onPress={savePhoto}>
                  <Text style={styles.controlEmoji}>💾</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable style={styles.controlButton} onPress={pickFromGallery}>
                  <Text style={styles.controlEmoji}>🖼️</Text>
                </Pressable>

                <Pressable style={localStyles.cameraButton} onPress={takePhoto}>
                  <View style={localStyles.innerCircle} />
                </Pressable>
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
}


const localStyles = StyleSheet.create({
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
});