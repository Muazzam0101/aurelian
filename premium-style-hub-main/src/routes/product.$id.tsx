import { createFileRoute, notFound } from "@tanstack/react-router";
import { Layout, Container, SectionHeader } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { findProduct, pick } from "@/data/products";
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = findProduct(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product"} — Aurelian` },
      { name: "description", content: `${loaderData?.brand} ${loaderData?.name} — premium ${loaderData?.category}.` },
      { property: "og:image", content: loaderData?.image },
    ],
  }),
  notFoundComponent: () => (
    <Layout><Container className="py-24 text-center"><h1 className="font-display text-4xl">Piece not found</h1></Container></Layout>
  ),
  errorComponent: ({ error }) => (
    <Layout><Container className="py-24 text-center"><p>{error.message}</p></Container></Layout>
  ),
  component: Detail,
});

function Detail() {
  const p = Route.useLoaderData()!;
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const sizes = p.category === "watches" ? ["38mm","40mm","42mm","44mm"] : ["7","8","9","10","11","12"];
  const related = pick(10, 9);
  const recommended = pick(8, 21);

  return (
    <Layout>
      <Container className="py-6 sm:py-8">
        <p className="text-xs text-muted-foreground mb-4 sm:mb-6 truncate">Home / {p.category} / {p.brand} / <span className="text-ink">{p.name}</span></p>
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Images */}
          <div className="grid grid-cols-[64px_1fr] sm:grid-cols-[80px_1fr] gap-2 sm:gap-3">
            <div className="space-y-2 sm:space-y-3">
              {(p.images ?? [p.image]).map((src, i) => (
                <button key={i} onClick={() => setActive(i)} className={`aspect-square rounded-lg overflow-hidden bg-beige ${active===i?"ring-2 ring-ink":""}`}>
                  <img src={src} alt="" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${p.id}-${i}/900/900`; }} />
                </button>
              ))}
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-beige group">
              <img src={(p.images ?? [p.image])[active]} alt={p.name} className="w-full h-full object-cover img-zoom" onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${p.id}-${active}/900/900`; }} />
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-ember">{p.brand}</p>
            <h1 className="font-display text-3xl sm:text-4xl text-ink mt-2">{p.name}</h1>
            <div className="flex items-center gap-3 mt-3 text-sm">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-gold text-gold" />{p.rating}</span>
              <span className="text-muted-foreground">· {p.reviews} reviews</span>
              {p.tag && <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-ink text-background">{p.tag}</span>}
            </div>
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-4xl text-ink">${p.price}</span>
              {p.oldPrice && <span className="text-muted-foreground line-through">${p.oldPrice}</span>}
            </div>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              The {p.name} from {p.brand} is built around uncompromising materials and quiet detail. A piece designed to be worn — and re-worn — for years to come.
            </p>

            <div className="mt-7">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs uppercase tracking-widest">{p.category === "watches" ? "Case size" : "Size"}</p>
                <button className="text-xs underline text-muted-foreground">Size guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map(s => (
                  <button key={s} onClick={() => setSize(s)} className={`h-11 min-w-14 px-4 rounded-full border text-sm ${size===s?"bg-ink text-background border-ink":"border-border hover:border-ink"}`}>{s}</button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-widest mb-2">Colour</p>
              <div className="flex gap-2">
                {(p.colors ?? []).map((c, i) => (
                  <span key={i} className="h-9 w-9 rounded-full ring-2 ring-background outline outline-1 outline-border" style={{ background: c }} />
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button className="flex-1 h-12 sm:h-14 rounded-full bg-ink text-background text-sm font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-charcoal transition">
                <ShoppingBag className="h-4 w-4" /> Add to bag — ${p.price}
              </button>
              <button className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-ink flex items-center justify-center hover:bg-ink hover:text-background transition shrink-0"><Heart className="h-5 w-5" /></button>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-3 text-xs text-ink">
              {[{i:Truck,t:"Free shipping"},{i:ShieldCheck,t:"Lifetime service"},{i:RotateCcw,t:"30-day returns"}].map(({i:I,t})=>(
                <div key={t} className="rounded-xl border border-border p-2 sm:p-3 flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2 text-center sm:text-left"><I className="h-4 w-4 text-ember shrink-0" /><span>{t}</span></div>
              ))}
            </div>

            <div className="mt-10 border-t border-border pt-6 space-y-5">
              <details open className="group">
                <summary className="cursor-pointer flex justify-between items-center text-sm font-medium">Specifications<span className="text-ember">+</span></summary>
                <ul className="mt-3 text-sm text-muted-foreground space-y-1.5">
                  {(p.category === "watches"
                    ? ["Swiss automatic movement","Sapphire crystal, AR coating","100m water resistance","Sunray dial finish","20mm interchangeable strap"]
                    : ["Italian full-grain leather","Vibram cushioned outsole","Hand-lasted construction","Removable cork insole","Made in Portugal"]
                  ).map(s => <li key={s} className="flex gap-2"><Check className="h-4 w-4 text-ember mt-0.5" />{s}</li>)}
                </ul>
              </details>
              <details className="group">
                <summary className="cursor-pointer flex justify-between items-center text-sm font-medium">Description<span className="text-ember">+</span></summary>
                <p className="mt-3 text-sm text-muted-foreground">A patient study in proportion and material. Each piece passes through more than thirty hands before it's yours.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer flex justify-between items-center text-sm font-medium">Reviews ({p.reviews})<span className="text-ember">+</span></summary>
                <div className="mt-4 space-y-4">
                  {[{n:"Marco D.",t:"Truly extraordinary craftsmanship."},{n:"Lina K.",t:"Exceeded every expectation. Wears beautifully."}].map(r => (
                    <div key={r.n} className="border-l-2 border-ember pl-3">
                      <div className="flex gap-1 mb-1">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-3 w-3 fill-gold text-gold" />)}</div>
                      <p className="text-sm">{r.t}</p>
                      <p className="text-xs text-muted-foreground">— {r.n}</p>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </div>
      </Container>

      <Container className="py-16">
        <SectionHeader eyebrow="Pairs well with" title="You may also like" link="/shop" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {related.map(rp => <ProductCard key={rp.id} p={rp} compact />)}
        </div>
      </Container>

      <section className="bg-beige py-16">
        <Container>
          <SectionHeader eyebrow="From your wishlist tendencies" title="Recommended for you" link="/shop" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommended.map(rp => <ProductCard key={rp.id} p={rp} compact />)}
          </div>
        </Container>
      </section>
    </Layout>
  );
}
