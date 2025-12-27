import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from '../../pages/App';

describe('Home Screen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('First Launch Behavior', () => {
    it('checks for alreadyLaunched flag on mount', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
      
      render(<App />);
      
      await waitFor(() => {
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('alreadyLaunched');
      });
    });

    it('sets alreadyLaunched flag when null', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
      
      render(<App />);
      
      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('alreadyLaunched', 'true');
      });
    });

    it('does not set flag when already launched', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('true');
      
      render(<App />);
      
      await waitFor(() => {
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('alreadyLaunched');
      });
      
      // Should not set the flag again
      expect(AsyncStorage.setItem).not.toHaveBeenCalledWith('alreadyLaunched', 'true');
    });
  });

  describe('Subsequent Launches', () => {
    it('displays normally when alreadyLaunched is true', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('true');
      
      const { getByText } = render(
        <App />
      );
      
      await waitFor(() => {
        expect(getByText(/"The noblest pleasure is the joy of understanding colors."/)).toBeTruthy();
      });
    });

    it('does not redirect on subsequent launches', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('true');
      
      const { getByText } = render(
        <App />
      );
      
      await waitFor(() => {
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('alreadyLaunched');
      });
      
      // Should display home screen content
      expect(getByText('CAMERA')).toBeTruthy();
      expect(getByText('LIBRARY')).toBeTruthy();
      expect(getByText('HELP')).toBeTruthy();
    });
  });

  describe('Home Screen UI Elements', () => {
    beforeEach(() => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('true');
    });

    it('displays the quote text', async () => {
      const { getByText } = render(
        <App />
      );
      
      await waitFor(() => {
        expect(getByText(/"The noblest pleasure is the joy of understanding colors."/)).toBeTruthy();
      });
    });

    it('displays Camera button', async () => {
      const { getByText } = render(
        <App />
      );
      
      await waitFor(() => {
        expect(getByText('CAMERA')).toBeTruthy();
      });
    });

    it('displays Library button', async () => {
      const { getByText } = render(
        <App />
      );
      
      await waitFor(() => {
        expect(getByText('LIBRARY')).toBeTruthy();
      });
    });

    it('displays Help button', async () => {
      const { getByText } = render(
        <App />
      );
      
      await waitFor(() => {
        expect(getByText('HELP')).toBeTruthy();
      });
    });

    it('displays all navigation buttons', async () => {
      const { getByText } = render(
        <App />
      );
      
      await waitFor(() => {
        expect(getByText('CAMERA')).toBeTruthy();
        expect(getByText('LIBRARY')).toBeTruthy();
        expect(getByText('HELP')).toBeTruthy();
      });
    });
  });

  describe('Navigation Buttons', () => {
    beforeEach(() => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('true');
    });

    it('Camera button is pressable', async () => {
      const { getByText } = render(
        <App />
      );
      
      await waitFor(() => {
        const cameraButton = getByText('CAMERA');
        expect(cameraButton).toBeTruthy();
      });
      
      const cameraButton = getByText('CAMERA');
      fireEvent.press(cameraButton);
      
      // Button should be pressable (no error thrown)
      expect(cameraButton).toBeTruthy();
    });

    it('Library button is pressable', async () => {
      const { getByText } = render(
        <App />
      );
      
      await waitFor(() => {
        const libraryButton = getByText('LIBRARY');
        expect(libraryButton).toBeTruthy();
      });
      
      const libraryButton = getByText('LIBRARY');
      fireEvent.press(libraryButton);
      
      // Button should be pressable (no error thrown)
      expect(libraryButton).toBeTruthy();
    });

    it('Help button is pressable', async () => {
      const { getByText } = render(
        <App />
      );
      
      await waitFor(() => {
        const helpButton = getByText('HELP');
        expect(helpButton).toBeTruthy();
      });
      
      const helpButton = getByText('HELP');
      fireEvent.press(helpButton);
      
      // Button should be pressable (no error thrown)
      expect(helpButton).toBeTruthy();
    });
  });

  describe('AsyncStorage Integration', () => {
    it('handles missing AsyncStorage data gracefully', async () => {
      // Simulate AsyncStorage returning null for already launched check
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
      
      const { getByText } = render(
        <App />
      );
      
      // Should still render and set the flag
      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('alreadyLaunched', 'true');
      });
    });

    it('calls AsyncStorage.getItem exactly once on mount', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('true');
      
      render(<App />);
      
      await waitFor(() => {
        expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('First Launch Flow', () => {
    it('executes complete first launch flow', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
      
      render(<App />);
      
      await waitFor(() => {
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('alreadyLaunched');
      });
      
      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('alreadyLaunched', 'true');
      });
    });

    it('checks flag before setting it', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
      
      render(<App />);
      
      await waitFor(() => {
        expect(AsyncStorage.getItem).toHaveBeenCalled();
      });
      
      // getItem should be called before setItem
      const calls = (AsyncStorage.getItem as jest.Mock).mock.invocationCallOrder[0];
      const setCalls = (AsyncStorage.setItem as jest.Mock).mock.invocationCallOrder[0];
      
      if (calls !== undefined && setCalls !== undefined) {
        expect(calls).toBeLessThan(setCalls);
      }
    });
  });

  describe('Component Lifecycle', () => {
    it('runs useEffect on mount', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('true');
      
      render(<App />);
      
      await waitFor(() => {
        expect(AsyncStorage.getItem).toHaveBeenCalled();
      });
    });

    it('does not run multiple checks on re-render', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('true');
      
      const { rerender } = render(
        <App />
      );
      
      await waitFor(() => {
        expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
      });
      
      rerender(
        <App />
      );
      
      // Should not call again on rerender
      // Note: This might vary based on navigation implementation
      await waitFor(() => {
        expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined alreadyLaunched value', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(undefined);
      
      render(<App />);
      
      await waitFor(() => {
        expect(AsyncStorage.getItem).toHaveBeenCalled();
      });
    });

    it('handles empty string from AsyncStorage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('');
      
      const { getByText } = render(
        <App />
      );
      
      await waitFor(() => {
        expect(getByText('CAMERA')).toBeTruthy();
      });
    });

    it('renders without crashing', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('true');
      
      const { getByText } = render(
        <App />
      );
      
      expect(getByText('CAMERA')).toBeTruthy();
    });
  });
});

