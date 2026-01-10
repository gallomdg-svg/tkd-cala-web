"use client";

import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";

export default function ProfesorMenu() {
  return (
    <aside className="w-64 bg-white border-r p-4 space-y-4">
      <h2 className="text-lg font-semibold">Profesor</h2>

      <nav className="flex flex-col gap-2 text-sm">
        <Link href="/profesor/perfil">Perfil</Link>
        <Link href="/profesor/alumnos">Alumnos</Link>
        <Link href="/profesor/teoria">Teoría</Link>
        <Link href="/profesor/eventos">Eventos</Link>
        <Link href="/profesor/notificaciones">Notificaciones</Link>
      </nav>

      <div className="pt-4 border-t">
        <LogoutButton />
      </div>
    </aside>
  );
}
