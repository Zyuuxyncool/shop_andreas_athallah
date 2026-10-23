import { ArrowDown, Code2, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function Hero() {
  return (
    <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[500px] h-[350px] bg-primary/10 rounded-full blur-[100px] -top-20 opacity-60" />
        <div className="w-[400px] h-[300px] bg-emerald-500/10 rounded-full blur-[90px] top-40 right-10 opacity-50" />
      </div>

      <div className="container max-w-5xl mx-auto px-4 text-center space-y-6">
        
        {/* Live Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Toko Aktif • Melayani Jasa Koding & Link Gemini Instan</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15] max-w-4xl mx-auto">
          Jasa Koding Terpercaya & <br />
          <span className="text-primary bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
            Link Aktivasi Google Gemini
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Bantu selesaikan tugas koding SMK RPL & Kuliah dengan kode rapi, bebas plagiasi, dan ada penjelasan alur logika program. Sedia juga link aktivasi resmi Google Gemini Advanced tanpa perlu berbagi password email.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <a
            href="#katalog"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm hover:shadow"
          >
            <span>Lihat Katalog & Harga</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="https://wa.me/6285773301211?text=Halo%20Andreas,%20saya%20tertarik%20untuk%20konsultasi%20tugas%20koding%20atau%20pembelian%20link%20Gemini."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-border bg-card hover:bg-accent text-foreground transition-all shadow-xs"
          >
            <SiWhatsapp className="w-4 h-4 text-emerald-500" />
            <span>Konsultasi Cepat via WhatsApp</span>
          </a>
        </div>

        {/* 4 Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
              <Zap className="w-4 h-4" />
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-foreground">Pengerjaan Kilat</h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-normal">
              Bisa pengerjaan ekspres same-day untuk tugas dengan deadline mendesak.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
              <Code2 className="w-4 h-4" />
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-foreground">Ada Penjelasan Kode</h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-normal">
              Diberi komentar di kodingan agar siap saat ditanya guru atau dosen.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-foreground">Link Gemini Resmi</h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-normal">
              Aktivasi instan via tautan langsung tanpa perlu memberikan password email.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-foreground">Garansi & Privasi</h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-normal">
              Garansi revisi jika ada kekurangan serta kerahasiaan tugas 100% aman.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
