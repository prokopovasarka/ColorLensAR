import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';

import CameraScreen from './Camera';

type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Button onPress={() => navigation.navigate('Camera')}>
        Camera
      </Button>
    </View>
  );
}

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home" 
    screenOptions={{
    headerStyle: { backgroundColor: 'tomato' },
    }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 40,
    color: '#333',
  }
});

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}