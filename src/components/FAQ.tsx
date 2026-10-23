import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Bagaimana cara kerja link aktivasi Google Gemini Advanced?",
      a: "Setelah melakukan pemesanan, Anda akan menerima link aktivasi resmi. Anda cukup membuka tautan tersebut saat masuk di akun Google pribadi Anda, dan fitur Google Gemini Advanced akan langsung aktif. Anda sama sekali tidak perlu memberikan password email atau data pribadi sensitif.",
    },
    {
      q: "Apakah tugas koding yang saya pesan dijamin bebas plagiasi?",
      a: "Ya, 100%. Setiap tugas dikerjakan secara manual sesuai spesifikasi instruksi yang Anda berikan. Gaya penulisan variabel dan alur kode dibuat natural agar tidak terdeteksi kemiripan dengan kode teman sekelas.",
    },
    {
      q: "Bagaimana jika saya bingung cara menjalankan kodingannya di laptop saya?",
      a: "Setiap penyerahan tugas dilengkapi dengan panduan langkah demi langkah (file README atau video demonstrasi cara menjalankan di localhost XAMPP, Herd, dsb). Jika masih ada kendala, saya siap memandu hingga kodingan berjalan normal.",
    },
    {
      q: "Berapa lama estimasi waktu pengerjaan joki tugas?",
      a: "Untuk tugas dasar (HTML, CSS, JS, PHP dasar, atau algoritma) rata-rata selesai dalam 2–8 jam (bisa same-day). Untuk sistem informasi web lengkap (Laravel & MySQL) memerlukan waktu 1–3 hari. Anda bisa mendiskusikan target deadline saat mengirim pesan WhatsApp.",
    },
    {
      q: "Metode pembayaran apa saja yang didukung?",
      a: "Pembayaran sangat praktis melalui QRIS (bisa scan menggunakan DANA, GoPay, OVO, ShopeePay, BCA Mobile, Livin Mandiri, BRImo, dan seluruh perbankan di Indonesia).",
    },
    {
      q: "Apakah ada garansi revisi jika ada kekurangan?",
      a: "Ya, tersedia garansi revisi penuh jika ada bagian tugas yang belum sesuai dengan panduan atau soal awal yang Anda berikan.",
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-24 border-t border-border/60">
      <div className="container max-w-3xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20">
            <span>Tanya Jawab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Informasi penting seputar layanan pengerjaan koding dan link aktivasi Gemini.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-card border border-border overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground hover:bg-muted/30 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
