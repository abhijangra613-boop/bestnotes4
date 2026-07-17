import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

export function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("bn-theme");
    const preferred =
      stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setDark(preferred === "dark");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    if (typeof window !== "undefined") {
      localStorage.setItem("bn-theme", dark ? "dark" : "light");
    }
  }, [dark]);
  return [dark, setDark] as const;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useDarkMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/haryana-group-d-syllabus", label: "Group D Syllabus" },
    { to: "/#notes", label: "All Notes" },
    { to: "/#bundle", label: "Bundle" },
    { to: "/#about", label: "About" },
    { to: "/#reviews", label: "Reviews" },
    { to: "/#faq", label: "FAQ" },
    { to: "/#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-page flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-lg">
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary), oklch(0.55 0.24 290))",
            }}
          >
            B
          </span>
          <span>BestNotes</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.to}
              className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/40 transition"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle dark mode"
            onClick={() => setDark(!dark)}
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary transition"
          >
            {dark ? "☀" : "☾"}
          </button>
          <a href="/#bundle" className="hidden md:inline-flex btn-gold">
            Buy Bundle ₹299
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="lg:hidden h-10 w-10 rounded-xl border border-border text-foreground grid place-items-center"
          >
            ≡
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <aside
            className="absolute right-0 top-0 h-full w-72 bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="font-heading font-bold">Menu</span>
              <button onClick={() => setOpen(false)} className="text-xl">×</button>
            </div>
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-accent"
                >
                  {l.label}
                </a>
              ))}
              <a href="/#bundle" className="btn-gold mt-4" onClick={() => setOpen(false)}>
                Buy Bundle ₹299
              </a>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}

type LegalKey = "privacy" | "refund" | "terms";

const LEGAL: Record<LegalKey, { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "We collect name, email and payment info for order processing only.",
      "Payment data is handled by Razorpay — we never store card details.",
      "We do not sell or share your data with third parties.",
      "We may send order confirmation and update messages via Telegram.",
      "For any data request, contact us on Telegram @Bestnotes077.",
    ],
  },
  refund: {
    title: "Refund Policy",
    body: [
      "Digital products are non-refundable once downloaded.",
      "If payment is deducted but PDF not received, message us on Telegram within 24 hours with your payment ID — we resolve immediately.",
      "Duplicate payments are refunded within 5–7 working days.",
      "For any payment issue, contact @Bestnotes077 on Telegram.",
    ],
  },
  terms: {
    title: "Terms of Use",
    body: [
      "Notes are for personal study use only.",
      "Redistribution, resale or sharing of PDFs is prohibited.",
      "BestNotes reserves the right to update prices at any time.",
      "By purchasing you agree to these terms.",
      "Governing law: India.",
    ],
  },
};

export function Footer() {
  const [legal, setLegal] = useState<LegalKey | null>(null);
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container-page py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-heading font-bold text-lg">
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary), oklch(0.55 0.24 290))",
              }}
            >B</span>
            BestNotes
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Premium PDF study notes for Haryana Group D & competitive exams.
          </p>
          <div className="mt-4 flex gap-3 text-sm">
            <a href="https://t.me/bestnotes077" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">Telegram</a>
            <a href="https://www.instagram.com/bestnotes077?igsh=MThkbXB0cWVnYnBmMQ%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">Instagram</a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/#notes" className="hover:text-primary">All Notes</a></li>
            <li><a href="/#bundle" className="hover:text-primary">Bundle</a></li>
            <li><a href="/#free" className="hover:text-primary">Free Notes</a></li>
            <li><a href="/#reviews" className="hover:text-primary">Reviews</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/#about" className="hover:text-primary">About</a></li>
            <li><a href="/#faq" className="hover:text-primary">FAQ</a></li>
            <li><a href="/#contact" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><button onClick={() => setLegal("privacy")} className="hover:text-primary text-left">Privacy Policy</button></li>
            <li><button onClick={() => setLegal("refund")} className="hover:text-primary text-left">Refund Policy</button></li>
            <li><button onClick={() => setLegal("terms")} className="hover:text-primary text-left">Terms</button></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BestNotes. Made with care for Haryana aspirants.
      </div>

      {legal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4"
          onClick={() => setLegal(null)}
        >
          <div
            className="card-soft max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{LEGAL[legal].title}</h3>
              <button onClick={() => setLegal(null)} className="text-2xl leading-none">×</button>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {LEGAL[legal].body.map((p, i) => (
                <li key={i} className="flex gap-2"><span className="text-primary">•</span><span>{p}</span></li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
    </div>
  );
}

// Reveal on scroll
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("reveal-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
