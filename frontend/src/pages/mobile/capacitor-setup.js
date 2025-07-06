import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

export const isNative = () => {
  return Capacitor.isNativePlatform();
};

export const initializeCapacitor = async () => {
  console.log('Initializing Capacitor for native platform');

  try {
    // Hide splash screen after short delay
    await SplashScreen.hide({ fadeOutDuration: 1000 });

    // Set status bar style and background color
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#16a34a' }); // Tailwind green-600

    // Add any additional native plugin setup here
  } catch (error) {
    console.error('Capacitor initialization error:', error);
  }
};
