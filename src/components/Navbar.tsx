import { useState, useEffect } from "react";
import { Search, X, ArrowLeft, Moon, Sun, ShieldCheck } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

interface NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Navbar({ theme, onToggleTheme, searchQuery, onSearchChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Notification Bar */}
      <div className="bg-primary text-primary-foreground text-[11px] py-1 px-4 text-center font-medium flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Toko Digital Resmi Andreas Athallah</span>
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">Produk Digital Legal & Pengerjaan Koding Terpercaya</span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline">WhatsApp: 0857-7330-1211</span>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-card/95 backdrop-blur-md border-b border-border shadow-md py-2 sm:py-2.5"
            : "bg-card border-b border-border py-2.5 sm:py-3.5"
        }`}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Top Row: Brand & Actions on Mobile, Full Row on Desktop */}
          <div className="flex items-center justify-between gap-3">
            
            {/* Brand Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1 px-1"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-xs font-bold">
                AA
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-extrabold text-base tracking-tight leading-none">
                  Andreas<span className="text-primary font-black">Shop</span>
                </span>
                <span className="text-[10px] text-muted-foreground font-mono leading-none mt-1">
                  shop.andreas-athallah.web.id
                </span>
              </div>
            </a>

            {/* Desktop Search Bar (Hidden on Mobile) */}
            <div className="hidden sm:block flex-1 max-w-lg mx-4">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Cari produk digital, aktivasi AI, template web, joki tugas..."
                  className="w-full pl-9 pr-9 py-2 rounded-xl bg-muted/60 border border-border text-foreground text-xs sm:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all shadow-inner"
                />
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="absolute right-3 p-1 rounded-full text-muted-foreground hover:text-foreground"
                    aria-label="Hapus pencarian"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Back to Portfolio (Desktop) */}
              <a
                href="https://andreas-athallah.web.id"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                title="Kembali ke Portofolio Pengembang"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Portofolio</span>
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

              {/* WhatsApp Quick Button */}
              <a
                href="https://wa.me/6285773301211?text=Halo%20Andreas,%20saya%20tertarik%20untuk%20order%20di%20Andreas%20Shop."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
              >
                <SiWhatsapp className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Hubungi WA</span>
              </a>
            </div>

          </div>

          {/* Mobile Search Bar Row (Full Width on Mobile screens < 640px) */}
          <div className="sm:hidden pt-2.5 pb-0.5">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari produk digital atau joki tugas..."
                className="w-full pl-9 pr-9 py-2 rounded-xl bg-muted/60 border border-border text-foreground text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 p-1 rounded-full text-muted-foreground hover:text-foreground"
                  aria-label="Hapus pencarian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
