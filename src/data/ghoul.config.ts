/**
 * Ghoul Site Configuration
 */

export interface CrossLink {
  id: string;
  name: string;
  domain: string;
  icon: string;
  color: string;
  realm: string;
  live: boolean;
}

export interface Product {
  name: string;
  tagline: string;
  description: string;
  category: 'core' | 'pro' | 'tool' | 'refill' | 'limited';
  volume: string;
  price: string;
  features: string[];
  heroIngredient?: string;
}

export interface GhoulConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  domain: string;
  icon: string;
  isLeader: boolean;
  products: Product[];
  crossLinks: CrossLink[];
  cta: {
    headline: string;
    subheadline: string;
    buttonText: string;
    placeholderText: string;
  };
  gameUrl: string;
  social: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  science: {
    title: string;
    subtitle: string;
    description: string;
    adaptation: string;
    stats: { label: string; value: string }[];
  };
  marketSize: string;
  traction: { label: string; value: string; status: 'complete' | 'in-progress' | 'upcoming' }[];
  ipStatus: string;
  ipClasses: string[];
  roadmap: { phase: string; title: string; items: string[]; status: 'complete' | 'in-progress' | 'upcoming' }[];
  fundingAsk: string;
  valuation: string;
  equityOffered: string;
  projectedRevenue: { year: string; amount: string; sources: string }[];
  roiTarget: string;
  partnerships: { type: string; description: string }[];
  revenueStreams: { stream: string; description: string; timeline: string }[];
}

