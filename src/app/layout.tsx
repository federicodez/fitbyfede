import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthProvider from "@/context/Provider";
import ToasterContext from "@/context/ToasterContext";
import TimerContextProvider from "@/context/TimerContext";

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
      <body className={inter.className}>
        <NextAuthProvider>
          <ToasterContext />
          <TimerContextProvider>{children}</TimerContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
