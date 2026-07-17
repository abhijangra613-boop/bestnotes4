## Goal
Let you drop in one placeholder PDF URL now so the full payment → download flow works end-to-end. Later you replace URLs per product.

## What I'll do

1. Ask you (after this plan is approved) for **one public direct-download PDF URL** — Google Drive, Dropbox, S3, or any host. Notes on URLs:
   - **Google Drive**: use `https://drive.google.com/uc?export=download&id=FILE_ID` (not the `/view` share link).
   - **Dropbox**: change `?dl=0` to `?dl=1` at the end of the share link.
   - **S3 / R2 / GitHub raw / your own site**: paste as-is.

2. Edit `src/lib/products-data.ts` and set every product's `pdf.hi` and `pdf.en` fields to that same placeholder URL. This means any product you "buy" during testing will download the same file — good enough to prove the flow works.

3. Nothing else needs to change. `src/routes/download.tsx` already:
   - verifies the Razorpay payment server-side,
   - reads `product.pdf[lang]`,
   - triggers the download via a hidden `<a download>` click,
   - enforces the 3-download cap in `localStorage`.

## How you swap in real PDFs later

For each product in `src/lib/products-data.ts`, replace `pdf: { hi: "...", en: "..." }` with the real direct-download URLs for that product's Hindi and English versions. If a product has only one language, both entries can point to the same file (the download page already falls back to the first available language).

## Things to know about "External URL" hosting

- The URL is public — anyone who has it can download without paying. That's the tradeoff you picked; fine for testing and low-risk paid notes.
- The file host must send permissive CORS **or** allow the browser to navigate to it as a download. Direct-download links from Drive/Dropbox/S3 work; a `/view` viewer page will not.
- If you later want gated downloads (signed short-lived links, per-payment entitlement, server-side download counter), that's the Lovable Cloud path — a separate plan.

## Deliverable after you approve
Once you paste the placeholder URL in your next message, I'll make the one-file edit to `products-data.ts` and you can run a full test: pick any product → pay → land on `/download` → click **Download PDF**.