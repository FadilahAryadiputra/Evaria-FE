"use client";

import { useAuthStore } from "@/stores/auth";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { axiosInstance } from "@/lib/axios";
import { UserRole } from "@/types/user";

const Navbar = () => {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);

  const handleLogout = () => {
    clearAuth();
    toast.success("Logout success");
    router.push("/login");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      const raw = localStorage.getItem("Evaria");
      const token = raw ? JSON.parse(raw).state?.user?.accessToken : null;

      if (!token) return;

      try {
        const response = await axiosInstance.get("/auth/session-login", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userRole = response.data?.data?.role;
        if (userRole) {
          setRole(userRole);
        }
      } catch (error) {
        console.error("AuthGuard error:", error);
        router.push("/login");
      }
    };

    verifyToken();
  }, [router]);

  return (
    <nav className="sticky top-0 z-10 border-b-3 px-5">
      <div className="container mx-auto flex justify-between px-4 py-2">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black dark:border-white">
            <span className="font-bold">EVA</span>
          </div>
          <h1 className="font-bold text-lg">Evaria</h1>
        </Link>

        <div className="flex items-center gap-8">
          {mounted && (
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
          )}

          {mounted && role === UserRole.ORGANIZER && (
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          )}

          {user ? (
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-lg font-medium decoration-2 underline-offset-4 hover:underline md:block"
              >
                Login
              </Link>
              <Link
                href="/register/user"
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
