import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colorNamer from "color-namer";

export default function ColorDetail({ route }: any) {
  const { color } = route.params; 

  // name
  const names = colorNamer(color);
  const colorName = names.ntc[0]?.name || "Unknown";

  // HEX
  const hexCode = color.toUpperCase();

  // HSL
  const hexToHslObj = (hex: string) => {
    const r = parseInt(hex.substr(1, 2), 16) / 255;
    const g = parseInt(hex.substr(3, 2), 16) / 255;
    const b = parseInt(hex.substr(5, 2), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h*360),
      s: Math.round(s*100),
      l: Math.round(l*100)
    };
  };

  const hslObj = hexToHslObj(color);
  const hslString = `Hue: ${hslObj.h}°, Saturation: ${hslObj.s}%, Lightness: ${hslObj.l}%`;

  // CMYK
  const hexToCmyk = (hex: string) => {
    const r = parseInt(hex.substr(1, 2), 16) / 255;
    const g = parseInt(hex.substr(3, 2), 16) / 255;
    const b = parseInt(hex.substr(5, 2), 16) / 255;

    const k = 1 - Math.max(r, g, b);
    const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - b - k) / (1 - k);

    return `C: ${Math.round(c*100)}%, M: ${Math.round(m*100)}%, Y: ${Math.round(y*100)}%, K: ${Math.round(k*100)}%`;
  };

  const cmykCode = hexToCmyk(color);

  const generateMonochrome = (h: number, s: number, l: number) => {
    const step = 10; 
    const count = 3; 
    const minL = l - count * step;
    const maxL = l + count * step;

    let shift = 0;

    if (minL < 20) {
        shift = 20-minL;
    }

    if (maxL > 80) {
        shift = 80 - maxL;
    }

    const palette: string[] = [];
    for (let i = -count; i <= count; i++) {
        if (i === 0) continue;
        let newL = l + i * step + shift;
        newL = Math.min(100, Math.max(0, newL));
        palette.push(`hsl(${h}, ${s}%, ${newL}%)`);
    }
    return palette;
  };

  const generateComplementary = (h: number, s: number, l: number) => {
    const step = 10;
    let compHue = (h + 180); 
    if( compHue >= 360 ) compHue % 360; 
    const palette = [];
    for (let i = -3; i <= 3; i++) {
        if( i == 0 ) continue;
        let newCompHue = compHue + i * step;
        palette.push(`hsl(${newCompHue}, ${s}%, ${l}%)`);
    }
    return palette;
  };

  const generateAnalogous = (h: number, s: number, l: number) => {
    const step = 20;
    const palette = [];
    let newHue = h;
    for (let i = -3; i <= 3; i++) {
        if( i == 0 ) continue;
        newHue = h + i * step;
        palette.push(`hsl(${newHue}, ${s}%, ${l}%)`);
    }
    return palette;
  };

  const monoPalette = generateMonochrome(hslObj.h, hslObj.s, hslObj.l);
  const complementaryPalette = generateComplementary(hslObj.h, hslObj.s, hslObj.l);
  const analogousPalette = generateAnalogous(hslObj.h, hslObj.s, hslObj.l);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.title}>{colorName}</Text>
      <Text style={styles.text}>HEX: {hexCode}</Text>
      <Text style={styles.text}>{hslString}</Text>
      <Text style={styles.text}>{cmykCode}</Text>

      <Text style={styles.paletteTitle}>Monochromatic palette</Text>

      <View style={styles.palette}> {monoPalette.map((c, i) => (
          <View key={i} style={[styles.colorBox, { backgroundColor: c }]} />
        ))}
      </View>

      <Text style={styles.paletteTitle}>Complementary palette</Text>

      <View style={styles.palette}> {complementaryPalette.map((c, i) => (
        <View key={i} style={[styles.colorBox, { backgroundColor: c }]} />
        ))}
      </View>

      <Text style={styles.paletteTitle}>Analogous palette</Text>

      <View style={styles.palette}> {analogousPalette.map((c, i) => (
        <View key={i} style={[styles.colorBox, { backgroundColor: c }]} />
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
    color: "#fff", 
    fontWeight: "600",
    paddingBottom: 10,
  },
  text: { 
    color: "#fff", 
    fontSize: 15, 
    padding: 3,
  },
  paletteTitle: {
    marginTop: 60,
    fontSize: 20,
    color: "#fff", 
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
    borderColor: "#fff",
  },
});