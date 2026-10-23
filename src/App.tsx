import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProductCard } from "./components/ProductCard";
import { OrderModal } from "./components/OrderModal";
import { HowToOrder } from "./components/HowToOrder";
import { TrustGuarantees } from "./components/TrustGuarantees";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { PRODUCTS, ProductCategory, ProductItem } from "./data/products";
import { Code2, Sparkles, LayoutGrid } from "lucide-react";

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

  const filteredProducts = PRODUCTS.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const codingCount = PRODUCTS.filter((p) => p.category === "coding").length;
  const aiCount = PRODUCTS.filter((p) => p.category === "ai").length;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Hero />

        {/* Product Catalog Section */}
        <section id="katalog" className="py-16 sm:py-24 border-t border-border/60">
          <div className="container max-w-6xl mx-auto px-4">
            
            {/* Catalog Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Katalog Pilihan
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Layanan Koding & Produk Digital
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Pilih paket yang sesuai dengan kebutuhan Anda. Transparan, terjangkau, dan bergaransi.
              </p>
            </div>

            {/* Filter Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === "all"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Semua Layanan</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-background/20 font-mono">
                  {PRODUCTS.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("coding")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === "coding"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Jasa Koding & Joki Tugas</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-background/20 font-mono">
                  {codingCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("ai")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === "ai"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Aktivasi Gemini AI</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-background/20 font-mono">
                  {aiCount}
                </span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={(item) => setSelectedProduct(item)}
                />
              ))}
            </div>

            {/* Custom Request Banner */}
            <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-muted/80 to-card border border-border flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  Punya Soal Tugas Khusus atau Request Fitur Unik?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Jangan ragu untuk mengirimkan soal atau modul Anda untuk dinegosiasikan harga dan waktu pengerjaannya.
                </p>
              </div>

              <a
                href="https://wa.me/6285773301211?text=Halo%20Andreas,%20saya%20punya%20request%20tugas%20atau%20proyek%20custom%20yang%20mau%20didiskusikan."
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-foreground text-background font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity shrink-0"
              >
                Diskusi Custom via WA
              </a>
            </div>

          </div>
        </section>

        <HowToOrder />
        <TrustGuarantees />
        <FAQ />
      </main>

      <Footer />

      {/* Order Modal Dialog */}
      <OrderModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;
