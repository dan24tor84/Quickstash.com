import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.quickstash.app',
  appName: 'QuickStash',
  webDir: 'frontend/build',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    iosScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#16a34a",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#ffffff"
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#16a34a"
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    Keyboard: {
      resize: "body",
      style: "dark",
      resizeOnFullScreen: true
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false
  },
  ios: {
    contentInset: "automatic",
    scrollEnabled: true
  }
};

export default config;
