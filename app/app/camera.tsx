import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform } from 'react-native'
import { Camera, useCameraDevice, CameraDevice } from 'react-native-vision-camera';

type CameraPosition = 'back' | 'front';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');

  const device = useCameraDevice(cameraPosition);

  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
          }
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === "granted");
      }
    }
    requestPermissions();
  }, []);

  if (!device) {
    return <Text>No camera device available</Text>;
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
      </View>
    );
  }

  function toggleCameraPosition() {
    setCameraPosition(pos => (pos === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
      />
      <TouchableOpacity style={styles.button} onPress={toggleCameraPosition}>
        <Text style={styles.buttonText}>Flip Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  message: {
    flex: 1,
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: 'red',
  },
});