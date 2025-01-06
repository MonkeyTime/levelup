const { contextBridge } = require('electron');
const si = require("systeminformation");
const { fib, dist } = require('cpu-benchmark');
const NetworkSpeed = require('network-speed');
const testNetworkSpeed = new NetworkSpeed();

const drives = async () => {
	return si.diskLayout().then((drives) => {
        return drives
  })
}

const cpus = async () => {
	return si.cpu().then((cpus) => {
        //console.log(cpus)
        return cpus
  })
}

const system = async () => {
	return si.osInfo().then((system) => {
        //console.log(cpus)
        return system
  })
}

const graphics = async () => {
	return si.graphics().then((graphics) => {
        //console.log(cpus)
        return graphics
  })
}

const battery = async () => {
	return si.battery().then((battery) => {
        //console.log(cpus)
        return battery
  })
}

const ram = async () => {
	return si.memLayout().then((ram) => {
        //console.log(cpus)
        return ram
  })
}

const networks = async () => {
	return si.networkInterfaces().then((networks) => {
        //console.log(cpus)
        return networks
  })
}

const cpuScore = async () => {
  const duration = fib(41) // Returns time required (ms) 
  // to calculate the 41. fibonacci number recursively.
  const ops = dist(10000) // Returns the amount of operations 
  // (distance matrix calculations) in 1000ms

  return Math.round((duration * ops) / 1000000)
}

async function getNetworkDownloadSpeed() {
  const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
  const fileSizeInBytes = 500000;
  const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
  console.log(speed);

  return speed;
}

async function getNetworkUploadSpeed() {
  const options = {
    hostname: 'www.google.com',
    port: 80,
    path: '/catchers/544b09b4599c1d0200000289',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const fileSizeInBytes = 2000000
  const speed = await testNetworkSpeed.checkUploadSpeed(options, fileSizeInBytes);
  console.log(speed);

  return speed;
}

contextBridge.exposeInMainWorld('systeminfos', {
  disks: async () => drives(),
  cpus: async () => cpus(),
  system: async () => system(),
  graphics: async () => graphics(),
  battery: async () => battery(),
  ram: async () => ram(),
  networks: async () => networks(),
  cpuScore: async () => cpuScore(),
  downloadScore: async () => getNetworkDownloadSpeed(),
  uploadScore: async () => getNetworkUploadSpeed(),
})