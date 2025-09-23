"use client";
import {
  clearCart,
  getCartData,
  removeProductFromCart,
  updateProductQuantity,
} from "@/CartActions/CartActions";
import { Button } from "@/components/ui/button";
import { CountContext } from "@/CountProvider";
import { cart, CartData } from "@/types/cart.type";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const CounData = useContext(CountContext);
  const [countDisabled, setCountDisabled] = useState(false);
  const [currentId, setCurrentId] = useState<string>();
  const [countLoading, setCountLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);
  const [cart, setCart] = useState<cart>();
  useEffect(() => {
    getAllCartData();
  }, []);
  async function getAllCartData() {
    setCartLoading(true);
    const data: CartData = await getCartData();
    setCart(data.data);
    setCartLoading(false);
  }
  async function deleteProduct(id: string) {
    const data = await removeProductFromCart(id);
    if (data.status == "success") {
      toast.success("Item removed from cart", { position: "top-center" });
      setCart(data.data);
      const sum = data.data.products.reduce(
        (total: number, Item: { count: number }) => (total += Item.count),
        0
      );
      CounData?.setCount(sum);
    }
  }
  async function clearCartData() {
    const data = await clearCart();
    if (data.message == "success") {
      setCart(undefined);
      CounData?.setCount(0);
    }
  }
  async function updateProductCount(id: string, count: number) {
    setCountDisabled(true);
    setCurrentId(id);
    setCountLoading(true);
    const data = await updateProductQuantity(id, count);
    if (data.status == "success") {
      setCart(data.data);
      const sum = data.data.products.reduce(
        (total: number, Item: { count: number }) => (total += Item.count),
        0
      );
      CounData?.setCount(sum);
    }
    setCountLoading(false);
    setCountDisabled(false);
  }
  return (
    <>
      <div className="mt-5">
        <h1 className="text-3xl font-medium">My Cart</h1>
        {cartLoading ? (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-100 flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <>
            {cart != undefined && cart?.totalCartPrice != 0 ? (
              <>
                <div className="my-5">
                  <div className="flex justify-between my-3">
                    <h2 className="text-xl">
                      Total Price:{" "}
                      <span className="text-main">
                        {cart?.totalCartPrice} EGP
                      </span>
                    </h2>
                    <Button
                      onClick={clearCartData}
                      className="bg-red-500 hover:bg-red-700 text-white cursor-pointer"
                    >
                      Clear Cart
                    </Button>
                  </div>
                  <div className="clear-both"></div>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
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
                        </tr>
                      </thead>
                      <tbody>
                        {cart?.products.map((item) => {
                          return (
                            <tr
                              key={item._id}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              <td className="p-4">
                                <Image
                                  src={item.product.imageCover}
                                  width={100}
                                  height={100}
                                  className="w-16 md:w-32 max-w-full max-h-full object-cover" //object-cover
                                  alt={item.product.title}
                                />
                              </td>
                              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {item.product.title}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <Button
                                    disabled={countDisabled}
                                    onClick={() =>
                                      updateProductCount(
                                        item.product._id,
                                        (item.count -= 1)
                                      )
                                    }
                                    className="cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    type="button"
                                  >
                                    <span className="sr-only">
                                      Quantity button
                                    </span>
                                    {item.count == 1 ? (
                                      <i className="fa-solid fa-trash-can"></i>
                                    ) : (
                                      <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 2"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M1 1h16"
                                        />
                                      </svg>
                                    )}
                                  </Button>
                                  <div>
                                    {countLoading &&
                                    currentId == item.product._id ? (
                                      <i className="fa-solid fa-spinner fa-spin"></i>
                                    ) : (
                                      <span>{item.count}</span>
                                    )}
                                  </div>
                                  <Button
                                    disabled={countDisabled}
                                    onClick={() =>
                                      updateProductCount(
                                        item.product._id,
                                        (item.count += 1)
                                      )
                                    }
                                    className="cursor-pointer inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    type="button"
                                  >
                                    <span className="sr-only">
                                      Quantity button
                                    </span>
                                    <svg
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 18"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 1v16M1 9h16"
                                      />
                                    </svg>
                                  </Button>
                                </div>
                              </td>
                              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {item.price}
                              </td>
                              <td className="px-6 py-4">
                                <Button
                                  disabled={countDisabled}
                                  onClick={() =>
                                    deleteProduct(item.product._id)
                                  }
                                  className="bg-transparent text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                                >
                                  <i className="fa-solid fa-trash-can text-lg"></i>
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="text-md text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th colSpan={3} className="px-16 py-3">
                            Total Price:{" "}
                          </th>
                          <th colSpan={1} className="px-6 py-3">
                            {cart.totalCartPrice} EGP
                          </th>
                          <th></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <Button className="mb-4 p-6 rounded-md bg-green-600 cursor-pointer float-right text-white hover:bg-green-700">
                  <Link
                    className="text-white"
                    href={"/checkoutsession/" + cart._id}
                  >
                    <span className="text-white">Proceed to checkout</span>
                  </Link>
                </Button>
                <div className="clear-both"></div>
              </>
            ) : (
              <div
                className="text-red-800 p-15 my-10 text-center mb-4 text-sm rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Your cart is empty. </span> Add at
                least one item to view it here!
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
