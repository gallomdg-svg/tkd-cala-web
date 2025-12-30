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
        <Link href="/perfil">Perfil</Link>
        <Link href="/teoria">Teoría</Link>
        <Link href="/eventos">Eventos</Link>
        <Link href="/mensajes">Mensajes</Link>
        <Link href="/alumnos">Alumnos</Link>
      </nav>
    </div>
  );
}
