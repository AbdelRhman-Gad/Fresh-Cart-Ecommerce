"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserOrders } from "@/OrderActions/OrderActions";
import { OrdersData } from "@/types/orders.type";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState<OrdersData[]>([]);
  useEffect(() => {
    getAllUserOrders();
  }, []);
  async function getAllUserOrders() {
    const data: OrdersData[] = await getUserOrders();
    setOrders(data);
  }
  return (
    <div>
      <div className="mt-5">
        <h1 className="text-3xl font-medium">My Orders</h1>
        <div className="my-5">
          <>
            <div className="hidden md:block relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  {orders.map((order) => {
                    return order.cartItems.map((item) => {
                      return (
                        <tr
                          key={item._id}
                          className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <td className="p-4">
                            {/* <Link href={"/products/" + item._id}>
                            </Link> */}
                            <Image
                              src={item?.product.imageCover}
                              width={100}
                              height={100}
                              className="w-16 md:w-32 max-w-full max-h-full object-cover"
                              alt={item.product.title}
                            />
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {item.product.title
                              .split(" ")
                              .slice(0, 2)
                              .join(" ")}
                          </td>
                          <td className="px-6 py-4 text-main">
                            {item.product.category?.name}
                          </td>
                          <td className="px-6 py-4">
                            {item.product.brand.name}
                          </td>
                          {/* <td className="px-6 py-4">{item.description}</td> */}
                          <td className="px-6 py-4">
                            <i className="fa-solid fa-star rating-color"></i>
                            {item.product.ratingsAverage}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {item.price} EGP
                          </td>
                          <td
                            colSpan={1}
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white uppercase"
                          >
                            {order.paymentMethodType}
                          </td>
                        </tr>
                      );
                    });
                  })}
                </tbody>
              </table>
            </div>
          </>
          <>
            <div className="block md:hidden space-y-4">
              {orders.map((order) => {
                return order.cartItems.map((item) => {
                  return (
                    <Card key={item._id}>
                      <CardHeader>
                        <Image
                          src={item?.product.imageCover}
                          alt={item?.product.imageCover}
                          width={200}
                          height={100}
                          className="w-full h-80 object-cover rounded-lg"
                        />
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="text-main">
                          {item.product.category?.name}
                        </CardTitle>
                        <CardTitle className="py-4">
                          {item.product.title.split(" ").slice(0, 2).join(" ")}
                        </CardTitle>
                        <div className="flex justify-between items-center">
                          <span>{item.price} EGP</span>
                          <span>
                            <i className="fa-solid fa-star rating-color"></i>
                            {item.product.ratingsAverage}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 flex justify-end">
                        <span className="font-semibold text-gray-500 dark:text-white uppercase">
                          {order.paymentMethodType}
                        </span>
                      </CardFooter>
                    </Card>
                  );
                });
              })}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
