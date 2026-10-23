import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Bagaimana cara kerja link aktivasi Google Gemini Advanced?",
      a: "Setelah melakukan pemesanan, Anda akan menerima link aktivasi resmi. Anda cukup membuka link tersebut saat login di akun Google pribadi Anda, dan benefit Google Gemini Advanced / Pro akan langsung aktif di akun Anda. Anda sama sekali TIDAK PERLU memberikan password email atau data sensitif apapun.",
    },
    {
      q: "Apakah tugas koding yang saya pesan dijamin bebas plagiasi?",
      a: "Ya, 100%. Setiap tugas ditulis secara manual sesuai struktur instruksi yang Anda berikan. Gaya penamaan variabel dan struktur logic disesuaikan agar natural dan tidak terdeteksi kesamaan dengan kode teman sekelas atau internet.",
    },
    {
      q: "Bagaimana jika saya bingung cara menjalankan kodingannya di laptop saya?",
      a: "Tenang saja. Setiap penyerahan tugas dilengkapi dengan panduan langkah demi langkah (README / video demonstrasi cara menjalankan di localhost XAMPP, Herd, atau Android Studio). Jika Anda masih mengalami kendala, saya siap memandu sampai kodingan berjalan normal.",
    },
    {
      q: "Berapa lama estimasi waktu pengerjaan joki tugas?",
      a: "Tergantung tingkat kesulitan tugas: Tugas dasar (HTML/CSS/JS/PHP dasar) rata-rata selesai dalam 2–8 jam (bisa same-day). Untuk sistem informasi web lengkap (Laravel & MySQL) membutuhkan 1–3 hari. Anda bisa menyebutkan deadline saat mengirimkan pesan WhatsApp.",
    },
    {
      q: "Metode pembayaran apa saja yang didukung?",
      a: "Pembayaran sangat mudah dan instan. Kami mendukung QRIS (bisa scan menggunakan DANA, GoPay, OVO, ShopeePay, LinkAja, BCA Mobile, Livin Mandiri, BRImo, dan seluruh perbankan di Indonesia).",
    },
    {
      q: "Apakah ada garansi revisi jika ada kekurangan?",
      a: "Ya, tersedia garansi revisi penuh jika ada bagian tugas yang belum sesuai dengan panduan atau soal awal yang Anda kirimkan.",
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 border-t border-border/60">
      <div className="container max-w-3xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tanya Jawab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Semua hal yang perlu Anda ketahui sebelum memesan jasa atau produk di Andreas Shop.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3">
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
