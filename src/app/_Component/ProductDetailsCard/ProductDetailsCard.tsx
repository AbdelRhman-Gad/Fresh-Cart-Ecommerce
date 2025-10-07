import { Button } from "@/components/ui/button";
import { productItem } from "@/types/productDetails.type";
import Image from "next/image";
import React from "react";
import ProductSlider from "../ProductSlider/ProductSlider";
import AddCartBtn from "../ProductCard/AddCartBtn";
import AddToWishlistBtn from "../AddToWishlistBtn/AddToWishlistBtn";

export default function ProductDetailsCard({
  product,
}: {
  product: productItem;
}) {
  const {
    imageCover,
    title,
    ratingsAverage,
    price,
    category: { name },
    _id,
    description,
    images,
  } = product;
  return (
    <div className="container m-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center my-24">
        <div className="col-span-12 lg:col-span-5">
          {/* <Image
            src={imageCover}
            alt={title}
            width={200}
            height={100}
            className="w-full object-cover rounded-lg" 
          /> */}
          <ProductSlider images={images} />
        </div>
        <div className="col-span-12 lg:col-span-7 mt-10 lg:mt-0">
          <h1 className="text-2xl">{title}</h1>
          <p className="text-xl text-gray-500 my-5">{description}</p>
          <h4 className="text-main py-2">{name}</h4>
          <div className="flex justify-between items-center pb-6">
            <span>{price} EGP</span>
            <span>
              <i className="fa-solid fa-star rating-color"></i>
              {ratingsAverage}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <AddCartBtn className="w-3/4" id={_id} />
            <AddToWishlistBtn id={_id} />
          </div>
        </div>
      </div>
    </div>
  );
}
