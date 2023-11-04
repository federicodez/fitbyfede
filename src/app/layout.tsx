import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthProvider from "@/context/Provider";
import ToasterContext from "@/context/ToasterContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitbyFede",
  description: "Fitness App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></Script>
      <body className={inter.className}>
        <NextAuthProvider>
          <ToasterContext />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
