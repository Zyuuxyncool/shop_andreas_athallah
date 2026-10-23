/**
 * Production Standalone HTTP Server for Andreas Shop
 * Jalankan di server/VPS: node server.js
 * Bebas dependency tambahan (menggunakan modul native Node.js).
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "andreasnation970@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "andreas2026!admin";
let ACTIVE_ADMIN_TOKEN = process.env.ADMIN_TOKEN || crypto.randomBytes(32).toString("hex");

const stockPath = path.resolve(__dirname, "private_data/stok_gemini.json");
const historyPath = path.resolve(__dirname, "private_data/riwayat_pembelian.json");
const distPath = path.resolve(__dirname, "dist");

const loginRateLimit = new Map();
const purchaseRateLimit = new Map();

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "127.0.0.1";
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);
  const clientIp = getClientIp(req);

  // DEFENSE: Blokir akses langsung ke data privat / file sensitif
  if (
    pathname.includes("private_data") ||
    pathname.includes("stok_gemini") ||
    pathname.includes("riwayat_pembelian") ||
    pathname.includes(".env") ||
    (pathname.endsWith(".json") && !pathname.startsWith("/api/"))
  ) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Access Denied: 403 Forbidden" }));
    return;
  }

  const readStock = () => (fs.existsSync(stockPath) ? JSON.parse(fs.readFileSync(stockPath, "utf-8")) : []);
  const readHistory = () => (fs.existsSync(historyPath) ? JSON.parse(fs.readFileSync(historyPath, "utf-8")) : []);
  const isAuthorized = () => req.headers["authorization"] === `Bearer ${ACTIVE_ADMIN_TOKEN}`;

  // 1. PUBLIC: Stock Count
  if (pathname === "/api/stock-count" && req.method === "GET") {
    try {
      const stock = readStock();
      res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
      res.end(JSON.stringify({ count: stock.length }));
    } catch (e) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // 2. PUBLIC: Customer Purchase
  if (pathname === "/api/purchase-gemini" && req.method === "POST") {
    const now = Date.now();
    const ipRecord = purchaseRateLimit.get(clientIp);
    if (ipRecord && ipRecord.resetAt > now) {
      if (ipRecord.count >= 5) {
        res.writeHead(429, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Terlalu banyak permintaan. Silakan tunggu beberapa saat." }));
        return;
      }
      ipRecord.count += 1;
    } else {
      purchaseRateLimit.set(clientIp, { count: 1, resetAt: now + 5 * 60 * 1000 });
    }

    let body = "";
    req.on("data", (chunk) => { body += chunk; });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        let stock = readStock();
        let history = readHistory();
        const qty = Number(data.quantity) || 1;

        if (qty < 1 || qty > 5 || stock.length < qty) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Stok tidak mencukupi atau jumlah pesanan tidak valid." }));
          return;
        }

        const allocated = stock.slice(0, qty);
        stock = stock.slice(qty);

        for (const item of allocated) {
          history.unshift({
            order_id: String(data.orderId || `INV-${Date.now().toString().slice(-6)}`).slice(0, 30),
            stock_id: item.id,
            product_name: "Google Gemini Pro 18 Bulan",
            customer_name: String(data.customerName || "Anonim").slice(0, 50),
            customer_phone: String(data.customerPhone || "-").slice(0, 25),
            activation_link: item.activation_link,
            price: data.price || 25000,
            quantity: 1,
            payment_method: String(data.paymentMethod || "Manual").slice(0, 30),
            status: "completed",
            purchased_at: new Date().toISOString(),
          });
        }

        fs.writeFileSync(stockPath, JSON.stringify(stock, null, 2), "utf-8");
        fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), "utf-8");

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, allocatedCount: allocated.length, remainingCount: stock.length }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 3. ADMIN: Login
  if (pathname === "/api/admin/login" && req.method === "POST") {
    const now = Date.now();
    const attempt = loginRateLimit.get(clientIp);
    if (attempt && attempt.lockoutUntil > now) {
      const remainingMinutes = Math.ceil((attempt.lockoutUntil - now) / 60000);
      res.writeHead(429, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: `Terlalu banyak percobaan gagal. Dikunci ${remainingMinutes} menit.` }));
      return;
    }

    let body = "";
    req.on("data", (chunk) => { body += chunk; });
    req.on("end", async () => {
      await new Promise((r) => setTimeout(r, 400));
      try {
        const { email, password } = JSON.parse(body);
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          loginRateLimit.delete(clientIp);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, token: ACTIVE_ADMIN_TOKEN, email: ADMIN_EMAIL }));
        } else {
          const currentAttempts = (attempt?.attempts || 0) + 1;
          loginRateLimit.set(clientIp, {
            attempts: currentAttempts,
            lockoutUntil: currentAttempts >= 5 ? now + 5 * 60 * 1000 : 0,
          });
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: `Kredensial salah. Sisa percobaan: ${Math.max(0, 5 - currentAttempts)}` }));
        }
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 4. ADMIN: Stock
  if (pathname === "/api/admin/stock" && req.method === "GET") {
    if (!isAuthorized()) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Unauthorized" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    res.end(JSON.stringify(readStock()));
    return;
  }

  // 5. ADMIN: History
  if (pathname === "/api/admin/history" && req.method === "GET") {
    if (!isAuthorized()) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Unauthorized" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    res.end(JSON.stringify(readHistory()));
    return;
  }

  // 6. ADMIN: Add Stock
  if (pathname === "/api/admin/add-stock" && req.method === "POST") {
    if (!isAuthorized()) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Unauthorized" }));
      return;
    }
    let body = "";
    req.on("data", (chunk) => { body += chunk; });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        if (!data.activationLink || !data.activationLink.trim()) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Link aktivasi kosong" }));
          return;
        }
        let stock = readStock();
        stock.push({
          id: `GEM-18M-${String(stock.length + 1).padStart(3, "0")}`,
          product_name: "Google Gemini Pro 18 Bulan",
          activation_link: data.activationLink.trim(),
          duration: "18 Bulan",
          status: "available",
          added_at: new Date().toISOString(),
        });
        fs.writeFileSync(stockPath, JSON.stringify(stock, null, 2), "utf-8");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, count: stock.length }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // SERVE STATIC FILES FROM /dist (Production SPA)
  let filePath = path.join(distPath, pathname);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distPath, "index.html");
  }

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`[Production Server] Toko Andreas running on http://localhost:${PORT}`);
});
