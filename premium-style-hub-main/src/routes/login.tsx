import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, Container } from "@/components/Layout";
import { pick } from "@/data/products";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Aurelian" }] }),
  component: Login,
});

function Login() {
  const thumbs = pick(6, 0);
  return (
    <Layout>
      <Container className="py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="bg-beige rounded-3xl p-10 max-w-md mx-auto w-full">
            <p className="text-[11px] uppercase tracking-[0.22em] text-ember mb-2">Welcome back</p>
            <h1 className="font-display text-4xl text-ink">Sign in</h1>
            <p className="text-sm text-muted-foreground mt-2">to continue to the Maison.</p>
            <form className="mt-7 space-y-4">
              <label className="block">
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Email</span>
                <input type="email" className="mt-1 w-full h-12 px-4 rounded-xl bg-background border border-transparent focus:border-ink outline-none text-sm" />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Password</span>
                <input type="password" className="mt-1 w-full h-12 px-4 rounded-xl bg-background border border-transparent focus:border-ink outline-none text-sm" />
              </label>
              <div className="flex justify-between text-xs">
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-ember" />Remember me</label>
                <a href="#" className="underline text-muted-foreground">Forgot password?</a>
              </div>
              <button type="button" className="w-full h-12 rounded-full bg-ink text-background text-sm">Sign in</button>
              <button type="button" className="w-full h-12 rounded-full border border-ink text-sm">Continue with Apple</button>
              <p className="text-center text-sm text-muted-foreground">New here? <Link to="/signup" className="text-ink underline">Create account</Link></p>
            </form>
          </div>
          <div className="hidden lg:grid grid-cols-3 gap-3">
            {thumbs.map((p, i) => (
              <div key={p.id} className={`rounded-2xl overflow-hidden bg-beige ${i===0?"col-span-2 row-span-2 aspect-square":"aspect-square"}`}>
                <img src={p.image} alt="" className="w-full h-full object-cover img-zoom" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
}
