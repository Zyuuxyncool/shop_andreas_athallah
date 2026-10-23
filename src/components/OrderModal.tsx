import { useState, useEffect } from "react";
import { X, Star, Minus, Plus, Sparkles, Code2, AlertCircle, Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { ProductItem } from "../data/products";

interface OrderModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export function OrderModal({ product, onClose }: OrderModalProps) {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");

  // Reset when product changes
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(null);
    }
    setQuantity(1);
    setNotes("");
  }, [product]);

  const unitPrice = selectedVariant ? selectedVariant.price : product.priceNumeric;
  const totalPrice = unitPrice * quantity;

  const formattedTotal = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const isCoding = product.category === "coding";

  const handleCheckoutToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    let messageText = `*Halo Andreas, saya ingin memesan dari Andreas Shop:*\n\n`;
    messageText += `*Detail Pesanan:*\n`;
    messageText += `• *Produk:* ${product.name}\n`;
    if (selectedVariant) {
      messageText += `• *Pilihan Paket:* ${selectedVariant.name}\n`;
    }
    messageText += `• *Jumlah:* ${quantity}x\n`;
    messageText += `• *Total Estimasi:* ${formattedTotal}\n\n`;

    messageText += `*Data Pemesan:*\n`;
    messageText += `• *Nama:* ${customerName || "-"}\n`;

    if (isCoding && deadline) {
      messageText += `• *Target Deadline:* ${deadline}\n`;
    }

    if (notes) {
      messageText += `• *Catatan / Request:* ${notes}\n`;
    }

    messageText += `\nMohon konfirmasi ketersediaan & metode pembayaran (QRIS/Transfer). Terima kasih!`;

    const encoded = encodeURIComponent(messageText);
    const waUrl = `https://wa.me/6285773301211?text=${encoded}`;
    window.open(waUrl, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Shopee-style Modal Dialog */}
      <div className="relative w-full max-w-xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Shopee Product Summary Header */}
        <div className="p-4 sm:p-6 border-b border-border flex items-start gap-3 sm:gap-4 bg-muted/20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-card border border-border flex items-center justify-center text-primary shrink-0">
            {product.category === "digital" ? (
              <Sparkles className="w-8 h-8" />
            ) : (
              <Code2 className="w-8 h-8" />
            )}
          </div>

          <div className="flex-1 min-w-0 pr-6">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider mb-1">
              Star+
            </span>
            <h2 className="text-sm sm:text-base font-bold text-foreground line-clamp-2 leading-snug">
              {product.name}
            </h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-lg sm:text-xl font-black text-primary font-mono">
                {selectedVariant ? selectedVariant.priceLabel : product.priceTag}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through font-mono">
                  {product.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono mt-0.5">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span>•</span>
              <span>{product.soldCount} Terjual</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Tutup dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Checkout Form */}
        <form onSubmit={handleCheckoutToWhatsApp} className="overflow-y-auto p-4 sm:p-6 space-y-5 flex-1 pr-2 sm:pr-4">
          
          {/* Variant Selector (if available) */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Pilih Varian / Paket:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.name === v.name;
                  return (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center gap-2 ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/20 shadow-xs"
                          : "border-border bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{v.name}</span>
                      <span className="font-mono text-xs opacity-80">({v.priceLabel})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="flex items-center justify-between py-2 border-y border-border/80">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground block">
                Jumlah Kuantitas
              </span>
              <span className="text-[11px] text-muted-foreground">Stok selalu siap</span>
            </div>

            <div className="flex items-center border border-border rounded-xl overflow-hidden bg-card">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Kurangi kuantitas"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 sm:px-4 text-xs sm:text-sm font-bold font-mono text-foreground">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Tambah kuantitas"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Buyer Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="customerName" className="text-sm font-medium text-foreground block">
                Nama Lengkap Anda <span className="text-primary">*</span>
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

            {isCoding && (
              <div className="space-y-2">
                <label htmlFor="deadline" className="text-sm font-medium text-foreground block">
                  Target Deadline Tugas
                </label>
                <input
                  id="deadline"
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder="Contoh: Besok malam jam 21:00 / 2 Hari lagi"
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-foreground text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px] transition-colors"
                />
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium text-foreground block">
                Catatan Pesanan / Request Khusus (Opsional)
              </label>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tuliskan catatan khusus atau pertanyaan Anda seputar pesanan..."
                className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-foreground text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors resize-none"
              />
            </div>
          </div>

          {/* Notice info */}
          <div className="p-3.5 rounded-xl bg-muted/60 border border-border flex items-start gap-2.5 text-xs text-muted-foreground">
            <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Pesanan akan otomatis dirangkai menjadi invoice WhatsApp resmi ke toko Andreas Athallah (0857-7330-1211). Pembayaran dapat dilakukan via QRIS atau transfer.
            </p>
          </div>

          {/* Shopee Checkout Footer Bar */}
          <div className="pt-2 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left w-full sm:w-auto">
              <span className="text-xs text-muted-foreground block">Total Pembayaran:</span>
              <span className="text-xl sm:text-2xl font-black text-primary font-mono">
                {formattedTotal}
              </span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-sm min-h-[44px]"
            >
              <SiWhatsapp className="w-4 h-4" />
              <span>Checkout via WhatsApp</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
