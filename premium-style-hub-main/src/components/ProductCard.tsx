import { Link } from "@tanstack/react-router";
import { Heart, Star, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const tagStyle: Record<string, string> = {
  New: "bg-ink text-background",
  Sale: "bg-ember text-white",
  Hot: "bg-destructive text-white",
  Limited: "bg-gold text-ink",
};

export function ProductCard({ p, compact = false }: { p: Product; compact?: boolean }) {
  return (
    <MotionLink
      to="/product/$id"
      params={{ id: p.id }}
      className="group block product-card-hover bg-card rounded-2xl overflow-hidden border border-border/60"
      whileHover={{ scale: 1.03, y: -4, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative aspect-square overflow-hidden bg-beige">
        <img 
          src={p.image} 
          alt={p.name} 
          loading="lazy" 
          className="w-full h-full object-cover img-zoom" 
          onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${p.id}/900/900`; }} 
        />
        {p.tag && (
          <span className={`absolute top-3 left-3 text-[10px] tracking-widest uppercase font-medium px-2.5 py-1 rounded-full ${tagStyle[p.tag]}`}>
            {p.tag}
          </span>
        )}
        <button
          aria-label="Wishlist"
          onClick={(e) => { e.preventDefault(); }}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center text-ink hover:text-ember transition"
        >
          <Heart className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); }}
          className="absolute bottom-3 left-3 right-3 h-10 rounded-full bg-ink text-background text-xs font-medium tracking-wide flex items-center justify-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition"
        >
          <ShoppingBag className="h-3.5 w-3.5" /> Quick add
        </button>
      </div>
      <div className={compact ? "p-3" : "p-4"}>
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{p.brand}</p>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Star className="h-3 w-3 fill-gold text-gold" />
            {p.rating}
          </div>
        </div>
        <h3 className="mt-1 font-medium text-sm text-ink truncate">{p.name}</h3>
        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-base text-ink">${p.price}</span>
            {p.oldPrice && <span className="text-xs text-muted-foreground line-through">${p.oldPrice}</span>}
          </div>
          {p.colors && (
            <div className="flex -space-x-1">
              {p.colors.slice(0,3).map((c,i) => (
                <span key={i} className="h-3 w-3 rounded-full ring-2 ring-background" style={{ background: c }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MotionLink>
  );
}
