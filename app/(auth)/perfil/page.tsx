'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'


interface Alumno {
  nombre: string
  apellido: string
  fecha_nacimiento: string | null
  mail: string
  graduacion: string | null
  rol: string
}

export default function PerfilPage() {
  const router = useRouter()
  const [alumno, setAlumno] = useState<Alumno | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPerfil = async () => {
      // 1. Usuario autenticado
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !user) {
        router.push('/')
        return
      }
	const { data: { user } } = await supabase.auth.getUser()
	console.log('USER AUTH:', user)

      // 2. Buscar alumno por user_id
      const { data, error } = await supabase
        .from('alumnos')
        .select(`
          nombre,
          apellido,
          fecha_nacimiento,
          mail,
          graduacion,
          rol
        `)
        .eq('user_id', user.id)
        .single()

      if (error) {
	console.log('ALUMNO DATA:', data)
	console.log('ALUMNO ERROR:', error)        
	setError('No se pudo cargar el perfil')
        setLoading(false)
        return
      }

      setAlumno(data)
      setLoading(false)
    }

    loadPerfil()
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Cargando perfil...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!alumno) return null

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Mi perfil
        </h1>

        <div className="space-y-2 text-gray-700">
          <p><strong>Nombre:</strong> {alumno.nombre}</p>
          <p><strong>Apellido:</strong> {alumno.apellido}</p>
          <p><strong>Email:</strong> {alumno.mail}</p>
          <p>
            <strong>Fecha de nacimiento:</strong>{' '}
            {alumno.fecha_nacimiento
              ? new Date(alumno.fecha_nacimiento).toLocaleDateString()
              : '—'}
          </p>
          <p><strong>Graduación:</strong> {alumno.graduacion ?? '—'}</p>
          <p><strong>Rol:</strong> {alumno.rol}</p>
        </div>
      </div>
    </div>
  )
}
