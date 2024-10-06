import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'miApplicacion',
  webDir: 'www',
  plugins: {
    BarcodeScanner: {
      android: {
        permissions: ['CAMERA'] // Ensure that the camera permission is granted
      }
    }
  }
};


export default config;
