import { createFileRoute } from "@tanstack/react-router";
import { Layout, Container, SectionHeader } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { pick } from "@/data/products";
import { ShoppingBag, X } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Aurelian" }] }),
  component: Wishlist,
});

function Wishlist() {
  const items = pick(12, 7);
  const more = pick(8, 23);
  return (
    <Layout>
      <Container className="py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-ember mb-2">Saved for you</p>
            <h1 className="font-display text-5xl text-ink">Wishlist</h1>
          </div>
          <p className="text-sm text-muted-foreground">{items.length} pieces</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(p => (
            <div key={p.id} className="relative group">
              <ProductCard p={p} compact />
              <div className="mt-2 flex gap-2">
                <button className="flex-1 h-10 rounded-full bg-ink text-background text-xs tracking-wide flex items-center justify-center gap-1.5"><ShoppingBag className="h-3 w-3" />Move to bag</button>
                <button className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:border-destructive hover:text-destructive"><X className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <section className="bg-beige py-12">
        <Container>
          <SectionHeader eyebrow="You might also love" title="Inspired by your wishlist" link="/shop" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {more.map(p => <ProductCard key={p.id} p={p} compact />)}
          </div>
        </Container>
      </section>
    </Layout>
  );
}
