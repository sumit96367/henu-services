import type { Metadata } from "next";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";

export const metadata: Metadata = {
    title: "Request Quote | Dashboard",
    description: "Submit a new quote request",
};

export default function RequestQuoteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}
