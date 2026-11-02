module.exports = {
  packagerConfig: {
    asar: true,
    executableName: 'levelup',
    ignore: [/^\/(?:tests|docs)(?:\/|$)/],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: {
        name: 'levelup',
        setupExe: 'Levelup-Setup.exe',
      },
    },
  ],
};
