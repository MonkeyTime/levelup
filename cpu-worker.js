const { parentPort } = require('node:worker_threads');
const { fib, dist } = require('cpu-benchmark');
// Higher is faster: fixed work duration is inverted, throughput is direct.
const duration = Math.max(1, fib(41));
const operations = dist(1000);
parentPort.postMessage(Math.round((1000 / duration) * operations));
