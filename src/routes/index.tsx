import { getNotes } from "@/lib/notes";
import { mapNoteToProduct } from "@/lib/mapNote";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { Page, useReveal } from "@/components/Layout";
import { ProductCover } from "@/components/ProductCover";

import {
  BUNDLE,
  CATEGORIES,
  FREE_NOTES,
  PRODUCTS,
  type Language,
  type Product,
} from "@/lib/products-data";

import { startCheckout } from "@/lib/checkout";
import { createFreeSignedDownloadUrl } from "@/lib/razorpay.functions";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  useReveal();

  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await getNotes();
        const mappedProducts = notes.map(mapNoteToProduct);

        if (mappedProducts.length > 0) {
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Failed to load notes from Supabase:", error);
      } finally {
        setLoading(false);
      }
    }

    loadNotes();
  }, []);

  return (
    <Page>
      <Hero />
      <TrustBar />
      <Features />

      <BundleSection products={products} />

      <AboutSection />

      <Catalog
        products={products}
        loading={loading}
      />

      <FreeNotesSection />
      <Reviews />
      <FAQ />
      <Contact />
    </Page>
  );
}

/* ---------------- TRUST BAR ---------------- */

function TrustBar() {
  const items = [
    { icon: "🔒", text: "100% Secure Payment (Razorpay)" },
    { icon: "⚡", text: "Instant PDF Delivery" },
    { icon: "↩", text: "3 Downloads Per Purchase" },
    { icon: "🌐", text: "Hindi & English Available" },
    { icon: "📞", text: "Telegram Support 7 Days" },
  ];
  return (
    <section className="border-y border-border" style={{ background: "var(--color-muted)" }}>
      <div className="container-page py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
        {items.map((it) => (
          <div key={it.text} className="flex items-center gap-2">
            <span className="text-base" aria-hidden>{it.icon}</span>
            <span className="font-medium">{it.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function useCountUp(target: number, duration = 1500) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n;
}

function HeroStat({ value, prefix, suffix, label, decimals = 0 }: { value: number; prefix?: string; suffix?: string; label: string; decimals?: number }) {
  const n = useCountUp(value);
  const display = decimals > 0 ? (n / Math.pow(10, decimals)).toFixed(decimals) : n.toLocaleString();
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold gradient-text">{prefix}{display}{suffix}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 80% -10%, oklch(0.9 0.1 264 / 0.35), transparent 70%), radial-gradient(50% 40% at -10% 20%, oklch(0.85 0.14 85 / 0.25), transparent 70%)",
        }}
      />
      <div className="container-page pt-8 pb-20 grid gap-12 lg:grid-cols-2 items-center">
        <div className="reveal">
          <span className="chip chip-active" style={{ background: "var(--color-primary-soft)", color: "var(--color-primary)", borderColor: "transparent" }}>
            ★ Trusted by 12,000+ Haryana aspirants
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Haryana Group D<br />
            <span className="gradient-text">Premium Notes</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-lg">
            Handwritten, exam-focused PDF notes in Hindi & English.
            Instant download. Updated for 2026. Prepared by top Haryana educators.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#bundle" className="btn-gold">Buy Bundle ₹299 →</a>
            <a href="#notes" className="btn-ghost">View All Notes</a>
          </div>
          <div className="mt-8 grid grid-cols-4 gap-4 max-w-md">
            <HeroStat value={12000} suffix="+" label="Students" />
            <HeroStat value={49} decimals={1} label="Rating ★" />
            <HeroStat value={8} label="Subjects" />
            <HeroStat value={99} prefix="₹" label="Starting" />
          </div>
        </div>

        <div className="relative reveal">
          <DeviceMockup />
          <FloatingBadge className="absolute -top-2 -left-4" tone="success" icon="✓">
            Payment Verified
          </FloatingBadge>
          <FloatingBadge className="absolute top-1/2 -right-4" tone="gold" icon="★">
            4.9 Rating
          </FloatingBadge>
          <FloatingBadge className="absolute -bottom-2 left-8" tone="primary" icon="↓">
            PDF Ready
          </FloatingBadge>
        </div>
      </div>
    </section>
  );
}

function FloatingBadge({
  children, icon, tone, className,
}: {
  children: React.ReactNode; icon: string; tone: "success" | "gold" | "primary"; className?: string;
}) {
  const map = {
    success: "var(--color-success)",
    gold: "var(--color-gold)",
    primary: "var(--color-primary)",
  } as const;
  return (
    <div
      className={`flex items-center gap-2 rounded-2xl bg-card px-4 py-3 text-sm font-semibold shadow-lg border border-border ${className ?? ""}`}
      style={{ boxShadow: "var(--shadow-lifted)" }}
    >
      <span
        className="h-8 w-8 rounded-full grid place-items-center text-white text-sm"
        style={{ background: map[tone] }}
      >{icon}</span>
      {children}
    </div>
  );
}

function DeviceMockup() {
  return (
    <div className="relative mx-auto max-w-md">
      <div
        className="rounded-[36px] p-3 border border-border"
        style={{ background: "linear-gradient(160deg, oklch(0.28 0.05 264), oklch(0.18 0.04 264))", boxShadow: "var(--shadow-glow)" }}
      >
        <div className="rounded-[28px] bg-card p-6 aspect-[9/13] flex flex-col">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-destructive" />
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--color-gold)" }} />
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--color-success)" }} />
            <span className="ml-auto">bestnotes.in</span>
          </div>
          <h3 className="mt-6 font-heading text-xl font-bold">Haryana GK Notes</h3>
          <p className="text-xs text-muted-foreground">Districts · History · Culture</p>
          <div className="mt-4 space-y-2 flex-1">
            {[
              { w: 92, c: "var(--color-primary)" },
              { w: 78, c: "var(--color-foreground)" },
              { w: 84, c: "var(--color-foreground)" },
              { w: 60, c: "var(--color-gold)" },
              { w: 88, c: "var(--color-foreground)" },
              { w: 72, c: "var(--color-success)" },
              { w: 66, c: "var(--color-foreground)" },
            ].map((l, i) => (
              <div
                key={i}
                className="h-2 rounded-full"
                style={{ width: `${l.w}%`, background: l.c, opacity: 0.85 }}
              />
            ))}
          </div>
          <div
            className="mt-4 h-10 rounded-xl grid place-items-center text-primary-foreground text-sm font-semibold"
            style={{ background: "var(--color-primary)" }}
          >
            Download PDF
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- FEATURES ---------------- */

function Features() {
  const items = [
    { icon: "⚡", title: "Instant Download", text: "Pay once, get PDF in seconds. No waiting, no shipping." },
    { icon: "🔄", title: "Updated for 2026", text: "Latest syllabus, schemes and current affairs." },
    { icon: "💸", title: "Affordable Pricing", text: "Individual notes ₹99 each. Full bundle at ₹299." },
    { icon: "🎯", title: "Exam Oriented", text: "Every page is trimmed to what actually gets asked." },
    { icon: "✍️", title: "Handwritten Feel", text: "Clean layouts and diagrams — easy to revise." },
    { icon: "🌐", title: "Hindi & English", text: "Study in the language you're comfortable in." },
  ];
  return (
    <section className="section container-page">
      <div className="text-center max-w-2xl mx-auto reveal">
        <h2 className="text-3xl md:text-4xl font-bold">Why aspirants pick BestNotes</h2>
        <p className="mt-3 text-muted-foreground">
          Focused, current and priced for every serious student.
        </p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="card-soft p-6 reveal">
            <div
              className="h-12 w-12 rounded-2xl grid place-items-center text-2xl mb-4"
              style={{ background: "var(--color-primary-soft)" }}
            >{it.icon}</div>
            <h3 className="text-lg font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- BUNDLE ---------------- */

function BundleSection({ products }: { products: Product[] }) {
  const [lang, setLang] = useState<Language>("hi");
  return (
    <section id="bundle" className="section">
      <div className="container-page">
        <div
          className="relative overflow-hidden rounded-3xl p-8 md:p-14 reveal"
          style={{
            background: "linear-gradient(135deg, oklch(0.25 0.09 264), oklch(0.2 0.06 290))",
            color: "white",
          }}
        >
          <div className="absolute inset-0 opacity-30" aria-hidden style={{
            background: "radial-gradient(50% 60% at 90% 10%, oklch(0.85 0.14 85 / 0.5), transparent 70%)",
          }} />
          <div className="relative grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <span className="inline-flex badge-gold">★ MOST POPULAR</span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold">
                Complete Group D Bundle
              </h2>
              <p className="mt-3 text-white/80 max-w-md">
                All 6 subjects. Both languages. Every update — free, forever.
                One payment, lifetime downloads.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-2 text-sm text-white/90">
                {BUNDLE.includes.map((id) => {
                  const p = PRODUCTS.find((x) => x.id === id)!;
                  return <li key={id}>✓ {p.title}</li>;
                })}
              </ul>

              <div className="mt-8 inline-flex rounded-xl p-1 bg-white/10">
                {(["hi", "en"] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-4 py-1.5 text-sm rounded-lg font-medium transition ${
                      lang === l ? "bg-white text-foreground" : "text-white/80"
                    }`}
                  >
                    {l === "hi" ? "हिन्दी" : "English"}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-5xl font-bold" style={{ color: "var(--color-gold)" }}>
                  ₹{BUNDLE.price}
                </span>
                <span className="text-xl text-white/50 line-through">₹{BUNDLE.priceWas}</span>
                <span className="badge-success">70% OFF</span>
              </div>

              <div className="mt-6 rounded-2xl bg-white/10 border border-white/15 p-4 text-sm">
                <div className="text-white/70 mb-2 font-medium">If you buy separately:</div>
                <div className="space-y-1 font-mono text-xs text-white/85">
                  <div className="flex justify-between"><span>Haryana GK</span><span>₹99</span></div>
                  <div className="flex justify-between"><span>+ Reasoning</span><span>₹99</span></div>
                  <div className="flex justify-between"><span>+ Maths</span><span>₹99</span></div>
                  <div className="flex justify-between"><span>+ Hindi</span><span>₹99</span></div>
                  <div className="flex justify-between"><span>+ English</span><span>₹99</span></div>
                  <div className="flex justify-between"><span>+ Science</span><span>₹99</span></div>
                  <div className="flex justify-between"><span>+ Current Affairs</span><span>₹99</span></div>
                  <div className="flex justify-between border-t border-white/20 pt-1 mt-1"><span>Total</span><span>₹693</span></div>
                  <div className="flex justify-between"><span>Bundle price</span><span>₹299</span></div>
                  <div
                    className="flex justify-between font-bold px-2 py-1 rounded mt-1"
                    style={{ background: "var(--color-success)", color: "white" }}
                  ><span>You save</span><span>₹394</span></div>
                </div>
              </div>

              <button
                onClick={() =>
                  startCheckout({
                    productId: BUNDLE.id,
                    lang,
                    amount: BUNDLE.price,
                    title: BUNDLE.title,
                    description: `${BUNDLE.title} — ${lang === "hi" ? "Hindi" : "English"}`,
                  })
                }
                className="btn-gold mt-6"
              >
                Buy Complete Bundle →
              </button>
            </div>

            <div className="relative">
              <NotesPile products={products} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NotesPile({ products }: { products: Product[] }) {
  const stack = products.slice(0, 6);
  return (
    <div className="relative h-[420px] mx-auto max-w-sm">
      {stack.map((p, i) => {
        const rot = (i - stack.length / 2) * 4;
        const y = i * 12;
        return (
          <div
            key={p.id}
            className="absolute inset-x-0 mx-auto w-[260px] rounded-2xl overflow-hidden border border-white/20 shadow-xl"
            style={{
              transform: `translateY(${y}px) rotate(${rot}deg)`,
              zIndex: i,
            }}
          >
            <ProductCover
              title={p.title}
              subtitle={p.subtitle}
              accent={p.accent}
              icon={p.icon}
              thumbnail={p.thumbnail}
              size="sm"
            />
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- ABOUT ---------------- */

function AboutSection() {
  const stats = [
    { n: "12K+", l: "Students trust us" },
    { n: "4.9★", l: "Average rating" },
    { n: "8", l: "Subjects covered" },
    { n: "100%", l: "Exam focused" },
  ];
  return (
    <section id="about" className="section container-page">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <h2 className="text-3xl md:text-4xl font-bold">Made by a Haryana aspirant, for aspirants</h2>
          <p className="mt-4 text-muted-foreground">
            BestNotes was created because the good notes that toppers use were
            never publicly available. Every serious aspirant was wasting hours
            collecting material from YouTube, Telegram groups and photocopies.
            We decided to change that.
          </p>
          <p className="mt-4 text-muted-foreground">
            Every note set is written specifically for the HSSC Group D pattern,
            updated after every exam cycle, and available in both Hindi and
            English so no student is left behind because of language.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 reveal">
          {stats.map((s) => (
            <div key={s.l} className="card-soft p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">{s.n}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CATALOG ---------------- */

function Catalog({
  products,
  loading,
}: {
  products: Product[];
  loading: boolean;
}) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [visible, setVisible] = useState(12);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;

      if (!q) return true;

      return (
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
  }, [query, cat, products]);

  return (
    <section id="notes" className="section container-page">
      <div className="flex flex-wrap items-end justify-between gap-6 reveal">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">All Notes</h2>
          <p className="mt-2 text-muted-foreground">Pick a subject or grab the full bundle.</p>
        </div>
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes…"
            className="h-11 pl-4 pr-10 rounded-xl border border-border bg-card w-64 text-sm outline-none focus:border-primary transition"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">⌕</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 reveal">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`chip ${cat === c.id ? "chip-active" : ""}`}
          >{c.label}</button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, visible).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">No notes match your search.</p>
      )}

      {visible < filtered.length && (
        <div className="mt-10 text-center">
          <button onClick={() => setVisible((v) => v + 6)} className="btn-ghost">Load more</button>
        </div>
      )}
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [lang, setLang] = useState<Language>(product.languages[0]);
  const [wish, setWish] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = JSON.parse(localStorage.getItem("bn-wishlist") || "[]") as string[];
    setWish(w.includes(product.id));
  }, [product.id]);

  const toggleWish = () => {
    const w = JSON.parse(localStorage.getItem("bn-wishlist") || "[]") as string[];
    const next = w.includes(product.id) ? w.filter((x) => x !== product.id) : [...w, product.id];
    localStorage.setItem("bn-wishlist", JSON.stringify(next));
    setWish(!wish);
  };

  const pricing = product.pricing[lang];
  const off = Math.round((1 - pricing.price / pricing.priceWas) * 100);

  return (
    <article className="card-soft flex flex-col reveal overflow-hidden">
      <div className="relative">
        <ProductCover
          title={product.title}
          subtitle={product.subtitle}
          accent={product.accent}
          icon={product.icon}
          thumbnail={product.thumbnail}
          updated={product.updatedDate}
        />
        <button
          aria-label="Wishlist"
          onClick={toggleWish}
          className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/90 backdrop-blur grid place-items-center text-lg shadow"
          style={{ color: wish ? "var(--color-destructive)" : "var(--color-muted-foreground)" }}
        >{wish ? "♥" : "♡"}</button>
        <div className="absolute top-3 left-3 flex gap-2">
          {product.bestSeller && <span className="badge-gold">Bestseller</span>}
          {product.newArrival && <span className="badge-success">New</span>}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{product.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{product.subtitle}</p>
          </div>
          <span className="text-xs font-semibold whitespace-nowrap" style={{ color: "var(--color-gold)" }}>
            ★ {product.rating}
          </span>
        </div>

        {product.languages.length > 1 && (
          <div className="mt-4 inline-flex rounded-lg bg-muted p-1 w-fit">
            {product.languages.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                  lang === l ? "bg-card shadow-sm text-primary" : "text-muted-foreground"
                }`}
              >{product.pricing[l].label}</button>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-bold">₹{pricing.price}</span>
          <span className="text-sm text-muted-foreground line-through">₹{pricing.priceWas}</span>
          <span className="text-xs font-semibold" style={{ color: "var(--color-success)" }}>
            {off}% OFF
          </span>
        </div>

        <div className="mt-5 flex gap-2">
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="btn-ghost flex-1"
          >Details</Link>
          <button
            onClick={() =>
              startCheckout({
                productId: product.id,
                lang,
                amount: pricing.price,
                title: product.title,
                description: `${product.title} — ${pricing.label}`,
              })
            }
            className="btn-primary flex-1"
          >Buy Now</button>
        </div>
      </div>
    </article>
  );
}

/* ---------------- FREE NOTES ---------------- */

/* ---------------- FREE NOTES ---------------- */

function FreeNotesSection() {
  return (
    <section id="free" className="section container-page">
      <div className="text-center max-w-xl mx-auto reveal">
        <span className="badge-success">
          100% Free
        </span>

        <h2 className="mt-4 text-3xl md:text-4xl font-bold">
          Free samples to try
        </h2>

        <p className="mt-2 text-muted-foreground">
          No signup. No payment. Direct PDF download.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FREE_NOTES.map((note) => (
          <FreeNoteCard
            key={note.id}
            note={note}
          />
        ))}
      </div>
    </section>
  );
}


/* ---------------- FREE NOTE CARD ---------------- */

function FreeNoteCard({
  note,
}: {
  note: (typeof FREE_NOTES)[number];
}) {
  const [lang, setLang] = useState<Language>(
    note.languages[0],
  );

  const [downloading, setDownloading] =
    useState(false);

  const pdfPath = note.pdf[lang];


  const downloadFreePDF = async () => {
    if (!pdfPath) {
      alert(
        "PDF is not available in this language.",
      );

      return;
    }

    try {
      setDownloading(true);

      const result =
        await createFreeSignedDownloadUrl({
          data: {
            pdfPath,
          },
        });

      if (
        !result.success ||
        !result.downloadUrl
      ) {
        throw new Error(
          "Download URL unavailable",
        );
      }

      const a =
        document.createElement("a");

      a.href =
        result.downloadUrl;

      a.target =
        "_blank";

      a.rel =
        "noopener noreferrer";

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);

    } catch (error) {
      console.error(
        "Free PDF download failed:",
        error,
      );

      alert(
        "Could not download the PDF. Please try again.",
      );

    } finally {
      setDownloading(false);
    }
  };


  return (
    <div className="card-soft overflow-hidden reveal">

      {/* POSTER */}

      <ProductCover
        title={note.title}
        subtitle={note.subtitle}
        accent={note.accent}
        icon={note.icon}
        thumbnail={note.thumbnail}
        size="sm"
      />


      <div className="p-5">

        <h3 className="font-semibold">
          {note.title}
        </h3>

        <p className="text-xs text-muted-foreground mt-1">
          {note.subtitle}
        </p>


        {/* LANGUAGE SELECTION */}

        {note.languages.length > 1 && (
          <div className="mt-4 inline-flex rounded-lg bg-muted p-1 w-full">

            {note.languages.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() =>
                  setLang(l)
                }
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition ${
                  lang === l
                    ? "bg-card shadow-sm text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {l === "hi"
                  ? "हिन्दी"
                  : "English"}
              </button>
            ))}

          </div>
        )}


        {/* DOWNLOAD BUTTON */}

        <button
          type="button"
          onClick={
            downloadFreePDF
          }
          disabled={
            downloading ||
            !pdfPath
          }
          className="btn-primary mt-4 w-full"
        >
          {downloading
            ? "Preparing Download…"
            : `Download Free — ${
                lang === "hi"
                  ? "हिन्दी"
                  : "English"
              }`}
        </button>

      </div>
    </div>
  );
}
/* ---------------- REVIEWS ---------------- */

