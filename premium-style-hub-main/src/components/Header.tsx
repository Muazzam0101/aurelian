import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
      <AnnouncementBar />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1 -ml-1"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo */}
        <Link to="/" className="font-display text-2xl tracking-tight text-ink shrink-0">
          Aurelian<span className="text-ember">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm">
          <Link to="/shop" search={{ category: "Watches" }} className="hover:text-ember transition">Watches</Link>
          <Link to="/shop" search={{ category: "Shoes" }} className="hover:text-ember transition">Shoes</Link>
          <Link to="/shop" search={{ tag: "New" }} className="hover:text-ember transition">New Arrivals</Link>
          <Link to="/shop" search={{ tag: "Sale" }} className="hover:text-ember transition">Sale</Link>
          <Link to="/shop" className="hover:text-ember transition">Journal</Link>
        </nav>

        {/* Search — hidden on mobile */}
        <div className="flex-1 max-w-md hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search timepieces, sneakers, brands…"
              className="w-full h-10 pl-10 pr-3 rounded-full bg-beige text-sm border border-transparent focus:border-ink/20 focus:outline-none"
            />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-0.5 sm:gap-1.5">
          <Link to="/account" className="p-2 hover:text-ember hidden sm:block"><User className="h-5 w-5" /></Link>
          <Link to="/wishlist" className="p-2 hover:text-ember"><Heart className="h-5 w-5" /></Link>
          <Link to="/cart" className="relative p-2 hover:text-ember">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-ember text-background text-[10px] flex items-center justify-center">3</span>
          </Link>
        </div>
      </div>

      {/* Mobile slide-in menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-background flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 h-16 border-b border-border">
              <Link to="/" className="font-display text-2xl text-ink" onClick={() => setMobileOpen(false)}>
                Aurelian<span className="text-ember">.</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Search */}
            <div className="px-6 py-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search…"
                  className="w-full h-10 pl-10 pr-3 rounded-full bg-beige text-sm border border-transparent focus:border-ink/20 focus:outline-none"
                />
              </div>
            </div>
            {/* Nav links */}
            <nav className="flex flex-col px-6 py-6 gap-1 text-sm flex-1">
              {[
                { label: "Watches", to: "/shop", search: { category: "Watches" } },
                { label: "Shoes", to: "/shop", search: { category: "Shoes" } },
                { label: "New Arrivals", to: "/shop", search: { tag: "New" } },
                { label: "Sale", to: "/shop", search: { tag: "Sale" } },
                { label: "Journal", to: "/shop", search: {} },
              ].map(({ label, to, search }) => (
                <Link
                  key={label}
                  to={to}
                  search={search}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 border-b border-border/50 text-ink hover:text-ember transition font-medium"
                >
                  {label}
                </Link>
              ))}
            </nav>
            {/* Bottom icons */}
            <div className="px-6 py-6 flex gap-4 border-t border-border">
              <Link to="/account" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm hover:text-ember">
                <User className="h-5 w-5" /> Account
              </Link>
              <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm hover:text-ember">
                <Heart className="h-5 w-5" /> Wishlist
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
