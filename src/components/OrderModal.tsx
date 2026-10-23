import { useState } from "react";
import { X, Sparkles, Code2, AlertCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { ProductItem } from "../data/products";

interface OrderModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export function OrderModal({ product, onClose }: OrderModalProps) {
  if (!product) return null;

  const [customerName, setCustomerName] = useState("");
  const [platform, setPlatform] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");

  const isCoding = product.category === "coding";

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    let messageText = `*Halo Andreas, saya ingin order di Andreas Shop:*\n\n`;
    messageText += `*Produk/Layanan:* ${product.name}\n`;
    messageText += `*Estimasi Harga:* ${product.priceTag}\n`;
    messageText += `*Nama Pemesan:* ${customerName || "-"}\n`;

    if (isCoding) {
      if (platform) messageText += `*Bahasa / Framework:* ${platform}\n`;
      if (deadline) messageText += `*Target Deadline:* ${deadline}\n`;
    }

    if (notes) {
      messageText += `*Detail Tugas / Catatan Khusus:*\n${notes}\n`;
    }

    messageText += `\nMohon konfirmasi ketersediaan & langkah selanjutnya. Terima kasih!`;

    const encoded = encodeURIComponent(messageText);
    const waUrl = `https://wa.me/6285773301211?text=${encoded}`;
    window.open(waUrl, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
                {isCoding ? <Code2 className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {isCoding ? "Formulir Konsultasi Koding" : "Formulir Pemesanan Link Gemini"}
              </span>
            </div>
            <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
            <p className="text-xs text-muted-foreground font-mono">{product.priceTag}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Tutup dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSendToWhatsApp} className="overflow-y-auto py-5 space-y-5 flex-1 pr-1">
          {/* Customer Name */}
          <div className="space-y-2">
            <label htmlFor="customerName" className="text-sm font-medium text-foreground block">
              Nama Lengkap <span className="text-primary">*</span>
            </label>
            <input
              id="customerName"
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Contoh: Budi Pratama"
              className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-foreground text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px] transition-colors"
            />
          </div>

          {/* Conditional inputs for Coding Services */}
          {isCoding ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="platform" className="text-sm font-medium text-foreground block">
                    Bahasa / Framework
                  </label>
                  <input
                    id="platform"
                    type="text"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    placeholder="Contoh: Laravel, PHP, MySQL"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-foreground text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="deadline" className="text-sm font-medium text-foreground block">
                    Target Deadline
                  </label>
                  <input
                    id="deadline"
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="Contoh: Besok jam 18:00"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-foreground text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium text-foreground block">
                  Deskripsi Soal / Kebutuhan Tugas
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ceritakan instruksi tugas atau fitur yang harus dibuat..."
                  className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border text-foreground text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors resize-none"
                />
              </div>
            </>
          ) : (
            /* Inputs for Gemini Activation */
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium text-foreground block">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                id="notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Mau tanya pilihan durasi paket atau cara aktivasi akun..."
                className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border text-foreground text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors resize-none"
              />
            </div>
          )}

          {/* Privacy & Fast Delivery Notice */}
          <div className="p-3.5 rounded-xl bg-muted/60 border border-border flex items-start gap-3 text-xs text-muted-foreground">
            <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Formulir ini otomatis merangkai format pesanan rapi ke WhatsApp Andreas Athallah (0857-7330-1211).
            </p>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-sm min-h-[44px]"
            >
              <SiWhatsapp className="w-4 h-4" />
              <span>Lanjutkan ke WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
