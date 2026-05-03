import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Layout, Container } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { SlidersHorizontal, Star, X } from "lucide-react";

type ShopSearch = {
  category?: string;
  tag?: string;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    return {
      category: search.category as string | undefined,
      tag: search.tag as string | undefined,
    };
  },
  head: () => ({ meta: [{ title: "Shop — Aurelian" }, { name: "description", content: "Browse all watches and shoes." }] }),
  component: Shop,
});

const cats = ["All","Watches","Shoes","Sneakers","Boots","Loafers","Automatic","Chronograph","Diver","Dress"];
const brands = ["Aurelian","Meridian","Noctis","Halden","Coraline","Vespera","Atelier","Ronin","Solene","Kestrel"];

function FilterPanel({ selectedCats, handleCatChange, selectedBrands, handleBrandChange, maxPrice, setMaxPrice, minRating, setMinRating }: {
  selectedCats: string[];
  handleCatChange: (c: string) => void;
  selectedBrands: string[];
  handleBrandChange: (b: string) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  minRating: number;
  setMinRating: (v: number) => void;
}) {
  return (
    <div className="space-y-7">
      <div>
        <h3 className="text-[11px] uppercase tracking-[0.22em] text-ink mb-3 flex items-center gap-2"><SlidersHorizontal className="h-3 w-3" /> Filters</h3>
        <div className="space-y-1.5">
          {cats.map(c => {
            const count = c === "All" ? PRODUCTS.length : PRODUCTS.filter(p => p.category.toLowerCase() === c.toLowerCase() || (p.subcategory && p.subcategory.toLowerCase() === c.toLowerCase())).length;
            return (
              <label key={c} className="flex items-center justify-between text-sm py-1 cursor-pointer hover:text-ember">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-ember"
                    checked={selectedCats.includes(c)}
                    onChange={() => handleCatChange(c)}
                  />
                  {c}
                </span>
                <span className="text-xs text-muted-foreground">{count}</span>
              </label>
            );
          })}
        </div>
      </div>
      <div>
        <h4 className="text-[11px] uppercase tracking-[0.22em] text-ink mb-3">Price</h4>
        <input
          type="range"
          min={0}
          max={5000}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-ember"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>$0</span><span>${maxPrice.toLocaleString()}</span></div>
      </div>
      <div>
        <h4 className="text-[11px] uppercase tracking-[0.22em] text-ink mb-3">Rating</h4>
        {[5,4,3].map(r => (
          <label key={r} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
            <input
              type="checkbox"
              className="accent-ember"
              checked={minRating === r}
              onChange={() => setMinRating(minRating === r ? 0 : r)}
            />
            <span className="flex">{Array.from({length:r}).map((_,i)=><Star key={i} className="h-3 w-3 fill-gold text-gold" />)}</span>
            <span className="text-muted-foreground text-xs">& up</span>
          </label>
        ))}
      </div>
      <div>
        <h4 className="text-[11px] uppercase tracking-[0.22em] text-ink mb-3">Brand</h4>
        <div className="space-y-1.5">
          {brands.map(b => {
            const count = PRODUCTS.filter(p => p.brand === b).length;
            return (
              <label key={b} className="flex items-center justify-between text-sm py-1 cursor-pointer">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-ember"
                    checked={selectedBrands.includes(b)}
                    onChange={() => handleBrandChange(b)}
                  />
                  {b}
                </span>
                <span className="text-xs text-muted-foreground">{count}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Shop() {
  const search = Route.useSearch();
  const [selectedCats, setSelectedCats] = useState<string[]>(search.category ? [search.category] : ["All"]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [minRating, setMinRating] = useState<number>(0);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (search.category) {
      setSelectedCats([search.category]);
    } else if (search.tag) {
      setSelectedCats(["All"]);
    }
  }, [search.category, search.tag]);

  const handleCatChange = (c: string) => {
    if (c === "All") {
      setSelectedCats(["All"]);
    } else {
      let newCats = selectedCats.filter(x => x !== "All");
      if (newCats.includes(c)) newCats = newCats.filter(x => x !== c);
      else newCats.push(c);
      if (newCats.length === 0) newCats = ["All"];
      setSelectedCats(newCats);
    }
  };

  const handleBrandChange = (b: string) => {
    setSelectedBrands(prev =>
      prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]
    );
  };

  const filteredItems = PRODUCTS.filter(p => {
    if (search.tag && p.tag !== search.tag) return false;
    if (p.price > maxPrice) return false;
    if (p.rating < minRating) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
    if (selectedCats.includes("All")) return true;
    return selectedCats.some(c =>
      p.category.toLowerCase() === c.toLowerCase() ||
      (p.subcategory && p.subcategory.toLowerCase() === c.toLowerCase())
    );
  });

  const items = filteredItems.slice(0, 36);

  const filterProps = { selectedCats, handleCatChange, selectedBrands, handleBrandChange, maxPrice, setMaxPrice, minRating, setMinRating };

  return (
    <Layout>
      <Container className="py-8 sm:py-10">
        {/* Page header */}
        <div className="flex items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-ember mb-2">All collections</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink">
              {search.tag ? `${search.tag} Pieces` : selectedCats.length === 1 && selectedCats[0] !== "All" ? selectedCats[0] : "The Edit"}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">{filteredItems.length} pieces · curated weekly</p>
          </div>
          <div className="flex items-center gap-2 text-sm shrink-0">
            {/* Mobile filter button */}
            <button
              className="lg:hidden flex items-center gap-2 h-10 px-4 rounded-full border border-border text-sm hover:border-ink"
              onClick={() => setFilterOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            {/* Sort */}
            <select className="h-10 px-3 rounded-full bg-beige border border-border text-sm hidden sm:block">
              <option>Featured</option><option>Newest</option><option>Price: low to high</option><option>Price: high to low</option><option>Top rated</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <FilterPanel {...filterProps} />
          </aside>

          {/* Product grid */}
          <div>
            {items.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">No pieces match your filters.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {items.map((p, i) => (
                  <React.Fragment key={p.id}>
                    <ProductCard key={p.id} p={p} compact />
                    {i === 7 && (
                      <div key="promo1" className="col-span-2 sm:col-span-1 rounded-2xl bg-ink text-background p-6 flex flex-col justify-between min-h-[180px]">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-gold">Atelier Pass</p>
                        <h3 className="font-display text-xl mt-3">Members save 15% on every order</h3>
                        <a href="#" className="mt-4 self-start text-xs uppercase tracking-widest border-b border-background">Join free</a>
                      </div>
                    )}
                    {i === 17 && (
                      <div key="promo2" className="col-span-2 sm:col-span-1 rounded-2xl bg-beige p-6 flex flex-col justify-between min-h-[180px]">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-ember">Free engraving</p>
                        <h3 className="font-display text-xl mt-3 text-ink">Personalise any timepiece, complimentary.</h3>
                        <a href="#" className="mt-4 self-start text-xs uppercase tracking-widest text-ink border-b border-ink">Discover</a>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
            {items.length > 0 && (
              <div className="mt-10 flex justify-center gap-2">
                {[1,2,3,4,5].map(n => (
                  <button key={n} className={`h-10 w-10 rounded-full text-sm ${n===1?"bg-ink text-background":"border border-border hover:border-ink"}`}>{n}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setFilterOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-background flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 h-16 border-b border-border shrink-0">
              <span className="font-medium text-sm uppercase tracking-widest">Filters</span>
              <button onClick={() => setFilterOpen(false)} aria-label="Close filters"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <FilterPanel {...filterProps} />
            </div>
            <div className="px-6 py-4 border-t border-border shrink-0">
              <button
                onClick={() => setFilterOpen(false)}
                className="w-full h-12 rounded-full bg-ink text-background text-sm font-medium"
              >
                Show {filteredItems.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
