// Local dev server: serves the static portfolio and runs the /api/contact
// serverless handler — a lightweight stand-in for `vercel dev`.
// Run with:  node dev-server.js   (then open http://localhost:3000)
const http = require("http");
const fs = require("fs");
const path = require("path");

// --- load .env (KEY= value) into process.env -------------------------------
try {
  for (const line of fs.readFileSync(path.join(__dirname, ".env"), "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
} catch { /* no .env — contact API will report "not configured" */ }

const contactHandler = require("./api/contact.js");
const PORT = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".gif": "image/gif", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".pdf": "application/pdf", ".webp": "image/webp",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf",
};

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);

  // --- API route: collect body, then delegate to the Vercel-style handler ---
  if (url === "/api/contact") {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      try { req.body = raw ? JSON.parse(raw) : {}; } catch { req.body = {}; }
      res.status = (code) => { res.statusCode = code; return res; };
      res.json = (obj) => { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(obj)); };
      Promise.resolve(contactHandler(req, res)).catch((e) => {
        console.error(e); res.statusCode = 500; res.end('{"ok":false}');
      });
    });
    return;
  }

  // --- static files ---------------------------------------------------------
  let filePath = path.join(__dirname, url === "/" ? "index.html" : url);
  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isDirectory()) filePath = path.join(filePath, "index.html");
    fs.readFile(filePath, (e, data) => {
      if (e) { res.statusCode = 404; res.end("404 Not Found"); return; }
      res.setHeader("Content-Type", MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream");
      res.end(data);
    });
  });
});

server.listen(PORT, () => console.log(`Portfolio running at http://localhost:${PORT}`));
