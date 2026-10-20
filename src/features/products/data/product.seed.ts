import blueprintsJson from "@/features/products/data/product.blueprints.json";
import type { Product, ProductCategory } from "@/features/products/product.types";

type ProductBlueprint = {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  imageAlt: string;
  features: string[];
};

export const productBlueprints = blueprintsJson as ProductBlueprint[];

export const productFinishes = [
  { key: "graphite", name: "Graphite" },
  { key: "sand", name: "Warm Sand" },
  { key: "sage", name: "Soft Sage" },
  { key: "clay", name: "Clay" },
  { key: "ocean", name: "Deep Ocean" },
  { key: "plum", name: "Muted Plum" },
  { key: "mist", name: "Silver Mist" },
  { key: "amber", name: "Amber" },
] as const;

const productCollections = [
  "Core",
  "Studio",
  "Travel",
  "Everyday",
  "Select",
  "Weekend",
  "Craft",
  "Urban",
  "Archive",
] as const;

const specifications = [
  { label: "Delivery", value: "Free over ₹2,999" },
  { label: "Returns", value: "30 days" },
  { label: "Warranty", value: "2 years" },
  { label: "Support", value: "7 days a week" },
];

const imagePath = (slug: string, finish: string, view: number) =>
  `/products/catalog/${slug}-${finish}-${view}.webp`;

export function createProduct(
  blueprint: ProductBlueprint,
  configurationIndex: number,
): Product {
  const finish = productFinishes[configurationIndex % productFinishes.length];
  const collection =
    productCollections[
      Math.floor(configurationIndex / productFinishes.length) %
        productCollections.length
    ];
  const isCore = configurationIndex === 0;
  const configurationSlug = isCore
    ? blueprint.slug
    : `${blueprint.slug}-${collection.toLowerCase()}-${finish.key}`;

  return {
    ...blueprint,
    id: isCore
      ? blueprint.id
      : `${blueprint.id}-${collection.toLowerCase()}-${finish.key}`,
    slug: configurationSlug,
    title: isCore
      ? blueprint.title
      : `${collection} ${blueprint.title} — ${finish.name}`,
    description: isCore
      ? blueprint.description
      : `${blueprint.description} This ${collection.toLowerCase()} configuration pairs the design with a ${finish.name.toLowerCase()} finish.`,
    price: blueprint.price + configurationIndex * 85,
    originalPrice: blueprint.originalPrice
      ? blueprint.originalPrice + configurationIndex * 85
      : undefined,
    rating: Math.max(
      4.2,
      Number((blueprint.rating - (configurationIndex % 4) * 0.1).toFixed(1)),
    ),
    reviewCount: blueprint.reviewCount + configurationIndex * 13,
    image: imagePath(blueprint.slug, finish.key, 1),
    gallery: [1, 2, 3].map((view) =>
      imagePath(blueprint.slug, finish.key, view),
    ),
    availability:
      configurationIndex % 11 === 0
        ? "Low stock · ships in two days"
        : "In stock · ships tomorrow",
    specifications,
  };
}
