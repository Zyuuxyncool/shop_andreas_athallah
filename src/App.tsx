import { useState, useEffect, useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProductCard } from "./components/ProductCard";
import { OrderModal } from "./components/OrderModal";
import { HowToOrder } from "./components/HowToOrder";
import { TrustGuarantees } from "./components/TrustGuarantees";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { PRODUCTS, ProductCategory, ProductItem } from "./data/products";
import { Code2, Sparkles, LayoutGrid, Search, ArrowUpDown, X } from "lucide-react";

type SortOption = "popular" | "price-asc" | "price-desc";

export function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("shop-theme");
      if (saved === "light" || saved === "dark") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "dark";
    }
    return "dark";
  });

  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("shop-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Filter and Sort
  const processedProducts = useMemo(() => {
    let list = PRODUCTS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchBadge = item.badge?.toLowerCase().includes(q);
      const matchTech = item.techStack?.some((t) => t.toLowerCase().includes(q));
      const matchVariant = item.variants?.some((v) => v.name.toLowerCase().includes(q));

      return matchName || matchDesc || matchBadge || matchTech || matchVariant;
    });

    if (sortBy === "popular") {
      list = [...list].sort((a, b) => b.soldCount - a.soldCount);
    } else if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.priceNumeric - b.priceNumeric);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.priceNumeric - a.priceNumeric);
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const digitalCount = PRODUCTS.filter((p) => p.category === "digital").length;
  const codingCount = PRODUCTS.filter((p) => p.category === "coding").length;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative selection:bg-primary/20 selection:text-primary">
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex flex-col relative overflow-hidden">
        <Hero />

        {/* Shopee-style Catalog Section */}
        <section id="katalog" className="py-8 sm:py-12 border-t border-border/60">
          <div className="container max-w-6xl mx-auto px-4">
            
            {/* Shopee Filter & Sorting Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-xs mb-8 space-y-4">
              
              {/* Category Pills & Sort Selector */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Category Tabs */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1 hidden sm:inline">
                    Kategori:
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveCategory("all")}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      activeCategory === "all"
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Semua Produk</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-background/20 font-mono">
                      {PRODUCTS.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveCategory("digital")}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      activeCategory === "digital"
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Produk Digital & AI</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-background/20 font-mono">
                      {digitalCount}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveCategory("coding")}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      activeCategory === "coding"
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Jasa Koding & Tugas</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-background/20 font-mono">
                      {codingCount}
                    </span>
                  </button>
                </div>

                {/* Sort Bar (Shopee style) */}
                <div className="flex items-center gap-2 self-start md:self-auto">
                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <ArrowUpDown className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Urutkan:</span>
                  </span>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-3 py-1.5 rounded-xl bg-muted/60 border border-border text-foreground text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="popular">Paling Terlaris</option>
                    <option value="price-asc">Harga: Terendah ke Tertinggi</option>
                    <option value="price-desc">Harga: Tertinggi ke Terendah</option>
                  </select>
                </div>

              </div>

              {/* Active Search Feedback */}
              {searchQuery && (
                <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-primary" />
                    <span>
                      Menampilkan <strong className="text-foreground">{processedProducts.length}</strong> hasil pencarian untuk <span className="text-primary font-semibold">"{searchQuery}"</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              )}

            </div>

            {/* Shopee Products Grid */}
            {processedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {processedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(item) => setSelectedProduct(item)}
                  />
                ))}
              </div>
            ) : (
              /* No Search Results */
              <div className="text-center py-16 px-4 bg-card rounded-3xl border border-border space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  Tidak Ada Produk yang Cocok
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                  Tidak menemukan produk untuk kata kunci "{searchQuery}". Coba gunakan kata kunci umum seperti "Gemini", "Laravel", "Tugas", atau "Template".
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Tampilkan Semua Produk
                </button>
              </div>
            )}

            {/* Shopee Custom Request Banner */}
            <div className="mt-12 p-6 sm:p-7 rounded-3xl bg-card border border-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  Butuh Akun / Produk Digital Lain atau Request Tugas Khusus?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Kami siap membantu pengadaan lisensi tools AI lain atau kustomisasi tugas pemrograman sesuai deadline Anda.
                </p>
              </div>

              <a
                href="https://wa.me/6285773301211?text=Halo%20Andreas,%20saya%20punya%20request%20produk%20digital%20atau%20tugas%20koding%20khusus."
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-sm shrink-0"
              >
                Chat Penjual via WA
              </a>
            </div>

          </div>
        </section>

        <HowToOrder />
        <TrustGuarantees />
        <FAQ />
      </main>

      <Footer />

      {/* Shopee-style Order Modal Dialog */}
      <OrderModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;
