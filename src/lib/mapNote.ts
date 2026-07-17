import type { Product, Language } from "./products-data";
import type { Note } from "./notes";

export function mapNoteToProduct(note: Note): Product {
  const languages: Language[] =
    note.language === "en"
      ? ["en"]
      : note.language === "hi"
      ? ["hi"]
      : ["hi", "en"];

  return {
    id: note.id,

    title: note.title,

    subtitle: note.subtitle ?? "",

    category: (note.category as Product["category"]) || "group-d",

    description: note.description ?? "",

    included: note.tags ?? [],

    rating: note.rating ?? 5,

    reviews: note.reviews ?? 0,

    updatedDate: note.updated_date ?? "2026",

    languages,

    pricing: {
      hi: {
        price: note.price,
        priceWas: note.old_price,
        label: "हिन्दी",
      },

      en: {
        price: note.price,
        priceWas: note.old_price,
        label: "English",
      },
    },

    pdf: {
      hi: note.pdf_url ?? "",
      en: note.pdf_url ?? "",
    },

    previewPDF: note.preview_pdf ?? note.pdf_url ?? "",

    thumbnail: note.thumbnail_url ?? "",

    bundleIncluded: note.bundle_included ?? true,

    featured: note.featured ?? false,

    bestSeller: note.bestseller ?? false,

    newArrival: note.new_arrival ?? false,

    accent: [
      note.accent_start ?? "#2563EB",
      note.accent_end ?? "#7C3AED",
    ],

    icon: note.icon ?? "BN",
  };
}