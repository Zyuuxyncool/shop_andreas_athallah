import crypto from "node:crypto";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "andreasnation970@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "andreas2026!admin";
let ACTIVE_ADMIN_TOKEN = process.env.ADMIN_TOKEN || crypto.randomBytes(32).toString("hex");

// In-Memory store fallback for Serverless environment (Vercel)
let inMemoryStock = [];
let inMemoryHistory = [];

const loginRateLimit = new Map();

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "127.0.0.1";
}

export default async function handler(req, res) {
  const parsedUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);
  const clientIp = getClientIp(req);

  const isAuthorized = () => req.headers["authorization"] === `Bearer ${ACTIVE_ADMIN_TOKEN}`;

  // 1. PUBLIC: Stock Count
  if (pathname === "/api/stock-count" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ count: inMemoryStock.length });
    return;
  }

  // 2. PUBLIC: Purchase
  if (pathname === "/api/purchase-gemini" && req.method === "POST") {
    const qty = Number(req.body?.quantity) || 1;
    if (inMemoryStock.length >= qty) {
      const allocated = inMemoryStock.slice(0, qty);
      inMemoryStock = inMemoryStock.slice(qty);
      for (const item of allocated) {
        inMemoryHistory.unshift({
          order_id: String(req.body?.orderId || `INV-${Date.now().toString().slice(-6)}`).slice(0, 30),
          stock_id: item.id,
          product_name: "Google Gemini Pro 18 Bulan",
          customer_name: String(req.body?.customerName || "Anonim").slice(0, 50),
          customer_phone: String(req.body?.customerPhone || "-").slice(0, 25),
          activation_link: item.activation_link,
          price: req.body?.price || 25000,
          quantity: 1,
          payment_method: String(req.body?.paymentMethod || "Manual").slice(0, 30),
          status: "completed",
          purchased_at: new Date().toISOString(),
        });
      }
    }
    res.status(200).json({ success: true });
    return;
  }

  // 3. ADMIN: Login
  if (pathname === "/api/admin/login" && req.method === "POST") {
    const now = Date.now();
    const attempt = loginRateLimit.get(clientIp);
    if (attempt && attempt.lockoutUntil > now) {
      const remainingMinutes = Math.ceil((attempt.lockoutUntil - now) / 60000);
      res.status(429).json({ error: `Terlalu banyak percobaan gagal. Dikunci ${remainingMinutes} menit.` });
      return;
    }

    await new Promise((r) => setTimeout(r, 400));
    const { email, password } = req.body || {};
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      loginRateLimit.delete(clientIp);
      res.status(200).json({ success: true, token: ACTIVE_ADMIN_TOKEN, email: ADMIN_EMAIL });
    } else {
      const currentAttempts = (attempt?.attempts || 0) + 1;
      loginRateLimit.set(clientIp, {
        attempts: currentAttempts,
        lockoutUntil: currentAttempts >= 5 ? now + 5 * 60 * 1000 : 0,
      });
      res.status(401).json({ error: `Email atau password salah. Sisa percobaan: ${Math.max(0, 5 - currentAttempts)}` });
    }
    return;
  }

  // 4. ADMIN: Stock
  if (pathname === "/api/admin/stock" && req.method === "GET") {
    if (!isAuthorized()) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(inMemoryStock);
    return;
  }

  // 5. ADMIN: History
  if (pathname === "/api/admin/history" && req.method === "GET") {
    if (!isAuthorized()) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(inMemoryHistory);
    return;
  }

  // 6. ADMIN: Add Stock
  if (pathname === "/api/admin/add-stock" && req.method === "POST") {
    if (!isAuthorized()) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const link = req.body?.activationLink;
    if (!link || typeof link !== "string" || !link.trim()) {
      res.status(400).json({ error: "Link aktivasi kosong" });
      return;
    }
    inMemoryStock.push({
      id: `GEM-18M-${String(inMemoryStock.length + 1).padStart(3, "0")}`,
      product_name: "Google Gemini Pro 18 Bulan",
      activation_link: link.trim(),
      duration: "18 Bulan",
      status: "available",
      added_at: new Date().toISOString(),
    });
    res.status(200).json({ success: true, count: inMemoryStock.length });
    return;
  }

  res.status(404).json({ error: "Not Found" });
}
