// frontend/src/mobile/capacitor-setup.js
import { Capacitor } from '@capacitor/core';

export const isNative = () => Capacitor.isNativePlatform();

export const initializeCapacitor = () => {
  console.log('Capacitor initialized on native device.');
  // Mobile-specific features like splash screen or push setup can go here
};
