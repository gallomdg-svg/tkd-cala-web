"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { supabaseClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { openWhatsApp } from "@/components/ui/WhatsAppButton";

const LINKS = [
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/lugar-de-practica", label: "Lugar de práctica" },
  { href: "/teoria", label: "Teoría" },
];

function InstagramIcon({ id = "ig-gradient" }: { id?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2Z"
        stroke={`url(#${id})`}
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3.5" stroke={`url(#${id})`} strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill={`url(#${id})`} />
      <defs>
        <linearGradient
          id={id}
          x1="0"
          y1="0"
          x2="24"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F58529" />
          <stop offset="0.5" stopColor="#DD2A7B" />
          <stop offset="1" stopColor="#515BD4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function PublicNavbar() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // 1. Traer sesión inicial
    supabaseClient.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // 2. Escuchar cambios de sesión
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Cerrar el menú del celular al cambiar de página
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "/";
  };

  const linkClass = (href: string) =>
    `hover:text-red-600 ${pathname.startsWith(href) ? "text-red-600 font-medium" : ""}`;

  return (
    <nav className="relative bg-white">
      <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-3">
        {/* Branding */}
        <Link href="/quienes-somos" className="flex items-center gap-3 min-w-0">
          <Image
            src="/logos/tkd_cala_cts.png"
            alt="Centro de Taekwon-Do SudAmericano - Grupo Cala"
            width={40}
            height={40}
            priority
            className="shrink-0"
          />
          <div className="leading-tight min-w-0">
            <div className="text-sm font-semibold text-gray-900">
              Centro de Taekwondo Sud-Americano
            </div>
            <div className="text-xs text-red-600 font-medium">Grupo Cala</div>
          </div>
        </Link>

        {/* Links públicos (computadora) */}
        <div className="hidden lg:flex items-center gap-6 shrink-0">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}

          {/* CTA WhatsApp */}
          <button
            onClick={openWhatsApp}
            className="px-4 py-2 rounded-full bg-red-600 text-white font-medium
                       hover:bg-red-700 transition-colors shadow-sm whitespace-nowrap"
          >
            Sumate a entrenar
          </button>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/tkd_san_telmo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:scale-110 transition-transform"
          >
            <InstagramIcon />
          </a>

          {/* Login SOLO si no hay usuario */}
          {!user && (
            <Link
              href="/login"
              className="px-3 py-1 border rounded hover:bg-gray-100 whitespace-nowrap"
            >
              Ingreso Alumnos
            </Link>
          )}

          {/* Usuario + Logout SOLO si hay usuario */}
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">
                {user.user_metadata?.full_name ?? user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:underline"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>

        {/* Botón menú (celular y tablet) */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="lg:hidden shrink-0 p-2 -mr-2 rounded-md text-gray-800 hover:bg-gray-100"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menú desplegable (celular y tablet) */}
      {open && (
        <div className="lg:hidden absolute left-0 right-0 top-full z-50 bg-white border-t border-b shadow-lg animate-slide-down">
          <div className="flex flex-col px-4 py-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`py-3 border-b border-gray-100 text-base ${linkClass(l.href)}`}
              >
                {l.label}
              </Link>
            ))}

            <a
              href="https://www.instagram.com/tkd_san_telmo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-3 border-b border-gray-100 text-base"
            >
              <InstagramIcon id="ig-gradient-mobile" />
              Instagram
            </a>

            {!user && (
              <Link href="/login" className="py-3 border-b border-gray-100 text-base">
                Ingreso Alumnos
              </Link>
            )}

            {user && (
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-700 truncate">
                  {user.user_metadata?.full_name ?? user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:underline shrink-0"
                >
                  Cerrar sesión
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setOpen(false);
                openWhatsApp();
              }}
              className="mt-4 mb-1 w-full py-3 rounded-full bg-red-600 text-white font-semibold
                         hover:bg-red-700 transition-colors shadow-sm"
            >
              Sumate a entrenar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
