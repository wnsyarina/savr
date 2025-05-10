
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.bf343d25ac3a4b60b1694b3a9def4cfa',
  appName: 'A Lovable project',
  webDir: 'dist',
  server: {
    url: 'https://bf343d25-ac3a-4b60-b169-4b3a9def4cfa.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#F97316",
      showSpinner: true,
      spinnerColor: "#FFFFFF"
    }
  }
};

export default config;
