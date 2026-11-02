const { test } = require('node:test');
const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

function setup({ status = 200, size = 100000, error = false } = {}) {
  let sent;
  const module = { exports: {} };
  vm.runInNewContext(readFileSync(path.join(__dirname, '../network-test.js'), 'utf8'), {
    module, Buffer, setTimeout, clearTimeout,
    require(name) {
      if (name === 'node:perf_hooks') {
        let clock = 0;
        return { performance: { now: () => (clock += 1000) } };
      }
      return { request(options, callback) {
        const request = new EventEmitter();
        request.destroy = err => request.emit('error', err);
        request.end = payload => {
          sent = { options, payload };
          queueMicrotask(() => {
            if (error) { request.emit('error', new Error('Offline')); return; }
            const response = new EventEmitter();
            response.statusCode = status;
            response.resume = () => {};
            callback(response);
            response.emit('data', Buffer.alloc(size));
            response.emit('end');
          });
        };
        return request;
      } };
    }
  });
  return { measure: module.exports.measureNetwork, sent: () => sent };
}
test('download measures actual received bytes, including server-limited responses', async () => {
  const api = setup();
  assert.equal((await api.measure('download')).mbps, 0.8);
  assert.equal(api.sent().options.method, 'GET');
});
test('upload sends the declared payload and counts sent bytes', async () => {
  const api = setup();
  assert.equal((await api.measure('upload')).mbps, 4);
  assert.equal(api.sent().options.method, 'POST');
  assert.equal(api.sent().payload.length, api.sent().options.headers['Content-Length']);
});
test('HTTP failures never become successful measurements', async () => {
  await assert.rejects(setup({ status: 400 }).measure('upload'), /HTTP 400/);
});
test('connection failures and empty transfers reject cleanly', async () => {
  await assert.rejects(setup({ error: true }).measure('download'), /Offline/);
  await assert.rejects(setup({ size: 0 }).measure('download'), /Empty transfer/);
});
