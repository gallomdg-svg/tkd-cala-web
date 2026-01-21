"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function PublicNavbar() {
  const [user, setUser] = useState<User | null>(null);

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

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3">
      {/* Branding */}
      <Link href="/quienes-somos" className="flex items-center gap-3">
        <Image
          src="/logos/tkd_cala_cts.png"
          alt="Centro de Taekwondo Sud-Americano - Grupo Cala"
          width={40}
          height={40}
          priority
        />
        <div className="leading-tight">
          <div className="text-sm font-semibold text-gray-900">
            Centro de Taekwondo Sud-Americano
          </div>
          <div className="text-xs text-red-600 font-medium">
            Grupo Cala
          </div>
        </div>
      </Link>

      {/* Links públicos */}
      <div className="flex items-center gap-6">
        <Link href="/quienes-somos" className="hover:text-red-600">
          Quiénes somos
        </Link>

        <Link href="/lugar-de-practica" className="hover:text-red-600">
          Lugar de práctica
        </Link>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/tkd_san_telmo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:scale-110 transition-transform"
        >
          {/* SVG que vos elegiste */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2Z"
              stroke="url(#ig-gradient)"
              strokeWidth="2"
            />
            <circle
              cx="12"
              cy="12"
              r="3.5"
              stroke="url(#ig-gradient)"
              strokeWidth="2"
            />
            <circle cx="17.5" cy="6.5" r="1" fill="url(#ig-gradient)" />
            <defs>
              <linearGradient
                id="ig-gradient"
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
        </a>

        {/* Login SOLO si no hay usuario */}
{!user && (
  <Link
    href="/login"
    className="px-3 py-1 border rounded hover:bg-gray-100"
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
    </nav>
  );
}
