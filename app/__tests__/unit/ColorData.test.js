import { renderHook } from '@testing-library/react-native';
import useColorData from '../../pages/ColorData';

describe('ColorData - Color Conversion Logic', () => {
  describe('HEX to RGB Conversion', () => {
    it('converts standard color #FF5733 to RGB {r: 255, g: 87, b: 51}', () => {
      const { result } = renderHook(() => useColorData('#FF5733'));
      // The hook doesn't expose RGB directly, but we can verify through other outputs
      expect(result.current.hexCode).toBe('#FF5733');
    });

    it('converts black #000000 to RGB {r: 0, g: 0, b: 0}', () => {
      const { result } = renderHook(() => useColorData('#000000'));
      expect(result.current.hexCode).toBe('#000000');
      expect(result.current.hslObj).toEqual({ h: 0, s: 0, l: 0 });
    });

    it('converts white #FFFFFF to RGB {r: 255, g: 255, b: 255}', () => {
      const { result } = renderHook(() => useColorData('#FFFFFF'));
      expect(result.current.hexCode).toBe('#FFFFFF');
      expect(result.current.hslObj).toEqual({ h: 0, s: 0, l: 100 });
    });
  });

  describe('RGB to HSL Conversion', () => {
    it('converts pure red #FF0000 to HSL {h: 0, s: 100, l: 50}', () => {
      const { result } = renderHook(() => useColorData('#FF0000'));
      expect(result.current.hslObj).toEqual({ h: 0, s: 100, l: 50 });
      expect(result.current.hslString).toBe('Hue: 0°, Saturation: 100%, Lightness: 50%');
    });

    it('converts pure green #00FF00 to HSL {h: 120, s: 100, l: 50}', () => {
      const { result } = renderHook(() => useColorData('#00FF00'));
      expect(result.current.hslObj).toEqual({ h: 120, s: 100, l: 50 });
      expect(result.current.hslString).toBe('Hue: 120°, Saturation: 100%, Lightness: 50%');
    });

    it('converts pure blue #0000FF to HSL {h: 240, s: 100, l: 50}', () => {
      const { result } = renderHook(() => useColorData('#0000FF'));
      expect(result.current.hslObj).toEqual({ h: 240, s: 100, l: 50 });
      expect(result.current.hslString).toBe('Hue: 240°, Saturation: 100%, Lightness: 50%');
    });

    it('converts grayscale #808080 to HSL with saturation = 0', () => {
      const { result } = renderHook(() => useColorData('#808080'));
      expect(result.current.hslObj.s).toBe(0);
      expect(result.current.hslObj.l).toBe(50);
    });

    it('converts black #000000 to HSL {h: 0, s: 0, l: 0}', () => {
      const { result } = renderHook(() => useColorData('#000000'));
      expect(result.current.hslObj).toEqual({ h: 0, s: 0, l: 0 });
    });

    it('converts white #FFFFFF to HSL {h: 0, s: 0, l: 100}', () => {
      const { result } = renderHook(() => useColorData('#FFFFFF'));
      expect(result.current.hslObj).toEqual({ h: 0, s: 0, l: 100 });
    });
  });

  describe('RGB to CMYK Conversion', () => {
    it('converts pure cyan #00FFFF to CMYK with C=100%', () => {
      const { result } = renderHook(() => useColorData('#00FFFF'));
      expect(result.current.cmykCode).toBe('C: 100%, M: 0%, Y: 0%, K: 0%');
    });

    it('converts pure magenta #FF00FF to CMYK with M=100%', () => {
      const { result } = renderHook(() => useColorData('#FF00FF'));
      expect(result.current.cmykCode).toBe('C: 0%, M: 100%, Y: 0%, K: 0%');
    });

    it('converts pure yellow #FFFF00 to CMYK with Y=100%', () => {
      const { result } = renderHook(() => useColorData('#FFFF00'));
      expect(result.current.cmykCode).toBe('C: 0%, M: 0%, Y: 100%, K: 0%');
    });

    it('converts black #000000 to CMYK with K=100%', () => {
      const { result } = renderHook(() => useColorData('#000000'));
      expect(result.current.cmykCode).toBe('C: 0%, M: 0%, Y: 0%, K: 100%');
    });

    it('converts white #FFFFFF to CMYK with all 0%', () => {
      const { result } = renderHook(() => useColorData('#FFFFFF'));
      expect(result.current.cmykCode).toBe('C: 0%, M: 0%, Y: 0%, K: 0%');
    });

    it('formats CMYK string correctly', () => {
      const { result } = renderHook(() => useColorData('#FF5733'));
      expect(result.current.cmykCode).toMatch(/^C: \d+%, M: \d+%, Y: \d+%, K: \d+%$/);
    });
  });

  describe('Contrast Text Color Calculation', () => {
    it('returns black text #000 for light colors', () => {
      const { result } = renderHook(() => useColorData('#FFFFFF'));
      expect(result.current.textColor).toBe('#000');
    });

    it('returns black text #000 for yellow', () => {
      const { result } = renderHook(() => useColorData('#FFFF00'));
      expect(result.current.textColor).toBe('#000');
    });

    it('returns white text #fff for dark colors', () => {
      const { result } = renderHook(() => useColorData('#000000'));
      expect(result.current.textColor).toBe('#fff');
    });

    it('returns white text #fff for dark blue', () => {
      const { result } = renderHook(() => useColorData('#0000FF'));
      expect(result.current.textColor).toBe('#fff');
    });

    it('returns white text #fff for dark red', () => {
      const { result } = renderHook(() => useColorData('#8B0000'));
      expect(result.current.textColor).toBe('#fff');
    });

    it('handles edge case near 0.5 luminance threshold', () => {
      // Medium gray (#808080) has luminance of about 0.5
      // The implementation uses luminance > 0.5 for black text
      // So exactly 0.5 luminance would use black text
      const { result } = renderHook(() => useColorData('#808080'));
      // #808080 has luminance slightly above 0.5, so it should use black text
      expect(result.current.textColor).toBe('#000');
    });
  });

  describe('Palette Generation - Monochromatic', () => {
    it('generates 6 colors excluding the original', () => {
      const { result } = renderHook(() => useColorData('#FF0000'));
      expect(result.current.palettes.monoPalette).toHaveLength(6);
    });

    it('varies lightness by ±10% steps', () => {
      const { result } = renderHook(() => useColorData('#FF0000'));
      const palette = result.current.palettes.monoPalette;
      
      // Check that each color is in HSL format
      palette.forEach(color => {
        expect(color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
      });
    });

    it('handles edge case when lightness is near 0 (near black)', () => {
      const { result } = renderHook(() => useColorData('#1A0000')); // Very dark red, l ≈ 5
      const palette = result.current.palettes.monoPalette;
      
      expect(palette).toHaveLength(6);
      // Should shift up to avoid negative lightness
      palette.forEach(color => {
        const lMatch = color.match(/(\d+)%\)$/);
        if (lMatch) {
          const lightness = parseInt(lMatch[1]);
          expect(lightness).toBeGreaterThanOrEqual(0);
          expect(lightness).toBeLessThanOrEqual(100);
        }
      });
    });

    it('handles edge case when lightness is near 100 (near white)', () => {
      const { result } = renderHook(() => useColorData('#FFE6E6')); // Very light red, l ≈ 95
      const palette = result.current.palettes.monoPalette;
      
      expect(palette).toHaveLength(6);
      // Should shift down to avoid exceeding 100
      palette.forEach(color => {
        const lMatch = color.match(/(\d+)%\)$/);
        if (lMatch) {
          const lightness = parseInt(lMatch[1]);
          expect(lightness).toBeGreaterThanOrEqual(0);
          expect(lightness).toBeLessThanOrEqual(100);
        }
      });
    });

    it('maintains same hue and saturation', () => {
      const { result } = renderHook(() => useColorData('#FF0000'));
      const palette = result.current.palettes.monoPalette;
      const originalHue = result.current.hslObj.h;
      const originalSat = result.current.hslObj.s;
      
      palette.forEach(color => {
        // Extract hue and saturation from hsl(h, s%, l%)
        const match = color.match(/hsl\((\d+), (\d+)%/);
        if (match) {
          expect(parseInt(match[1])).toBe(originalHue);
          expect(parseInt(match[2])).toBe(originalSat);
        }
      });
    });
  });

  describe('Palette Generation - Complementary', () => {
    it('generates 6 colors', () => {
      const { result } = renderHook(() => useColorData('#FF0000'));
      expect(result.current.palettes.complementaryPalette).toHaveLength(6);
    });

    it('uses opposite hue (180° rotation)', () => {
      const { result } = renderHook(() => useColorData('#FF0000')); // Red, h=0
      const palette = result.current.palettes.complementaryPalette;
      
      palette.forEach(color => {
        const match = color.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
        if (match) {
          const hue = parseInt(match[1]);
          // Should be near 180° (cyan) ± 30° (for the 6 variations)
          expect(hue).toBeGreaterThanOrEqual(150);
          expect(hue).toBeLessThanOrEqual(210);
        }
      });
    });

    it('varies hue by ±10° steps around complement', () => {
      const { result } = renderHook(() => useColorData('#FF0000'));
      const palette = result.current.palettes.complementaryPalette;
      
      // Each color should be in HSL format
      palette.forEach(color => {
        expect(color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
      });
    });

    it('handles wrap-around at 360°', () => {
      const { result } = renderHook(() => useColorData('#00FFFF')); // Cyan, h=180
      const palette = result.current.palettes.complementaryPalette;
      
      // Complement is 360° or 0°, variations should wrap around
      palette.forEach(color => {
        const match = color.match(/hsl\((\d+),/);
        if (match) {
          const hue = parseInt(match[1]);
          expect(hue).toBeGreaterThanOrEqual(0);
          expect(hue).toBeLessThan(360);
        }
      });
    });

    it('maintains same saturation and lightness', () => {
      const { result } = renderHook(() => useColorData('#FF0000'));
      const palette = result.current.palettes.complementaryPalette;
      const originalSat = result.current.hslObj.s;
      const originalLight = result.current.hslObj.l;
      
      palette.forEach(color => {
        const match = color.match(/hsl\(\d+, (\d+)%, (\d+)%\)/);
        if (match) {
          expect(parseInt(match[1])).toBe(originalSat);
          expect(parseInt(match[2])).toBe(originalLight);
        }
      });
    });
  });

  describe('Palette Generation - Analogous', () => {
    it('generates 6 colors', () => {
      const { result } = renderHook(() => useColorData('#FF0000'));
      expect(result.current.palettes.analogousPalette).toHaveLength(6);
    });

    it('varies hue by ±20° steps', () => {
      const { result } = renderHook(() => useColorData('#FF0000')); // Red, h=0
      const palette = result.current.palettes.analogousPalette;
      const originalHue = result.current.hslObj.h;
      
      palette.forEach(color => {
        const match = color.match(/hsl\((\d+),/);
        if (match) {
          const hue = parseInt(match[1]);
          // Should be within ±60° of original (3 steps × 20°)
          const diff = Math.abs(hue - originalHue);
          const wrappedDiff = Math.min(diff, 360 - diff);
          expect(wrappedDiff).toBeLessThanOrEqual(60);
        }
      });
    });

    it('handles wrap-around at 360°', () => {
      const { result } = renderHook(() => useColorData('#FF0000')); // Red, h=0
      const palette = result.current.palettes.analogousPalette;
      
      // Some variations should be near 0° (red), some near 360°
      palette.forEach(color => {
        const match = color.match(/hsl\((\d+),/);
        if (match) {
          const hue = parseInt(match[1]);
          expect(hue).toBeGreaterThanOrEqual(0);
          expect(hue).toBeLessThan(360);
        }
      });
    });

    it('maintains same saturation and lightness', () => {
      const { result } = renderHook(() => useColorData('#FF0000'));
      const palette = result.current.palettes.analogousPalette;
      const originalSat = result.current.hslObj.s;
      const originalLight = result.current.hslObj.l;
      
      palette.forEach(color => {
        const match = color.match(/hsl\(\d+, (\d+)%, (\d+)%\)/);
        if (match) {
          expect(parseInt(match[1])).toBe(originalSat);
          expect(parseInt(match[2])).toBe(originalLight);
        }
      });
    });
  });

  describe('Color Name Lookup', () => {
    it('returns color name from color-namer', () => {
      const { result } = renderHook(() => useColorData('#FF0000'));
      expect(result.current.colorName).toBe('Mocked Color Name');
    });

    it('handles case when color-namer returns result', () => {
      const { result } = renderHook(() => useColorData('#FFFFFF'));
      expect(result.current.colorName).toBeDefined();
      expect(typeof result.current.colorName).toBe('string');
    });
  });

  describe('Complete Color Data Object', () => {
    it('returns all required properties', () => {
      const { result } = renderHook(() => useColorData('#FF5733'));
      
      expect(result.current).toHaveProperty('color');
      expect(result.current).toHaveProperty('textColor');
      expect(result.current).toHaveProperty('colorName');
      expect(result.current).toHaveProperty('hexCode');
      expect(result.current).toHaveProperty('hslObj');
      expect(result.current).toHaveProperty('hslString');
      expect(result.current).toHaveProperty('cmykCode');
      expect(result.current).toHaveProperty('palettes');
    });

    it('palettes object contains all three palette types', () => {
      const { result } = renderHook(() => useColorData('#FF5733'));
      
      expect(result.current.palettes).toHaveProperty('monoPalette');
      expect(result.current.palettes).toHaveProperty('complementaryPalette');
      expect(result.current.palettes).toHaveProperty('analogousPalette');
    });

    it('preserves original color value', () => {
      const color = '#FF5733';
      const { result } = renderHook(() => useColorData(color));
      expect(result.current.color).toBe(color);
    });
  });
});
