import type { Metadata } from "next";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";

export const metadata: Metadata = {
    title: "Quotes | Dashboard",
    description: "Manage your quote requests and quotations",
};

export default function QuotesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}
