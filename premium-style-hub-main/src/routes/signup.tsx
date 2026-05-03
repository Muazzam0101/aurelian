import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, Container } from "@/components/Layout";
import { pick } from "@/data/products";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Aurelian" }] }),
  component: Signup,
});

function Signup() {
  const thumbs = pick(6, 12);
  return (
    <Layout>
      <Container className="py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="hidden lg:grid grid-cols-3 gap-3 order-last lg:order-first">
            {thumbs.map((p, i) => (
              <div key={p.id} className={`rounded-2xl overflow-hidden bg-beige ${i===5?"col-span-2 row-span-2 aspect-square":"aspect-square"}`}>
                <img src={p.image} alt="" className="w-full h-full object-cover img-zoom" />
              </div>
            ))}
          </div>
          <div className="bg-beige rounded-3xl p-10 max-w-md mx-auto w-full">
            <p className="text-[11px] uppercase tracking-[0.22em] text-ember mb-2">Join the Maison</p>
            <h1 className="font-display text-4xl text-ink">Create account</h1>
            <p className="text-sm text-muted-foreground mt-2">Members earn 2× points and get free engraving.</p>
            <form className="mt-7 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <label className="block"><span className="text-[11px] uppercase tracking-widest text-muted-foreground">First name</span><input className="mt-1 w-full h-12 px-4 rounded-xl bg-background border border-transparent focus:border-ink outline-none text-sm" /></label>
                <label className="block"><span className="text-[11px] uppercase tracking-widest text-muted-foreground">Last name</span><input className="mt-1 w-full h-12 px-4 rounded-xl bg-background border border-transparent focus:border-ink outline-none text-sm" /></label>
              </div>
              <label className="block"><span className="text-[11px] uppercase tracking-widest text-muted-foreground">Email</span><input type="email" className="mt-1 w-full h-12 px-4 rounded-xl bg-background border border-transparent focus:border-ink outline-none text-sm" /></label>
              <label className="block"><span className="text-[11px] uppercase tracking-widest text-muted-foreground">Password</span><input type="password" className="mt-1 w-full h-12 px-4 rounded-xl bg-background border border-transparent focus:border-ink outline-none text-sm" /></label>
              <button type="button" className="w-full h-12 rounded-full bg-ink text-background text-sm">Create account</button>
              <p className="text-center text-sm text-muted-foreground">Already a member? <Link to="/login" className="text-ink underline">Sign in</Link></p>
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
