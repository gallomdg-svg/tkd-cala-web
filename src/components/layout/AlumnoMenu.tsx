"use client";

import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";

export default function AlumnoMenu() {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="font-bold mb-4">Alumno</h2>

      <nav className="flex flex-col gap-2">
        <Link href="/alumno/perfil">Perfil</Link>
        <Link href="/alumno/teoria">Teoría</Link>
        <Link href="/alumno/eventos">Eventos</Link>
        <Link href="/alumno/notificaciones">Notificaciones</Link>
      </nav>

      <div className="mt-6">
        <LogoutButton />
      </div>
    </aside>
  );
}
