import "./globals.css";
import PublicNavbar from "@/components/layout/PublicNavbar";
import PrivateTopBarWrapper from "@/components/layout/PrivateTopBarWrapper";

import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <PublicNavbar />

        {/* Decide en CLIENT si mostrar barra privada */}
        <PrivateTopBarWrapper />

        <main>{children}</main>

        <WhatsAppButton />
      </body>
    </html>
  );
}
