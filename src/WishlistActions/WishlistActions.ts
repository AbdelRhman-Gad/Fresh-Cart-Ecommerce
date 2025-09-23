"use server";
import { getUserToken } from "@/getUserToken";
import { WishlistData } from "@/types/wishlist.type";

export async function getWishlistData() {
  const token = await getUserToken();
  if (!token) {
    throw new Error("Token Error");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
    {
      headers: {
        token: token as string,
      },
    }
  );
  const data: WishlistData = await res.json();
  return data;
}

export async function AddProductToWishlist(id: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("Token Error");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
    {
      method: "post",
      body: JSON.stringify({
        productId: id,
      }),
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
}

export async function removeProductFromWishlist(id: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("Token Error");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`,
    {
      method: "delete",
      headers: {
        token: token as string,
      },
    }
  );
  const data = await res.json();
  return data;
}
