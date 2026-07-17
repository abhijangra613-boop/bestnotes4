export type Language = "hi" | "en";

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  category: "group-d" | "cet" | "ssc" | "banking";
  description: string;
  included: string[];
  rating: number;
  reviews: number;
  updatedDate: string;
  languages: Language[];
  pricing: Partial<
    Record<
      Language,
      {
        price: number;
        priceWas: number;
        label: string;
      }
    >
  >;
  pdf: Partial<Record<Language, string>>;
  previewPDF?: string;
  thumbnail?: string;
  bundleIncluded: boolean;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  accent: [string, string];
  icon: string;
};

// ============================================================
// PAID PRODUCTS
// ============================================================

export const PRODUCTS: Product[] = [
  {
    id: "group-d-haryana-gk",

    title: "Haryana GK Notes",

    subtitle:
      "Districts · History · Culture · Schemes",

    category: "group-d",

    description:
      "The most complete Haryana GK resource for Group D. Covers all 22 districts with headquarters, famous for, and year formed. Includes government schemes, historical timelines, cultural facts and 200+ PYQs mapped to the HSSC pattern.",

    included: [
      "All 22 districts with complete details",
      "Haryana government schemes (2020–2026)",
      "Historical timeline from Kurukshetra to present",
      "Cultural facts, folk dances, festivals",
      "200+ previous year questions with answers",
      "Updated for 2026 exam cycle",
      "85 pages",
    ],

    rating: 4.9,

    reviews: 1284,

    updatedDate: "Jun 2026",

    languages: ["hi", "en"],

    pricing: {
      hi: {
        price: 99,
        priceWas: 299,
        label: "हिन्दी",
      },

      en: {
        price: 99,
        priceWas: 299,
        label: "English",
      },
    },

    thumbnail:
      "https://dkyniabktkzflmtdtbed.supabase.co/storage/v1/object/public/THUMNAILS/haryanagk.png",

    pdf: {
      hi: "haryana-gk/hi.pdf",
      en: "haryana-gk/en.pdf",
    },

    bundleIncluded: true,

    featured: true,

    bestSeller: true,

    newArrival: false,

    accent: ["#2563EB", "#7C3AED"],

    icon: "HR",
  },

  // ==========================================================
  // REASONING
  // ==========================================================

  {
    id: "reasoning",

    title: "Reasoning Notes",

    subtitle:
      "Verbal · Non-verbal · Analytical",

    category: "group-d",

    description:
      "Organised by question type — not chapter — so you build pattern recognition fast. Every type that appears in Group D is covered with 3–5 shortcut techniques per topic.",

    included: [
      "Number series (10 pattern types)",
      "Coding-decoding with shortcuts",
      "Blood relations (diagram method)",
      "Direction sense",
      "Ranking and arrangement",
      "150+ practice questions",
      "60 pages",
    ],

    rating: 4.8,

    reviews: 946,

    updatedDate: "May 2026",

    languages: ["hi", "en"],

    pricing: {
      hi: {
        price: 99,
        priceWas: 299,
        label: "हिन्दी",
      },

      en: {
        price: 99,
        priceWas: 299,
        label: "English",
      },
    },

    thumbnail:
      "https://dkyniabktkzflmtdtbed.supabase.co/storage/v1/object/public/THUMNAILS/reassoning.png",

    pdf: {
      hi: "reasoning/hi.pdf",
      en: "reasoning/en.pdf",
    },

    bundleIncluded: true,

    featured: true,

    bestSeller: false,

    newArrival: false,

    accent: ["#0EA5E9", "#22D3EE"],

    icon: "RS",
  },

  // ==========================================================
  // MATHEMATICS
  // ==========================================================

  {
    id: "mathematics",

    title: "Mathematics Notes",

    subtitle:
      "Arithmetic · Algebra · Geometry",

    category: "group-d",

    description:
      "All HSSC Group D maths topics with shortcut tricks for each. Designed for students who fear maths — every concept explained from basics with worked examples.",

    included: [
      "Percentage, profit and loss shortcuts",
      "Ratio, proportion and averages",
      "Time, work and distance",
      "Simple and compound interest",
      "Basic geometry and mensuration",
      "200+ solved examples",
      "70 pages",
    ],

    rating: 4.8,

    reviews: 812,

    updatedDate: "May 2026",

    languages: ["hi", "en"],

    pricing: {
      hi: {
        price: 99,
        priceWas: 299,
        label: "हिन्दी",
      },

      en: {
        price: 99,
        priceWas: 299,
        label: "English",
      },
    },

    thumbnail:
      "https://dkyniabktkzflmtdtbed.supabase.co/storage/v1/object/public/THUMNAILS/maths.png",

    pdf: {
      hi: "maths/hi.pdf",
      en: "maths/en.pdf",
    },

    bundleIncluded: true,

    featured: false,

    bestSeller: true,

    newArrival: false,

    accent: ["#F97316", "#F59E0B"],

    icon: "M",
  },

  // ==========================================================
  // HINDI GRAMMAR
  // ==========================================================

  {
    id: "hindi-grammar",

    title: "Hindi Grammar Notes",

    subtitle:
      "व्याकरण · संधि · समास · रस",

    category: "group-d",

    description:
      "Complete Hindi grammar for Group D in the cleanest format available. All Sandhi, Samas, Ras, Alankar and Muhavare types with examples and PYQs.",

    included: [
      "Sandhi (all types with examples)",
      "Samas (6 types explained simply)",
      "Ras, Chand, Alankar",
      "Muhavare and Lokoktiyan (150+)",
      "Vilom shabd and Paryayvachi (300+)",
      "100+ PYQs with answers",
      "65 pages · Hindi only",
    ],

    rating: 4.9,

    reviews: 674,

    updatedDate: "Apr 2026",

    languages: ["hi"],

    pricing: {
      hi: {
        price: 89,
        priceWas: 299,
        label: "हिन्दी",
      },
    },

    thumbnail:
      "https://dkyniabktkzflmtdtbed.supabase.co/storage/v1/object/public/THUMNAILS/hindi.png",

    pdf: {
      hi: "hindi/hi.pdf",
    },

    bundleIncluded: true,

    featured: false,

    bestSeller: false,

    newArrival: false,

    accent: ["#DC2626", "#F43F5E"],

    icon: "हि",
  },

  // ==========================================================
  // GENERAL SCIENCE
  // ==========================================================

  {
    id: "general-science",

    title: "General Science Notes",

    subtitle:
      "Physics · Chemistry · Biology",

    category: "group-d",

    description:
      "Exam-targeted science for Group D. Only what gets asked — zero filler. Physics, Chemistry, Biology and Environment sections each mapped directly to HSSC question patterns.",

    included: [
      "Physics: motion, force, electricity, light",
      "Chemistry: elements, acids, reactions, metals",
      "Biology: cells, diseases, nutrition, reproduction",
      "Environment and ecology basics",
      "Science in everyday life",
      "180+ PYQs with answers",
      "75 pages",
    ],

    rating: 4.7,

    reviews: 588,

    updatedDate: "May 2026",

    languages: ["hi", "en"],

    pricing: {
      hi: {
        price: 99,
        priceWas: 299,
        label: "हिन्दी",
      },

      en: {
        price: 99,
        priceWas: 299,
        label: "English",
      },
    },

    thumbnail:
      "https://dkyniabktkzflmtdtbed.supabase.co/storage/v1/object/public/THUMNAILS/science.png",

    pdf: {
      hi: "science/hi.pdf",
      en: "science/en.pdf",
    },

    bundleIncluded: true,

    featured: false,

    bestSeller: false,

    newArrival: false,

    accent: ["#16A34A", "#84CC16"],

    icon: "Sc",
  },

  // ==========================================================
  // CURRENT AFFAIRS
  // ==========================================================

  {
    id: "current-affairs-2026",

    title: "Current Affairs 2026",

    subtitle:
      "Monthly + Yearly compilation",

    category: "group-d",

    description:
      "Monthly-updated current affairs digest filtered specifically for Group D exams. No news noise — only what actually gets asked in HSSC papers.",

    included: [
      "National current affairs (monthly)",
      "Haryana-specific news and appointments",
      "Sports, awards and summits",
      "New government schemes 2025–2026",
      "International events relevant to exams",
      "Updated every month, free for buyers",
    ],

    rating: 4.9,

    reviews: 421,

    updatedDate: "Jul 2026",

    languages: ["hi", "en"],

    pricing: {
      hi: {
        price: 99,
        priceWas: 299,
        label: "हिन्दी",
      },

      en: {
        price: 99,
        priceWas: 299,
        label: "English",
      },
    },

    thumbnail:
      "https://dkyniabktkzflmtdtbed.supabase.co/storage/v1/object/public/THUMNAILS/currentaffairs.png",

    pdf: {
      hi: "currentaffairs/hi.pdf",
      en: "currentaffairs/en.pdf",
    },

    bundleIncluded: true,

    featured: true,

    bestSeller: false,

    newArrival: true,

    accent: ["#C9A227", "#F59E0B"],

    icon: "CA",
  },

  // ==========================================================
  // ENGLISH
  // ==========================================================

  {
    id: "english",

    title: "English Notes",

    subtitle:
      "Grammar · Vocabulary · Comprehension",

    category: "group-d",

    description:
      "Complete English for Group D and CET exams. Grammar rules, tenses, active-passive, direct-indirect, vocabulary building, error spotting and reading comprehension — all with shortcut tricks and PYQs.",

    included: [
      "Tenses, articles, prepositions (with rules)",
      "Active-Passive & Direct-Indirect speech",
      "Common errors and error spotting",
      "Vocabulary: synonyms, antonyms, one-word substitutions",
      "Reading comprehension strategies",
      "150+ PYQs with answers",
      "70 pages",
    ],

    rating: 4.8,

    reviews: 512,

    updatedDate: "Jun 2026",

    languages: ["en"],

    pricing: {
      en: {
        price: 99,
        priceWas: 299,
        label: "English",
      },
    },

    thumbnail:
      "https://dkyniabktkzflmtdtbed.supabase.co/storage/v1/object/public/THUMNAILS/english.png",

    pdf: {
      en: "english/en.pdf",
    },

    bundleIncluded: true,

    featured: false,

    bestSeller: false,

    newArrival: true,

    accent: ["#8B5CF6", "#EC4899"],

    icon: "En",
  },
];

