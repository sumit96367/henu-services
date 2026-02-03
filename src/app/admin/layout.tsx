import type { Metadata } from "next";
import { AdminLayout } from "@/components/layout/AdminLayout";

export const metadata: Metadata = {
    title: "Admin Portal - Henu OS",
    description: "Admin dashboard for managing internships, payments, and users",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AdminLayout>{children}</AdminLayout>;
}
