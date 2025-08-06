"use client";

import { EventAuthGuard } from "@/hoc/EventAuthGuard";

export default function EventLayout({ children }: { children: React.ReactNode }) {
  const Guarded = EventAuthGuard(() => <>{children}</>);
  return <Guarded />;
}