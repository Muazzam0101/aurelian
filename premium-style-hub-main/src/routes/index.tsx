import { createFileRoute } from "@tanstack/react-router";
import { Layout, Container, SectionHeader } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { MiniProduct } from "@/components/MiniProduct";
import { PRODUCTS, WATCHES, SHOES, pick } from "@/data/products";
import { ArrowRight, Truck, ShieldCheck, Sparkles, RotateCcw } from "lucide-react";
import { FadeIn, StaggerGrid, StaggerItem, ParallaxWrapper } from "@/components/Motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurelian — Considered Watches & Footwear" },
      { name: "description", content: "Premium watches and shoes, crafted in atelier traditions for a quietly remarkable life." },
      { property: "og:title", content: "Aurelian Maison" },
      { property: "og:description", content: "Premium watches and shoes." },
    ],
  }),
  component: Home,
});

function Home() {
  const heroProducts = pick(8, 0);
  const featured = pick(16, 4);
  const trending = pick(20, 8);
  const inlineRow = pick(18, 12);
  const topPicksMain = PRODUCTS[3];
  const topPicks = pick(10, 16);
  const promoGrid = pick(10, 22);
  const hot = pick(14, 28);
  const watches = WATCHES.slice(0, 10);
  const shoes = SHOES.slice(0, 10);
  const newArrGrid = pick(12, 36);
  const newArrSlider = pick(12, 40);
  const recommended = pick(12, 44);
  const extra1 = pick(14, 48);
  const extra2 = pick(14, 2);
  const finalGrid = pick(16, 6);

  return (
    <Layout>
      {/* HERO with products */}
      <section className="bg-beige overflow-hidden">
        <Container className="py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-8">
            <StaggerGrid className="lg:col-span-5 flex flex-col justify-center relative z-10">
              <StaggerItem>
                <p className="text-[11px] uppercase tracking-[0.24em] text-ember mb-4">Atelier Edit · Vol. XII</p>
              </StaggerItem>
              <StaggerItem>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-ink leading-[0.95] text-balance">
                  Time, kept beautifully. Steps, taken thoughtfully.
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-5 text-muted-foreground max-w-md">
                  A curated maison of watches and footwear — assembled by hand, finished with intent, worn for decades.
                </p>
              </StaggerItem>
              <StaggerItem className="mt-7 flex flex-wrap gap-3">
                <a href="/shop" className="h-12 px-7 rounded-full bg-ink text-background text-sm flex items-center gap-2 hover:bg-charcoal transition">
                  Shop the Edit <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/shop" className="h-12 px-7 rounded-full border border-ink text-ink text-sm flex items-center hover:bg-ink hover:text-background transition">
                  Discover Atelier
                </a>
              </StaggerItem>
              <StaggerItem className="mt-10 grid grid-cols-2 gap-4 max-w-md">
                {[
                  { i: Truck, t: "Shipped worldwide" },
                  { i: ShieldCheck, t: "Lifetime servicing" },
                  { i: RotateCcw, t: "30-day returns" },
                  { i: Sparkles, t: "Hand-finished" },
                ].map(({ i: I, t }) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-ink">
                    <I className="h-4 w-4 text-ember" /> {t}
                  </div>
                ))}
              </StaggerItem>
            </StaggerGrid>
            
            <div className="lg:col-span-7 relative z-0">
              <ParallaxWrapper offset={30} className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {heroProducts.map((p, i) => (
                  <div key={p.id} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                    <ProductCard p={p} compact={i !== 0} />
                  </div>
                ))}
              </ParallaxWrapper>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED GRID */}
      <FadeIn>
        <Container className="py-16">
          <SectionHeader eyebrow="The Maison" title="Featured Pieces" link="/shop" />
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featured.map(p => (
              <StaggerItem key={p.id}>
                <ProductCard p={p} compact />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </FadeIn>

      {/* TRENDING SLIDER */}
      <FadeIn>
        <section className="bg-beige py-16">
          <Container>
            <SectionHeader eyebrow="In Motion" title="Trending This Week" link="/shop" />
            <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
              {trending.map(p => (
                <div key={p.id} className="w-56 flex-shrink-0">
                  <ProductCard p={p} compact />
                </div>
              ))}
            </div>
          </Container>
        </section>
      </FadeIn>

      {/* INLINE STRIP */}
      <FadeIn>
        <Container className="py-12">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4">Just landed</p>
          <div className="flex gap-5 overflow-x-auto no-scrollbar -mx-6 px-6">
            {inlineRow.map(p => <MiniProduct key={p.id} p={p} />)}
          </div>
        </Container>
      </FadeIn>

      {/* TOP PICKS */}
      <FadeIn>
        <Container className="py-16">
          <SectionHeader eyebrow="Editor's Choice" title="Top Picks" link="/shop" />
          <StaggerGrid className="grid lg:grid-cols-3 gap-5">
            <StaggerItem className="lg:row-span-2">
              <ParallaxWrapper offset={15} className="group relative rounded-3xl overflow-hidden bg-ink min-h-[480px] h-full">
                <a href={`/product/${topPicksMain.id}`} className="block w-full h-full">
                  <img src={topPicksMain.image} alt={topPicksMain.name} className="absolute inset-0 w-full h-full object-cover img-zoom opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-background">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-gold mb-2">Pick of the season</p>
                    <h3 className="font-display text-3xl">{topPicksMain.name}</h3>
                    <p className="text-sm text-background/80 mt-1">{topPicksMain.brand} · ${topPicksMain.price}</p>
                  </div>
                </a>
              </ParallaxWrapper>
            </StaggerItem>
            {topPicks.map(p => (
              <StaggerItem key={p.id}>
                <ProductCard p={p} compact />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </FadeIn>

      {/* PROMO + GRID */}
      <FadeIn>
        <Container className="py-12">
          <StaggerGrid className="grid lg:grid-cols-4 gap-5">
            <StaggerItem className="lg:col-span-1">
              <ParallaxWrapper offset={10} className="rounded-3xl bg-ember text-white p-8 flex flex-col justify-between min-h-[300px] h-full">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/80">Members Edit</p>
                  <h3 className="font-display text-3xl mt-3">Up to 30% off heritage styles</h3>
                </div>
                <a href="/shop" className="mt-6 h-11 self-start px-6 rounded-full bg-ink text-background text-xs uppercase tracking-widest flex items-center justify-center">Shop Sale</a>
              </ParallaxWrapper>
            </StaggerItem>
            {promoGrid.map(p => (
              <StaggerItem key={p.id}>
                <ProductCard p={p} compact />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </FadeIn>

      {/* HOT */}
      <FadeIn>
        <section className="bg-ink text-background py-16">
          <Container>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-ember mb-2">Selling fast</p>
                <h2 className="font-display text-3xl md:text-4xl">Hot Right Now</h2>
              </div>
              <a href="/shop" className="text-sm border-b border-background pb-0.5 hover:text-ember transition">View all</a>
            </div>
            <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {hot.map(p => (
                <StaggerItem key={p.id} className="rounded-2xl overflow-hidden bg-background text-foreground">
                  <ProductCard p={p} compact />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </Container>
        </section>
      </FadeIn>

      {/* CATEGORY: WATCHES */}
      <FadeIn>
        <Container className="py-16">
          <SectionHeader eyebrow="Horology" title="The Watch Atelier" link="/shop" />
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {watches.map(p => (
              <StaggerItem key={p.id}>
                <ProductCard p={p} compact />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </FadeIn>

      {/* CATEGORY: SHOES */}
      <FadeIn>
        <section className="bg-beige py-16">
          <Container>
            <SectionHeader eyebrow="Footwear" title="The Shoe Workshop" link="/shop" />
            <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {shoes.map(p => (
                <StaggerItem key={p.id}>
                  <ProductCard p={p} compact />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </Container>
        </section>
      </FadeIn>

      {/* NEW ARRIVALS */}
      <FadeIn>
        <Container className="py-16">
          <SectionHeader eyebrow="Fresh in" title="New Arrivals" link="/shop" />
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {newArrGrid.map(p => (
              <StaggerItem key={p.id}>
                <ProductCard p={p} compact />
              </StaggerItem>
            ))}
          </StaggerGrid>
          <div className="mt-6 flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
            {newArrSlider.map(p => <div key={p.id} className="w-56 flex-shrink-0"><ProductCard p={p} compact /></div>)}
          </div>
        </Container>
      </FadeIn>

      {/* RECOMMENDED */}
      <FadeIn>
        <Container className="py-12">
          <SectionHeader eyebrow="For you" title="Recommended" link="/shop" />
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recommended.map(p => (
              <StaggerItem key={p.id}>
                <ProductCard p={p} compact />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </FadeIn>

      {/* EXTRA ROWS */}
      <FadeIn>
        <Container className="py-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">Under $300 · Effortless wins</p>
          <div className="flex gap-5 overflow-x-auto no-scrollbar -mx-6 px-6">
            {extra1.map(p => <MiniProduct key={p.id} p={p} />)}
          </div>
        </Container>
      </FadeIn>
      <FadeIn>
        <Container className="py-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">Reissued classics</p>
          <div className="flex gap-5 overflow-x-auto no-scrollbar -mx-6 px-6">
            {extra2.map(p => <MiniProduct key={p.id} p={p} />)}
          </div>
        </Container>
      </FadeIn>

      {/* TESTIMONIALS */}
      <FadeIn>
        <section className="bg-beige py-16">
          <Container>
            <StaggerGrid className="grid md:grid-cols-3 gap-5">
              {[
                { q: "The finishing on the Nocturne is unreal — feels like wearing a sculpture.", a: "— Henrik V., London" },
                { q: "Ordered the Atelier Lo on Tuesday, wore them to a wedding Saturday. Compliments all night.", a: "— Priya M., Mumbai" },
                { q: "Servicing was free, fast, and beautifully packaged. Customers for life.", a: "— Élise R., Paris" },
              ].map((t, i) => (
                <StaggerItem key={i} className="bg-background rounded-2xl p-7">
                  <p className="font-display text-xl text-ink leading-snug">"{t.q}"</p>
                  <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{t.a}</p>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </Container>
        </section>
      </FadeIn>

      {/* FINAL GRID */}
      <FadeIn>
        <Container className="py-16">
          <SectionHeader eyebrow="Keep exploring" title="More from the Maison" link="/shop" />
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {finalGrid.map(p => (
              <StaggerItem key={p.id}>
                <ProductCard p={p} compact />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </FadeIn>
    </Layout>
  );
}
