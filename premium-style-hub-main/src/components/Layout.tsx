import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-[1400px] mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function SectionHeader({ eyebrow, title, link, linkLabel = "View all" }: { eyebrow?: string; title: string; link?: string; linkLabel?: string }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        {eyebrow && <p className="text-[11px] uppercase tracking-[0.22em] text-ember mb-2">{eyebrow}</p>}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-ink">{title}</h2>
      </div>
      {link && (
        <a href={link} className="text-sm border-b border-ink pb-0.5 hover:text-ember hover:border-ember transition">
          {linkLabel}
        </a>
      )}
    </div>
  );
}
