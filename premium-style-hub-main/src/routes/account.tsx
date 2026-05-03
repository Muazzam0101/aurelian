import { createFileRoute } from "@tanstack/react-router";
import { Layout, Container } from "@/components/Layout";
import { pick } from "@/data/products";
import { Package, MapPin, User as UserIcon, Heart, LogOut, CreditCard } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — Aurelian" }] }),
  component: Account,
});

function Account() {
  const orders = pick(4, 11).map((p, i) => ({
    id: `#AUR-${10234 + i}`, p, status: ["Delivered","Shipped","Processing","Delivered"][i], date: ["Apr 28","Apr 12","Apr 02","Mar 18"][i],
  }));
  return (
    <Layout>
      <Container className="py-12">
        <h1 className="font-display text-5xl text-ink mb-8">My Account</h1>
        <div className="grid lg:grid-cols-[260px_1fr] gap-10">
          <aside className="space-y-1">
            {[
              {i:UserIcon,t:"Overview",a:true},{i:Package,t:"Orders"},{i:MapPin,t:"Addresses"},
              {i:CreditCard,t:"Payment"},{i:Heart,t:"Wishlist"},{i:LogOut,t:"Sign out"},
            ].map(({i:I,t,a}) => (
              <button key={t} className={`w-full flex items-center gap-3 px-4 h-11 rounded-xl text-sm ${a?"bg-ink text-background":"hover:bg-beige"}`}>
                <I className="h-4 w-4" />{t}
              </button>
            ))}
          </aside>
          <div className="space-y-8">
            <section className="bg-beige rounded-2xl p-7">
              <p className="text-[11px] uppercase tracking-widest text-ember">Welcome back</p>
              <h2 className="font-display text-3xl mt-1">Henrik Voss</h2>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[{l:"Orders",v:"12"},{l:"Atelier points",v:"4,820"},{l:"Member since",v:"2024"}].map(s => (
                  <div key={s.l}><p className="text-xs uppercase tracking-widest text-muted-foreground">{s.l}</p><p className="font-display text-2xl mt-1">{s.v}</p></div>
                ))}
              </div>
            </section>
            <section>
              <h3 className="font-display text-2xl mb-4">Recent orders</h3>
              <div className="space-y-3">
                {orders.map(o => (
                  <div key={o.id} className="flex items-center gap-4 p-4 border border-border rounded-2xl">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-beige"><img src={o.p.image} className="w-full h-full object-cover" alt="" /></div>
                    <div className="flex-1">
                      <p className="font-medium">{o.p.name}</p>
                      <p className="text-xs text-muted-foreground">{o.id} · {o.date}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${o.status==="Delivered"?"bg-beige text-ink":o.status==="Shipped"?"bg-ember/10 text-ember":"bg-gold/20 text-ink"}`}>{o.status}</span>
                    <p className="font-display">${o.p.price}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="grid md:grid-cols-2 gap-5">
              <div className="border border-border rounded-2xl p-6">
                <h4 className="font-display text-xl">Profile details</h4>
                <dl className="mt-4 text-sm space-y-2">
                  <div className="flex justify-between"><dt className="text-muted-foreground">Name</dt><dd>Henrik Voss</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Email</dt><dd>henrik@maison.com</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Phone</dt><dd>+44 20 7946 0958</dd></div>
                </dl>
              </div>
              <div className="border border-border rounded-2xl p-6">
                <h4 className="font-display text-xl">Default address</h4>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  14 Marylebone Lane<br />London W1U 2NE<br />United Kingdom
                </p>
                <button className="mt-4 text-xs uppercase tracking-widest border-b border-ink">Manage addresses</button>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
