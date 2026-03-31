import DashboardLayout from "@/components/layout/DashboardLayout";
import { SignOutButtonDesktop, SignOutButtonMobile } from "@/components/auth/SignOutButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      variant="admin"
      signOutDesktop={<SignOutButtonDesktop />}
      signOutMobile={<SignOutButtonMobile />}
    >
      {children}
    </DashboardLayout>
  );
}
