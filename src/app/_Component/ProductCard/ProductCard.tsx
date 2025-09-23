import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { product } from "@/types/products.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddCartBtn from "./AddCartBtn";
import AddToWishlistBtn from "../AddToWishlistBtn/AddToWishlistBtn";

export default function ProductCard({ product }: { product: product }) {
  const {
    imageCover,
    title,
    ratingsAverage,
    price,
    category: { name },
    _id,
  } = product;
  return (
    <div>
      <Card>
        <Link href={"/products/" + _id}>
          <CardHeader>
            <Image
              src={imageCover}
              alt={title}
              width={200}
              height={100}
              className="w-full h-80 object-cover rounded-lg"
            />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-main">{name}</CardTitle>
            <CardTitle className="py-2">
              {title.split(" ").slice(0, 2).join(" ")}
            </CardTitle>
            <div className="flex justify-between items-center">
              <span>{price} EGP</span>
              <span>
                <i className="fa-solid fa-star rating-color"></i>
                {ratingsAverage}
              </span>
            </div>
          </CardContent>
        </Link>
        <CardFooter className="pt-2 flex justify-between">
          <AddCartBtn className="w-58" id={_id} />
          <AddToWishlistBtn id={_id} />
          {/* <i className="text-3xl fa-regular fa-heart cursor-pointer hover:text-red-400"></i> */}
        </CardFooter>
      </Card>
    </div>
  );
}
