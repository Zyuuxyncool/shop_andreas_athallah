import { Check, Sparkles, Code2, ArrowUpRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { ProductItem } from "../data/products";

interface ProductCardProps {
  product: ProductItem;
  onSelect: (product: ProductItem) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const isAi = product.category === "ai";

  return (
    <div
      className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-card border transition-all duration-300 hover:shadow-lg ${
        product.popular
          ? "border-primary/50 shadow-md ring-1 ring-primary/20"
          : "border-border shadow-xs hover:border-slate-300 dark:hover:border-slate-700"
      }`}
    >
      {/* Popular Ribbon */}
      {product.popular && (
        <div className="absolute -top-3 right-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary text-primary-foreground shadow-xs">
            <Sparkles className="w-3 h-3" />
            <span>Paling Dicari</span>
          </span>
        </div>
      )}

      <div>
        {/* Top Header: Badge & Category */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20">
            {isAi ? <Sparkles className="w-3 h-3" /> : <Code2 className="w-3 h-3" />}
            <span>{isAi ? "Produk AI" : "Jasa Koding"}</span>
          </span>

          {product.badge && (
            <span className="text-[11px] font-medium text-muted-foreground font-mono">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-foreground mb-2 leading-snug">
          {product.name}
        </h3>

        {/* Price Tag */}
        <div className="mb-4 pb-4 border-b border-border">
          <div className="text-2xl font-black text-foreground tracking-tight font-mono">
            {product.priceTag}
          </div>
          {product.priceNote && (
            <span className="text-xs text-muted-foreground block mt-1">
              {product.priceNote}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
          {product.description}
        </p>

        {/* Tech Stack Pills (if applicable) */}
        {product.techStack && (
          <div className="mb-5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
              Teknologi / Bahasa:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-muted/60 text-foreground border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Feature Checklist */}
        <div className="space-y-2.5 mb-6">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
            Fasilitas Termasuk:
          </span>
          {product.features.map((feature) => (
            <div key={feature} className="flex items-start gap-2.5 text-xs text-foreground/90">
              <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5" />
              </div>
              <span className="leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-border space-y-2.5">
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow min-h-[44px]"
        >
          <span>{isAi ? "Beli Link Aktivasi" : "Pesan Jasa Koding"}</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>

        <a
          href={`https://wa.me/6285773301211?text=${encodeURIComponent(
            `Halo Andreas, saya ingin tanya info lebih lanjut mengenai: ${product.name}`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground border border-border/80 hover:bg-accent transition-colors min-h-[38px]"
        >
          <SiWhatsapp className="w-3.5 h-3.5 text-emerald-500" />
          <span>Tanya Admin Langsung</span>
        </a>
      </div>
    </div>
  );
}
