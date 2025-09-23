"use client";

import {
  Form,
  FormControl,
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

export default function Register() {
  const Route = useRouter();
  const SchemaRegister = z
    .object({
      name: z
        .string()
        .nonempty("Name is required!")
        .min(3, "Minimum Characters 3")
        .max(20, "Maximum Characters 20"),
      email: z.email("Invalid Email").nonempty("Email is required!"),
      password: z
        .string()
        .nonempty("Password is required!")
        .regex(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/,
          "Enter valid password"
        ),
      rePassword: z.string().nonempty("Confirm Password is required!"),
      phone: z
        .string()
        .nonempty("Phone number is required!")
        .regex(/^(\+2)?01[0125][0-9]{8}$/, "Enter a valid phone number"),
    })
    .refine(
      (obj) => {
        return obj.password == obj.rePassword;
      },
      {
        path: ["rePassword"],
        error: "Confirm Password does not match password",
      }
    );
  const RegisterForm = useForm<z.infer<typeof SchemaRegister>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(SchemaRegister),
  });
  async function handleRegister(values: z.infer<typeof SchemaRegister>) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
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
    if (data.message == "success") {
      toast.success("Account Created Successfuly!", { position: "top-center" });
      Route.push("/login");
    } else {
      toast.error(data.message, { position: "top-center" });
    }
  }
  return (
    <>
      <div className="w-3/4 mx-auto my-5">
        <h1 className="text-3xl my-5">Register</h1>
        <Form {...RegisterForm}>
          <form
            className="space-y-3"
            onSubmit={RegisterForm.handleSubmit(handleRegister)}
          >
            <FormField
              control={RegisterForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={RegisterForm.control}
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
              control={RegisterForm.control}
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
            <FormField
              control={RegisterForm.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={RegisterForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone:</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" placeholder="+20" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-gray-800">Register</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
