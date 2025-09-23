"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {
  const Route = useRouter();
  const SchemaForgetPassword = z.object({
    email: z.email("Invalid Email").nonempty("Email is required!"),
  });
  const forgetPasswordForm = useForm<z.infer<typeof SchemaForgetPassword>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(SchemaForgetPassword),
  });
  async function handleForgetPassword(
    values: z.infer<typeof SchemaForgetPassword>
  ) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`,
      {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.statusMsg == "success") {
      Route.push("/resetCode");
    } else {
      toast.error(data.message, { position: "top-center" });
    }
  }
  return (
    <>
      <div className="w-3/4 mx-auto my-5">
        <h1 className="text-3xl my-5">Reset Password</h1>
        <Form {...forgetPasswordForm}>
          <form
            className="space-y-3"
            onSubmit={forgetPasswordForm.handleSubmit(handleForgetPassword)}
          >
            <FormField
              control={forgetPasswordForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Email Address</FormLabel>
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
            <Button className="w-full bg-gray-800">Continue</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
