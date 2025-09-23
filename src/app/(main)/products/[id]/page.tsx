import ProductDetailsCard from "@/app/_Component/ProductDetailsCard/ProductDetailsCard";
import { ProductDetails, productItem } from "@/types/productDetails.type";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`
  );
  const data: ProductDetails = await res.json();
  const product: productItem = data.data;
  return (
    <div>
      {/* <h1>Product Details</h1> */}
      <ProductDetailsCard product={product} />
    </div>
  );
}
