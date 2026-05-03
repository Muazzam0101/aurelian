import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-background text-[11px] tracking-[0.22em] uppercase">
      <div className="overflow-hidden">
        <div className="marquee whitespace-nowrap py-2 flex gap-12">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 px-6">
              <span>Complimentary worldwide shipping over $250</span>
              <span>· Lifetime servicing on all timepieces ·</span>
              <span>New Atelier collection — Limited release</span>
              <span>· 30-day returns ·</span>
              <span>Members earn 2× points this week</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border">
      <AnnouncementBar />
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <button className="md:hidden"><Menu className="h-5 w-5" /></button>
        <Link to="/" className="font-display text-2xl tracking-tight text-ink">
          Aurelian<span className="text-ember">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          <Link to="/shop" search={{ category: "Watches" }} className="hover:text-ember transition">Watches</Link>
          <Link to="/shop" search={{ category: "Shoes" }} className="hover:text-ember transition">Shoes</Link>
          <Link to="/shop" search={{ tag: "New" }} className="hover:text-ember transition">New Arrivals</Link>
          <Link to="/shop" search={{ tag: "Sale" }} className="hover:text-ember transition">Sale</Link>
          <Link to="/shop" className="hover:text-ember transition">Journal</Link>
        </nav>
        <div className="flex-1 max-w-md hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search timepieces, sneakers, brands…"
              className="w-full h-10 pl-10 pr-3 rounded-full bg-beige text-sm border border-transparent focus:border-ink/20 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Link to="/account" className="p-2 hover:text-ember"><User className="h-5 w-5" /></Link>
          <Link to="/wishlist" className="p-2 hover:text-ember"><Heart className="h-5 w-5" /></Link>
          <Link to="/cart" className="relative p-2 hover:text-ember">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-ember text-background text-[10px] flex items-center justify-center">3</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
