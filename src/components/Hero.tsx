import { Sparkles, ShieldCheck, Zap, MessageCircle, Star, Award, CheckCircle2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function Hero() {
  return (
    <section className="pt-28 pb-6 sm:pt-36 sm:pb-8">
      <div className="container max-w-6xl mx-auto px-4">
        
        {/* Shopee-style Seller Profile & Promotion Card */}
        <div className="p-5 sm:p-7 rounded-3xl bg-card border border-border shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-border">
            
            {/* Store Profile Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-white font-extrabold flex items-center justify-center text-xl sm:text-2xl shadow-md">
                  AA
                </div>
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
                  Star+
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-2xl font-extrabold text-foreground tracking-tight">
                    Andreas Digital Store
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Online</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Penyedia Resmi Produk Digital, Akses Akun AI, & Jasa Pengerjaan Koding Terpercaya
                </p>
                <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground font-mono">
                  <span>📍 Sidoarjo, Jawa Timur</span>
                  <span>•</span>
                  <span>Bergabung: 2024</span>
                </div>
              </div>
            </div>

            {/* Shopee Store Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full lg:w-auto bg-muted/40 p-3.5 sm:p-4 rounded-2xl border border-border/80">
              <div className="text-center sm:text-left">
                <span className="text-[11px] text-muted-foreground block flex items-center justify-center sm:justify-start gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Penilaian</span>
                </span>
                <span className="text-sm sm:text-base font-bold text-foreground font-mono">
                  4.9 <span className="text-xs text-muted-foreground font-normal">(280+)</span>
                </span>
              </div>

              <div className="text-center sm:text-left border-x border-border/60 px-3 sm:px-4">
                <span className="text-[11px] text-muted-foreground block flex items-center justify-center sm:justify-start gap-1">
                  <MessageCircle className="w-3.5 h-3.5 text-primary" />
                  <span>Respon Chat</span>
                </span>
                <span className="text-sm sm:text-base font-bold text-foreground font-mono">
                  100% <span className="text-xs text-muted-foreground font-normal">(Menit)</span>
                </span>
              </div>

              <div className="text-center sm:text-left">
                <span className="text-[11px] text-muted-foreground block flex items-center justify-center sm:justify-start gap-1">
                  <Award className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Garansi</span>
                </span>
                <span className="text-sm sm:text-base font-bold text-foreground font-mono">
                  100% Aman
                </span>
              </div>
            </div>

          </div>

          {/* Shopee Store Highlights Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-muted/30 border border-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-foreground block">Proses Cepat & Instan</span>
                <span className="text-muted-foreground">Link produk digital dikirim 1-5 menit</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-muted/30 border border-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-foreground block">100% Bebas Plagiasi</span>
                <span className="text-muted-foreground">Kodingan tugas original & ada penjelasan</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-muted/30 border border-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-foreground block">Garansi Revisi Tuntas</span>
                <span className="text-muted-foreground">Didampingi sampai tugas berhasil dievaluasi</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