// ============================================================
// COMPLETE GROUP D BUNDLE
// ============================================================

export const BUNDLE = {
  id: "bundle-complete",

  title:
    "Complete Group D Bundle",

  subtitle:
    "All 7 subjects · Hindi & English",

  price: 299,

  priceWas: 999,

  includes: PRODUCTS.filter(
    (p) => p.bundleIncluded,
  ).map((p) => p.id),
};

// ============================================================
// FREE NOTES TYPE
// ============================================================

export type FreeNote = {
  id: string;
  title: string;
  subtitle: string;
  languages: Language[];
  pdf: Partial<Record<Language, string>>;
  thumbnail?: string;
  accent: [string, string];
  icon: string;
};

// ============================================================
// FREE NOTES
// ============================================================
//
// IMPORTANT:
//
// These are STORAGE PATHS inside your private NOTES bucket.
//
// The folders are:
//
// freeGK
// freegs
// freePS
//
// Use createFreeSignedDownloadUrl() to generate a temporary
// download link for these PDFs.
//
// ============================================================

export const FREE_NOTES: FreeNote[] = [
  // ==========================================================
  // FREE HARYANA GK
  // ==========================================================

  {
    id: "free-haryana-gk",

    title:
      "Haryana GK Free Notes",

    subtitle:
      "Haryana GK · Free PDF",

    languages: ["hi", "en"],

    pdf: {
      hi: "freeGK/hi.pdf",
      en: "freeGK/en.pdf",
    },

    thumbnail:
      "https://dkyniabktkzflmtdtbed.supabase.co/storage/v1/object/public/THUMNAILS/freegk.jpeg?v=2",

    accent: [
      "#2563EB",
      "#22D3EE",
    ],

    icon: "GK",
  },

  // ==========================================================
  // FREE GENERAL SCIENCE
  // ==========================================================

  {
    id: "free-general-science",

    title:
      "General Science Free Notes",

    subtitle:
      "Physics · Chemistry · Biology",

    languages: ["hi", "en"],

    pdf: {
      hi: "freegs/hi.pdf",
      en: "freegs/en.pdf",
    },

    thumbnail:
      "https://dkyniabktkzflmtdtbed.supabase.co/storage/v1/object/public/THUMNAILS/freegs.jpeg?v=2",

    accent: [
      "#16A34A",
      "#84CC16",
    ],

    icon: "GS",
  },

  // ==========================================================
  // FREE PRACTICE SET
  // ==========================================================

  {
    id: "free-practice-set",

    title:
      "Group D Practice Set",

    subtitle:
      "Practice Questions with Answers",

    languages: ["hi", "en"],

    pdf: {
      hi: "freePS/hi.pdf",
      en: "freePS/en.pdf",
    },

    thumbnail:
      "https://dkyniabktkzflmtdtbed.supabase.co/storage/v1/object/public/THUMNAILS/freeps.jpeg?v=2",

    accent: [
      "#F97316",
      "#F59E0B",
    ],

    icon: "PS",
  },
];

// ============================================================
// PRODUCT CATEGORIES
// ============================================================

export const CATEGORIES: {
  id:
    | "all"
    | Product["category"];

  label: string;
}[] = [
  {
    id: "all",
    label: "All Notes",
  },

  {
    id: "group-d",
    label: "Group D",
  },

  {
    id: "cet",
    label: "CET",
  },

  {
    id: "ssc",
    label: "SSC",
  },

  {
    id: "banking",
    label: "Banking",
  },
];

// ============================================================
// FIND PRODUCT
// ============================================================

export function findProduct(
  id: string,
): Product | undefined {
  return PRODUCTS.find(
    (p) => p.id === id,
  );
}