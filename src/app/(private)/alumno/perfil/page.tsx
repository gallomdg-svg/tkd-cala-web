import { createSupabaseServerClient } from "@/lib/supabase/server";
import Image from "next/image";

export default async function PerfilAlumnoPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="p-6">No autenticado</p>;
  }

  // Perfil
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, avatar_url")
    .eq("id", user.id)
    .single();

  // Alumno
  const { data: alumno } = await supabase
    .from("alumnos")
    .select(`
      nombre,
      apellido,
      graduacion,
      fecha_nacimiento,
      turno,
      cuota_pagada,
      habilitado_examen,
      proxima_fecha_examen
    `)
    .eq("profile_id", user.id)
    .single();

  if (!profile || !alumno) {
    return <p className="p-6">No se encontró el perfil del alumno</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mi perfil</h1>

      <div className="flex items-center gap-6">
        <Image
          src={profile.avatar_url || "/images/avatar-placeholder.png"}
          alt="Avatar"
          width={96}
          height={96}
          className="rounded-full border"
        />

        <div>
          <p className="text-lg font-semibold">
            {alumno.nombre} {alumno.apellido}
          </p>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info label="Graduación" value={alumno.graduacion} />
        <Info
          label="Fecha de nacimiento"
          value={alumno.fecha_nacimiento}
        />
        <Info label="Turno" value={alumno.turno} />
        <Info
          label="Cuota"
          value={alumno.cuota_pagada ? "Pagada ✅" : "Pendiente ❌"}
        />
      </div>

      {alumno.habilitado_examen && alumno.proxima_fecha_examen && (
        <div className="bg-yellow-100 border border-yellow-300 p-4 rounded">
          <p className="font-semibold">📅 Próximo examen</p>
          <p>{alumno.proxima_fecha_examen}</p>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}
