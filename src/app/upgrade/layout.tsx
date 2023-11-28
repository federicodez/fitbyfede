import Navbar from "@/components/navbar/Navbar";

export default async function UpgradeLayout({
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
