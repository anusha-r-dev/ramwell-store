export const productCategories = [
  "Audio",
  "Computing",
  "Home",
  "Lifestyle",
  "Photography",
  "Wellness",
] as const;

export type ProductCategory = (typeof productCategories)[number];

export type ProductSpecification = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  availability: string;
  badge?: string;
  image: string;
  imageAlt: string;
  gallery: string[];
  features: string[];
  specifications: ProductSpecification[];
};

export type CatalogProduct = Pick<
  Product,
  | "id"
  | "slug"
  | "title"
  | "shortDescription"
  | "category"
  | "price"
  | "originalPrice"
  | "rating"
  | "reviewCount"
  | "badge"
  | "image"
  | "imageAlt"
>;
