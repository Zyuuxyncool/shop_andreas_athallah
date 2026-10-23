import { ShieldCheck, BookOpen, Clock, QrCode } from "lucide-react";

export function TrustGuarantees() {
  const guarantees = [
    {
      title: "100% Bebas Plagiasi & Amanah",
      description: "Setiap kode tugas ditulis secara otentik sesuai gaya instruksi sekolah atau kampus Anda, bukan hasil copy-paste massal.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: "Kode Diberi Komentar & Penjelasan",
      description: "Tidak sekadar selesai, kodingan diberi catatan logika per bagian sehingga Anda bisa menjawab saat ditanya dosen atau guru penguji.",
      icon: <BookOpen className="w-6 h-6 text-primary" />,
    },
    {
      title: "Garansi Revisi Sampai Nilai Keluar",
      description: "Jika ada catatan revisi dari guru/dosen setelah presentasi atau evaluasi, saya bantu perbaiki sampai tuntas.",
      icon: <Clock className="w-6 h-6 text-amber-500" />,
    },
    {
      title: "Pembayaran Aman & Fleksibel",
      description: "Menerima pembayaran praktis via QRIS (Semua E-Wallet & Mobile Banking), DANA, GoPay, OVO, ShopeePay, serta transfer bank.",
      icon: <QrCode className="w-6 h-6 text-blue-500" />,
    },
  ];

  return (
    <section id="keunggulan" className="py-16 sm:py-20 border-t border-border/60 bg-muted/20">
      <div className="container max-w-5xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Garansi & Keunggulan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Mengapa Memilih Andreas Shop?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Komitmen kualitas koding profesional dari siswa berprestasi RPL SMKN 2 Buduran dan developer aktif.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {guarantees.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-3xl bg-card border border-border shadow-xs flex items-start gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-muted/80 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm sm:text-base font-bold text-foreground">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
