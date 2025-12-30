'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

interface Alumno {
  id: string
  nombre: string
  apellido: string
  fecha_nacimiento: string | null
  mail: string
  graduacion: string | null
  rol: string
}

export default function PerfilPage() {
  const [alumno, setAlumno] = useState<Alumno | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarPerfil = async () => {
      console.log('🔄 Cargando perfil...')

      // 1️⃣ Usuario autenticado
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      console.log('👤 USER AUTH:', user)
      console.log('❌ USER ERROR:', userError)

      if (!user) {
        console.log('⛔ No hay usuario logueado')
        setLoading(false)
        return
      }

      // 2️⃣ Buscar alumno por user_id
      const { data, error } = await supabase
        .from('alumnos')
        .select('*')
        .eq('user_id', user.id)
        .single()

      console.log('📦 ALUMNO DATA:', data)
      console.log('❌ ALUMNO ERROR:', error)

      if (error) {
        setLoading(false)
        return
      }

      setAlumno(data)
      setLoading(false)
    }

    cargarPerfil()
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <p>Cargando perfil...</p>
      </div>
    )
  }

  if (!alumno) {
    return (
      <div className="p-8 text-red-600">
        <p>No se encontró el perfil del alumno.</p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mi perfil</h1>

      <div className="space-y-3">
        <p><strong>Nombre:</strong> {alumno.nombre}</p>
        <p><strong>Apellido:</strong> {alumno.apellido}</p>
        <p><strong>Email:</strong> {alumno.mail}</p>
        <p><strong>Graduación:</strong> {alumno.graduacion ?? '-'}</p>
        <p><strong>Rol:</strong> {alumno.rol}</p>
        <p>
          <strong>Fecha nacimiento:</strong>{' '}
          {alumno.fecha_nacimiento ?? '-'}
        </p>
      </div>
    </div>
  )
}
