"use client";
import { AddProductToCart } from "@/CartActions/CartActions";
import { Button } from "@/components/ui/button";
import { AddProductToWishlist } from "@/WishlistActions/WishlistActions";
import { toast } from "sonner";

export default function AddToWishlistBtn({ id }: { id: string }) {
  async function addProduct(id: string) {
    try {
      const data = await AddProductToWishlist(id);
      if (data.status == "success") {
        toast.success(data.message, { position: "bottom-center" });
      } else {
        toast.error("Error: Failed to add item to wishlist", {
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error("You have to login to add products to wishlist!", {
        position: "top-center",
      });
    }
  }
  return (
    <Button
      onClick={() => addProduct(id)}
      className="bg-transparent rounded-full cursor-pointer hover:bg-gray-100"
    >
      <i className="fa-regular fa-heart text-xl text-gray-700"></i>
    </Button>
  );
}
