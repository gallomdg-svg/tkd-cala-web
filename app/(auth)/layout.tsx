'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  // 🔐 Proteger rutas: si no hay sesión → login
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/')
      }
    })
  }, [router])

  // 🚪 Cerrar sesión
  async function logout() {
    await supabase.auth.signOut()
    router.replace('/')
  }

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-red-700 text-white p-6">
        <h1 className="text-xl font-bold mb-8">
          TKD Grupo Cala
        </h1>

        <nav className="flex flex-col gap-4">
          <Link href="/perfil" className="hover:underline">
            Mi Perfil
          </Link>

          <Link href="/teoria" className="hover:underline">
            Teoría
          </Link>

          <button
            onClick={logout}
            className="mt-8 text-left text-sm underline"
          >
            Cerrar sesión
          </button>
        </nav>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
