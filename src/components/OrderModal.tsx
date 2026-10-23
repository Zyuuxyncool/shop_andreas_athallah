import { useState, useEffect } from "react";
import {
  X,
  Minus,
  Plus,
  Check,
  CreditCard,
  QrCode,
  Building2,
  Copy,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
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
  const [paymentMethod, setPaymentMethod] = useState<"midtrans" | "whatsapp">("midtrans");
  const [midtransSubMethod, setMidtransSubMethod] = useState<"qris" | "bca_va" | "mandiri_va">("qris");
  
  // Customer Details
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Payment view state: 'form' | 'midtrans_screen' | 'success'
  const [viewStep, setViewStep] = useState<"form" | "midtrans_screen" | "success">("form");
  const [invoiceId, setInvoiceId] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(null);
    }
    setQuantity(1);
    setPaymentMethod("midtrans");
    setViewStep("form");
    setNotes("");
    setInvoiceId(`INV-${Date.now().toString().slice(-6)}`);
  }, [product]);

  const unitPrice = selectedVariant ? selectedVariant.price : product.priceNumeric;
  const totalPrice = unitPrice * quantity;

  const formattedTotal = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceedOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "midtrans") {
      // Transition to Midtrans Snap Payment Screen
      setViewStep("midtrans_screen");
    } else {
      // WhatsApp Manual Order
      let messageText = `*Halo Andreas, saya ingin order:*\n\n`;
      messageText += `*Produk:* ${product.name}\n`;
      if (selectedVariant) {
        messageText += `*Paket:* ${selectedVariant.name}\n`;
      }
      messageText += `*Jumlah:* ${quantity}x\n`;
      messageText += `*Total Harga:* ${formattedTotal}\n`;
      messageText += `*Metode:* Transfer Manual / WhatsApp\n`;
      messageText += `*Nama Pemesan:* ${customerName || "-"}\n`;
      if (customerPhone) messageText += `*No. Kontak:* ${customerPhone}\n`;
      if (notes) messageText += `*Catatan:* ${notes}\n`;
      messageText += `\nMohon instruksi pembayaran & pengiriman. Terima kasih!`;

      const encoded = encodeURIComponent(messageText);
      window.open(`https://wa.me/6285773301211?text=${encoded}`, "_blank");
      onClose();
    }
  };

  const handleSendPaymentConfirmationToWhatsApp = () => {
    let msg = `*Halo Andreas, saya sudah melakukan pembayaran via Midtrans:*\n\n`;
    msg += `*No. Invoice:* ${invoiceId}\n`;
    msg += `*Produk:* ${product.name}\n`;
    if (selectedVariant) msg += `*Paket:* ${selectedVariant.name}\n`;
    msg += `*Jumlah:* ${quantity}x\n`;
    msg += `*Total Pembayaran:* ${formattedTotal}\n`;
    msg += `*Metode:* Midtrans (${midtransSubMethod.toUpperCase()})\n`;
    msg += `*Nama:* ${customerName}\n`;
    if (notes) msg += `*Catatan:* ${notes}\n`;
    msg += `\nMohon dicek dan diproses link/kodingannya. Terima kasih!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/6285773301211?text=${encoded}`, "_blank");
    onClose();
  };

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Alignment Wrapper (Handles the outer scroll) */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 py-8 sm:py-12">
        {/* Modal Dialog Card */}
        <div className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl z-10 my-auto overflow-hidden">
          
          {/* ================= STEP 1: FORM PEMESANAN & PILIH METODE BAYAR ================= */}
          {viewStep === "form" && (
            <>
              {/* Header */}
              <div className="p-5 border-b border-border flex items-start justify-between bg-muted/20">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Form Pemesanan
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    {selectedVariant ? selectedVariant.priceLabel : product.priceTag} / unit
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label="Tutup dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body (Scrolls together with the modal card) */}
              <form onSubmit={handleProceedOrder} className="p-5 sm:p-6 space-y-5">
              
              {/* Variant Selector (if product has variants) */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                    Pilihan Paket:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant?.name === v.name;
                      return (
                        <button
                          key={v.name}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/20"
                              : "border-border bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          <span>{v.name}</span>
                          <span className="font-mono text-xs">{v.priceLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border">
                <div>
                  <span className="text-sm font-semibold text-foreground block">
                    Jumlah / Quantity
                  </span>
                  <span className="text-xs text-muted-foreground">Tentukan banyaknya pesanan</span>
                </div>

                <div className="flex items-center border border-border rounded-xl overflow-hidden bg-card">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Kurangi"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 sm:px-4 text-sm font-bold font-mono text-foreground">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Tambah"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Customer Info Inputs */}
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <label htmlFor="customerName" className="text-sm font-medium text-foreground block">
                    Nama Lengkap <span className="text-primary">*</span>
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Nama Anda"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-foreground text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="customerPhone" className="text-sm font-medium text-foreground block">
                    No. WhatsApp / Kontak (Opsional)
                  </label>
                  <input
                    id="customerPhone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-foreground text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="notes" className="text-sm font-medium text-foreground block">
                    Catatan Pesanan (Opsional)
                  </label>
                  <input
                    id="notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Catatan tambahan / instruksi singkat..."
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border text-foreground text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
                  />
                </div>
              </div>

              {/* Metode Pembayaran (Payment Method Selection) */}
              <div className="space-y-2.5 pt-2 border-t border-border">
                <label className="text-sm font-medium text-foreground block">
                  Metode Pembayaran:
                </label>

                {/* Option 1: Midtrans */}
                <div
                  onClick={() => setPaymentMethod("midtrans")}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    paymentMethod === "midtrans"
                      ? "border-primary bg-primary/10 ring-1 ring-primary/20"
                      : "border-border bg-card hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-500 flex items-center justify-center font-bold text-xs">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">Midtrans Payment</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase">
                          Otomatis
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground block mt-0.5">
                        QRIS (GoPay, DANA, ShopeePay), BCA VA, Mandiri, BNI
                      </span>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "midtrans" ? "border-primary bg-primary text-white" : "border-muted-foreground"
                  }`}>
                    {paymentMethod === "midtrans" && <Check className="w-3 h-3" />}
                  </div>
                </div>

                {/* Option 2: WhatsApp Manual */}
                <div
                  onClick={() => setPaymentMethod("whatsapp")}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    paymentMethod === "whatsapp"
                      ? "border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500/20"
                      : "border-border bg-card hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <SiWhatsapp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-foreground">WhatsApp Chat Langsung</span>
                      <span className="text-xs text-muted-foreground block mt-0.5">
                        Transfer manual & koordinasi via WhatsApp
                      </span>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "whatsapp" ? "border-emerald-500 bg-emerald-500 text-white" : "border-muted-foreground"
                  }`}>
                    {paymentMethod === "whatsapp" && <Check className="w-3 h-3" />}
                  </div>
                </div>
              </div>

              {/* Total Summary & Checkout Button */}
              <div className="pt-3 border-t border-border flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-muted-foreground block">Total Pembayaran:</span>
                  <span className="text-xl sm:text-2xl font-black text-primary font-mono">
                    {formattedTotal}
                  </span>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-sm min-h-[44px]"
                >
                  <span>{paymentMethod === "midtrans" ? "Bayar dengan Midtrans" : "Order via WhatsApp"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </>
        )}

        {/* ================= STEP 2: MIDTRANS PAYMENT GATEWAY SCREEN ================= */}
        {viewStep === "midtrans_screen" && (
          <div className="flex flex-col">
            
            {/* Midtrans Header */}
            <div className="p-4 sm:p-5 bg-blue-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                <div>
                  <h4 className="font-bold text-sm tracking-tight">Midtrans Snap Payment</h4>
                  <span className="text-[11px] opacity-80 font-mono">Invoice: {invoiceId}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] block opacity-80">Total Tagihan</span>
                <span className="text-base font-black font-mono">{formattedTotal}</span>
              </div>
            </div>

            {/* Midtrans Channel Selector Tabs */}
            <div className="p-4 sm:p-6 space-y-5">
              
              <div className="grid grid-cols-3 gap-2 p-1 bg-muted/60 rounded-xl border border-border">
                <button
                  type="button"
                  onClick={() => setMidtransSubMethod("qris")}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    midtransSubMethod === "qris"
                      ? "bg-card text-foreground shadow-xs border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>QRIS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMidtransSubMethod("bca_va")}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    midtransSubMethod === "bca_va"
                      ? "bg-card text-foreground shadow-xs border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>BCA VA</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMidtransSubMethod("mandiri_va")}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    midtransSubMethod === "mandiri_va"
                      ? "bg-card text-foreground shadow-xs border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Mandiri VA</span>
                </button>
              </div>

              {/* Channel 1: QRIS View */}
              {midtransSubMethod === "qris" && (
                <div className="p-5 rounded-2xl bg-card border border-border text-center space-y-3.5 shadow-xs">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>QRIS Nasional Terverifikasi</span>
                  </div>

                  {/* QRIS SVG Render */}
                  <div className="w-48 h-48 mx-auto p-3 bg-white rounded-2xl border-2 border-border shadow-md flex items-center justify-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                        `00020101021226680016ID.CO.MIDTRANS011893600999085773301211520454115303360540${totalPrice}5802ID5916ANDREAS ATHALLAH6008SIDOARJO62100506${invoiceId}6304`
                      )}`}
                      alt="QRIS Midtrans Payment"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    Buka aplikasi <strong>BCA Mobile, Livin Mandiri, GoPay, OVO, DANA</strong>, atau mobile banking Anda, lalu scan kode QRIS di atas.
                  </p>
                </div>
              )}

              {/* Channel 2: BCA Virtual Account */}
              {midtransSubMethod === "bca_va" && (
                <div className="p-5 rounded-2xl bg-card border border-border space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase">Bank Central Asia (BCA)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-semibold">Virtual Account</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-muted/60 border border-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Nomor Virtual Account:</span>
                      <span className="font-mono text-base sm:text-lg font-bold text-foreground">
                        7001 2085 7733 0121
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyText("7001208577330121")}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-card border border-border hover:bg-accent transition-colors flex items-center gap-1.5"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Tersalin" : "Salin"}</span>
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Transfer ke nomor VA di atas via BCA Mobile, KlikBCA, atau ATM BCA. Nominal tepat sesuai tagihan: <strong>{formattedTotal}</strong>.
                  </p>
                </div>
              )}

              {/* Channel 3: Mandiri Virtual Account */}
              {midtransSubMethod === "mandiri_va" && (
                <div className="p-5 rounded-2xl bg-card border border-border space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase">Bank Mandiri</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-semibold">Virtual Account</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-muted/60 border border-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Nomor Mandiri Bill:</span>
                      <span className="font-mono text-base sm:text-lg font-bold text-foreground">
                        8890 8577 3301 211
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyText("889085773301211")}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-card border border-border hover:bg-accent transition-colors flex items-center gap-1.5"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Tersalin" : "Salin"}</span>
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Pilih menu Bayar / Pembayaran multi payment di aplikasi Livin by Mandiri menggunakan nomor di atas.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={handleSendPaymentConfirmationToWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-sm"
                >
                  <SiWhatsapp className="w-4 h-4" />
                  <span>Konfirmasi Pembayaran ke WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewStep("form")}
                  className="w-full py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Ganti Metode Pembayaran Lain
                </button>
              </div>

            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
