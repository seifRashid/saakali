import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Saakali — Premium Watches | Luxury, Sports & Precision Timepieces",
  description:
    "Discover premium watches crafted for every moment. Saakali curates luxury, sports, quartz, and analogue timepieces for men, women, and kids. Free shipping & 2-year warranty.",
  keywords: [
    "luxury watches",
    "premium watches",
    "sports watches",
    "quartz watches",
    "analogue watches",
    "men watches",
    "women watches",
    "kids watches",
    "Saakali",
  ],
};

import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/Shop/CartDrawer";
import ToastContainer from "./components/ToastContainer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <CartProvider>
          {children}
          <CartDrawer />
          <ToastContainer />
        </CartProvider>
      </body>
    </html>
  );
}
