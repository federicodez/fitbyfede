import Navbar from "@/components/navbar/Navbar";

export default async function FinishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Navbar>
      <div className="h-full">{children}</div>
    </Navbar>
  );
}
