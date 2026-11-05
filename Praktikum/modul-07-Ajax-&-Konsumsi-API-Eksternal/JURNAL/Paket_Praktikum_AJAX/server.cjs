// Server HTTP dan mock API, hanya memakai modul bawaan Node.js.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { execFile } = require('node:child_process');
const root = __dirname;
const port = Number(process.env.PORT || 3007);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT harus angka 1-65535.'); process.exit(1);
}
const users = [
  { id: 1, name: 'Budi Santoso', email: 'budi@example.com' },
  { id: 2, name: 'Siti Rahma', email: 'siti@example.com' },
  { id: 3, name: 'Andi Pratama', email: 'andi@example.com' }
];
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.jsx': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8', '.pdf': 'application/pdf', '.ttf': 'font/ttf'
};
function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(data, null, 2));
}
const server = http.createServer((req, res) => {
  let url;
  try { url = new URL(req.url, `http://127.0.0.1:${port}`); }
  catch { return json(res, 400, { message: 'URL tidak valid.' }); }
  const route = url.pathname;
  if (route.startsWith('/api/')) {
    if (req.method === 'GET' && (route === '/api/users' || route === '/api/info')) {
      const rawDelay = Number(url.searchParams.get('delay') || 300);
      const delay = Number.isFinite(rawDelay) ? Math.min(5000, Math.max(0, rawDelay)) : 300;
      return setTimeout(() => {
        if (res.destroyed) return;
        if (url.searchParams.get('mode') === 'error') return json(res, 503, { message: 'Simulasi server bermasalah.' });
        if (route === '/api/info') return json(res, 200, { message: 'Halo! Pesan ini dikirim oleh API lokal, tanpa reload halaman.' });
        json(res, 200, url.searchParams.get('mode') === 'empty' ? [] : users);
      }, delay);
    }
    if (req.method === 'POST' && route === '/api/users') {
      if (!(req.headers['content-type'] || '').includes('application/json')) return json(res, 415, { message: 'Gunakan Content-Type application/json.' });
      let body = '', bytes = 0, terlaluBesar = false;
      req.on('data', chunk => {
        bytes += chunk.length;
        if (bytes > 65536) terlaluBesar = true;
        if (!terlaluBesar) body += chunk;
      });
      req.on('end', () => {
        if (terlaluBesar) return json(res, 413, { message: 'Payload terlalu besar.' });
        let data;
        try { data = JSON.parse(body); }
        catch { return json(res, 400, { message: 'JSON tidak valid.' }); }
        if (!data || typeof data.name !== 'string' || !data.name.trim() || data.name.length > 80 ||
            typeof data.email !== 'string' || data.email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
          return json(res, 400, { message: 'Isi nama dan email yang valid.' });
        }
        // Sengaja tidak mengubah users: ini hanya simulasi POST.
        setTimeout(() => json(res, 201, { id: 101, name: data.name.trim(), email: data.email.trim(), simulated: true }), 500);
      });
      return;
    }
    return json(res, 404, { message: 'Endpoint atau metode tidak tersedia.' });
  }
  if (!['GET', 'HEAD'].includes(req.method)) return json(res, 405, { message: 'Metode tidak diizinkan.' });
  let decoded;
  try { decoded = decodeURIComponent(route); }
  catch { return json(res, 400, { message: 'URL tidak valid.' }); }
  const file = path.resolve(root, '.' + decoded);
  if (file !== root && !file.startsWith(root + path.sep)) return json(res, 403, { message: 'Akses ditolak.' });
  fs.stat(file, (error, stat) => {
    if (error) return json(res, 404, { message: 'File tidak ditemukan.' });
    const target = stat.isDirectory() ? path.join(file, 'index.html') : file;
    fs.readFile(target, (readError, data) => {
      if (readError) return json(res, 404, { message: 'File tidak ditemukan.' });
      res.writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'Content-Length': data.length });
      res.end(req.method === 'HEAD' ? undefined : data);
    });
  });
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE'
    ? `Port ${port} sedang dipakai. Tutup server lama, atau jalankan: set PORT=3008 lalu node server.cjs`
    : `Server gagal: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  const address = `http://127.0.0.1:${port}`;
  console.log(`\nPRAKTIKUM AJAX\nBuka ${address}\nBiarkan terminal ini terbuka. Tekan Ctrl+C untuk berhenti.\n`);
  if (process.argv.includes('--open')) {
    const command = process.platform === 'win32' ? 'cmd' : process.platform === 'darwin' ? 'open' : 'xdg-open';
    const args = process.platform === 'win32' ? ['/c', 'start', '', address] : [address];
    execFile(command, args, { windowsHide: true }, error => { if (error) console.log(`Buka browser secara manual: ${address}`); });
  }
});
