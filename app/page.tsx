'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-gray-500">Redirigiendo...</p>
    </main>
  )
}
