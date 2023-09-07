import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components";
import NextAuthProvider from "@/context/Provider";
import UserContextProvider from "@/context/user-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fitfede",
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
          <UserContextProvider>
            <Navbar />
            {children}
          </UserContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
