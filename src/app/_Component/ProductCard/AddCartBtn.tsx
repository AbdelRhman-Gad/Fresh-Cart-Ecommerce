"use client";
import { AddProductToCart } from "@/CartActions/CartActions";
import { Button } from "@/components/ui/button";
import { CountContext } from "@/CountProvider";
import { ReactNode, useContext } from "react";
import { toast } from "sonner";
interface AddCartBtnProps {
  id: string;
  className?: string;
  children?: ReactNode; // <-- allows icons/text
}

export default function AddCartBtn({
  id,
  className,
  children,
}: AddCartBtnProps) {
  const countData = useContext(CountContext);
  async function addProduct(id: string) {
    try {
      const data = await AddProductToCart(id);
      if (data.status == "success") {
        toast.success(data.message, { position: "bottom-center" });

        const sum = data.data.products.reduce(
          (total: number, Item: { count: number }) => (total += Item.count),
          0
        );
        countData?.setCount(sum);
      } else {
        toast.error("Error: Failed to add item to cart", {
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error("You have to login to add products to cart!", {
        position: "top-center",
      });
    }
  }
  return (
    <Button
      onClick={() => addProduct(id)}
      className={`rounded-md bg-green-600 cursor-pointer hover:bg-green-700 ${
        className || ""
      }`}
    >
      {children || "Add to cart"}
    </Button>
  );
}
