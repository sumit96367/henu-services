import type { Metadata } from "next";
<<<<<<< HEAD
import { Lora } from "next/font/google";
=======
import { Inter, Space_Grotesk, Lora } from "next/font/google";
>>>>>>> 37505f597b2f70c6f518ac5440dcb73b30a0654b
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModal, AuthPopup } from "@/components/auth";

const lora = Lora({
  variable: "--font-lora",
<<<<<<< HEAD
=======
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
>>>>>>> 37505f597b2f70c6f518ac5440dcb73b30a0654b
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Henu OS Private Limited | Technology, Legal & Finance Solutions",
  description: "Henu OS bridges Technology, Law, and Finance. We offer web development, mobile app development, AI agents, digital marketing, legal documentation, company registration, and government grants & funding solutions.",
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
<<<<<<< HEAD
      </head>
      <body
        className={`${lora.variable} antialiased`}
        style={{ fontFamily: "var(--font-lora), serif", fontWeight: 400, fontStyle: 'normal' }}
=======
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${lora.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased`}
        style={{ fontFamily: "var(--font-lora)", fontWeight: 400, fontStyle: 'normal' }}
>>>>>>> 37505f597b2f70c6f518ac5440dcb73b30a0654b
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

