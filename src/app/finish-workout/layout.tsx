import Navbar from "@/components/navbar/Navbar";
import TimerContextProvider from "@/context/TimerContext";

export default async function FinishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Navbar>
      <div className="h-full">
        <TimerContextProvider>{children}</TimerContextProvider>
      </div>
    </Navbar>
  );
}
