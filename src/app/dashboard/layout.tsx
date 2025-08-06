"use client";

import { DashboardAuthGuard } from "@/hoc/DashboardAuthGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const Guarded = DashboardAuthGuard(() => <>{children}</>);
  return <Guarded />;
}