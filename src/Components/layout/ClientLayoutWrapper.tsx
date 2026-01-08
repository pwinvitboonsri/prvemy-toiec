"use client";

import { usePathname } from "next/navigation";
import { NavbarComponent } from "@/Components/page/Nav&Footer/NavbarComponent";
import { FooterComponent } from "@/Components/page/Nav&Footer/Footer";
import { useDeviceSpecs } from "@/hooks/useDeviceSpecs";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  user: any; // Type this properly based on your auth user type
}

export function ClientLayoutWrapper({
  children,
  user,
}: ClientLayoutWrapperProps) {
  const pathname = usePathname();

  // Initialize device detection
  useDeviceSpecs();

  // Check if we are on an exam page
  // Adjust the pattern if your route structure is different
  const isExamPage = pathname?.startsWith("/exam/");

  if (isExamPage) {
    // On exam pages, we only render the children (the exam interface)
    // The ExamInterface handles its own header/footer (HUD)
    return <>{children}</>;
  }

  // On standard pages, render the global nav and footer
  return (
    <div className="flex flex-col min-h-dvh">
      <NavbarComponent user={user} />
      <main className="flex-grow pl-safe pr-safe">{children}</main>
      <FooterComponent />
    </div>
  );
}
