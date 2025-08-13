import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroTrackingReason,
} from "@reactvision/react-viro";

const SceneAR = () => {
  const [text, setText] = useState("Initializing...");
  const [textPosition, setTextPosition] = useState<[number, number, number]>([0, 0, -1]);

  const onInitialized = (state: number, reason: ViroTrackingReason) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Tap anywhere");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText("Tracking Unavailable");
    } else {
      setText("Initializing...");
    }
  };

  const handleTouch = (source: any, position: [number, number, number]) => {
    setText("Tapped!");
    setTextPosition([position[0], position[1] + 0.05, position[2]]);
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized} onTouch={handleTouch}>
      <ViroText
        text={text}
        scale={[0.2, 0.2, 0.2]}
        position={textPosition}
        style={styles.textStyle}
      />
    </ViroARScene>
  );
};

export default function CameraScreen() {
  return (
    <ViroARSceneNavigator
      autofocus
      initialScene={{ scene: SceneAR }}
      style={styles.fullScreen}
    />
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1 },
  textStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});