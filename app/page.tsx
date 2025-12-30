'use client'

import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  // En esta página solo redirigimos a login, sin autenticación ni redirección extra
  router.push('/login')

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          TKD Cala
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Plataforma de alumnos
        </p>
        {/* Aquí podrías agregar algún mensaje de bienvenida o un componente estático */}
      </div>
    </main>
  )
}
