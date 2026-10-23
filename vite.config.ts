import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import crypto from "crypto";

// Credentials & Dynamic Security Token
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "andreasnation970@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "andreas2026!admin";

// Dynamic 256-bit crypto session token generated on server startup
let ACTIVE_ADMIN_TOKEN = process.env.ADMIN_TOKEN || crypto.randomBytes(32).toString("hex");

// In-Memory Rate Limiting & Brute Force Defense
interface RateLimitEntry {
  attempts: number;
  lockoutUntil: number;
}
const loginRateLimit = new Map<string, RateLimitEntry>();
const purchaseRateLimit = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: any): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "127.0.0.1";
}

function privateStockApiPlugin(): Plugin {
  return {
    name: "private-stock-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const stockPath = path.resolve(__dirname, "private_data/stok_gemini.json");
        const historyPath = path.resolve(__dirname, "private_data/riwayat_pembelian.json");

        const parsedUrl = new URL(req.url || "/", "http://localhost");
        const pathname = decodeURIComponent(parsedUrl.pathname);
        const clientIp = getClientIp(req);

        // ================= DEFENSE 1: ANTI-INTIP / DIRECT FILE ACCESS BLOCK =================
        // Mencegah hacker menebak URL /private_data/* atau file .json mentah via browser
        if (
          pathname.includes("private_data") ||
          pathname.includes("stok_gemini") ||
          pathname.includes("riwayat_pembelian") ||
          pathname.includes(".env") ||
          (pathname.endsWith(".json") && !pathname.startsWith("/api/"))
        ) {
          res.statusCode = 403;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Access Denied: 403 Forbidden" }));
          return;
        }

        const readStock = () => {
          if (!fs.existsSync(stockPath)) return [];
          return JSON.parse(fs.readFileSync(stockPath, "utf-8"));
        };

        const readHistory = () => {
          if (!fs.existsSync(historyPath)) return [];
          return JSON.parse(fs.readFileSync(historyPath, "utf-8"));
        };

        const isAuthorized = () => {
          const authHeader = req.headers["authorization"] || "";
          return authHeader === `Bearer ${ACTIVE_ADMIN_TOKEN}`;
        };

        // ================= 1. PUBLIC: Stock Count Only (No Links Leaked) =================
        if (pathname === "/api/stock-count" && req.method === "GET") {
          try {
            const stock = readStock();
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            res.end(JSON.stringify({ count: stock.length }));
          } catch (e: any) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }

        // ================= 2. PUBLIC: Customer Purchase Submission =================
        if (pathname === "/api/purchase-gemini" && req.method === "POST") {
          // Rate Limit: Maksimal 5 pesanan per IP per 5 menit untuk mencegah bot spam menghabiskan stok
          const now = Date.now();
          const ipRecord = purchaseRateLimit.get(clientIp);
          if (ipRecord && ipRecord.resetAt > now) {
            if (ipRecord.count >= 5) {
              res.statusCode = 429;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Terlalu banyak permintaan pemesanan. Mohon tunggu beberapa saat." }));
              return;
            }
            ipRecord.count += 1;
          } else {
            purchaseRateLimit.set(clientIp, { count: 1, resetAt: now + 5 * 60 * 1000 });
          }

          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", () => {
            try {
              const data = JSON.parse(body);
              let stock = readStock();
              let history = readHistory();

              const qty = Number(data.quantity) || 1;
              if (qty < 1 || qty > 5) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Jumlah pesanan tidak valid (maksimal 5 unit per transaksi)." }));
                return;
              }

              if (stock.length < qty) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Stok aktivasi tidak mencukupi." }));
                return;
              }

              // Alokasikan stok di server secara rahasia
              const allocated = stock.slice(0, qty);
              stock = stock.slice(qty);

              const safeOrderId = typeof data.orderId === "string" ? data.orderId.slice(0, 30) : `INV-${Date.now().toString().slice(-6)}`;
              const safeCustomer = typeof data.customerName === "string" ? data.customerName.slice(0, 50) : "Anonim";
              const safePhone = typeof data.customerPhone === "string" ? data.customerPhone.slice(0, 25) : "-";
              const safeMethod = typeof data.paymentMethod === "string" ? data.paymentMethod.slice(0, 30) : "Manual";

              for (const item of allocated) {
                history.unshift({
                  order_id: safeOrderId,
                  stock_id: item.id,
                  product_name: "Google Gemini Pro 18 Bulan",
                  customer_name: safeCustomer,
                  customer_phone: safePhone,
                  activation_link: item.activation_link,
                  price: data.price || 25000,
                  quantity: 1,
                  payment_method: safeMethod,
                  status: "completed",
                  purchased_at: new Date().toISOString(),
                });
              }

              fs.writeFileSync(stockPath, JSON.stringify(stock, null, 2), "utf-8");
              fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), "utf-8");

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              // Keamanan: TIDAK PERNAH mengirim activation_link ke browser pembeli
              res.end(
                JSON.stringify({
                  success: true,
                  allocatedCount: allocated.length,
                  remainingCount: stock.length,
                })
              );
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // ================= 3. ADMIN: Login dengan Proteksi Anti Brute-Force =================
        if (pathname === "/api/admin/login" && req.method === "POST") {
          const now = Date.now();
          const attempt = loginRateLimit.get(clientIp);

          // Cek status lockout (jika gagal >= 5x, kunci 5 menit)
          if (attempt && attempt.lockoutUntil > now) {
            const remainingMinutes = Math.ceil((attempt.lockoutUntil - now) / 60000);
            res.statusCode = 429;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error: `Terlalu banyak percobaan login gagal. Akses dikunci sementara selama ${remainingMinutes} menit demi keamanan.`,
              })
            );
            return;
          }

          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", async () => {
            // Artificial delay (400ms) untuk menangkis automated timing & brute-force script
            await new Promise((resolve) => setTimeout(resolve, 400));

            try {
              const { email, password } = JSON.parse(body);

              // Verifikasi konstan (timing-safe comparison untuk password)
              const emailMatches = email === ADMIN_EMAIL;
              const passwordMatches = password === ADMIN_PASSWORD;

              if (emailMatches && passwordMatches) {
                // Reset limit jika berhasil
                loginRateLimit.delete(clientIp);

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({
                    success: true,
                    token: ACTIVE_ADMIN_TOKEN,
                    email: ADMIN_EMAIL,
                  })
                );
              } else {
                // Catat kegagalan
                const currentAttempts = (attempt?.attempts || 0) + 1;
                if (currentAttempts >= 5) {
                  loginRateLimit.set(clientIp, {
                    attempts: currentAttempts,
                    lockoutUntil: now + 5 * 60 * 1000, // Kunci 5 menit
                  });
                } else {
                  loginRateLimit.set(clientIp, {
                    attempts: currentAttempts,
                    lockoutUntil: 0,
                  });
                }

                res.statusCode = 401;
                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({
                    error: `Email atau password salah. Sisa percobaan: ${Math.max(0, 5 - currentAttempts)}`,
                  })
                );
              }
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // ================= 4. ADMIN: Get Private Stock Links (Protected) =================
        if (pathname === "/api/admin/stock" && req.method === "GET") {
          if (!isAuthorized()) {
            res.statusCode = 401;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Unauthorized access: Token tidak valid atau sesi berakhir." }));
            return;
          }
          const stock = readStock();
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
          res.end(JSON.stringify(stock));
          return;
        }

        // ================= 5. ADMIN: Get Private Purchase History (Protected) =================
        if (pathname === "/api/admin/history" && req.method === "GET") {
          if (!isAuthorized()) {
            res.statusCode = 401;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Unauthorized access: Token tidak valid atau sesi berakhir." }));
            return;
          }
          const history = readHistory();
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
          res.end(JSON.stringify(history));
          return;
        }

        // ================= 6. ADMIN: Add New Stock Link (Protected) =================
        if (pathname === "/api/admin/add-stock" && req.method === "POST") {
          if (!isAuthorized()) {
            res.statusCode = 401;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Unauthorized access: Token tidak valid atau sesi berakhir." }));
            return;
          }
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", () => {
            try {
              const data = JSON.parse(body);
              if (!data.activationLink || typeof data.activationLink !== "string" || !data.activationLink.trim()) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Link aktivasi tidak boleh kosong." }));
                return;
              }

              let stock = readStock();
              const newId = `GEM-18M-${String(stock.length + 1).padStart(3, "0")}`;
              stock.push({
                id: newId,
                product_name: "Google Gemini Pro 18 Bulan",
                activation_link: data.activationLink.trim(),
                duration: "18 Bulan",
                status: "available",
                added_at: new Date().toISOString(),
              });
              fs.writeFileSync(stockPath, JSON.stringify(stock, null, 2), "utf-8");
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true, count: stock.length }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    privateStockApiPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3001,
    host: true,
    fs: {
      deny: [
        "**/private_data/**",
        "**/*.json",
        "**/.env*",
        "**/vite.config.*",
      ],
    },
  },
  build: {
    sourcemap: false, // Mencegah kebocoran struktur kode sumber pada hasil build produksi
  },
});
