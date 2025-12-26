'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabaseClient'

export default function PerfilPage() {
  const router = useRouter()

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <main style={{ maxWidth: 600, margin: '50px auto' }}>
      <h1>Mi perfil</h1>

      <ul>
        <li>
          <a href="/perfil">Mi perfil</a>
        </li>
        <li>
          <a href="/teoria">Teoría</a>
        </li>
      </ul>

      <button onClick={logout}>Cerrar sesión</button>
    </main>
  )
}
