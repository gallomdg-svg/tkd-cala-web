'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function PerfilPage() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null)
    })
  }, [])

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold mb-6">
        Mi Perfil
      </h2>

      <div className="bg-white p-6 rounded shadow">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Nombre:</strong> (pendiente)</p>
        <p><strong>Apellido:</strong> (pendiente)</p>
        <p><strong>Graduación:</strong> (pendiente)</p>
      </div>
    </div>
  )
}
