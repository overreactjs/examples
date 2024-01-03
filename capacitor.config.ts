import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.overreact.examples',
  appName: 'Overreact!',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
