/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: "purse-1",
    name: "Aurelia Gold-Chain Calfskin Handbag",
    description: "Indulge in pure luxury with the Aurelia Handbag. Meticulously handcrafted from premium full-grain calfskin leather, it features a structured silhouette, polished 24K gold-plated hardware, and a sliding chain strap that effortlessly transitions from shoulder to crossbody. The soft micro-suede interior boasts two main compartments and a secure zip pocket.",
    price: 12499,
    originalPrice: 15999,
    category: "purses",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800",
      "https://images.unsplash.com/photo-1598532163257-da3ad67f4729?q=80&w=800",
      "https://images.unsplash.com/photo-1524498250077-3aab37027ae4?q=80&w=800"
    ],
    rating: 4.9,
    reviewCount: 42,
    isFeatured: true,
    isBestSeller: true,
    stock: 8,
    features: [
      "100% Genuine Full-Grain Calfskin Leather",
      "24K Gold-Plated Sliding Chain and Hardware",
      "Scratch-resistant textured finish",
      "Interior zip compartment & card organizer",
      "Handcrafted in India by master artisans"
    ],
    specifications: {
      "Material": "Calfskin Leather",
      "Hardware": "Gold-plated brass",
      "Dimensions": "26cm x 16cm x 9cm",
      "Chain Drop": "52cm fully extended",
      "Weight": "650g"
    },
    reviews: [
      {
        id: "rev-1",
        author: "Priya Sharma",
        rating: 5,
        text: "The leather is incredibly soft yet holds its shape perfectly. The gold-plated chain feels heavy and extremely premium. Worth every single rupee!",
        date: "2026-05-15"
      },
      {
        id: "rev-2",
        author: "Meera Nair",
        rating: 4.8,
        text: "Absolutely stunning. I always get compliments when wearing it. Packaging was also highly premium with a dustbag.",
        date: "2026-05-22"
      }
    ]
  },
  {
    id: "purse-2",
    name: "Classic Noir Saffiano Tote",
    description: "An elegant essential for the modern woman. The Classic Noir Saffiano Tote is crafted from iconic cross-grain Saffiano leather, renowned for its excellent durability and water-and-scratch resistance. Extremely spacious, it easily accommodates a 13-inch laptop alongside your personal essentials, secured by a solid gold-toned Swiss-made zipper.",
    price: 14999,
    originalPrice: 19500,
    category: "purses",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800"
    ],
    rating: 4.8,
    reviewCount: 31,
    isFeatured: true,
    isBestSeller: false,
    stock: 12,
    features: [
      "Hard-wearing Saffiano cross-grain leather",
      "Robust magnetic closure + secure zip compartment",
      "Reinforced protective metal feet on base",
      "Spacious interior fits 13\" laptops or tablets",
      "Exquisite satin-smooth branded interior mapping"
    ],
    specifications: {
      "Material": "Saffiano Leather",
      "Hardware": "Champagne gold tone",
      "Dimensions": "35cm x 28cm x 13cm",
      "Handle Drop": "22cm",
      "Weight": "800g"
    },
    reviews: [
      {
        id: "rev-3",
        author: "Divya Patel",
        rating: 5,
        text: "This is my everyday work tote. The saffiano leather indeed doesn't scratch at all. Holds everything elegantly.",
        date: "2026-04-10"
      }
    ]
  },
  {
    id: "purse-3",
    name: "Blush Rose Crossbody Satchel",
    description: "Embrace feminine grace with our Blush Rose Crossbody Satchel. Carved in a delicate, soft pink luxury pebbled leather, this structured piece features magnetic flap closure, an interior slip pocket, and a customizable leather strap. Accented by solid gold eyelets and a vintage key emblem, it's perfect for weekend outings and sunny brunches.",
    price: 9999,
    originalPrice: 12999,
    category: "purses",
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc15a4a5?q=80&w=800",
      "https://images.unsplash.com/photo-1524498250077-3aab37027ae4?q=80&w=800",
      "https://images.unsplash.com/photo-1598532163257-da3ad67f4729?q=80&w=800"
    ],
    rating: 4.7,
    reviewCount: 28,
    isFeatured: false,
    isBestSeller: true,
    stock: 5,
    features: [
      "Premium pebbled luxury leather",
      "Soft rose gold-tone signature hardware",
      "Flapover magnetic closure",
      "Adjustable and removable crossbody leather strap",
      "Two spacious internal slip slots"
    ],
    specifications: {
      "Material": "Pebbled Calfskin Leather",
      "Hardware": "Rose-gold overlay",
      "Dimensions": "22cm x 15cm x 7.5cm",
      "Strap Length": "110cm - 125cm adjusted",
      "Weight": "480g"
    },
    reviews: [
      {
        id: "rev-4",
        author: "Kareena Kapoor",
        rating: 5,
        text: "The perfect blush pink shade I was looking for! Perfect size to carry my phone, cards, lipstick, and keys.",
        date: "2026-05-02"
      }
    ]
  },
  {
    id: "purse-4",
    name: "Starlight Ivory Bucket Bag",
    description: "Where minimalist form meets playful function. Crafted from thick, supple architectural drummed leather in a gorgeous matte ivory shade, this bucket bag features an elegant golden cinch closure with polished pull tabs and a sturdy flat base. It includes an alternate top handle and a leather crossbody strap, giving you multiple ways to style.",
    price: 11200,
    originalPrice: 14500,
    category: "purses",
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800",
      "https://images.unsplash.com/photo-1524498250077-3aab37027ae4?q=80&w=800",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800"
    ],
    rating: 4.6,
    reviewCount: 19,
    isFeatured: false,
    isBestSeller: false,
    stock: 7,
    features: [
      "Premium architectural pebbled leather in warm ivory",
      "Solid brass gold-toned metallic custom grommets",
      "Removable top-carry flat leather handle",
      "Includes protective dust bag made of organic cotton",
      "Adjustable shoulder strap"
    ],
    specifications: {
      "Material": "Full-Grain Pebbled Leather",
      "Hardware": "Brushed gold-tone brass",
      "Dimensions": "20cm x 22cm x 12cm",
      "Handle Drop": "14cm",
      "Weight": "550g"
    },
    reviews: [
      {
        id: "rev-5",
        author: "Shreya Ghoshal",
        rating: 4.5,
        text: "Highly versatile bucket handbag. Deeply spacious and the leather smells wonderful.",
        date: "2026-04-20"
      }
    ]
  },
  {
    id: "purse-5",
    name: "Marbella Heritage Saddle Bag",
    description: "Inspired by vintage equestrian aesthetics, the Marbella Heritage Saddle Bag is a masterclass in classic tailoring. Hand-burnished mahogany brown calfskin, raw saddle stitches, and a secure front flap with magnetic brass clasp make this a timeless accessory that gets better with age, acquiring a beautiful unique patina over time.",
    price: 13500,
    originalPrice: 16999,
    category: "purses",
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800"
    ],
    rating: 4.9,
    reviewCount: 35,
    isFeatured: true,
    isBestSeller: true,
    stock: 4,
    features: [
      "Vegetable-tanned hand-finished harness leather",
      "Traditional heavy structural thread saddle stitching",
      "Suede fabric lined interior flap",
      "External rear slot pocket for cards or phone",
      "Magnetic flap under luxury brass buckle"
    ],
    specifications: {
      "Material": "Vegetable-tanned calfskin",
      "Hardware": "Antique brass brush finish",
      "Dimensions": "24cm x 18cm x 8.5cm",
      "Strap Drop": "48cm to 58cm",
      "Weight": "600g"
    },
    reviews: [
      {
        id: "rev-6",
        author: "Anjali Gupta",
        rating: 5,
        text: "The vintage leather is incredibly fine. Smells fantastic, structured and sits beautifully crossbody.",
        date: "2026-05-10"
      }
    ]
  },
  {
    id: "purse-6",
    name: "Imperial Emerald Metallic Clutch",
    description: "The ultimate evening showstopper. This high-octane clutch is made of gorgeous deep emerald green python-embossed leather with a sleek metallic sheen. It features an angular geometric front lock, expanding side gussets, and a delicate tuck-away chain in lustrous polished gold. A luxurious home for your evening-out essentials.",
    price: 8999,
    originalPrice: 11999,
    category: "purses",
    images: [
      "https://images.unsplash.com/photo-1605733513597-a8f8d410db3c?q=80&w=800",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800",
      "https://images.unsplash.com/photo-1598532163257-da3ad67f4729?q=80&w=800"
    ],
    rating: 4.8,
    reviewCount: 16,
    isFeatured: false,
    isBestSeller: false,
    stock: 9,
    features: [
      "Metallic green python embossed leather",
      "Geometric designer snap clasp",
      "Concealable fine trace chain strap",
      "Divided interior with soft satin liner",
      "Perfect size for smartphones & beauty essentials"
    ],
    specifications: {
      "Material": "Embossed premium calfskin",
      "Hardware": "24K Gold-plated lacquer",
      "Dimensions": "20cm x 11cm x 5cm",
      "Chain Length": "100cm",
      "Weight": "420g"
    },
    reviews: [
      {
        id: "rev-7",
        author: "Ritu Roy",
        rating: 5,
        text: "The emerald color is so intense and rich under evening lights. Got so many compliments at the gala!",
        date: "2026-05-18"
      }
    ]
  },

  // JEWELRY Products
  {
    id: "jew-1",
    name: "Amour 18K Solid Gold Chain Link",
    description: "Experience modern elegance. The Amour Gold Chain features an intertwined series of delicate double rings, masterfully crafted in recycled solid 18K yellow gold. Designed to sit comfortably just above the collarbone, it serves as a stunning standalone statement piece or layers effortlessly with other fine necklaces.",
    price: 24500,
    originalPrice: 29999,
    category: "jewelry",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800",
      "https://images.unsplash.com/photo-1611085583191-a3b1a3a30c0c?q=80&w=800",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800"
    ],
    rating: 4.9,
    reviewCount: 56,
    isFeatured: true,
    isBestSeller: true,
    stock: 6,
    features: [
      "Recycled Solid 18K Yellow Gold",
      "Delicate high-polish finish",
      "Lobster-claw safety clasp with CV stamp",
      "Interchangeable length extender",
      "Certified ethical and conflict-free mining origin"
    ],
    specifications: {
      "Metal": "18K Gold (750 Hallmark)",
      "Purity": "75% Solid Gold",
      "Length": "40cm with 5cm extender",
      "Weight": "4.8g",
      "Clasp": "Secure lobster claw"
    },
    reviews: [
      {
        id: "rev-8",
        author: "Kriti Sen",
        rating: 5,
        text: "This gold chain is absolute perfection. It catches the light so beautifully and doesn't tangle. Hallmarking card was included.",
        date: "2026-05-24"
      },
      {
        id: "rev-9",
        author: "Aishwarya R.",
        rating: 4.8,
        text: "Delicate and extremely sophisticated. I wear it daily, and it doesn't irritate my skin.",
        date: "2026-05-28"
      }
    ]
  },
  {
    id: "jew-2",
    name: "Solitaire Pearl & Diamond Hoops",
    description: "Dazzle and shine from every angle. These dual-accent earrings pair beautifully polished modern 14K solid gold hoops with premium cultured freshwater pearls and pavé set VVS diamonds. Elegant and lightweight, they offer a comfortable sway that completes any sophisticated evening attire.",
    price: 18900,
    originalPrice: 23500,
    category: "jewelry",
    images: [
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800"
    ],
    rating: 4.8,
    reviewCount: 38,
    isFeatured: true,
    isBestSeller: true,
    stock: 10,
    features: [
      "Handpicked 8mm AAA Grade freshwater pearls",
      "0.15tcw Round Brilliant micro VVS diamonds",
      "Solid 14K yellow gold setting and posts",
      "Hypoallergenic and suitable for long wear",
      "Includes official CV authenticity certificate"
    ],
    specifications: {
      "Metal": "14K Solid Yellow Gold",
      "Stones": "Brilliant-cut diamonds & Pearls",
      "Diamond Color/Clarity": "G-H / VVS2",
      "Pearl Diameter": "8.0 - 8.5 mm",
      "Closure": "Snap-post clutch"
    },
    reviews: [
      {
        id: "rev-10",
        author: "Nisha Patel",
        rating: 5,
        text: "The pearls are incredibly lustrous with zero blemishes. The tiny diamonds add such a beautiful shimmer.",
        date: "2026-04-18"
      }
    ]
  },
  {
    id: "jew-3",
    name: "Princess Pearl Drop Leaf Earrings",
    description: "Inspired by the organic symmetry of nature, these gorgeous drop earrings feature delicate hand-etched 14K gold leaves holding hanging high-luster teardrop pearls. A romantic, classic accessory that brings soft movement and ethereal shine to weddings, galas, or special private celebrations.",
    price: 15500,
    originalPrice: 19999,
    category: "jewelry",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800",
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800"
    ],
    rating: 4.7,
    reviewCount: 22,
    isFeatured: false,
    isBestSeller: false,
    stock: 4,
    features: [
      "Authentic hand-selected teardrop white pearls",
      "Meticulous leaf engraving detail",
      "14K solid gold hook hangers",
      "Polished satin lustre finish",
      "Beautiful legacy gift packaging"
    ],
    specifications: {
      "Metal": "14K Solid Gold",
      "Pearl Grade": "AAA Premium Luster",
      "Earring Length": "28mm drop width",
      "Pearl Size": "9.5mm x 7mm",
      "Weight": "3.5g per pair"
    },
    reviews: [
      {
        id: "rev-11",
        author: "Dia Mirza",
        rating: 5,
        text: "Elegance defined. Perfect weight on ears, doesn't drag, and looks extremely noble and delicate.",
        date: "2026-03-30"
      }
    ]
  },
  {
    id: "jew-4",
    name: "Celestial Eternity Tennis Chain",
    description: "Make a dazzling statement with our Celestial Eternity Tennis Bracelet. Adorned with a continuous cascade of round brilliant-cut lab-grown VVS diamonds, configured in a premium 3-claw micro-pave platinum-coated silver setting. Equipped with dual-security clasp closures, this piece shines as intensely as natural stars.",
    price: 32000,
    originalPrice: 39500,
    category: "jewelry",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800"
    ],
    rating: 5.0,
    reviewCount: 15,
    isFeatured: true,
    isBestSeller: true,
    stock: 3,
    features: [
      "3.0 Carats Total Weight conflict-free diamonds",
      "VVS Clarity, D-E Color (Excellent Brightness)",
      "Premium 925 Sterling Silver base heavily coated in Platinum",
      "Invisible hook deployment clasp with lock tabs",
      "Individually hand-set gemstones by master artisans"
    ],
    specifications: {
      "Base Metal": "925 Sterling Silver",
      "Plating": "Premium Solid Platinum (Rh)",
      "Carat Weight": "3.00 ctw",
      "Clarity / Color": "VVS1 / D-Color (Colorless)",
      "Length": "17.5cm standard fit"
    },
    reviews: [
      {
        id: "rev-12",
        author: "Sneha Reddy",
        rating: 5,
        text: "Simply breathtaking! The fire and scintillation in these diamonds are massive. Clasp is extremely secure.",
        date: "2026-05-12"
      }
    ]
  },
  {
    id: "jew-5",
    name: "Emerald Seraphina Pave Solitaire",
    description: "A signature statement of status and nobility. The Seraphina Solitaire features an exquisite 2.5-carat rectangular emerald-cut green cubic zirconia or conflict-free lab tourmaline, crowned by a glittering pave ring frame in solid yellow gold. Designed to command attention from any table, it's the ultimate premium cocktail accessory.",
    price: 12500,
    originalPrice: 15900,
    category: "jewelry",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800",
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800"
    ],
    rating: 4.8,
    reviewCount: 20,
    isFeatured: false,
    isBestSeller: false,
    stock: 5,
    features: [
      "2.5ct Emerald-Cut radiant lab gemstone",
      "Pave wrap-around brilliant diamond halo",
      "Solid 14K Yellow Gold band",
      "Polished high-clarity mirror facet cuts",
      "Includes premium velvet green display ring box"
    ],
    specifications: {
      "Metal": "14K Solid Gold",
      "Gemstone": "Deep forest-green tourmaline emerald",
      "Cut": "Classic Rectangular Emerald Step-Cut",
      "Shape size": "8mm x 10mm face",
      "Ring Size": "Adjustable comfort band layout (Fits US 6-8)"
    },
    reviews: [
      {
        id: "rev-13",
        author: "Pooja Hegde",
        rating: 5,
        text: "The green hue is magical - so deep and mysterious. The ring looks very luxurious on fingers.",
        date: "2026-05-20"
      }
    ]
  },
  {
    id: "jew-6",
    name: "Astraean Layered Gold Choker",
    description: "Modern minimalism reimagined. The Astraean Triple Choker features a delicate combination of flat-snake, dainty rope, and beaded chains crafted in pristine 18K gold vermeil. Hugging the neckline comfortably, it adds immediate Parisian elegance and a beautiful multi-textured reflection to your standard evening outfit.",
    price: 21000,
    originalPrice: 26000,
    category: "jewelry",
    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800",
      "https://images.unsplash.com/photo-1611085583191-a3b1a3a30c0c?q=80&w=800"
    ],
    rating: 4.7,
    reviewCount: 29,
    isFeatured: false,
    isBestSeller: true,
    stock: 8,
    features: [
      "18K Gold Vermeil over 925 Sterling Sterling base",
      "Multi-wear layout (Triple-chains connected by single safety spacer)",
      "Flat snake chain catches maximum light",
      "Tarnish-resistant clear e-coat shielding",
      "Perfect addition to both plunging and high necklines"
    ],
    specifications: {
      "Metal": "18K Gold Vermeil (3-micron layer)",
      "Base": "925 Premium Sterling Silver",
      "Chain lengths": "35cm, 38cm, 42cm layering",
      "Closure": "Heavy durable spring lock clamp",
      "Weight": "12.8g"
    },
    reviews: [
      {
        id: "rev-14",
        author: "Meghna Sen",
        rating: 4.5,
        text: "Gorgeous layers! Usually layered chains get horribly tangled, but CV's design includes a back separator that solves it. Brilliantly engineered.",
        date: "2026-04-12"
      }
    ]
  }
];
