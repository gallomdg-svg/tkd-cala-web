import "@/app/globals.css";
import PublicNavbar from "@/components/layout/PublicNavbar";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Barra fija */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <PublicNavbar />
      </header>

      {/* Contenido debajo */}
      <main className="pt-16 min-h-screen bg-white">
        {children}
      </main>

      <WhatsAppButton />
    </>
  );
}
