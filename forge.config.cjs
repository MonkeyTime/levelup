const path = require('node:path');

module.exports = {
  packagerConfig: {
    asar: true,
    executableName: 'levelup',
    icon: path.join(__dirname, 'assets', 'levelup'),
    ignore: [/^\/(?:tests|docs|scripts)(?:\/|$)/],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: {
        name: 'levelup',
        setupExe: 'Levelup-Setup.exe',
        setupIcon: path.join(__dirname, 'assets', 'levelup.ico'),
      },
    },
  ],
};
