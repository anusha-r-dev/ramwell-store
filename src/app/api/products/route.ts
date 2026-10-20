import { NextResponse } from "next/server";
import { getCatalogProducts } from "@/features/products/data/product.repository";

export async function GET() {
  try {
    const products = await getCatalogProducts();
    return NextResponse.json(products, {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "The catalog is temporarily unavailable." },
      { status: 500 },
    );
  }
}
