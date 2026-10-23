import { useState, useEffect, useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { ProductCard } from "./components/ProductCard";
import { OrderModal } from "./components/OrderModal";
import { HowToOrder } from "./components/HowToOrder";
import { TrustGuarantees } from "./components/TrustGuarantees";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { PRODUCTS, ProductCategory, ProductItem } from "./data/products";
import { CustomSelect, SelectOption } from "./components/CustomSelect";
import { Code2, Sparkles, LayoutGrid, Search, ArrowUpDown, X, ArrowLeft } from "lucide-react";

type SortOption = "popular" | "price-asc" | "price-desc";

const SORT_OPTIONS: SelectOption<SortOption>[] = [
  { value: "popular", label: "Rekomendasi" },
  { value: "price-asc", label: "Harga: Terendah" },
  { value: "price-desc", label: "Harga: Tertinggi" },
];

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
      const matchTech = item.techStack?.some((t) => t.toLowerCase().includes(q));
      const matchVariant = item.variants?.some((v) => v.name.toLowerCase().includes(q));

      return matchName || matchDesc || matchTech || matchVariant;
    });

    if (sortBy === "popular") {
      list = [...list]; // Default order
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
        {/* Clean Header Bar */}
        <div className="pt-32 pb-4 sm:pt-28 sm:pb-5 border-b border-border/60 bg-muted/20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                  Toko Digital & Jasa Koding
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Penyedia lisensi digital resmi & layanan pemrograman terpercaya oleh Andreas Athallah.
                </p>
              </div>

              {/* Back to Portfolio Button on the Right */}
              <a
                href="https://andreas-athallah.web.id"
                className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-accent text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors shadow-xs"
                title="Kembali ke Portofolio Pengembang"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Portofolio Utama</span>
              </a>
            </div>
          </div>
        </div>

        {/* Catalog Section */}
        <section id="katalog" className="py-6 sm:py-10">
          <div className="container max-w-6xl mx-auto px-4">
            
            {/* Filter & Sorting Bar */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-card border border-border shadow-xs mb-6 space-y-3">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Category Tabs: Horizontal Scrollable on Mobile with No Scrollbar */}
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
                  <button
                    type="button"
                    onClick={() => setActiveCategory("all")}
                    className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                      activeCategory === "all"
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Semua</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-background/20 font-mono">
                      {PRODUCTS.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveCategory("digital")}
                    className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                      activeCategory === "digital"
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Produk Digital</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-background/20 font-mono">
                      {digitalCount}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveCategory("coding")}
                    className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                      activeCategory === "coding"
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Jasa Koding</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-background/20 font-mono">
                      {codingCount}
                    </span>
                  </button>
                </div>

                {/* Sort Selector & Product Count Row on Mobile */}
                <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
                  <span className="text-xs text-muted-foreground font-mono sm:hidden">
                    {processedProducts.length} Produk
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-muted-foreground hidden sm:inline-flex items-center gap-1">
                      <ArrowUpDown className="w-3.5 h-3.5" />
                      <span>Urutkan:</span>
                    </span>

                    <CustomSelect
                      value={sortBy}
                      onChange={setSortBy}
                      options={SORT_OPTIONS}
                    />
                  </div>
                </div>
              </div>

              {/* Active Search Feedback */}
              {searchQuery && (
                <div className="pt-2.5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-primary" />
                    <span>
                      Hasil pencarian: <strong className="text-foreground">{processedProducts.length}</strong> produk untuk <span className="text-primary font-semibold">"{searchQuery}"</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Hapus filter</span>
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid */}
            {processedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
              <div className="text-center py-16 px-4 bg-card rounded-2xl border border-border space-y-3">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  Produk Tidak Ditemukan
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                  Tidak ada produk dengan kata kunci "{searchQuery}".
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

            {/* Custom Request Banner */}
            <div className="mt-12 p-6 rounded-2xl bg-card border border-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">
                  Butuh Produk Digital Lain atau Request Koding Khusus?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Konsultasikan kebutuhan tugas atau tools digital Anda langsung bersama kami via WhatsApp.
                </p>
              </div>

              <a
                href="https://wa.me/6285773301211?text=Halo%20Andreas,%20saya%20punya%20request%20produk%20digital%20atau%20tugas%20koding%20khusus."
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-sm shrink-0"
              >
                Chat WhatsApp
              </a>
            </div>

          </div>
        </section>

        <HowToOrder />
        <TrustGuarantees />
        <FAQ />
      </main>

      <Footer />

      {/* Order & Payment Modal Dialog */}
      <OrderModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;
