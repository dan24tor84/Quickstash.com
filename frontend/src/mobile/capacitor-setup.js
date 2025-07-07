// frontend/src/mobile/capacitor-setup.js
import { Capacitor } from '@capacitor/core';

export const isNative = () => Capacitor.isNativePlatform();

export const initializeCapacitor = () => {
  console.log('Capacitor initialized on native device.');
  // You can add splash screen, status bar, push notifications, etc. here later
};
