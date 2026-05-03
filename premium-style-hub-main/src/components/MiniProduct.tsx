import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

export function MiniProduct({ p }: { p: Product }) {
  return (
    <MotionLink 
      to="/product/$id" 
      params={{ id: p.id }} 
      className="group flex-shrink-0 w-40 block"
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="aspect-square rounded-xl bg-beige overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover img-zoom" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground uppercase tracking-wider">{p.brand}</p>
      <p className="text-sm font-medium text-ink truncate">{p.name}</p>
      <p className="text-sm font-display">${p.price}</p>
    </MotionLink>
  );
}
