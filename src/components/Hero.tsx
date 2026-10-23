import { ArrowDown, Code2, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function Hero() {
  return (
    <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden bg-grid-pattern">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[500px] h-[300px] bg-primary/10 rounded-full blur-[100px] -top-16 opacity-60" />
      </div>

      <div className="container max-w-5xl mx-auto px-4 text-center space-y-6">
        
        {/* Live Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Toko Digital Resmi Andreas Athallah</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12] max-w-3xl mx-auto">
          Jasa Koding Terpercaya & <br />
          <span className="text-primary">
            Link Aktivasi Gemini
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Bantu selesaikan tugas koding praktikum dan tugas akhir dengan kode bersih, bebas plagiasi, dan ada penjelasan logika program. Tersedia juga tautan resmi aktivasi Google Gemini Advanced tanpa perlu berbagi password.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <a
            href="#katalog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow min-h-[44px]"
          >
            <span>Lihat Paket & Harga</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="https://wa.me/6285773301211?text=Halo%20Andreas,%20saya%20mau%20konsultasi%20tugas%20koding%20atau%20pembelian%20link%20Gemini."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-border bg-card hover:bg-accent text-foreground transition-all duration-200 shadow-xs hover:border-slate-300 dark:hover:border-slate-600 min-h-[44px]"
          >
            <SiWhatsapp className="w-4 h-4 text-emerald-500" />
            <span>Konsultasi via WhatsApp</span>
          </a>
        </div>

        {/* 4 Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
              <Zap className="w-4 h-4" />
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-foreground">Pengerjaan Cepat</h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-normal">
              Bisa pengerjaan ekspres same-day untuk tugas dengan deadline mendesak.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
              <Code2 className="w-4 h-4" />
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-foreground">Ada Penjelasan Kode</h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-normal">
              Dilengkapi komentar di kodingan agar siap saat ditanya guru atau dosen.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-foreground">Link Gemini Resmi</h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-normal">
              Aktivasi instan via tautan langsung tanpa perlu memberikan password email.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-foreground">Garansi Revisi</h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-normal">
              Garansi revisi jika ada kekurangan serta kerahasiaan tugas 100% aman.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
