"use client";

import { useAuthStore } from "@/stores/auth";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const { user, clearAuth } = useAuthStore();

  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-10 border-b-3 px-5">
      <div className="container mx-auto flex justify-between px-4 py-2">
        <Link href={"/"} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black dark:border-white">
            <span className="font-bold">EVA</span>
          </div>
          <h1 className="font-bold">Evaria</h1>
        </Link>
        <div className="flex items-center gap-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle Theme</span>
          </Button>
          {user ? (
            <>
              <Button variant="destructive" onClick={clearAuth}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-lg font-medium decoration-2 underline-offset-4 hover:underline md:block"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hidden text-lg font-medium decoration-2 underline-offset-4 hover:underline md:block"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
