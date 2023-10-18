import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthProvider from "@/context/Provider";
import ToasterContext from "@/context/ToasterContext";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/navbar/Navbar"));

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fit by Fede",
  description: "Fitness App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ToasterContext />
          <Navbar>{children}</Navbar>
        </NextAuthProvider>
      </body>
    </html>
  );
}
