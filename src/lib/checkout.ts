import { createRazorpayOrder } from "./razorpay.functions";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

type RazorpayHandlerResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (r: RazorpayHandlerResponse) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
};

let sdkPromise: Promise<boolean> | null = null;

function loadRazorpaySDK(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
  return sdkPromise;
}

export type CheckoutParams = {
  productId: string;
  lang: "hi" | "en";
  amount: number;
  title: string;
  description: string;
};

type Coupon = { code: string; type: "pct" | "flat"; value: number; bundleOnly?: boolean };
const COUPONS: Coupon[] = [
  { code: "WELCOME10", type: "pct", value: 10 },
  { code: "GROUPD20", type: "pct", value: 20 },
  { code: "BUNDLE50", type: "flat", value: 50, bundleOnly: true },
];

function applyCoupon(code: string, amount: number, isBundle: boolean): { ok: true; final: number; discount: number; label: string } | { ok: false; error: string } {
  const c = COUPONS.find((x) => x.code === code.trim().toUpperCase());
  if (!c) return { ok: false, error: "Invalid coupon code" };
  if (c.bundleOnly && !isBundle) return { ok: false, error: "This coupon works only on the bundle" };
  const discount = c.type === "pct" ? Math.round((amount * c.value) / 100) : c.value;
  const final = Math.max(1, amount - discount);
  const label = c.type === "pct" ? `${c.value}% off (₹${discount})` : `₹${discount} off`;
  return { ok: true, final, discount, label };
}

const COUPON_USED_KEY = "bn-coupon-used";

function showCouponModal(params: CheckoutParams): Promise<number | null> {
  return new Promise((resolve) => {
    const isBundle = params.productId === "bundle-complete";
    const alreadyUsed = sessionStorage.getItem(COUPON_USED_KEY) === "1";

    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.55);display:grid;place-items:center;padding:16px;font-family:inherit";

    const modal = document.createElement("div");
    modal.className = "card-soft";
    modal.style.cssText =
      "background:var(--color-card);color:var(--color-foreground);max-width:420px;width:100%;padding:24px;border-radius:20px;border:1px solid var(--color-border);box-shadow:var(--shadow-lifted)";

    let currentAmount = params.amount;
    let discountLine = "";

    const render = () => {
      modal.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center">
          <h3 style="font-weight:700;font-size:18px">Confirm your order</h3>
          <button data-close style="font-size:24px;line-height:1;background:none;border:none;color:inherit;cursor:pointer">×</button>
        </div>
        <div style="margin-top:12px;font-size:14px;color:var(--color-muted-foreground)">${params.title}</div>
        <div style="margin-top:16px;padding:12px;border-radius:12px;background:var(--color-muted)">
          <div style="display:flex;justify-content:space-between;font-size:14px">
            <span>Item price</span><span>₹${params.amount}</span>
          </div>
          ${discountLine}
          <div style="display:flex;justify-content:space-between;font-weight:700;margin-top:8px;padding-top:8px;border-top:1px solid var(--color-border)">
            <span>You pay</span><span>₹${currentAmount}</span>
          </div>
        </div>

        <div style="margin-top:16px">
          <label style="font-size:12px;color:var(--color-muted-foreground);font-weight:600;letter-spacing:.04em;text-transform:uppercase">Coupon code</label>
          <div style="display:flex;gap:8px;margin-top:6px">
            <input data-coupon placeholder="Enter coupon code" ${alreadyUsed || discountLine ? "disabled" : ""}
              style="flex:1;height:42px;padding:0 12px;border-radius:10px;border:1px solid var(--color-border);background:var(--color-background);color:inherit;font-size:14px;text-transform:uppercase" />
            <button data-apply ${alreadyUsed || discountLine ? "disabled" : ""}
              style="height:42px;padding:0 16px;border-radius:10px;border:none;background:var(--color-primary);color:var(--color-primary-foreground);font-weight:600;cursor:pointer;font-size:14px">Apply</button>
          </div>
          <div data-feedback style="margin-top:8px;font-size:13px;min-height:18px"></div>
        </div>

        <button data-pay style="margin-top:20px;width:100%;height:48px;border-radius:12px;border:none;background:var(--color-primary);color:var(--color-primary-foreground);font-weight:700;font-size:15px;cursor:pointer">
          Continue to pay ₹${currentAmount}
        </button>
      `;

      modal.querySelector<HTMLButtonElement>("[data-close]")!.onclick = close;
      modal.querySelector<HTMLButtonElement>("[data-pay]")!.onclick = () => {
        resolve(currentAmount);
        cleanup();
      };
      const applyBtn = modal.querySelector<HTMLButtonElement>("[data-apply]");
      const input = modal.querySelector<HTMLInputElement>("[data-coupon]");
      const feedback = modal.querySelector<HTMLDivElement>("[data-feedback]")!;
      if (applyBtn && input) {
        applyBtn.onclick = () => {
          const res = applyCoupon(input.value, params.amount, isBundle);
          if (res.ok) {
            currentAmount = res.final;
            discountLine = `<div style="display:flex;justify-content:space-between;font-size:14px;color:var(--color-success);margin-top:6px"><span>✓ ${res.label}</span><span>−₹${res.discount}</span></div>`;
            feedback.style.color = "var(--color-success)";
            feedback.textContent = `✓ ₹${res.discount} discount applied`;
            sessionStorage.setItem(COUPON_USED_KEY, "1");
            setTimeout(render, 400);
          } else {
            feedback.style.color = "var(--color-destructive)";
            feedback.textContent = res.error;
          }
        };
        input.onkeydown = (e) => { if (e.key === "Enter") applyBtn.click(); };
      }
      if (alreadyUsed && !discountLine) {
        feedback.style.color = "var(--color-muted-foreground)";
        feedback.textContent = "Coupon already used this session";
      }
    };

    const close = () => {
      resolve(null);
      cleanup();
    };
    const cleanup = () => overlay.remove();

    overlay.onclick = (e) => { if (e.target === overlay) close(); };
    render();
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  });
}

export async function startCheckout(params: CheckoutParams) {
  const finalAmount = await showCouponModal(params);
  if (finalAmount == null) return;

  const ok = await loadRazorpaySDK();
  if (!ok) {
    alert("Could not load payment gateway. Please check your connection.");
    return;
  }

  const order = await createRazorpayOrder({
    data: {
      amount: finalAmount,
      currency: "INR",
      receipt: `${params.productId}_${Date.now()}`,
    },
  });

  const options: RazorpayOptions = {
    key: order.keyId,
    amount: order.amount,
    currency: order.currency,
    name: "BestNotes",
    description: params.description,
    order_id: order.orderId,
    theme: { color: "#2563EB" },
    handler: (response) => {
      const q = new URLSearchParams({
        product: params.productId,
        lang: params.lang,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
      });
      window.location.href = `/download?${q.toString()}`;
    },
  };

  const rzp = new window.Razorpay!(options);
  rzp.open();
}
