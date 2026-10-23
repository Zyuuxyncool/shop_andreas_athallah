import { useState, useEffect } from "react";
import { ShoppingBag, ArrowLeft, Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

interface NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "py-2.5" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div
            className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-2xl transition-all duration-300 ${
              isScrolled
                ? "bg-card/90 backdrop-blur-md border border-border shadow-md"
                : "bg-transparent border border-transparent"
            }`}
          >
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex items-center gap-2.5 font-bold text-base sm:text-lg tracking-tight group"
              >
                <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-xs">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-bold leading-none">Andreas Shop</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                      Official
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono block mt-0.5">
                    shop.andreas-athallah.web.id
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-muted/50 p-1.5 rounded-full border border-border/70">
              <a
                href="#katalog"
                className="px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-full hover:bg-background/80 transition-colors"
              >
                Katalog Produk & Jasa
              </a>
              <a
                href="#cara-order"
                className="px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-full hover:bg-background/80 transition-colors"
              >
                Alur Pemesanan
              </a>
              <a
                href="#keunggulan"
                className="px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-full hover:bg-background/80 transition-colors"
              >
                Garansi & Keunggulan
              </a>
              <a
                href="#faq"
                className="px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-full hover:bg-background/80 transition-colors"
              >
                FAQ
              </a>
            </nav>

            {/* Right Actions */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Back to Portfolio Link */}
              <a
                href="https://andreas-athallah.web.id"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-accent border border-border transition-colors"
                title="Kembali ke Portofolio Developer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Portofolio Utama</span>
              </a>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={onToggleTheme}
                className="p-2 rounded-xl border border-border text-foreground hover:bg-accent transition-colors"
                aria-label="Ganti mode tema"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>

              {/* WhatsApp Quick CTA */}
              <a
                href="https://wa.me/6285773301211?text=Halo%20Andreas,%20saya%20mau%20konsultasi%20order%20di%20Andreas%20Digital%20Shop."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-xs"
              >
                <SiWhatsapp className="w-3.5 h-3.5" />
                <span>Chat Admin</span>
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={onToggleTheme}
                className="p-2 rounded-xl border border-border text-foreground hover:bg-accent"
                aria-label="Ganti tema"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 rounded-xl border border-border text-foreground hover:bg-accent"
                aria-label={isMobileOpen ? "Tutup menu" : "Buka menu"}
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute top-20 left-4 right-4 bg-card border border-border rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Menu Toko Digital
              </span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              <a
                href="#katalog"
                onClick={() => setIsMobileOpen(false)}
                className="p-2.5 rounded-lg text-sm font-medium hover:bg-accent"
              >
                Katalog Produk & Jasa
              </a>
              <a
                href="#cara-order"
                onClick={() => setIsMobileOpen(false)}
                className="p-2.5 rounded-lg text-sm font-medium hover:bg-accent"
              >
                Alur Pemesanan
              </a>
              <a
                href="#keunggulan"
                onClick={() => setIsMobileOpen(false)}
                className="p-2.5 rounded-lg text-sm font-medium hover:bg-accent"
              >
                Garansi & Keunggulan
              </a>
              <a
                href="#faq"
                onClick={() => setIsMobileOpen(false)}
                className="p-2.5 rounded-lg text-sm font-medium hover:bg-accent"
              >
                FAQ
              </a>
            </nav>

            <div className="pt-2 border-t border-border space-y-2">
              <a
                href="https://wa.me/6285773301211?text=Halo%20Andreas,%20saya%20mau%20order%20jasa%20ngoding%20atau%20link%20aktivasi%20Gemini."
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 text-white font-semibold text-sm"
              >
                <SiWhatsapp className="w-4 h-4" />
                <span>Hubungi WhatsApp Langsung</span>
              </a>

              <a
                href="https://andreas-athallah.web.id"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Portofolio Pengembang</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
