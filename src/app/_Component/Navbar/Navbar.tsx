"use client";
import React from "react";
import { useContext } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { CountContext } from "@/CountProvider";

export default function Navbar() {
  const { data, status } = useSession();
  const pathName: string = usePathname();
  const countData = useContext(CountContext);
  const menuItems: { path: string; content: string; protected: boolean }[] = [
    // { path: "/products", content: "Products", protected: false },
    // { path: "/brands", content: "Brands", protected: false },
    // { path: "/category", content: "Category", protected: false },
    { path: "/wishlist", content: "Wishlist", protected: true },
    // { path: "/cart", content: "Cart", protected: true },
    { path: "/allorders", content: "Orders", protected: true },
  ];

  const menuAuthItems: { path: string; content: string }[] = [
    { path: "/login ", content: "Login" },
    { path: "/register", content: "Register" },
  ];
  function Logout() {
    signOut({
      callbackUrl: "/login",
    });
  }
  return (
    <NavigationMenu
      viewport={false}
      className="max-w-full justify-between shadow-md p-3"
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={"/"}>
              <Image
                src={"/images/freshcart-logo.svg"}
                alt="logo"
                width={100}
                height={100}
              />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        {menuItems.map((item) => {
          return (
            <NavigationMenuItem key={item.path}>
              {item.protected && status == "authenticated" && (
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    className={pathName == item.path ? "text-main" : ""}
                    href={item.path}
                  >
                    {item.content}
                  </Link>
                </NavigationMenuLink>
              )}
              {!item.protected && (
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    className={pathName == item.path ? "text-main" : ""}
                    href={item.path}
                  >
                    {item.content}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}

        {status == "authenticated" && (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                className={
                  pathName == "/cart" ? "text-main relative" : "relative"
                }
                href="/cart"
              >
                Cart
                <span className="text-white absolute bottom-5 left-10 inline-flex items-center justify-center w-8 h-5.5 bg-main rounded-full">
                  {countData?.count}
                </span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>

      <NavigationMenuList>
        {status == "authenticated" ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <span className="bg-main text-white hover:text-white p-2">
                  Hello {data?.user.name}
                </span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <span
                  onClick={Logout}
                  className="cursor-pointer hover:text-red-500"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket text-md"></i>
                </span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            {menuAuthItems.map((item) => {
              return (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={item.path}>{item.content}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
