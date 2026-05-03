import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";

export function MiniProduct({ p }: { p: Product }) {
  return (
    <Link to="/product/$id" params={{ id: p.id }} className="group flex-shrink-0 w-40">
      <div className="aspect-square rounded-xl bg-beige overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover img-zoom" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground uppercase tracking-wider">{p.brand}</p>
      <p className="text-sm font-medium text-ink truncate">{p.name}</p>
      <p className="text-sm font-display">${p.price}</p>
    </Link>
  );
}
