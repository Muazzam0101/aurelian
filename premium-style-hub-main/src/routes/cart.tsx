import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, Container, SectionHeader } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { pick } from "@/data/products";
import { Minus, Plus, X } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your bag — Aurelian" }] }),
  component: Cart,
});

function Cart() {
  const items = pick(3, 1);
  const recs = pick(8, 30);
  const subtotal = items.reduce((s, p) => s + p.price, 0);
  return (
    <Layout>
      <Container className="py-12">
        <h1 className="font-display text-5xl text-ink mb-8">Your Bag</h1>
        <div className="grid lg:grid-cols-[1fr_400px] gap-10">
          <div className="space-y-4">
            {items.map(p => (
              <div key={p.id} className="flex gap-4 p-4 border border-border rounded-2xl">
                <div className="w-28 h-28 rounded-xl bg-beige overflow-hidden flex-shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{p.brand}</p>
                      <h3 className="font-medium text-ink">{p.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">Size: {p.category === "watches" ? "40mm" : "9"} · Colour: Onyx</p>
                    </div>
                    <button className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div className="inline-flex items-center border border-border rounded-full">
                      <button className="h-9 w-9 flex items-center justify-center hover:text-ember"><Minus className="h-3 w-3" /></button>
                      <span className="px-3 text-sm">1</span>
                      <button className="h-9 w-9 flex items-center justify-center hover:text-ember"><Plus className="h-3 w-3" /></button>
                    </div>
                    <p className="font-display text-xl">${p.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="bg-beige rounded-2xl p-6 h-fit sticky top-24">
            <h2 className="font-display text-2xl mb-4">Order summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>Complimentary</span></div>
              <div className="flex justify-between"><span>Estimated tax</span><span>${Math.round(subtotal*0.08)}</span></div>
            </div>
            <div className="border-t border-border my-4" />
            <div className="flex justify-between font-display text-2xl"><span>Total</span><span>${subtotal + Math.round(subtotal*0.08)}</span></div>
            <Link to="/checkout" className="mt-6 h-12 rounded-full bg-ink text-background flex items-center justify-center text-sm">Proceed to checkout</Link>
            <p className="text-xs text-muted-foreground text-center mt-3">Free returns within 30 days</p>
          </aside>
        </div>
      </Container>
      <Container className="py-12">
        <SectionHeader eyebrow="Complete the look" title="You might also like" link="/shop" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recs.map(p => <ProductCard key={p.id} p={p} compact />)}
        </div>
      </Container>
    </Layout>
  );
}
