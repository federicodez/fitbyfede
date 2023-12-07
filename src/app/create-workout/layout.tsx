import TimerContextProvider from "@/context/TimerContext";

export default async function FinishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <TimerContextProvider>{children}</TimerContextProvider>
    </div>
  );
}
