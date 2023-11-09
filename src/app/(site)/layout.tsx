export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="auth-image my-10">{children}</div>;
}
