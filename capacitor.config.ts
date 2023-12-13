import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lj.hackathon',
  appName: 'Hackathon!',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
