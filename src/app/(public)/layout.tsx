import PublicNavbar from "@/components/layout/PublicNavbar";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNavbar />
      <main>{children}</main>
      <WhatsAppButton />
    </>
  );
}
