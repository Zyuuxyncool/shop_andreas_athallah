import { MessageSquare, CheckCircle2, Laptop } from "lucide-react";

export function HowToOrder() {
  const steps = [
    {
      step: "01",
      title: "Pilih Produk atau Layanan",
      description: "Tentukan layanan yang Anda butuhkan (Joki tugas koding, pembuatan sistem web, aplikasi Android, atau link aktivasi Gemini).",
      icon: <Laptop className="w-5 h-5 text-primary" />,
    },
    {
      step: "02",
      title: "Kirim Detail ke WhatsApp",
      description: "Klik tombol order dan kirimkan file soal, deadline, serta instruksi tugas. Untuk Gemini, konfirmasi pilihan durasi paket.",
      icon: <MessageSquare className="w-5 h-5 text-emerald-500" />,
    },
    {
      step: "03",
      title: "Pengerjaan Cepat & Penyerahan",
      description: "Tugas dikerjakan dengan kode bersih dan penjelasan lengkap. Link aktivasi Gemini dikirimkan instan beserta panduannya.",
      icon: <CheckCircle2 className="w-5 h-5 text-teal-400" />,
    },
  ];

  return (
    <section id="cara-order" className="py-16 sm:py-20 border-t border-border/60">
      <div className="container max-w-5xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Alur Pemesanan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            3 Langkah Mudah Memesan
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tanpa registrasi yang berbelit-belit. Proses cepat dan langsung terhubung dengan pengembang.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative p-6 rounded-3xl bg-card border border-border shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="font-mono text-2xl font-black text-muted-foreground/30">
                  {item.step}
                </span>
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
