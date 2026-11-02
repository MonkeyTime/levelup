const https = require('node:https');
const { performance } = require('node:perf_hooks');

function measureNetwork(direction) {
  return new Promise((resolve, reject) => {
    const upload = direction === 'upload';
    const payload = upload ? Buffer.alloc(500000, 'x') : null;
    const start = performance.now();
    let received = 0;
    let settled = false;
    const finish = (error, result) => {
      if (settled) return;
      settled = true;
      clearTimeout(deadline);
      if (error) reject(error); else resolve(result);
    };
    const request = https.request({
      hostname: 'httpbin.org', path: upload ? '/post' : '/stream-bytes/500000',
      method: upload ? 'POST' : 'GET',
      headers: upload ? { 'Content-Type': 'application/octet-stream', 'Content-Length': payload.length } : {}
    }, response => {
      if (response.statusCode !== 200) {
        response.resume();
        finish(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      response.on('data', chunk => { received += chunk.length; });
      response.on('error', error => finish(error));
      response.on('aborted', () => finish(new Error('Transfer interrupted')));
      response.on('end', () => {
        const transferred = upload ? payload.length : received;
        if (!transferred) { finish(new Error('Empty transfer')); return; }
        const seconds = Math.max((performance.now() - start) / 1000, 0.001);
        finish(null, { mbps: transferred * 8 / seconds / 1000000 });
      });
    });
    const deadline = setTimeout(() => request.destroy(new Error('Network test timeout')), 25000);
    request.on('error', error => finish(error));
    request.end(payload);
  });
}
module.exports = { measureNetwork };
