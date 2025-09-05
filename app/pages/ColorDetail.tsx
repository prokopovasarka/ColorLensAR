import React from "react";
import { View, Text, StyleSheet } from "react-native";

import useColorData from "./ColorData";

export default function ColorDetail({ route }: any) {
  const { color } = route.params;
  const data = useColorData(color);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={[styles.title, { color: data.textColor }]}>{data.colorName}</Text>
      <Text style={[styles.text, { color: data.textColor }]}>HEX: {data.hexCode}</Text>
      <Text style={[styles.text, { color: data.textColor }]}>{data.hslString}</Text>
      <Text style={[styles.text, { color: data.textColor }]}>{data.cmykCode}</Text>

      <Text style={[styles.paletteTitle, { color: data.textColor }]}>Monochromatic palette</Text>

      <View style={styles.palette}>{data.palettes.monoPalette.map((c: string, i: number) => (
          <View key={i} style={[styles.colorBox, { backgroundColor: c, borderColor: data.textColor }]} />
        ))}
      </View>

      <Text style={[styles.paletteTitle, { color: data.textColor }]}>Complementary palette</Text>

      <View style={styles.palette}>{data.palettes.complementaryPalette.map((c: string, i: number) => (
        <View key={i} style={[styles.colorBox, { backgroundColor: c, borderColor: data.textColor }]} />
        ))}
      </View>

      <Text style={[styles.paletteTitle, { color: data.textColor }]}>Analogous palette</Text>

      <View style={styles.palette}>{data.palettes.analogousPalette.map((c: string, i: number) => (
        <View key={i} style={[styles.colorBox, { backgroundColor: c, borderColor: data.textColor  }]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "flex-start", 
    paddingTop: 50,
    alignItems: "center" 
  },
  title:{ 
    fontSize: 24,
    fontWeight: "600",
    paddingBottom: 10,
  },
  text: { 
    fontSize: 15, 
    padding: 3,
  },
  paletteTitle: {
    marginTop: 60,
    fontSize: 20,
    fontWeight: "600",
  },
  palette: {
    flexDirection: "row",
    marginTop: 20,
  },
  colorBox: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
});