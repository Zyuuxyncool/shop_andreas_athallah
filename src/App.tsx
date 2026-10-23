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
    <div className="min-h-screen bg-background text-foreground font-sans relative selection:bg-primary/20 selection:text-primary">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main className="flex flex-col relative overflow-hidden">
        <Hero />

        {/* Product Catalog Section */}
        <section id="katalog" className="py-20 sm:py-24 border-t border-border/60">
          <div className="container max-w-6xl mx-auto px-4">
            
            {/* Catalog Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20">
                <span>Katalog Pilihan</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Layanan Koding & Produk Digital
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Pilih paket yang sesuai dengan kebutuhan Anda. Transparan, terjangkau, dan bergaransi.
              </p>
            </div>

            {/* Filter Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === "all"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
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
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === "coding"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
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
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === "ai"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
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
            <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  Punya Soal Tugas Khusus atau Request Fitur Tertentu?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Kirimkan file soal atau instruksi Anda untuk dinegosiasikan estimasi harga dan waktu pengerjaannya.
                </p>
              </div>

              <a
                href="https://wa.me/6285773301211?text=Halo%20Andreas,%20saya%20punya%20request%20tugas%20atau%20proyek%20custom%20yang%20mau%20didiskusikan."
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-sm shrink-0"
              >
                Konsultasi Custom via WA
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
