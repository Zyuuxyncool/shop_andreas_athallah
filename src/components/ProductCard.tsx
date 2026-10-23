import { Star, Sparkles, Code2, ArrowUpRight, Zap, ShieldCheck } from "lucide-react";
import { ProductItem } from "../data/products";

interface ProductCardProps {
  product: ProductItem;
  onSelect: (product: ProductItem) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const isDigital = product.category === "digital";

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative flex flex-col justify-between rounded-2xl bg-card border border-border shadow-xs hover:border-primary/50 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
    >
      <div>
        {/* Shopee-style Product Visual Header */}
        <div className="relative aspect-[16/10] bg-muted/60 border-b border-border/80 flex items-center justify-center overflow-hidden p-4">
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 group-hover:scale-105 transition-transform duration-300" />

          {/* Center Graphic / Icon */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-card border border-border/80 shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-200">
              {isDigital ? <Sparkles className="w-6 h-6" /> : <Code2 className="w-6 h-6" />}
            </div>
            <span className="text-[11px] font-mono font-medium text-muted-foreground uppercase tracking-wider">
              {isDigital ? "Aset / Lisensi Digital" : "Layanan Pemrograman"}
            </span>
          </div>

          {/* Top Left Shopee Badge */}
          <div className="absolute top-2.5 left-2.5 z-20">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider shadow-xs">
              Star+
            </span>
          </div>

          {/* Top Right Discount Badge */}
          {product.discountPercentage && (
            <div className="absolute top-2.5 right-2.5 z-20">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-red-500 text-white shadow-xs">
                -{product.discountPercentage}%
              </span>
            </div>
          )}

          {/* Bottom Overlay Pill: Kirim Kilat */}
          <div className="absolute bottom-2 left-2.5 z-20">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium bg-background/80 backdrop-blur-xs border border-border text-foreground">
              <Zap className="w-2.5 h-2.5 text-amber-500" />
              <span>{isDigital ? "Instan 1-5 Menit" : "Same-Day / Cepat"}</span>
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          {/* Product Title */}
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Shopee Pricing Row */}
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-black text-primary font-mono tracking-tight">
                {product.priceTag}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through font-mono">
                  {product.originalPrice}
                </span>
              )}
            </div>
            {product.priceNote && (
              <span className="text-[11px] text-muted-foreground block line-clamp-1">
                {product.priceNote}
              </span>
            )}
          </div>

          {/* Tech Stack Pills (if applicable) */}
          {product.techStack && (
            <div className="flex flex-wrap gap-1 pt-0.5">
              {product.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border"
                >
                  {tech}
                </span>
              ))}
              {product.techStack.length > 3 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground">
                  +{product.techStack.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Shopee Rating & Sold Count */}
          <div className="flex items-center justify-between text-xs pt-1 border-t border-border/60">
            <div className="flex items-center gap-1 font-mono">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
              <span className="text-muted-foreground text-[11px]">({product.soldCount} Terjual)</span>
            </div>

            <span className="text-[11px] text-muted-foreground truncate max-w-[120px]">
              {product.location}
            </span>
          </div>
        </div>
      </div>

      {/* Shopee Action Footer Button */}
      <div className="p-4 pt-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product);
          }}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-semibold text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs"
        >
          <span>Beli Sekarang</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
