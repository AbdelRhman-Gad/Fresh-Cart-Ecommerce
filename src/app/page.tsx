import { product, ProductData } from "@/types/products.type";
import ProductCard from "./_Component/ProductCard/ProductCard";
import MainSlider from "./_Component/MainSlider/MainSlider";
import { Suspense } from "react";
import { HomeLoading } from "./_Component/HomeLoading/HomeLoading";

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`
  );
  const data: ProductData = await res.json();
  const productList: product[] = data.data;

  return (
    <>
      <MainSlider />
      <div className="grid mt-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        <Suspense fallback={<HomeLoading />}>
          {productList.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </Suspense>
      </div>
    </>
  );
}
