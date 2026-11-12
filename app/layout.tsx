import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import "./globals.css";

// Body text
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Shop name, headings and prices
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Universal Xports Ltd. | Live Price List",
  description:
    "Daily updated prices on iPhone, Samsung, iPad, MacBook, Apple Watch and AirPods. Hong Kong, Japan and US spec. Order via WhatsApp.",
  openGraph: {
    title: "Universal Xports Ltd. | Live Price List",
    description:
      "Daily updated prices on phones, tablets, laptops and accessories. Order via WhatsApp.",
    type: "website",
  },
};

// Colours the browser bar on Android Chrome.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1a38",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${bricolage.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions such as Grammarly add
          attributes to <body> before React loads, which triggers a harmless
          "hydration mismatch" warning in development. */}
      <body suppressHydrationWarning className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
