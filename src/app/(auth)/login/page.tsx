"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { getUserToken } from "@/getUserToken";
import { CartData } from "@/types/cart.type";
import { getCartData } from "@/CartActions/CartActions";
import { CountContext } from "@/CountProvider";

export default function Login() {
  const Route = useRouter();
  const CountData = useContext(CountContext);
  const SchemaLogin = z.object({
    email: z.email("Invalid Email").nonempty("Email is required!"),
    password: z
      .string()
      .nonempty("Password is required!")
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/,
        "Enter valid password"
      ),
  });
  const LoginForm = useForm<z.infer<typeof SchemaLogin>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SchemaLogin),
  });
  async function handleLogin(values: z.infer<typeof SchemaLogin>) {
    const data = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      // callbackUrl: "/",
    });
    if (data?.ok) {
      toast.success("Logged in!", { position: "top-center" });
      const token = await getUserToken();
      if (token) {
        const data: CartData = await getCartData();

        const sum = data.data.products.reduce(
          (total, Item) => (total += Item.count),
          0
        );
        CountData?.setCount(sum);
      }
      Route.push("/");
    } else {
      toast.error(data?.error, { position: "top-center" });
    }
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
    //   {
    //     method: "post",
    //     body: JSON.stringify(values),
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   }
    // );
    // const data = await res.json();
    // console.log(data);
    // if (data.message == "success") {
    //   toast.success("Logged in!", { position: "top-center" });
    //   Route.push("/");
    // } else {
    //   toast.error(data.message, { position: "top-center" });
    // }
  }
  return (
    <>
      <div className="w-3/4 mx-auto my-5">
        <h1 className="text-3xl my-5">Login</h1>
        <Form {...LoginForm}>
          <form
            className="space-y-3"
            onSubmit={LoginForm.handleSubmit(handleLogin)}
          >
            <FormField
              control={LoginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Johndoe@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={LoginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link className="float-end" href="/forgetPassword">
              Forgot Password ?
            </Link>
            <Button className="w-full bg-gray-800">Login</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
