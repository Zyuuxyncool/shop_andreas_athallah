import { ShieldCheck, BookOpen, Clock, QrCode } from "lucide-react";

export function TrustGuarantees() {
  const guarantees = [
    {
      title: "100% Bebas Plagiasi & Orisinal",
      description: "Setiap kode tugas ditulis otentik sesuai gaya instruksi sekolah atau kampus Anda, bukan hasil copy-paste massal.",
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    },
    {
      title: "Kode Diberi Komentar & Penjelasan",
      description: "Tidak sekadar selesai, kodingan diberi catatan logika per fungsi utama sehingga Anda paham saat ditanya dosen atau guru penguji.",
      icon: <BookOpen className="w-5 h-5 text-primary" />,
    },
    {
      title: "Garansi Revisi Sampai Nilai Keluar",
      description: "Jika ada catatan revisi dari guru/dosen setelah evaluasi atau presentasi, saya bantu perbaiki sampai tuntas.",
      icon: <Clock className="w-5 h-5 text-primary" />,
    },
    {
      title: "Pembayaran Aman & Fleksibel",
      description: "Mendukung pembayaran instan via QRIS (Semua E-Wallet & Mobile Banking), DANA, GoPay, OVO, ShopeePay, serta transfer bank.",
      icon: <QrCode className="w-5 h-5 text-primary" />,
    },
  ];

  return (
    <section id="keunggulan" className="py-20 sm:py-24 border-t border-border/60">
      <div className="container max-w-5xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20">
            <span>Garansi & Keunggulan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Mengapa Memilih Andreas Shop?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Komitmen kualitas koding profesional dari siswa berprestasi RPL SMKN 2 Buduran dan developer aktif.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {guarantees.map((item) => (
            <div
              key={item.title}
              className="p-6 sm:p-7 rounded-3xl bg-card border border-border shadow-xs flex items-start gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-foreground">{item.title}</h3>
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
