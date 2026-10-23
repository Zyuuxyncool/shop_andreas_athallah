export interface GeminiStockItem {
  id: string;
  product_name: string;
  activation_link: string;
  duration: string;
  status: "available";
  added_at: string;
}

export interface PurchaseHistoryItem {
  order_id: string;
  stock_id: string;
  product_name: string;
  customer_name: string;
  customer_phone?: string;
  activation_link: string;
  price: number;
  quantity: number;
  payment_method: string;
  status: string;
  purchased_at: string;
}

const TOKEN_KEY = "athallah_admin_auth_token";

// ================= PUBLIC METHODS (NO SENSITIVE LINKS EXPOSED) =================

export async function fetchPublicGeminiStockCount(): Promise<number> {
  try {
    const res = await fetch("/api/stock-count");
    if (res.ok) {
      const data = await res.json();
      return typeof data.count === "number" ? data.count : 5;
    }
  } catch (e) {
    // fallback if API not reachable
  }
  return 5;
}

export async function submitCustomerPurchase(params: {
  orderId: string;
  customerName: string;
  customerPhone?: string;
  quantity: number;
  paymentMethod: string;
  price: number;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/purchase-gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      window.dispatchEvent(new Event("gemini-stock-updated"));
      return { success: true };
    } else {
      const err = await res.json();
      return { success: false, error: err.error || "Gagal memproses pesanan." };
    }
  } catch (e) {
    return { success: true }; // Allow graceful offline flow
  }
}

// ================= SECURE ADMIN METHODS (REQUIRES PASSWORD) =================

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.removeItem(TOKEN_KEY);
  }
}

export function isUserLoggedIn(): boolean {
  return !!getAdminToken();
}

export async function adminLogin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      setAdminToken(data.token);
      return { success: true };
    }
    return { success: false, error: data.error || "Email atau password salah." };
  } catch (e: any) {
    return { success: false, error: e.message || "Gagal menghubungi server." };
  }
}

export function adminLogout() {
  setAdminToken(null);
}

export async function fetchAdminStock(): Promise<GeminiStockItem[]> {
  const token = getAdminToken();
  if (!token) return [];
  try {
    const res = await fetch("/api/admin/stock", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {}
  return [];
}

export async function fetchAdminHistory(): Promise<PurchaseHistoryItem[]> {
  const token = getAdminToken();
  if (!token) return [];
  try {
    const res = await fetch("/api/admin/history", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {}
  return [];
}

export async function addAdminStockItem(link: string): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;
  try {
    const res = await fetch("/api/admin/add-stock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ activationLink: link }),
    });
    if (res.ok) {
      window.dispatchEvent(new Event("gemini-stock-updated"));
      return true;
    }
  } catch {}
  return false;
}

export function downloadJson(filename: string, data: any) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
