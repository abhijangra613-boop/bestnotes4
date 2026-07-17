import { createServerFn } from "@tanstack/react-start";
import { createHmac, timingSafeEqual } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_BUCKET = "NOTES";

// ============================================================
// CREATE RAZORPAY ORDER
// ============================================================

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .inputValidator(
    (input: {
      amount: number;
      currency?: string;
      receipt?: string;
    }) => {
      const amount = Number(input?.amount);

      if (
        !Number.isFinite(amount) ||
        amount <= 0 ||
        amount > 100000
      ) {
        throw new Error("Invalid amount");
      }

      return {
        amount,
        currency: input.currency || "INR",
        receipt: input.receipt || `rcpt_${Date.now()}`,
      };
    },
  )
  .handler(async ({ data }) => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      throw new Error("Payment gateway is not configured");
    }

    const body = {
      amount: Math.round(data.amount * 100),
      currency: data.currency,
      receipt: data.receipt,
      payment_capture: 1,
    };

    const auth = Buffer.from(
      `${keyId}:${keySecret}`,
    ).toString("base64");

    const resp = await fetch(
      "https://api.razorpay.com/v1/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify(body),
      },
    );

    if (!resp.ok) {
      const text = await resp.text();

      console.error(
        "Razorpay order failed:",
        resp.status,
        text,
      );

      throw new Error(
        "Could not create payment order",
      );
    }

    const order = (await resp.json()) as {
      id: string;
      amount: number;
      currency: string;
    };

    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    };
  });

// ============================================================
// VERIFY RAZORPAY PAYMENT
// ============================================================

export const verifyRazorpayPayment = createServerFn({
  method: "POST",
})
  .inputValidator(
    (input: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => {
      if (
        !input?.razorpay_order_id ||
        !input?.razorpay_payment_id ||
        !input?.razorpay_signature
      ) {
        throw new Error(
          "Missing payment parameters",
        );
      }

      return input;
    },
  )
  .handler(async ({ data }) => {
    const keySecret =
      process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return {
        verified: false as const,
        error: "Gateway not configured",
      };
    }

    const expected = createHmac(
      "sha256",
      keySecret,
    )
      .update(
        `${data.razorpay_order_id}|${data.razorpay_payment_id}`,
      )
      .digest("hex");

    try {
      const a = Buffer.from(expected, "hex");

      const b = Buffer.from(
        data.razorpay_signature,
        "hex",
      );

      if (a.length !== b.length) {
        return {
          verified: false as const,
          error: "Bad signature",
        };
      }

      const ok = timingSafeEqual(a, b);

      return ok
        ? {
            verified: true as const,
          }
        : {
            verified: false as const,
            error: "Signature mismatch",
          };
    } catch {
      return {
        verified: false as const,
        error: "Invalid signature format",
      };
    }
  });

// ============================================================
// CREATE SECURE SUPABASE PDF DOWNLOAD URL
// ============================================================

