import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  useEffect,
  useState,
} from "react";

import { Page } from "@/components/Layout";

import {
  BUNDLE,
  findProduct,
  PRODUCTS,
  type Language,
} from "@/lib/products-data";

import {
  verifyRazorpayPayment,
  createSignedDownloadUrl,
} from "@/lib/razorpay.functions";

type Search = {
  product?: string;
  lang?: string;

  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

export const Route =
  createFileRoute("/download")({
    validateSearch: (
      s: Record<string, unknown>,
    ): Search => ({
      product:
        typeof s.product === "string"
          ? s.product
          : undefined,

      lang:
        typeof s.lang === "string"
          ? s.lang
          : undefined,

      razorpay_order_id:
        typeof s.razorpay_order_id === "string"
          ? s.razorpay_order_id
          : undefined,

      razorpay_payment_id:
        typeof s.razorpay_payment_id === "string"
          ? s.razorpay_payment_id
          : undefined,

      razorpay_signature:
        typeof s.razorpay_signature === "string"
          ? s.razorpay_signature
          : undefined,
    }),

    head: () => ({
      meta: [
        {
          title: "Your download — BestNotes",
        },
        {
          name: "robots",
          content: "noindex",
        },
      ],
    }),

    component: DownloadPage,
  });

type Status =
  | "verifying"
  | "verified"
  | "failed";

function DownloadPage() {
  const s = Route.useSearch();

  const [status, setStatus] =
    useState<Status>("verifying");

  const [downloads, setDownloads] =
    useState(0);

  const [showReceipt, setShowReceipt] =
    useState(false);

  const [downloading, setDownloading] =
    useState<string | null>(null);

  const MAX_DOWNLOADS = 3;

  const lang = (
    s.lang === "en" ? "en" : "hi"
  ) as Language;

  const isBundle =
    s.product === BUNDLE.id;

  const product = s.product
    ? findProduct(s.product)
    : undefined;

  const pdfPath =
    !isBundle && product
      ? product.pdf[lang] ??
        product.pdf[
          product.languages[0]
        ]
      : undefined;

  // =========================================================
  // VERIFY PAYMENT
  // =========================================================

  useEffect(() => {
    if (
      !s.razorpay_order_id ||
      !s.razorpay_payment_id ||
      !s.razorpay_signature
    ) {
      setStatus("failed");
      return;
    }

    verifyRazorpayPayment({
      data: {
        razorpay_order_id:
          s.razorpay_order_id,

        razorpay_payment_id:
          s.razorpay_payment_id,

        razorpay_signature:
          s.razorpay_signature,
      },
    })
      .then((r) => {
        if (r.verified) {
          setStatus("verified");

          // For individual products only,
          // show the overall download count.
          if (!isBundle) {
            const key =
              `bn-dl-${s.razorpay_payment_id}`;

            const used = Number(
              localStorage.getItem(key) ||
                "0",
            );

            setDownloads(used);
          }
        } else {
          setStatus("failed");
        }
      })
      .catch(() =>
        setStatus("failed"),
      );
  }, [
    s.razorpay_order_id,
    s.razorpay_payment_id,
    s.razorpay_signature,
    isBundle,
  ]);

  // =========================================================
  // SECURE PDF DOWNLOAD
  // =========================================================

  const triggerDownload = async (
    pdfStoragePath: string,
  ) => {
    if (
      !s.razorpay_order_id ||
      !s.razorpay_payment_id ||
      !s.razorpay_signature
    ) {
      alert(
        "Payment information is missing.",
      );

      return;
    }

    // -------------------------------------------------------
    // DOWNLOAD KEY
    //
    // Individual product:
    // One counter for the purchased PDF.
    //
    // Bundle:
    // Each PDF gets its own counter.
    // This allows every subject to be downloaded 3 times.
    // -------------------------------------------------------

    const key = isBundle
      ? `bn-dl-${s.razorpay_payment_id}-${pdfStoragePath}`
      : `bn-dl-${s.razorpay_payment_id}`;

    const used = Number(
      localStorage.getItem(key) || "0",
    );

    if (used >= MAX_DOWNLOADS) {
      alert(
        isBundle
          ? `Download limit reached for this subject (${MAX_DOWNLOADS}). Please contact support if you need help.`
          : `Download limit reached (${MAX_DOWNLOADS}). Please contact support if you need help.`,
      );

      return;
    }

    try {
      setDownloading(
        pdfStoragePath,
      );

      // Request a fresh signed Supabase URL
      // after verifying the Razorpay payment.

      const result =
        await createSignedDownloadUrl({
          data: {
            pdfPath:
              pdfStoragePath,

            razorpay_order_id:
              s.razorpay_order_id,

            razorpay_payment_id:
              s.razorpay_payment_id,

            razorpay_signature:
              s.razorpay_signature,
          },
        });

      if (
        !result.success ||
        !result.downloadUrl
      ) {
        throw new Error(
          "Could not create download link",
        );
      }

      // -----------------------------------------------------
      // INCREASE DOWNLOAD COUNT
      // -----------------------------------------------------

      localStorage.setItem(
        key,
        String(used + 1),
      );

      // Only update the visible counter
      // for individual purchases.
      if (!isBundle) {
        setDownloads(
          used + 1,
        );
      }

      // -----------------------------------------------------
      // OPEN SECURE TEMPORARY DOWNLOAD URL
      // -----------------------------------------------------

      const a =
        document.createElement("a");

      a.href =
        result.downloadUrl;

      a.target = "_blank";

      a.rel =
        "noopener noreferrer";

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);
    } catch (error) {
      console.error(
        "PDF download failed:",
        error,
      );

      alert(
        "Could not download the PDF. Please try again or contact support.",
      );
    } finally {
      setDownloading(null);
    }
  };

  return (
    <Page>
      <section className="container-page py-16 max-w-2xl">

        {/* ===================================================
            VERIFYING
        =================================================== */}

        {status === "verifying" && (
          <div className="card-soft p-10 text-center">

            <div className="mx-auto h-14 w-14 rounded-full border-4 border-primary border-t-transparent animate-spin" />

            <h1 className="mt-6 text-2xl font-bold">
              Verifying your payment…
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              This takes just a moment.
            </p>

          </div>
        )}

        {/* ===================================================
            PAYMENT FAILED
        =================================================== */}

        {status === "failed" && (
          <div className="card-soft p-10 text-center">

            <div
              className="mx-auto h-14 w-14 rounded-full grid place-items-center text-white text-3xl"
              style={{
                background:
                  "var(--color-destructive)",
              }}
            >
              ×
            </div>

            <h1 className="mt-6 text-2xl font-bold">
              We couldn't verify your payment
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              If money was deducted from your
              account, please contact support
              with your payment ID.
            </p>

            <div className="mt-6 flex justify-center gap-3">

              <a
                href="https://t.me/bestnotes077"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Contact on Telegram
              </a>

              <Link
                to="/"
                className="btn-ghost"
              >
                Back to home
              </Link>

            </div>

          </div>
        )}

        {/* ===================================================
            PAYMENT VERIFIED
        =================================================== */}

        {status === "verified" && (
          <div className="card-soft p-10">

            {/* SUCCESS HEADER */}

            <div className="flex items-center gap-4">

              <div
                className="h-14 w-14 rounded-full grid place-items-center text-white text-3xl"
                style={{
                  background:
                    "var(--color-success)",
                }}
              >
                ✓
              </div>

              <div>

                <h1 className="text-2xl font-bold">
                  Payment successful!
                </h1>

                <p className="text-sm text-muted-foreground">
                  Thank you for choosing
                  BestNotes.
                </p>

              </div>

            </div>

            {/* =================================================
                PURCHASE INFORMATION
            ================================================= */}

            <div className="mt-8 rounded-2xl p-5 border border-border">

              <div className="text-sm text-muted-foreground">
                Your purchase
              </div>

              <div className="mt-1 text-lg font-semibold">

                {isBundle
                  ? BUNDLE.title
                  : product?.title ??
                    "Unknown item"}

              </div>

              <div className="text-xs text-muted-foreground">

                Language:{" "}

                {lang === "hi"
                  ? "हिन्दी"
                  : "English"}

              </div>

            </div>

            {/* =================================================
                BUNDLE DOWNLOADS
            ================================================= */}

            {isBundle ? (

              <div className="mt-6 grid gap-3">

                {BUNDLE.includes.map(
                  (id) => {

                    const p =
                      PRODUCTS.find(
                        (x) =>
                          x.id === id,
                      );

                    if (!p) {
                      return null;
                    }

                    // Use selected language if available.
                    // Otherwise fall back to the product's
                    // first available language.

                    const bp =
                      p.pdf[lang] ??
                      p.pdf[
                        p.languages[0]
                      ];

                    if (!bp) {
                      return (
                        <div
                          key={id}
                          className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3"
                        >

                          <div>

                            <div className="font-medium text-sm">
                              {p.title}
                            </div>

                            <div className="text-xs text-muted-foreground">
                              PDF unavailable
                            </div>

                          </div>

                        </div>
                      );
                    }

                    // Separate download count
                    // for every subject in bundle.

                    const subjectKey =
                      `bn-dl-${s.razorpay_payment_id}-${bp}`;

                    const subjectDownloads =
                      Number(
                        localStorage.getItem(
                          subjectKey,
                        ) || "0",
                      );

                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3"
                      >

                        <div>

                          <div className="font-medium text-sm">
                            {p.title}
                          </div>

                          <div className="text-xs text-muted-foreground">
                            {p.subtitle}
                          </div>

                          <div className="text-xs text-muted-foreground mt-1">
                            Downloads used:{" "}
                            {subjectDownloads} /{" "}
                            {MAX_DOWNLOADS}
                          </div>

                        </div>

                        <button
                          disabled={
                            downloading ===
                            bp
                          }
                          onClick={() =>
                            triggerDownload(
                              bp,
                            )
                          }
                          className="btn-primary"
                        >

                          {downloading ===
                          bp
                            ? "Preparing…"
                            : "Download"}

                        </button>

                      </div>
                    );
                  },
                )}

              </div>

            ) : pdfPath ? (

              /* ===============================================
                 INDIVIDUAL PRODUCT DOWNLOAD
              =============================================== */

              <button
                disabled={
                  downloading !== null
                }
                onClick={() =>
                  triggerDownload(
                    pdfPath,
                  )
                }
                className="btn-primary mt-6 w-full text-base py-4"
              >

                {downloading
                  ? "Preparing secure download…"
                  : "Download PDF"}

              </button>

            ) : (

              <p className="mt-6 text-sm text-destructive">
                PDF unavailable — please
                contact support.
              </p>

            )}

            {/* =================================================
                DOWNLOAD LIMIT INFORMATION
            ================================================= */}

            {isBundle ? (

              <div className="mt-5 text-xs text-muted-foreground text-center">

                Each subject can be downloaded
                up to {MAX_DOWNLOADS} times.

              </div>

            ) : (

              <div className="mt-4 text-xs text-muted-foreground text-center">

                Downloads used:{" "}
                {downloads} /{" "}
                {MAX_DOWNLOADS}

              </div>

            )}

            {/* =================================================
                RECEIPT / HOME LINKS
            ================================================= */}

            <div className="mt-6 flex justify-center gap-3 text-sm">

              <button
                onClick={() =>
                  setShowReceipt(
                    true,
                  )
                }
                className="text-primary hover:underline"
              >
                View receipt
              </button>

              <span className="text-muted-foreground">
                ·
              </span>

              <Link
                to="/"
                className="text-muted-foreground hover:text-primary"
              >
                Back to home
              </Link>

            </div>

          </div>
        )}

      </section>

      {/* =====================================================
          RECEIPT MODAL
      ===================================================== */}

      {showReceipt && (

        <div
          className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4"

          onClick={() =>
            setShowReceipt(
              false,
            )
          }
        >

          <div
            className="card-soft max-w-md w-full p-6"

            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="flex justify-between items-center">

              <h3 className="font-bold text-lg">
                Receipt
              </h3>

              <button
                onClick={() =>
                  setShowReceipt(
                    false,
                  )
                }
                className="text-xl"
              >
                ×
              </button>

            </div>

            <div className="mt-4 space-y-2 text-sm">

              <Row
                k="Item"
                v={
                  isBundle
                    ? BUNDLE.title
                    : product?.title ??
                      "—"
                }
              />

              <Row
                k="Language"
                v={
                  lang === "hi"
                    ? "हिन्दी"
                    : "English"
                }
              />

              <Row
                k="Order ID"
                v={
                  s.razorpay_order_id ??
                  "—"
                }
                mono
              />

              <Row
                k="Payment ID"
                v={
                  s.razorpay_payment_id ??
                  "—"
                }
                mono
              />

              <Row
                k="Status"
                v="Paid & Verified"
              />

              <Row
                k="Date"
                v={
                  new Date().toLocaleString(
                    "en-IN",
                  )
                }
              />

            </div>

          </div>

        </div>

      )}

    </Page>
  );
}

function Row({
  k,
  v,
  mono,
}: {
  k: string;
  v: string;
  mono?: boolean;
}) {

  return (

    <div className="flex justify-between gap-3">

      <span className="text-muted-foreground">
        {k}
      </span>

      <span
        className={`text-right ${
          mono
            ? "font-mono text-xs"
            : ""
        }`}
      >
        {v}
      </span>

    </div>

  );
}