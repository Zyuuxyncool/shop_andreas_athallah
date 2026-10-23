import { useState, useEffect } from "react";
import {
  Lock,
  Mail,
  Key,
  Database,
  History,
  Plus,
  Download,
  Copy,
  Check,
  AlertCircle,
  LogOut,
  ArrowLeft,
  ShieldCheck,
  Eye,
  EyeOff
} from "lucide-react";
import {
  isUserLoggedIn,
  adminLogin,
  adminLogout,
  fetchAdminStock,
  fetchAdminHistory,
  addAdminStockItem,
  downloadJson,
  GeminiStockItem,
  PurchaseHistoryItem
} from "../services/stockService";

interface AdminPageProps {
  onBackToShop: () => void;
}

export function AdminPage({ onBackToShop }: AdminPageProps) {
  const [loggedIn, setLoggedIn] = useState(isUserLoggedIn());
  const [email, setEmail] = useState("andreasnation970@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"stock" | "history">("stock");
  const [stockList, setStockList] = useState<GeminiStockItem[]>([]);
  const [historyList, setHistoryList] = useState<PurchaseHistoryItem[]>([]);
  const [newLink, setNewLink] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadDashboardData = async () => {
    const s = await fetchAdminStock();
    const h = await fetchAdminHistory();
    setStockList(s);
    setHistoryList(h);
  };

  useEffect(() => {
    if (loggedIn) {
      loadDashboardData();
    }
  }, [loggedIn]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    const res = await adminLogin(email.trim(), password);
    setIsLoading(false);

    if (res.success) {
      setLoggedIn(true);
    } else {
      setErrorMsg(res.error || "Email atau password salah.");
    }
  };

  const handleLogout = () => {
    adminLogout();
    setLoggedIn(false);
    setPassword("");
  };

  const handleAddStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLink.trim()) return;
    const ok = await addAdminStockItem(newLink.trim());
    if (ok) {
      setNewLink("");
      loadDashboardData();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative flex flex-col justify-between">
      
      {/* Header Bar */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30 py-3.5 px-4">
        <div className="container max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-xs font-bold">
              AA
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base text-foreground leading-none block">
                Portal Admin Andreas Shop
              </span>
              <span className="text-[11px] text-muted-foreground font-mono">
                private_data storage
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBackToShop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-accent text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Toko</span>
            </button>

            {loggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-500 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="container max-w-5xl mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
        
        {/* ================= VIEW 1: LOGIN FORM ================= */}
        {!loggedIn ? (
          <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Login Pemilik Toko
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Akses aman untuk melihat dan mengelola stok link aktivasi Gemini serta arsip riwayat pembelian.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">
                  Email Admin
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@email.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/40 border border-border text-foreground text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
                  />
                  <Mail className="w-4 h-4 text-muted-foreground absolute left-3 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">
                  Password Rahasia
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-muted/40 border border-border text-foreground text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
                  />
                  <Key className="w-4 h-4 text-muted-foreground absolute left-3 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 p-1 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm min-h-[44px] disabled:opacity-50"
              >
                <span>{isLoading ? "Memverifikasi..." : "Masuk ke Panel Admin"}</span>
              </button>
            </form>

            <div className="pt-2 border-t border-border/60 text-center">
              <span className="text-[11px] text-muted-foreground">
                Data link dienkripsi & tersimpan di folder server private.
              </span>
            </div>
          </div>
        ) : (
          /* ================= VIEW 2: LOGGED-IN ADMIN DASHBOARD ================= */
          <div className="space-y-6">
            
            {/* Top Control Bar */}
            <div className="p-4 sm:p-5 rounded-3xl bg-card border border-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("stock")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                    activeTab === "stock"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>Stok Tersedia ({stockList.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("history")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                    activeTab === "history"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <History className="w-4 h-4" />
                  <span>Riwayat Terjual ({historyList.length})</span>
                </button>
              </div>

              {/* Download JSON Button */}
              <button
                type="button"
                onClick={() =>
                  downloadJson(
                    activeTab === "stock" ? "stok_gemini.json" : "riwayat_pembelian.json",
                    activeTab === "stock" ? stockList : historyList
                  )
                }
                className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-accent text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors shadow-xs"
                title="Download file JSON ke komputer"
              >
                <Download className="w-3.5 h-3.5 text-primary" />
                <span>Unduh File JSON</span>
              </button>
            </div>

            {/* TAB 1: STOK TERSEDIA */}
            {activeTab === "stock" && (
              <div className="space-y-5">
                {/* Form Tambah Link */}
                <form
                  onSubmit={handleAddStock}
                  className="p-5 rounded-3xl bg-card border border-border shadow-xs space-y-3"
                >
                  <h3 className="text-sm font-bold text-foreground">
                    Tambah Link Aktivasi Gemini 18 Bulan Baru:
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="url"
                      required
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      placeholder="https://one.google.com/promo/..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-foreground text-xs sm:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[42px]"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs shrink-0 min-h-[42px]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Link</span>
                    </button>
                  </div>
                </form>

                {/* List of Stock */}
                <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Daftar Link Belum Terjual (Private)
                    </span>
                    <span className="text-xs font-mono font-semibold text-emerald-500">
                      {stockList.length} Link Siap Jual
                    </span>
                  </div>

                  {stockList.length > 0 ? (
                    <div className="space-y-2.5">
                      {stockList.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl bg-muted/30 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                        >
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-primary">{item.id}</span>
                              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500 font-semibold">
                                {item.duration}
                              </span>
                            </div>
                            <span className="font-mono text-xs text-foreground truncate block select-all">
                              {item.activation_link}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCopy(item.id, item.activation_link)}
                            className="self-end sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-xs font-medium text-muted-foreground hover:text-foreground shrink-0"
                          >
                            {copiedId === item.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-emerald-500">Tersalin</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Salin Link</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 space-y-2">
                      <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                      <h4 className="text-sm font-bold text-foreground">Stok Kosong</h4>
                      <p className="text-xs text-muted-foreground">
                        Semua link sudah terjual atau belum diinput. Masukkan link baru di atas.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: RIWAYAT PENJUALAN */}
            {activeTab === "history" && (
              <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Arsip Riwayat Pembelian (Link yang Sudah Diserahkan)
                  </span>
                  <span className="text-xs font-mono font-semibold text-primary">
                    {historyList.length} Transaksi
                  </span>
                </div>

                {historyList.length > 0 ? (
                  <div className="space-y-3">
                    {historyList.map((hist) => (
                      <div
                        key={`${hist.order_id}-${hist.stock_id}`}
                        className="p-4 rounded-2xl bg-muted/30 border border-border space-y-2.5 text-xs"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-primary">{hist.order_id}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="font-semibold text-foreground">{hist.customer_name}</span>
                            {hist.customer_phone && hist.customer_phone !== "-" && (
                              <span className="text-muted-foreground font-mono">({hist.customer_phone})</span>
                            )}
                          </div>
                          <span className="text-muted-foreground font-mono text-[11px]">
                            {new Date(hist.purchased_at).toLocaleString("id-ID")}
                          </span>
                        </div>

                        {/* Link that was given to this customer */}
                        <div className="p-2.5 rounded-xl bg-card border border-border flex items-center justify-between gap-3">
                          <div className="truncate">
                            <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Link Aktivasi Terkirim:</span>
                            <span className="font-mono text-xs text-foreground select-all truncate block">
                              {hist.activation_link}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(hist.order_id, hist.activation_link)}
                            className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground hover:text-foreground shrink-0"
                            title="Salin Link"
                          >
                            {copiedId === hist.order_id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                          <span>Metode: {hist.payment_method}</span>
                          <span className="font-mono font-bold text-foreground">
                            Rp {hist.price.toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-xs text-muted-foreground">
                    Belum ada riwayat pembelian tercatat.
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border text-center text-xs text-muted-foreground">
        <div className="container max-w-5xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Sistem Keamanan Private Data Toko Andreas Athallah</span>
        </div>
      </footer>

    </div>
  );
}
