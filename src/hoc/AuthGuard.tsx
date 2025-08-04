"use client";

import Loading from "@/components/Loading";
import { axiosInstance } from "@/lib/axios";
import { UserRole } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const AuthGuard = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const verifyToken = async () => {
        const raw = localStorage.getItem("Evaria");
        const token = raw ? JSON.parse(raw).state?.user?.accessToken : null;

        if (!token) {
          toast.error("No token provided")
          router.push("/login");
          return;
        }

        try {
          const response = await axiosInstance.get("/auth/session-login", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const role = response.data?.data?.role;

          if (role === UserRole.ORGANIZER) {
            setIsAuthorized(true);
          } else {
            toast.error("You are not authorized to access this page.");
            router.push("/login");
          }
        } catch (error) {
          console.error("AuthGuard error:", error);
          router.push("/login");
        } finally {
          setIsLoading(false);
        }
      };

      verifyToken();
    }, [router]);

    if (isLoading) {
      return <Loading />;
    }

    return isAuthorized ? <Component {...props} /> : null;
  };
};
