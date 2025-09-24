"use server";
import { getUserToken } from "@/getUserToken";

export async function checkoutCardPayment(
  cartId: string,
  shippingData: { details: string; phone: string; city: string }
) {
  const token = await getUserToken();
  if (token) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_SITE_URL}`,
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