export const config: GhoulConfig = {
  id: "kid",
  name: "KID GHOUL",
  tagline: "Chaos Contained",
  description:
    "KID GHOUL knows that creativity is messy. Paint on walls? Glitter on the dog? A science experiment gone wrong? KID GHOUL doesn't just clean — KID GHOUL encourages the next masterpiece.",
  domain: "https://www.kidghoul.com",
  icon: "🧒",
  isLeader: false,

  products: [
    {
      name: "Finger-Paint Remover",
      tagline: "Art happens. Walls survive.",
      description: "Gentle foam spray that dissolves water-based and acrylic finger paints from walls, tables, and skin. No scrubbing. No tears.",
      category: "core",
      volume: "300ml",
      price: "$18.99 AUD",
      features: ["Wall-safe foam", "No-scrub formula", "Skin gentle"],
      heroIngredient: "Chromo-Capture Enzymes™",
    },
    {
      name: "Crayon Wall Cleaner",
      tagline: "Picasso, erased.",
      description: "Specialised wipe system for wax crayon on painted drywall, wallpaper, and furniture. The enzymes liquefy wax binders on contact.",
      category: "core",
      volume: "24 Wipes",
      price: "$14.99 AUD",
      features: ["Drywall safe", "Wallpaper safe", "Lifts wax instantly"],
      heroIngredient: "Chromo-Capture Enzymes™",
    },
    {
      name: "Slime Dissolver",
      tagline: "Sticky situations, solved.",
      description: "Breaks down borax-based and glue slimes from carpet, fabric, and hair. Turns solid slime into a wipeable liquid in under a minute.",
      category: "core",
      volume: "250ml",
      price: "$16.99 AUD",
      features: ["Carpet safe", "Hair safe", "Borax neutraliser"],
      heroIngredient: "Chromo-Capture Enzymes™",
    },
    {
      name: "Craft Supply Sanitizer",
      tagline: "Clean tools, clean minds.",
      description: "Antimicrobial mist for scissors, glue sticks, markers, and shared classroom supplies. Kills 99.9% of classroom germs.",
      category: "pro",
      volume: "200ml",
      price: "$12.99 AUD",
      features: ["Classroom safe", "Non-toxic", "Air-dry formula"],
      heroIngredient: "Chromo-Capture Enzymes™",
    },
    {
      name: "Backpack Deodorizer",
      tagline: "What died in there?",
      description: "Odor-eliminating spray for school bags, lunch boxes, and gym kits. Destroys bacteria that cause sour milk and sock smells.",
      category: "pro",
      volume: "150ml",
      price: "$11.99 AUD",
      features: ["Lunch-box safe", "Odor eliminator", "Bacteria kill"],
      heroIngredient: "Chromo-Capture Enzymes™",
    },
    {
      name: "Mess Mat",
      tagline: "The canvas catches the chaos.",
      description: "Reusable silicone mat with absorbent microfiber layer. Catches paint, glue, and glitter before it hits the table.",
      category: "tool",
      volume: "60x40cm",
      price: "$24.99 AUD",
      features: ["Silicone base", "Microfiber top", "Machine washable"],
    },
    {
      name: "Cleanup Caddy",
      tagline: "Everything in its place.",
      description: "Colourful plastic caddy with compartments for wipes, sprays, and cloths. Built for little hands to carry.",
      category: "tool",
      volume: "Caddy",
      price: "$19.99 AUD",
      features: ["Kid-sized handles", "Compartmentalised", "Durable plastic"],
    },
    {
      name: "Finger-Paint Remover Refill",
      tagline: "Refill the fun.",
      description: "Concentrated refill for the Finger-Paint Remover. Same enzyme power in a larger bottle with easy-pour spout.",
      category: "refill",
      volume: "1L",
      price: "$24.99 AUD",
      features: ["Easy-pour spout", "3x refills", "Value size"],
      heroIngredient: "Chromo-Capture Enzymes™",
    },
    {
      name: "Summer Camp Kit",
      tagline: "Limited edition camp survival.",
      description: "Everything a camper needs: mini versions of all core products in a branded drawstring bag. Limited availability.",
      category: "limited",
      volume: "Kit",
      price: "$39.99 AUD",
      features: ["Travel sizes", "Drawstring bag", "Limited edition"],
      heroIngredient: "Chromo-Capture Enzymes™",
    },
  ],

  crossLinks: [
    {
      id: "ghoulverse",
      name: "GHOULVERSE",
      domain: "https://www.ghoulverse.com",
      icon: "🌌",
      color: "#00f0ff",
      realm: "The Universe",
      live: true,
    },
    {
      id: "goo",
      name: "GOO GHOUL",
      domain: "https://www.ghoulverse.com/ghouls/goo/",
      icon: "👻",
      color: "#ff00ff",
      realm: "The Goo Dimension",
      live: true,
    },
    {
      id: "party",
      name: "PARTY GHOUL",
      domain: "https://www.partyghoul.com",
      icon: "🎉",
      color: "#ff00ff",
      realm: "The Neon District",
      live: true,
    },
    {
      id: "beauty",
      name: "BEAUTY GHOUL",
      domain: "https://www.beautyghoul.com",
      icon: "💄",
      color: "#ec4899",
      realm: "The Glamour Dimension",
      live: true,
    },
    {
      id: "garden",
      name: "GARDEN GHOUL",
      domain: "https://www.gardenghoul.com",
      icon: "🌿",
      color: "#22c55e",
      realm: "The Verdant Wilds",
      live: true,
    },
    {
      id: "zen",
      name: "ZEN GHOUL",
      domain: "https://www.zenghoul.com",
      icon: "🧘",
      color: "#a855f7",
      realm: "The Tranquil Gardens",
      live: true,
    },
    {
      id: "tradie",
      name: "TRADIE GHOUL",
      domain: "https://www.tradieghoul.com",
      icon: "🔧",
      color: "#eab308",
      realm: "The Industrial Wastes",
      live: true,
    },
    {
      id: "geek",
      name: "GEEK GHOUL",
      domain: "https://www.geekghoul.com",
      icon: "💻",
      color: "#00d4ff",
      realm: "The Mainframe",
      live: true,
    },
    {
      id: "sport",
      name: "SPORT GHOUL",
      domain: "https://www.ghoulverse.com/ghouls/sport/",
      icon: "🏆",
      color: "#f97316",
      realm: "The Arena",
      live: false,
    },
    {
      id: "googoo",
      name: "GOO GOO",
      domain: "https://www.ghoulverse.com/ghouls/googoo/",
      icon: "🍼",
      color: "#3b82f6",
      realm: "The Nursery",
      live: false,
    },
    {
      id: "kid",
      name: "KID GHOUL",
      domain: "https://www.kidghoul.com",
      icon: "🧒",
      color: "#ef4444",
      realm: "The Playground",
      live: true,
    },
    {
      id: "teen",
      name: "TEEN GHOUL",
      domain: "https://www.ghoulverse.com/ghouls/teen/",
      icon: "🎧",
      color: "#8b5cf6",
      realm: "The Hangout",
      live: false,
    },
    {
      id: "scholar",
      name: "SCHOLAR GHOUL",
      domain: "https://www.ghoulverse.com/ghouls/scholar/",
      icon: "📚",
      color: "#f97316",
      realm: "The Infinite Library",
      live: false,
    },
  ],

  cta: {
    headline: "Investor Inquiries",
    subheadline: "Join the GHOULVERSE portfolio. Request the full investor deck and financial projections.",
    buttonText: "Request Deck",
    placeholderText: "Enter your email...",
  },

  gameUrl: "https://www.ghoulverse.com/play/",

  social: {
    twitter: "#",
    instagram: "#",
    youtube: "#",
  },

  science: {
    title: "The Science",
    subtitle: "Chromo-Capture Enzymes™",
    description: "Every KID GHOUL product is powered by Chromo-Capture Enzymes™ — a proprietary blend of pigment-dismantling enzymes that break down acrylics, waxes, and synthetic dyes at the molecular level. Crayon on drywall? Finger paint on hardwood? These enzymes encapsulate pigment particles and lift them away without stripping finishes or leaving residue.",
    adaptation: "For The Playground, we engineered a child-safe variant with zero VOCs, zero bleach, and a pH of 7.0. Safe for little hands, devastating to little messes.",
    stats: [
      { label: "Pigment Breakdown", value: "<30s" },
      { label: "Surface Safety", value: "100%" },
      { label: "VOC Content", value: "Zero" },
      { label: "Fun Factor", value: "11/10" },
    ],
  },

  marketSize: "$120B global children's products market",
  traction: [
    { label: "Character Websites", value: "7 Live", status: "complete" },
    { label: "GOO GHOUL™ Trademark", value: "IP Australia — Accepted", status: "complete" },
    { label: "GHOULVERSE Game", value: "Live", status: "complete" },
    { label: "Brand Partnerships", value: "Seeking First Deals", status: "upcoming" },
  ],
  ipStatus: "Trademark classes identified — Class 3 (cleaning preparations), Class 28 (toys & playthings) and Class 16 (stationery & art supplies). Filing planned post-funding.",
  ipClasses: [
    "Class 3 — Cleaning preparations, stain removers & surface care products",
    "Class 28 — Toys, playthings, children's activity sets & games",
    "Class 16 — Stationery, art supplies, crayons & drawing materials",
    "Class 21 — Household utensils, cleaning cloths & containers",
  ],
  roadmap: [
    { phase: "Phase 1", title: "Foundation", items: ["12 character websites live", "GOO GHOUL™ Class 3 (AU) filed", "GHOULVERSE game launched"], status: "complete" },
    { phase: "Phase 1.5", title: "International IP", items: ["US trademark via Madrid Protocol", "EU trademark filing", "Defensive name registrations"], status: "in-progress" },
    { phase: "Phase 2", title: "Mascot Creation", items: ["24 professional mascots (2 per ghoul)", "$120K investment across 12 characters"], status: "upcoming" },
    { phase: "Phase 3", title: "Partnerships & Revenue", items: ["Sector sponsorships", "Affiliate deals", "Event appearances", "Influencer recruitment"], status: "upcoming" },
    { phase: "Phase 4", title: "Entertainment Scale", items: ["Animated series pilot", "Convention circuit", "Merchandise licensing"], status: "upcoming" },
    { phase: "Phase 5", title: "Product Launch", items: ["GOO GHOUL household cleaners", "Vertical-specific product lines"], status: "upcoming" },
  ],

  fundingAsk: "$250,000 AUD",
  valuation: "$1,250,000 pre-money",
  equityOffered: "20%",
  projectedRevenue: [
    { year: "Year 1", amount: "$200,000", sources: "Brand sponsorships, event appearances, affiliate commissions" },
    { year: "Year 2", amount: "$560,000", sources: "Licensing, events, merch royalties, content" },
    { year: "Year 3", amount: "$1,200,000", sources: "Full licensing engine + product sales" },
  ],
  roiTarget: "5–8x over 3–5 years (40–70% IRR)",
  partnerships: [
    { type: "Brand Sponsorships", description: "Existing companies in each vertical pay to associate with our character IP at events and online." },
    { type: "Affiliate Marketing", description: "Partner products featured on ghoul websites — we earn commission on referred sales." },
    { type: "Event Appearances", description: "Mascots appear at sports events, conventions, retail launches — appearance fees + brand exposure." },
    { type: "Licensing", description: "Brands license ghoul characters for their own marketing, packaging, and promotions." },
  ],
  revenueStreams: [
    { stream: "Sponsorships", description: "Sector-specific brand deals per ghoul", timeline: "Year 1" },
    { stream: "Events", description: "Mascot appearances and activations", timeline: "Year 1" },
    { stream: "Affiliate", description: "Commission on partner product sales", timeline: "Year 1" },
    { stream: "Licensing", description: "Character IP licensing to brands", timeline: "Year 2" },
    { stream: "Merchandise", description: "Royalties on plush, apparel, accessories", timeline: "Year 2" },
    { stream: "Animation", description: "YouTube/streaming ad revenue, distribution deals", timeline: "Year 2" },
    { stream: "Products", description: "Owned product lines (GOO GHOUL cleaners first)", timeline: "Year 3" },
  ],
};
