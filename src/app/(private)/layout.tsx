import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/auth";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect("/login");
  }

  return <>{children}</>;
}
