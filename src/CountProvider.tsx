"use client";
import { createContext, useEffect, useState } from "react";
import { getUserToken } from "./getUserToken";
import { getCartData } from "./CartActions/CartActions";
import { CartData } from "./types/cart.type";

type ContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export const CountContext = createContext<ContextType | null>(null);
export default function CountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState<number>(0);

  async function getCart() {
    const token = await getUserToken();
    if (token) {
      const data: CartData = await getCartData();

      const sum = data.data.products.reduce(
        (total, Item) => (total += Item.count),
        0
      );
      setCount(sum);
    }
  }
  useEffect(() => {
    getCart();
  });
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}
