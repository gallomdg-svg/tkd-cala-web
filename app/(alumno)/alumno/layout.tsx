import Link from "next/link";

export default function AlumnoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Header */}
      <header className="bg-red-600 text-white px-4 py-3 font-semibold">
        TKD Cala – Alumno
      </header>

      {/* Contenido */}
      <main className="flex-1 p-4">
        {children}
      </main>

      {/* Menú inferior mobile */}
      <nav className="bg-white border-t flex justify-around py-2 text-sm">
        <Link href="/alumno/perfil">Perfil</Link>
        <Link href="/alumno/teoria">Teoría</Link>
        <Link href="/alumno/eventos">Eventos</Link>
        <Link href="/alumno/mensajes">Mensajes</Link>
      </nav>
    </div>
  );
}