function Reviews() {
  const reviews = [
    { name: "Sunil Yadav", subject: "Group D Qualified · Hisar", tag: "Haryana GK Notes", rating: 5, text: "Haryana GK notes covered all 22 districts in detail. Got 3 direct questions from these notes in my exam. Cleared Group D in first attempt." },
    { name: "Kavita Devi", subject: "Group D Aspirant · Rohtak", tag: "Complete Bundle", rating: 5, text: "Hindi medium mein itne clean notes pehli baar dekhe. Reasoning shortcuts ne meri speed double kar di. Bundle lena sahi decision tha." },
    { name: "Ramesh Bishnoi", subject: "HSSC Qualified · Sirsa", tag: "Current Affairs 2026", rating: 5, text: "Current affairs notes are updated every month — no other seller does this. July 2026 update already uploaded. Worth every rupee." },
    { name: "Pooja Sangwan", subject: "Group D Aspirant · Panipat", tag: "Mathematics Notes", rating: 5, text: "Maths notes mein har topic ke shortcuts diye hain. Percentage aur ratio questions ab 30 seconds mein solve ho jaate hain." },
    { name: "Deepak Hooda", subject: "Group D Cleared · Bhiwani", tag: "General Science Notes", rating: 5, text: "Science notes are perfectly mapped to Group D syllabus. No unnecessary topics. PDF download was instant after Razorpay payment." },
    { name: "Anita Kumari", subject: "Group D Aspirant · Karnal", tag: "Hindi Grammar Notes", rating: 4, text: "Good quality notes. Hindi grammar section is very detailed. Would love mock tests in future. Overall very satisfied with the purchase." },
  ];

  const dist = [
    { star: 5, pct: 82 },
    { star: 4, pct: 12 },
    { star: 3, pct: 4 },
    { star: 2, pct: 1 },
    { star: 1, pct: 1 },
  ];

  return (
    <section id="reviews" className="section container-page">
      <div className="grid gap-10 lg:grid-cols-[300px_1fr] items-start">
        <div className="reveal card-soft p-6">
          <div className="text-5xl font-bold gradient-text">4.9</div>
          <div className="mt-1 text-sm" style={{ color: "var(--color-gold)" }}>★★★★★</div>
          <div className="text-xs text-muted-foreground">Based on 4,000+ reviews</div>
          <div className="mt-4 space-y-2">
            {dist.map((d) => (
              <div key={d.star} className="flex items-center gap-3 text-xs">
                <span className="w-6">{d.star}★</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full" style={{ width: `${d.pct}%`, background: "var(--color-gold)" }} />
                </div>
                <span className="w-8 text-right text-muted-foreground">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {reviews.map((r) => (
            <div key={r.name} className="card-soft p-5 reveal">
              <div className="flex items-center gap-3">
                <Avatar name={r.name} />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.subject}</div>
                </div>
                <span className="badge-success">✓ Verified</span>
              </div>
              <div className="mt-2 text-sm" style={{ color: "var(--color-gold)" }}>
                {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
              <div className="mt-3 inline-flex chip text-xs">{r.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Avatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();
  const hue = (name.charCodeAt(0) * 37) % 360;
  return (
    <div
      className="h-10 w-10 rounded-full grid place-items-center font-semibold text-white"
      style={{ background: `hsl(${hue} 70% 50%)` }}
    >{initial}</div>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ() {
  const items = [
    { q: "How do I get the PDF after paying?", a: "Instantly. The moment Razorpay confirms your payment, the PDF download starts automatically. You also get a download page link you can use up to 3 times." },
    { q: "Can I download more than once?", a: "Yes — each purchase allows 3 downloads. If you need more, message us on Telegram with your payment ID and we'll help immediately." },
    { q: "Are notes available in Hindi and English both?", a: "Yes. Most subjects have both Hindi and English versions. Hindi Grammar Notes are Hindi only (as the subject requires). Choose your language before clicking Buy Now." },
    { q: "Do you update the notes?", a: "Yes. Current Affairs is updated every month. Other notes are refreshed after each exam cycle. All updates are free for existing buyers." },
    { q: "Is the payment 100% secure?", a: "Yes. We use Razorpay — India's most trusted payment gateway. We never see your card or UPI details. All transactions are encrypted." },
    { q: "What is your refund policy?", a: "Since PDFs are delivered digitally and instantly, we do not offer refunds after download. Please try our free sample notes first. For any issues, message us on Telegram — we resolve everything." },
    { q: "Can I share the PDF with friends?", a: "Notes are for personal use only. Sharing or redistributing PDFs is not allowed. Each purchase covers one student." },
    { q: "Which exams are these notes useful for?", a: "Primarily Haryana Group D (HSSC). Also useful for Haryana CET, Haryana Police, SSC GD, and other state-level exams with similar syllabus." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section container-page">
      <div className="text-center max-w-xl mx-auto reveal">
        <h2 className="text-3xl md:text-4xl font-bold">Frequently asked</h2>
        <p className="mt-2 text-muted-foreground">Everything you need to know.</p>
      </div>
      <div className="mt-10 max-w-2xl mx-auto grid gap-3">
        {items.map((it, i) => (
          <div key={i} className="card-soft overflow-hidden reveal">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium"
            >
              <span>{it.q}</span>
              <span className="text-primary text-xl transition-transform" style={{ transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            <div
              className="grid transition-all duration-300"
              style={{
                gridTemplateRows: open === i ? "1fr" : "0fr",
              }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-muted-foreground">{it.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */

function Contact() {
  const items = [
    { icon: "✈", label: "Telegram", value: "@bestnotes077", href: "https://t.me/bestnotes077" },
    { icon: "📷", label: "Instagram", value: "@bestnotes077", href: "https://www.instagram.com/bestnotes077?igsh=MThkbXB0cWVnYnBmMQ%3D%3D&utm_source=qr" },
  ];
  return (
    <section id="contact" className="section container-page">
      <div className="text-center max-w-xl mx-auto reveal">
        <h2 className="text-3xl md:text-4xl font-bold">We're here to help</h2>
        <p className="mt-2 text-muted-foreground">Reach out on whichever platform you prefer.</p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            target="_blank"
            rel="noreferrer"
            className="card-soft p-6 text-center reveal"
          >
            <div className="text-3xl">{it.icon}</div>
            <div className="mt-2 font-semibold">{it.label}</div>
            <div className="text-xs text-muted-foreground mt-1">{it.value}</div>
          </a> 
        ))}
      </div>
    </section>
  );
}
