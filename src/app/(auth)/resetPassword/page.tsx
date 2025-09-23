"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [btnLoading, setbtnLoading] = useState<boolean>(true);
  const Route = useRouter();
  const SchemaResetPassword = z.object({
    email: z.email("Invalid Email").nonempty("Email is required!"),
    newPassword: z
      .string()
      .nonempty("Password is required!")
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/,
        "Enter valid password"
      ),
  });
  const ResetPasswordForm = useForm<z.infer<typeof SchemaResetPassword>>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(SchemaResetPassword),
  });
  async function handleResetPassword(
    values: z.infer<typeof SchemaResetPassword>
  ) {
    setbtnLoading(false);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,
      {
        method: "Put",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    setbtnLoading(true);
    console.log(data);
    if (data.token) {
      toast.success("Password Changed Successfuly!", {
        position: "top-center",
      });
      Route.push("/login");
    } else {
      toast.error(data.message, { position: "top-center" });
    }
  }
  return (
    <>
      <div className="w-3/4 mx-auto my-5">
        <h1 className="text-3xl my-5">Set New Password</h1>
        <Form {...ResetPasswordForm}>
          <form
            className="space-y-3"
            onSubmit={ResetPasswordForm.handleSubmit(handleResetPassword)}
          >
            <FormField
              control={ResetPasswordForm.control}
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
              control={ResetPasswordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password:</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {btnLoading ? (
              <Button className="w-full bg-gray-800">Submit</Button>
            ) : (
              <Button type="button" className="w-full bg-gray-800">
                <i className="fa-solid fa-spinner"></i>
              </Button>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
