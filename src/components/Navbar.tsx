import { useState, useEffect } from "react";
import { ArrowLeft, Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
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
        <div className="container mx-auto px-4 max-w-5xl">
          <div
            className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-2xl transition-all duration-300 ${
              isScrolled
                ? "bg-card/85 backdrop-blur-md border border-border shadow-md"
                : "bg-transparent border border-transparent"
            }`}
          >
            {/* Brand Logo - Identical to Portfolio Style */}
            <a
              href="https://andreas-athallah.web.id"
              className="flex items-center gap-2.5 font-bold text-base sm:text-lg tracking-tight group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1 px-1.5"
              title="Kembali ke Portofolio Utama"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-xs font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                AA
              </div>
              <span className="text-foreground font-semibold">
                andreas-athallah<span className="text-primary font-bold">.shop</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-muted/40 p-1.5 rounded-full border border-border/60">
              <a
                href="#katalog"
                className="px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-background/80 transition-all duration-200"
              >
                Katalog
              </a>
              <a
                href="#cara-order"
                className="px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-background/80 transition-all duration-200"
              >
                Alur Order
              </a>
              <a
                href="#keunggulan"
                className="px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-background/80 transition-all duration-200"
              >
                Keunggulan
              </a>
              <a
                href="#faq"
                className="px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-background/80 transition-all duration-200"
              >
                FAQ
              </a>
            </nav>

            {/* Right Actions */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Back to Portfolio Link */}
              <a
                href="https://andreas-athallah.web.id"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent border border-border/60 transition-colors"
                title="Buka Portofolio Pengembang"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Portofolio</span>
              </a>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={onToggleTheme}
                className="p-2 rounded-full border border-border/60 text-foreground hover:bg-accent transition-colors"
                aria-label="Ganti mode tema"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>

              {/* WhatsApp Action Button */}
              <a
                href="https://wa.me/6285773301211?text=Halo%20Andreas,%20saya%20mau%20order%20di%20Andreas%20Shop."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow"
              >
                <SiWhatsapp className="w-3.5 h-3.5" />
                <span>Hubungi WA</span>
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={onToggleTheme}
                className="p-2 rounded-full border border-border text-foreground hover:bg-accent"
                aria-label="Ganti tema"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2.5 rounded-full border border-border bg-card/80 text-foreground hover:bg-accent"
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
          <div className="absolute top-20 left-4 right-4 bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
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

            <nav className="flex flex-col gap-1.5">
              <a
                href="#katalog"
                onClick={() => setIsMobileOpen(false)}
                className="p-3 rounded-xl text-sm font-medium hover:bg-accent flex items-center justify-between"
              >
                <span>Katalog Produk & Jasa</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </a>
              <a
                href="#cara-order"
                onClick={() => setIsMobileOpen(false)}
                className="p-3 rounded-xl text-sm font-medium hover:bg-accent flex items-center justify-between"
              >
                <span>Alur Pemesanan</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </a>
              <a
                href="#keunggulan"
                onClick={() => setIsMobileOpen(false)}
                className="p-3 rounded-xl text-sm font-medium hover:bg-accent flex items-center justify-between"
              >
                <span>Garansi & Keunggulan</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </a>
              <a
                href="#faq"
                onClick={() => setIsMobileOpen(false)}
                className="p-3 rounded-xl text-sm font-medium hover:bg-accent flex items-center justify-between"
              >
                <span>FAQ</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </a>
            </nav>

            <div className="pt-2 border-t border-border space-y-2">
              <a
                href="https://wa.me/6285773301211?text=Halo%20Andreas,%20saya%20mau%20order%20jasa%20ngoding%20atau%20link%20aktivasi%20Gemini."
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
              >
                <SiWhatsapp className="w-4 h-4" />
                <span>Hubungi via WhatsApp</span>
              </a>

              <a
                href="https://andreas-athallah.web.id"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Portofolio Utama</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
