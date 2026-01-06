import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fullap.app',
  appName: 'Fullap',
  server: {
    url: 'https://fullap.com.br', 
    cleartext: false
  }
};

export default config;
