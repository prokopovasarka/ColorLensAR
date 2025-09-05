import React, { useMemo } from "react";
import colorNamer from "color-namer";

const OFFSET = 20;

export default function useColorData(color: string) {
  const data = useMemo(() => {
    const hexToRgb = (hex: string) => ({
      r: parseInt(hex.substr(1, 2), 16),
      g: parseInt(hex.substr(3, 2), 16),
      b: parseInt(hex.substr(5, 2), 16),
    });

    const getContrastTextColor = (hex: string) => {
      const { r, g, b } = hexToRgb(hex);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.5 ? "#000" : "#fff";
    };

    const textColor = getContrastTextColor(color);

    // name
    const names = colorNamer(color);
    const colorName = names.ntc[0]?.name || "Unknown";

    // HEX
    const hexCode = color.toUpperCase();

    // HSL
    const hexToHslObj = (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
    const rNorm = r/255;
    const gNorm = g/255;
    const bNorm = b/255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
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
      const { r, g, b } = hexToRgb(hex); 
      const rNorm = r/255; 
      const gNorm = g/255; 
      const bNorm = b/255; 
      const k = 1 - Math.max(rNorm, gNorm, bNorm); 
      const c = k === 1 ? 0 : (1 - rNorm - k) / (1 - k); 
      const m = k === 1 ? 0 : (1 - gNorm - k) / (1 - k); 
      const y = k === 1 ? 0 : (1 - bNorm - k) / (1 - k); 
      
      return `C: ${Math.round(c*100)}%, M: ${Math.round(m*100)}%, Y: ${Math.round(y*100)}%, K: ${Math.round(k*100)}%`; 
    };

    const cmykCode = hexToCmyk(color);

    // palettes
    const generateMonochrome = (h: number, s: number, l: number) => {
    const step = 10; 
    const count = 3; 
    const minL = l - count * step;
    const maxL = l + count * step;

    let shift = 0;

    if (minL < OFFSET) {
        shift = OFFSET-minL;
    }

    if (maxL > 100-OFFSET) {
        shift = 100 - OFFSET - maxL;
    }

    const palette = [];
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
    let compHue = (h + 180) % 360; 
    const palette = [];
    for (let i = -3; i <= 3; i++) {
        if( i == 0 ) continue;
        let newCompHue = (compHue + i * step) % 360;
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
        newHue = (h + i * step) % 360;
        palette.push(`hsl(${newHue}, ${s}%, ${l}%)`);
    }
    return palette;
  };

  const monoPalette = generateMonochrome(hslObj.h, hslObj.s, hslObj.l);
  const complementaryPalette = generateComplementary(hslObj.h, hslObj.s, hslObj.l);
  const analogousPalette = generateAnalogous(hslObj.h, hslObj.s, hslObj.l);

    return {
      color,
      textColor,
      colorName,
      hexCode,
      hslObj,
      hslString,
      cmykCode,
      palettes: {
        monoPalette: generateMonochrome(hslObj.h, hslObj.s, hslObj.l),
        complementaryPalette: generateComplementary(hslObj.h, hslObj.s, hslObj.l),
        analogousPalette: generateAnalogous(hslObj.h, hslObj.s, hslObj.l),
      },
    };
  }, [color]);

  return data;
}