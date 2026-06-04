import path from 'node:path';
import 'dotenv/config';

const appPath = path.resolve(process.env.APP_PATH || './apps/mda-2.0.1-23.apk');

const androidCaps: Record<string, unknown> = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'emulator-5554',
  'appium:app': appPath,
  'appium:appPackage': 'com.saucelabs.mydemoapp.android',
  'appium:appActivity': '.view.activities.SplashActivity',
  'appium:autoGrantPermissions': true,
  'appium:newCommandTimeout': 240
};

if (process.env.ANDROID_PLATFORM_VERSION) {
  androidCaps['appium:platformVersion'] = process.env.ANDROID_PLATFORM_VERSION;
}

export const config = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',
  specs: ['./mobile-tests/specs/**/*.ts'],
  maxInstances: 1,
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 15_000,
  connectionRetryTimeout: 120_000,
  connectionRetryCount: 1,
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',
  services: [
    ['appium', {
      command: 'appium',
      logPath: './reports/appium',
      args: {
        address: '127.0.0.1',
        port: 4723,
        relaxedSecurity: true
      }
    }]
  ],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120_000
  },
  capabilities: [androidCaps]
};
