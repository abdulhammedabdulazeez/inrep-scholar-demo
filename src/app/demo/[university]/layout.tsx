import TenantGuard from "@/components/guards/TenantGuard";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TenantGuard>{children}</TenantGuard>;
}
