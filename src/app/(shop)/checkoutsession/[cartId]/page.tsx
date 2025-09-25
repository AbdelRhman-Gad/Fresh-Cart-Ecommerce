"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cashOrder, checkoutCardPayment } from "@/OrderActions/OrderActions";
import { useParams, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { CountContext } from "@/CountProvider";
import { CartData } from "@/types/cart.type";
import { getCartData } from "@/CartActions/CartActions";
import { toast } from "sonner";

export default function CheckOutSession() {
  const CountData = useContext(CountContext);
  const Route = useRouter();
  const { cartId }: { cartId: string } = useParams();
  const SchemaCheckout = z.object({
    details: z
      .string()
      .nonempty("Address is required")
      .min(3, "Minimum Characters 3")
      .max(40, "Maximum Characters 40"),
    phone: z
      .string()
      .nonempty("Phone number is required")
      .regex(/^(\+2)?01[0125][0-9]{8}$/, "Enter a valid phone number"),
    city: z.string().nonempty("City is required"),
  });
  const shippingForm = useForm<z.infer<typeof SchemaCheckout>>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(SchemaCheckout),
  });
  async function checkoutSessionCard(values: z.infer<typeof SchemaCheckout>) {
    const data = await checkoutCardPayment(cartId, values);
    window.location.href = data.session.url;
    // window.open(data.session.url, "_blank");
  }
  async function checkoutSessionCash(values: z.infer<typeof SchemaCheckout>) {
    const data = await cashOrder(cartId, values);
    if (data.status == "success") {
      const data: CartData = await getCartData();
      const sum = data.data.products.reduce(
        (total, Item) => (total += Item.count),
        0
      );
      CountData?.setCount(sum);
      Route.push("/allorders");
    } else {
      toast.error("");
    }
  }
  return (
    <div className="w-3/4 mx-auto my-5">
      <h1 className="text-3xl mb-10">Checkout</h1>
      <div>
        <Form {...shippingForm}>
          <form
            className="space-y-2"
            // onSubmit={shippingForm.handleSubmit(checkoutSessionCard)}
          >
            <FormField
              control={shippingForm.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input {...field} placeholder="Address" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={shippingForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input {...field} placeholder="Phone Number" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={shippingForm.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input {...field} placeholder="City" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 float-right">
              <Button
                type="button"
                onClick={shippingForm.handleSubmit(checkoutSessionCard)}
                className="bg-green-600 px-8 hover:bg-green-800 text-white cursor-pointer"
              >
                Card
              </Button>
              <Button
                type="button"
                onClick={shippingForm.handleSubmit(checkoutSessionCash)}
                className="bg-gray-600 px-8 hover:bg-gray-900 text-white cursor-pointer"
              >
                Cash
              </Button>
            </div>
            <div className="clear-both"></div>
          </form>
        </Form>
      </div>
    </div>
  );
}
