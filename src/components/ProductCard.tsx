import { Sparkles, Code2, ArrowUpRight, Check } from "lucide-react";
import { ProductItem } from "../data/products";

interface ProductCardProps {
  product: ProductItem;
  onSelect: (product: ProductItem) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const isDigital = product.category === "digital";

  return (
    <div className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/50 hover:shadow-md transition-all duration-200">
      <div className="space-y-4">
        
        {/* Top Header: Category Tag & Icon */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-muted text-muted-foreground border border-border">
            {isDigital ? <Sparkles className="w-3.5 h-3.5 text-primary" /> : <Code2 className="w-3.5 h-3.5 text-primary" />}
            <span>{isDigital ? "Produk Digital" : "Jasa Koding"}</span>
          </span>

          <span className="text-xs font-mono font-medium text-muted-foreground">
            {isDigital ? "Pengiriman Instan" : "Pengerjaan Cepat"}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
          {product.name}
        </h3>

        {/* Clean Price (Single Price Only, No Crowded Discounts) */}
        <div className="py-2.5 px-3.5 rounded-xl bg-muted/40 border border-border/80 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Harga:</span>
          <span className="text-lg sm:text-xl font-black text-primary font-mono tracking-tight">
            {product.priceTag}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        {/* Tech Stack Pills (if applicable) */}
        {product.techStack && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-muted/60 text-foreground border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Feature List */}
        <div className="space-y-2 pt-2 border-t border-border/60">
          {product.features.slice(0, 4).map((feature) => (
            <div key={feature} className="flex items-start gap-2 text-xs text-foreground/90">
              <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span className="leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-5 mt-4 border-t border-border">
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-sm min-h-[44px]"
        >
          <span>Beli Sekarang</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
