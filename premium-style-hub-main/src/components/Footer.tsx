import { Link } from "@tanstack/react-router";
import { pick } from "@/data/products";

export function Footer() {
  const thumbs = pick(8, 5);
  return (
    <footer className="mt-16 sm:mt-24 border-t border-border bg-beige">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-2 md:grid-cols-6 gap-8 sm:gap-10">
        <div className="col-span-2">
          <div className="font-display text-3xl text-ink">Aurelian<span className="text-ember">.</span></div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Considered timepieces and footwear, made for a quietly remarkable life.
          </p>
          <div className="mt-5 flex gap-2">
            <input placeholder="Email address" className="h-10 px-4 rounded-full bg-background border border-border text-sm flex-1 min-w-0" />
            <button className="h-10 px-5 rounded-full bg-ink text-background text-xs uppercase tracking-widest shrink-0">Join</button>
          </div>
        </div>
        {[
          { t: "Shop", l: ["All Watches","All Shoes","New Arrivals","Sale","Limited"] },
          { t: "Care", l: ["Servicing","Warranty","Sizing","Returns","Contact"] },
          { t: "Atelier", l: ["Our Story","Craftsmanship","Journal","Press","Stores"] },
          { t: "Account", l: ["Sign in","Orders","Wishlist","Addresses","Help"] },
        ].map((c) => (
          <div key={c.t}>
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-ink mb-4">{c.t}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {c.l.map(i => <li key={i}><Link to="/shop" className="hover:text-ember">{i}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">From the collection</p>
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {thumbs.map(p => (
              <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-background">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover img-zoom" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2026 Aurelian Maison. All rights reserved.</p>
          <div className="flex gap-5"><span>Privacy</span><span>Terms</span><span>Cookies</span><span>Accessibility</span></div>
        </div>
      </div>
    </footer>
  );
}
