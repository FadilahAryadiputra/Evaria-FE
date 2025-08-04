"use client";

import { AuthGuard } from "@/hoc/AuthGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const Guarded = AuthGuard(() => <>{children}</>);
  return <Guarded />;
}