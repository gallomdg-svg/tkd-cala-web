// app/(profesor)/layout.tsx
import Link from "next/link";

export default function ProfesorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main style={{ paddingBottom: 60 }}>{children}</main>

      <nav
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          borderTop: "1px solid #ccc",
          padding: 10,
          background: "#fff",
        }}
      >
        <Link href="/profesor/perfil">Perfil</Link>
        <Link href="/profesor/teoria">Teoría</Link>
        <Link href="/profesor/eventos">Eventos</Link>
        <Link href="/profesor/mensajes">Mensajes</Link>
        <Link href="/profesor/alumnos">Alumnos</Link>
      </nav>
    </div>
  );
}
