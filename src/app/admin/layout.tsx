"use client";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { usePathname } from "next/navigation";

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Don't render AdminLayout on the login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Render with AdminLayout for all other admin pages
    return <AdminLayout>{children}</AdminLayout>;
}
