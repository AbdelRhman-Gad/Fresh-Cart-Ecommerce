"use server";
import { getUserId } from "@/getUserId";
import { getUserToken } from "@/getUserToken";
import { OrdersData } from "@/types/orders.type";

export async function checkoutCardPayment(
  cartId: string,
  shippingData: { details: string; phone: string; city: string }
) {
  const token = await getUserToken();
  if (token) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_URL}`,
      {
        method: "post",
        body: JSON.stringify({
          shippingAddress: shippingData,
        }),
        headers: {
          "content-type": "application/json",
          token: token as string,
        },
      }
    );
    const data = await res.json();
    return data;
  }
}

export async function cashOrder(
  cartId: string,
  shippingData: { details: string; phone: string; city: string }
) {
  const token = await getUserToken();
  if (token) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${cartId}`,
      {
        method: "post",
        body: JSON.stringify({
          shippingAddress: shippingData,
        }),
        headers: {
          "content-type": "application/json",
          token: token as string,
        },
      }
    );
    const data = await res.json();
    return data;
  }
}

export async function getUserOrders() {
  const userId = await getUserId();
  if (!userId) {
    throw new Error("Token Error");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${userId}`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data: OrdersData[] = await res.json();
  return data;
}
