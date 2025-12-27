import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";

import { globalStyles } from '../styles/globalStyles';
import styles from "../styles/LibraryStyles";

import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LibraryScreen() {
  const [colors, setColors] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const navigation = useNavigation();

  useEffect(() => {
    const loadColors = async () => {
      const saved = await AsyncStorage.getItem("savedColors");
      setColors(saved ? JSON.parse(saved) : []);
    };
    loadColors();
  }, []);

  const handlePress = (color: string) => {
    if (selected.size > 0) {
      toggleSelect(color); 
    } else {
      (navigation as any).navigate("ColorDetail", { color });
    }
  };

  const toggleSelect = (color: string) => {
    const newSet = new Set(selected);
    if (newSet.has(color)) newSet.delete(color);
    else newSet.add(color);
    setSelected(newSet);
  };

  const deleteSelected = async () => {
    const newColors = colors.filter(c => !selected.has(c));
    setColors(newColors);
    setSelected(new Set());
    await AsyncStorage.setItem("savedColors", JSON.stringify(newColors));
  };

  const unselectAll = async () => {
    setSelected(new Set()); 
  };

  return (
    <View style={globalStyles.container}>
      {selected.size > 0 && (
        <View style={styles.selectedMode}>
            <Button title={`Delete (${selected.size})`} onPress={deleteSelected} color="#ff4444" />
            <Button title={`Unselect all`} onPress={unselectAll} color="#ff4444" />
        </View>
      )}
      <Text style={globalStyles.title}>Saved Colors</Text>

      {colors.length ? (
        <ScrollView contentContainerStyle={styles.grid} testID="color-grid">
          {colors.map((c, i) => {
            const isSelected = selected.has(c);
            return (
              <Pressable
                key={i}
                testID={`color-box-${i}`}
                style={[
                  styles.colorBox,
                  { backgroundColor: c },
                  isSelected && styles.selectedBox
                ]}
                onPress={() => handlePress(c)}
                onLongPress={() => toggleSelect(c)}
              />
            );
          })}
        </ScrollView>
      ) : (
        <Text style={styles.noColor}>No color saved yet</Text>
      )}
    </View>
  );
}

