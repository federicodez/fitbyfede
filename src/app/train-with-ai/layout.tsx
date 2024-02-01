import Navbar from "@/components/navbar/Navbar";
import { Suspense } from "react";
import Loading from "./loading";

export default async function AiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Navbar>
      <Suspense fallback={<Loading />}>
        <div className="h-full">{children}</div>
      </Suspense>
    </Navbar>
  );
}
