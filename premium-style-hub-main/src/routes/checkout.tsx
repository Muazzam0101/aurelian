import { createFileRoute } from "@tanstack/react-router";
import { Layout, Container } from "@/components/Layout";
import { pick } from "@/data/products";
import { Lock, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Aurelian" }] }),
  component: Checkout,
});

const Field = ({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="block">
    <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
    <input {...rest} className="mt-1 w-full h-12 px-4 rounded-xl bg-beige border border-transparent focus:border-ink outline-none text-sm" />
  </label>
);

function Checkout() {
  const items = pick(3, 1);
  const subtotal = items.reduce((s, p) => s + p.price, 0);
  return (
    <Layout>
      <Container className="py-12">
        <h1 className="font-display text-5xl text-ink mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-[1fr_420px] gap-10">
          <form className="space-y-10">
            <section>
              <h2 className="font-display text-2xl mb-4">Contact</h2>
              <Field label="Email" type="email" placeholder="you@maison.com" />
            </section>
            <section>
              <h2 className="font-display text-2xl mb-4">Shipping address</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="First name" />
                <Field label="Last name" />
                <div className="col-span-2"><Field label="Address" /></div>
                <Field label="City" />
                <Field label="Postal code" />
                <Field label="Country" defaultValue="United Kingdom" />
                <Field label="Phone" />
              </div>
            </section>
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl">Billing</h2>
                <label className="text-sm flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-ember" /> Same as shipping</label>
              </div>
            </section>
            <section>
              <h2 className="font-display text-2xl mb-4 flex items-center gap-2">Payment <Lock className="h-4 w-4 text-ember" /></h2>
              <div className="space-y-3">
                <Field label="Card number" placeholder="1234 5678 9012 3456" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiration" placeholder="MM / YY" />
                  <Field label="CVC" placeholder="123" />
                </div>
                <Field label="Name on card" />
              </div>
            </section>
            <button type="button" className="w-full h-14 rounded-full bg-ink text-background text-sm tracking-wide">Pay ${subtotal + Math.round(subtotal*0.08)}</button>
            <div className="grid grid-cols-3 gap-3 text-xs">
              {[{i:ShieldCheck,t:"Secure SSL checkout"},{i:Truck,t:"Free worldwide shipping"},{i:RotateCcw,t:"30-day free returns"}].map(({i:I,t})=>(
                <div key={t} className="rounded-xl border border-border p-3 flex items-center gap-2"><I className="h-4 w-4 text-ember" />{t}</div>
              ))}
            </div>
          </form>
          <aside className="bg-beige rounded-2xl p-6 h-fit sticky top-24">
            <h2 className="font-display text-2xl mb-4">Your order</h2>
            <div className="space-y-3">
              {items.map(p => (
                <div key={p.id} className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg bg-background overflow-hidden flex-shrink-0">
                    <img src={p.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.brand}</p>
                  </div>
                  <p className="text-sm">${p.price}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${Math.round(subtotal*0.08)}</span></div>
            </div>
            <div className="border-t border-border my-4" />
            <div className="flex justify-between font-display text-2xl"><span>Total</span><span>${subtotal + Math.round(subtotal*0.08)}</span></div>
          </aside>
        </div>
      </Container>
    </Layout>
  );
}
