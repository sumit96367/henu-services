import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModal, AuthPopup } from "@/components/auth";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Henu OS Private Limited | Technology, Legal & Finance Solutions",
  description: "Henu OS bridges Technology, Law, and Finance. We offer web development, mobile apps, AI agents, digital marketing, legal documentation, company registration, and government grants & funding solutions.",
  keywords: [
    "web development",
    "mobile app development",
    "AI agent development",
    "digital marketing",
    "legal documentation",
    "company registration",
    "government grants",
    "startup funding",
    "backend development",
    "compliance services",
    "India"
  ],
  authors: [{ name: "Henu OS Private Limited" }],
  openGraph: {
    title: "Henu OS Private Limited | Architecting Your Digital Future",
    description: "From AI-driven development to government grants and legal compliance. We build, secure, and fund your vision.",
    type: "website",
    locale: "en_IN",
    siteName: "Henu OS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Henu OS Private Limited",
    description: "Technology, Legal & Finance Solutions - Building the backbone of modern business.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <AuthProvider>
          <SmoothScrollProvider>
            <Navbar />
            <div className="relative">
              {children}
            </div>
            <Footer />
          </SmoothScrollProvider>
          <AuthModal />
          <AuthPopup />
        </AuthProvider>
      </body>
    </html>
  );
}

