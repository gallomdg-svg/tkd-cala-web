"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Role = "alumno" | "profesor";

type Props = {
  role: Role;
};

export default function PrivateTopBar({ role }: Props) {

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) =>
    `px-3 py-1 rounded transition ${
      pathname.startsWith(href)
        ? "bg-red-600 text-white"
        : "text-gray-700 hover:text-red-600"
    }`;

  const alumnoLinks = [
    { href: "/alumno/perfil", label: "Perfil" },
    { href: "/alumno/notificaciones", label: "Notificaciones" },
    { href: "/alumno/eventos", label: "Eventos" },
    { href: "/alumno/teoria", label: "Teoría" },
    { href: "/alumno/documentacion", label: "Documentación" },
  ];

  const profesorLinks = [
    { href: "/profesor/perfil", label: "Perfil" },
    { href: "/profesor/alumnos", label: "Alumnos" },
    { href: "/profesor/notificaciones", label: "Notificaciones" },
    { href: "/profesor/eventos", label: "Eventos" },
    { href: "/profesor/usuarios", label: "Usuarios" },
    { href: "/alumno/teoria", label: "Teoría" },
    { href: "/alumno/documentacion", label: "Documentación" },
  ];

  const links = role === "alumno" ? alumnoLinks : profesorLinks;
  
  return (
    <nav className="sticky top-[56px] z-40 bg-gray-50 border-b animate-slide-down">
      <div className="mx-auto max-w-7xl h-14 px-4 flex items-center justify-between md:justify-center">
        {/* Desktop */}
        <div className="hidden md:flex gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-sm font-medium"
        >
          Menú
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t bg-gray-50 flex flex-col items-center py-3 gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={linkClass(l.href)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
