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
import { checkoutCardPayment } from "@/OrderActions/OrderActions";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function CheckOutSession() {
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
  async function checkoutSessionPayment(
    values: z.infer<typeof SchemaCheckout>
  ) {
    const data = await checkoutCardPayment(cartId, values);
    window.location.href = data.session.url;
    // window.open(data.session.url, "_blank");
  }
  return (
    <div className="w-3/4 mx-auto my-5">
      <h1 className="text-3xl mb-10">Checkout</h1>
      <div>
        <Form {...shippingForm}>
          <form
            className="space-y-2"
            onSubmit={shippingForm.handleSubmit(checkoutSessionPayment)}
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
            <Button className="bg-green-600 px-8 cursor-pointer hover:bg-green-800 text-white float-right">
              Continue
            </Button>
            <div className="clear-both"></div>
          </form>
        </Form>
      </div>
    </div>
  );
}
