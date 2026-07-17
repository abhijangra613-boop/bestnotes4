import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { Page } from "@/components/Layout";
import { ProductCover } from "@/components/ProductCover";
import { findProduct, PRODUCTS, type Language } from "@/lib/products-data";
import { startCheckout } from "@/lib/checkout";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = findProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — BestNotes" }] };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.title} — BestNotes` },
        { name: "description", content: p.description.slice(0, 155) },
        { property: "og:title", content: `${p.title} — BestNotes` },
        { property: "og:description", content: p.description.slice(0, 155) },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <Page>
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <p className="mt-2 text-muted-foreground">This note may have been removed.</p>
        <Link to="/" className="btn-primary mt-6">Back to home</Link>
      </div>
    </Page>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [lang, setLang] = useState<Language>(product.languages[0]);
  const pricing = product.pricing[lang];
  const off = Math.round((1 - pricing.price / pricing.priceWas) * 100);
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <Page>
      <section className="container-page py-10">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to all notes
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl overflow-hidden card-soft">
            <ProductCover
              title={product.title}
              subtitle={product.subtitle}
              accent={product.accent}
              icon={product.icon}
              thumbnail={product.thumbnail}
              size="lg"
              updated={product.updatedDate}
            />
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {product.bestSeller && <span className="badge-gold">Bestseller</span>}
              {product.newArrival && <span className="badge-success">New</span>}
              <span className="chip">Updated {product.updatedDate}</span>
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold">{product.title}</h1>
            <p className="mt-1 text-muted-foreground">{product.subtitle}</p>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <span style={{ color: "var(--color-gold)" }}>★ {product.rating}</span>
              <span className="text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <p className="mt-5 text-muted-foreground">{product.description}</p>

            <h3 className="mt-6 font-semibold">What's included</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {product.included.map((line: string) => (
                <li key={line} className="flex gap-2">
                  <span style={{ color: "var(--color-success)" }}>✓</span>
                  <span className="text-muted-foreground">{line}</span>
                </li>
              ))}
            </ul>

            {product.languages.length > 1 && (
              <div className="mt-6">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Language</div>
                <div className="inline-flex rounded-xl bg-muted p-1">
                  {product.languages.map((l: Language) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
                        lang === l ? "bg-card shadow-sm text-primary" : "text-muted-foreground"
                      }`}
                    >{product.pricing[l].label}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 card-soft p-5 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">₹{pricing.price}</span>
                  <span className="text-sm text-muted-foreground line-through">₹{pricing.priceWas}</span>
                  <span className="badge-success">{off}% OFF</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Instant PDF download after payment</div>
              </div>
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
                className="btn-primary"
              >Buy Now →</button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-20">
        <h2 className="text-2xl font-bold mb-6">You may also like</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.id}
              to="/product/$id"
              params={{ id: p.id }}
              className="card-soft overflow-hidden block"
            >
              <ProductCover title={p.title} subtitle={p.subtitle} accent={p.accent} icon={p.icon} size="sm" />
              <div className="p-4">
                <div className="font-semibold">{p.title}</div>
                <div className="text-xs text-muted-foreground">{p.subtitle}</div>
                <div className="mt-2 font-bold">₹{p.pricing[p.languages[0]].price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Page>
  );
}
