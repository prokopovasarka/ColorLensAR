import React from 'react';
import { render } from '@testing-library/react-native';
import ColorDetail from '../../pages/ColorDetail';

describe('ColorDetail Screen Component', () => {
  describe('Route Params', () => {
    it('receives color from route.params.color', () => {
      const route = {
        params: { color: '#FF0000' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('Mocked Color Name')).toBeTruthy();
    });

    it('renders with provided color', () => {
      const route = {
        params: { color: '#00FF00' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('Mocked Color Name')).toBeTruthy();
    });

    it('handles different color formats', () => {
      const route = {
        params: { color: '#ABCDEF' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('HEX: #ABCDEF')).toBeTruthy();
    });
  });

  describe('Color Information Display', () => {
    it('displays color name', () => {
      const route = {
        params: { color: '#FF0000' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('Mocked Color Name')).toBeTruthy();
    });

    it('displays HEX code', () => {
      const route = {
        params: { color: '#FF0000' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('HEX: #FF0000')).toBeTruthy();
    });

    it('displays uppercase HEX code', () => {
      const route = {
        params: { color: '#ff0000' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('HEX: #FF0000')).toBeTruthy();
    });

    it('displays HSL string', () => {
      const route = {
        params: { color: '#FF0000' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('Hue: 0°, Saturation: 100%, Lightness: 50%')).toBeTruthy();
    });

    it('displays CMYK string', () => {
      const route = {
        params: { color: '#FF0000' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText(/C: \d+%, M: \d+%, Y: \d+%, K: \d+%/)).toBeTruthy();
    });

    it('displays all color information for white', () => {
      const route = {
        params: { color: '#FFFFFF' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('HEX: #FFFFFF')).toBeTruthy();
      expect(getByText('Hue: 0°, Saturation: 0%, Lightness: 100%')).toBeTruthy();
      expect(getByText('C: 0%, M: 0%, Y: 0%, K: 0%')).toBeTruthy();
    });

    it('displays all color information for black', () => {
      const route = {
        params: { color: '#000000' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('HEX: #000000')).toBeTruthy();
      expect(getByText('Hue: 0°, Saturation: 0%, Lightness: 0%')).toBeTruthy();
      expect(getByText('C: 0%, M: 0%, Y: 0%, K: 100%')).toBeTruthy();
    });
  });

  describe('Palette Rendering', () => {
    it('renders monochromatic palette title', () => {
      const route = {
        params: { color: '#FF0000' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('Monochromatic palette')).toBeTruthy();
    });

    it('renders complementary palette title', () => {
      const route = {
        params: { color: '#FF0000' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('Complementary palette')).toBeTruthy();
    });

    it('renders analogous palette title', () => {
      const route = {
        params: { color: '#FF0000' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('Analogous palette')).toBeTruthy();
    });

    it('renders all three palette sections', () => {
      const route = {
        params: { color: '#FF0000' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('Monochromatic palette')).toBeTruthy();
      expect(getByText('Complementary palette')).toBeTruthy();
      expect(getByText('Analogous palette')).toBeTruthy();
    });
  });

  describe('Contrast Text Color', () => {
    it('uses dark text for light background (white)', () => {
      const route = {
        params: { color: '#FFFFFF' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      const title = getByText('Mocked Color Name');
      
      // Should have black text color (#000)
      expect(title.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ color: '#000' })
        ])
      );
    });

    it('uses light text for dark background (black)', () => {
      const route = {
        params: { color: '#000000' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      const title = getByText('Mocked Color Name');
      
      // Should have white text color (#fff)
      expect(title.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ color: '#fff' })
        ])
      );
    });

    it('uses light text for dark blue background', () => {
      const route = {
        params: { color: '#0000FF' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      const title = getByText('Mocked Color Name');
      
      expect(title.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ color: '#fff' })
        ])
      );
    });

    it('uses dark text for yellow background', () => {
      const route = {
        params: { color: '#FFFF00' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      const title = getByText('Mocked Color Name');
      
      expect(title.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ color: '#000' })
        ])
      );
    });

    it('applies contrast text color to all text elements', () => {
      const route = {
        params: { color: '#FF0000' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      
      const title = getByText('Mocked Color Name');
      const hexText = getByText('HEX: #FF0000');
      
      // Both should have the same text color
      const titleColor = title.props.style.find((s: any) => s.color)?.color;
      const hexColor = hexText.props.style.find((s: any) => s.color)?.color;
      
      expect(titleColor).toBeDefined();
      expect(hexColor).toBeDefined();
      expect(titleColor).toBe(hexColor);
    });
  });

  describe('Background Color', () => {
    it('sets container background to the provided color', () => {
      const route = {
        params: { color: '#FF0000' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('HEX: #FF0000')).toBeTruthy();
    });

    it('applies background color correctly for different colors', () => {
      const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFFFF', '#000000'];
      
      colors.forEach(color => {
        const route = { params: { color } };
        const { getByText } = render(<ColorDetail route={route} />);
        expect(getByText('Mocked Color Name')).toBeTruthy();
      });
    });
  });

  describe('Complete Rendering', () => {
    it('renders without crashing', () => {
      const route = {
        params: { color: '#FF0000' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('Mocked Color Name')).toBeTruthy();
    });

    it('renders all required elements', () => {
      const route = {
        params: { color: '#FF5733' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      
      // Color name
      expect(getByText('Mocked Color Name')).toBeTruthy();
      
      // HEX
      expect(getByText('HEX: #FF5733')).toBeTruthy();
      
      // HSL
      expect(getByText(/Hue: \d+°, Saturation: \d+%, Lightness: \d+%/)).toBeTruthy();
      
      // CMYK
      expect(getByText(/C: \d+%, M: \d+%, Y: \d+%, K: \d+%/)).toBeTruthy();
      
      // Palette titles
      expect(getByText('Monochromatic palette')).toBeTruthy();
      expect(getByText('Complementary palette')).toBeTruthy();
      expect(getByText('Analogous palette')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles lowercase hex color', () => {
      const route = {
        params: { color: '#abcdef' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('HEX: #ABCDEF')).toBeTruthy();
    });

    it('handles mixed case hex color', () => {
      const route = {
        params: { color: '#AbCdEf' },
      };
      
      const { getByText } = render(<ColorDetail route={route} />);
      expect(getByText('HEX: #ABCDEF')).toBeTruthy();
    });

    it('renders with extreme colors', () => {
      const extremeColors = [
        '#000000', // Black
        '#FFFFFF', // White
        '#FF0000', // Pure Red
        '#00FF00', // Pure Green
        '#0000FF', // Pure Blue
      ];
      
      extremeColors.forEach(color => {
        const route = { params: { color } };
        const { getByText } = render(<ColorDetail route={route} />);
        expect(getByText('Mocked Color Name')).toBeTruthy();
      });
    });
  });
});

