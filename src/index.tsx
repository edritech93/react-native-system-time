import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-system-time' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const SystemTime = NativeModules.SystemTime
  ? NativeModules.SystemTime
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function checkTime(): Promise<string> {
  return SystemTime.checkTime();
}

export function checkZone(): Promise<string> {
  return SystemTime.checkZone();
}
