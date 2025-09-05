import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';

import CameraScreen from './Camera';
import LibraryScreen from './Library';
import Help from './Help';
import ColorDetail from './ColorDetail';
import { globalStyles } from '../styles/globalStyles';

type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Library: undefined;
  Help: undefined;
  ColorDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: any) {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.quote}>"The noblest pleasure is the joy of understanding colors."</Text>
      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('Camera')} >
        <Text style={globalStyles.buttonText}>CAMERA</Text>
        
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('Library')} >
        <Text style={globalStyles.buttonText}>LIBRARY</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('Help')} >
        <Text style={globalStyles.buttonText}>HELP</Text>
      </TouchableOpacity>
    </View>
  );
}

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home" 
    screenOptions={{
        headerTintColor: '#fff',
        headerTitleStyle: globalStyles.headerTitle,
        headerBackground: () => (
          <View style={{ flex: 1, backgroundColor: '#1e1e2d' }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 180,                 
                width: 500,                
                height: '300%',
                backgroundColor: '#ffffff',
                opacity: 0.05,
                transform: [{ rotate: '60deg' }], 
              }}
            />
          </View>
        ),
    }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} /> 
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Library" component={LibraryScreen} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="ColorDetail" component={ColorDetail} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}