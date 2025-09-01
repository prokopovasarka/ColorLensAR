import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { globalStyles } from '../styles/globalStyles';

import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LibraryScreen() {
  const [colors, setColors] = useState<string[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadColors = async () => {
      const saved = await AsyncStorage.getItem("savedColors");
      setColors(saved ? JSON.parse(saved) : []);
    };
    loadColors();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Saved Colors</Text>
      {colors.length ? (
        <View style={styles.grid}>
          {colors.map((c, i) => (
            <Pressable
              key={i}
              style={[styles.colorBox, { backgroundColor: c }]}
              onPress={() => (navigation as any).navigate("ColorDetail", { color: c })}
            />
          ))}
        </View>
      ) : (
        <Text style={styles.noColor}>No color saved yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  colorBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    margin: 10,
  },
  noColor: {
    color: "#fff",
    fontSize: 16,
  },
  grid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "flex-start", 
  },
});
