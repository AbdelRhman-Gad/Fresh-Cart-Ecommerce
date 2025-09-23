"use client";
import AddCartBtn from "@/app/_Component/ProductCard/AddCartBtn";
import { Button } from "@/components/ui/button";
import { Product, WishlistData } from "@/types/wishlist.type";
import {
  getWishlistData,
  removeProductFromWishlist,
} from "@/WishlistActions/WishlistActions";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<Product[]>();
  const [wishlistLoading, setWishlistLoading] = useState(true);
  useEffect(() => {
    getAllWishlistData();
  }, []);
  async function getAllWishlistData() {
    setWishlistLoading(true);
    const data: WishlistData = await getWishlistData();
    setWishlist(data.data);
    // console.log(data);
    setWishlistLoading(false);
  }
  async function deleteProduct(id: string) {
    const data = await removeProductFromWishlist(id);
    if (data.status == "success") {
      toast.success("Item removed from wishlist", {
        position: "bottom-center",
      });
      getAllWishlistData();
    }
  }
  return (
    <div className="mt-5">
      <h1 className="text-3xl font-medium">Wishlist</h1>
      <div className="my-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {/* <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr> */}
            </thead>
            <tbody>
              {wishlist?.map((item) => {
                return (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <Link href={"/products/" + item._id}>
                        <Image
                          src={item?.imageCover}
                          width={100}
                          height={100}
                          className="w-16 md:w-32 max-w-full max-h-full object-cover"
                          alt={item.title}
                        />
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-main">
                      {item.category?.name}
                    </td>
                    <td className="px-6 py-4">{item.brand.name}</td>
                    {/* <td className="px-6 py-4">{item.description}</td> */}
                    <td className="px-6 py-4">
                      <i className="fa-solid fa-star rating-color"></i>
                      {item.ratingsAverage}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.price} EGP
                    </td>
                    <td colSpan={1} className="px-6 py-4">
                      {/* <Button className="bg-transparent text-green-600 hover:bg-green-600 hover:text-white cursor-pointer">
                        <i className="fa-solid fa-cart-plus text-lg"></i>
                      </Button> */}
                      <AddCartBtn
                        id={item._id}
                        className="bg-transparent text-green-600 hover:bg-green-600 hover:text-white cursor-pointer"
                      >
                        <i className="fa-solid fa-cart-plus text-lg"></i>
                      </AddCartBtn>
                    </td>
                    <td colSpan={1} className="px-6 py-4">
                      <Button
                        onClick={() => deleteProduct(item._id)}
                        className="bg-transparent text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                      >
                        <i className="fa-solid fa-trash-can text-lg"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