export const createSignedDownloadUrl = createServerFn({
  method: "POST",
})
  .inputValidator(
    (input: {
      pdfPath: string;

      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => {
      if (!input?.pdfPath) {
        throw new Error("Missing PDF path");
      }

      if (
        !input?.razorpay_order_id ||
        !input?.razorpay_payment_id ||
        !input?.razorpay_signature
      ) {
        throw new Error(
          "Missing payment information",
        );
      }

      return input;
    },
  )
  .handler(async ({ data }) => {
    // --------------------------------------------------------
    // STEP 1: VERIFY PAYMENT SIGNATURE AGAIN
    // --------------------------------------------------------

    const razorpaySecret =
      process.env.RAZORPAY_KEY_SECRET;

    if (!razorpaySecret) {
      throw new Error(
        "Payment gateway is not configured",
      );
    }

    const expected = createHmac(
      "sha256",
      razorpaySecret,
    )
      .update(
        `${data.razorpay_order_id}|${data.razorpay_payment_id}`,
      )
      .digest("hex");

    try {
      const expectedBuffer = Buffer.from(
        expected,
        "hex",
      );

      const signatureBuffer = Buffer.from(
        data.razorpay_signature,
        "hex",
      );

      if (
        expectedBuffer.length !==
        signatureBuffer.length
      ) {
        throw new Error(
          "Payment verification failed",
        );
      }

      const verified = timingSafeEqual(
        expectedBuffer,
        signatureBuffer,
      );

      if (!verified) {
        throw new Error(
          "Payment verification failed",
        );
      }
    } catch {
      throw new Error(
        "Payment verification failed",
      );
    }

    // --------------------------------------------------------
    // STEP 2: GET SUPABASE SERVER VARIABLES
    // --------------------------------------------------------

    const supabaseUrl =
      process.env.SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (
      !supabaseUrl ||
      !serviceRoleKey
    ) {
      console.error(
        "Supabase server environment variables missing",
      );

      throw new Error(
        "Download service is not configured",
      );
    }

    // --------------------------------------------------------
    // STEP 3: CLEAN PDF PATH
    // --------------------------------------------------------

    const pdfPath = data.pdfPath
      .replace(/^\/+/, "");

    // Prevent suspicious paths
    if (
      pdfPath.includes("..") ||
      pdfPath.startsWith("http://") ||
      pdfPath.startsWith("https://")
    ) {
      throw new Error(
        "Invalid PDF path",
      );
    }

    // --------------------------------------------------------
    // STEP 4: CREATE SUPABASE SIGNED URL
    // --------------------------------------------------------

    const endpoint =
      `${supabaseUrl}/storage/v1/object/sign/` +
      `${SUPABASE_BUCKET}/` +
      pdfPath
        .split("/")
        .map(encodeURIComponent)
        .join("/");

    const response = await fetch(endpoint, {
      method: "POST",

      headers: {
        Authorization:
          `Bearer ${serviceRoleKey}`,

        apikey:
          serviceRoleKey,

        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        // URL valid for 5 minutes
        expiresIn: 300,
      }),
    });

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "Supabase signed URL error:",
        response.status,
        errorText,
      );

      throw new Error(
        "Could not generate download link",
      );
    }

    const result = (await response.json()) as {
      signedURL?: string;
      signedUrl?: string;
    };

    const signedPath =
      result.signedURL ||
      result.signedUrl;

    if (!signedPath) {
      console.error(
        "No signed URL returned:",
        result,
      );

      throw new Error(
        "Invalid download response",
      );
    }

    // Supabase may return either
    // a full URL or a relative signed path.

    const downloadUrl =
      signedPath.startsWith("http")
        ? signedPath
        : `${supabaseUrl}/storage/v1${signedPath}`;

    return {
      success: true as const,
      downloadUrl,
    };
  });



// ============================================================
// FREE NOTES SECURE DOWNLOAD
// ============================================================

// Only these files are allowed to be downloaded for free.
// This prevents users from requesting your paid PDF paths.

const ALLOWED_FREE_PDFS = [
  "freeGK/hi.pdf",
  "freeGK/en.pdf",

  "freegs/hi.pdf",
  "freegs/en.pdf",

  "freePS/hi.pdf",
  "freePS/en.pdf",
];

export const createFreeSignedDownloadUrl = createServerFn({
  method: "POST",
})
  .inputValidator((input: { pdfPath: string }) => {
    if (!input?.pdfPath) {
      throw new Error("PDF path is required");
    }

    if (!ALLOWED_FREE_PDFS.includes(input.pdfPath)) {
      throw new Error("This PDF is not available for free download");
    }

    return {
      pdfPath: input.pdfPath,
    };
  })
  .handler(async ({ data }) => {
    const supabaseUrl =
      process.env.SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error(
        "Supabase server configuration is missing",
      );
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
    );

    // Signed URL valid for 5 minutes
    const { data: signedData, error } =
      await supabase.storage
        .from("NOTES")
        .createSignedUrl(
          data.pdfPath,
          60 * 5,
        );

    if (error || !signedData?.signedUrl) {
      console.error(
        "Free PDF signed URL error:",
        error,
      );

      throw new Error(
        "Could not create free PDF download link",
      );
    }

    return {
      success: true as const,
      downloadUrl:
        signedData.signedUrl,
    };
  });