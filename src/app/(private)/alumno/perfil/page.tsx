import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getTeoriaUrl } from "@/lib/teoria";
import Image from "next/image";
import { GRADUACIONES } from "@/lib/constants";

type Alumno = {
  id: string;
  nombre: string;
  apellido: string;
  graduacion: string;
  fecha_nacimiento: string;
  turno: string;
  cuota_pagada: boolean;
  habilitado_examen: boolean;
  proxima_fecha_examen: string | null;
  es_titular: boolean;
  activo: boolean;
  
};

export default async function PerfilAlumnoPage() {
  const supabase = await createSupabaseServerClient();

  // 🔐 Usuario autenticado
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="p-6">No autenticado</p>;
  }

  // 👤 Profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, avatar_url")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return (
      <div className="p-6 text-red-600">
        No se encontró el perfil
      </div>
    );
  }

  // 🥋 Alumnos asociados (1 o muchos)
  const { data: alumnos } = await supabase
    .from("alumnos")
    .select(`
      id,
      nombre,
      apellido,
      graduacion,
      fecha_nacimiento,
      turno,
      cuota_pagada,
      habilitado_examen,
      proxima_fecha_examen,
      activo,
      es_titular
    `)
    .eq("profile_id", user.id);

  if (!alumnos || alumnos.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Mi perfil
        </h1>
        <p className="text-gray-600">
          No hay alumnos asociados a este usuario.
        </p>
      </div>
    );
  }

  const alumnoTitular = alumnos.find(
    (a) => a.es_titular
  );

  const hijos = alumnos.filter(
    (a) => !a.es_titular
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">
        Mi perfil
      </h1>

      {/* Avatar + datos básicos */}
      <div className="flex items-center gap-6">
        <Image
          src={
            profile.avatar_url ||
            "/images/avatar-placeholder.png"
          }
          alt="Avatar"
          width={96}
          height={96}
          className="rounded-full border"
        />

        <div>
          <p className="text-lg font-semibold">
            {profile.full_name}
          </p>
          <p className="text-gray-600">
            {profile.email}
          </p>
        </div>
      </div>

      {/* ===================== */}
      {/* PERFIL DEL ALUMNO */}
      {/* ===================== */}
      {alumnoTitular && (
        <SeccionAlumno
          titulo="Mi perfil como alumno"
          alumno={alumnoTitular}
        />
      )}

      {/* ===================== */}
      {/* Grupo familiar */}
      {/* ===================== */}
      {hijos.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Mi grupo familiar
          </h2>

          <div className="divide-y border rounded">
            {hijos.map((hijo) => (
              <FilaAlumno
            key={hijo.id}
            alumno={hijo}
    />
  ))}
</div>
        </div>
      )}
    </div>
  );
}

/* ===================== */
/* COMPONENTE ALUMNO */
/* ===================== */

async function SeccionAlumno({
  alumno,
  titulo,
}: {
  alumno: Alumno;
  titulo?: string;
}) {
  const teoriaUrl = await getTeoriaUrl(
    alumno.turno,
    alumno.graduacion
  );

  return (
    <div className="border rounded-lg p-5 space-y-4">
      {titulo && (
        <h2 className="text-xl font-semibold">
          {titulo}
        </h2>
      )}

      <p className="text-lg font-medium">
        {alumno.nombre} {alumno.apellido}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info
          label="Graduación"
          value={alumno.graduacion}
        />
        <Info
          label="Fecha de nacimiento"
          value={alumno.fecha_nacimiento}
        />
        <Info label="Turno" value={alumno.turno} />
        <Info
          label="Cuota"
          value={
            alumno.cuota_pagada
              ? "Pagada ✅"
              : "Pendiente ❌"
          }
        />
      </div>

      {alumno.habilitado_examen &&
        alumno.proxima_fecha_examen && (
          <div className="bg-yellow-100 border border-yellow-300 p-3 rounded">
            <p className="font-semibold">
              📅 Próximo examen
            </p>
            <p>
              {alumno.proxima_fecha_examen}
            </p>
          </div>
        )}

      {teoriaUrl ? (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded">
          <p className="font-semibold mb-1">
            📘 Teoría
          </p>
          <a
            href={teoriaUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            Descargar teoría
          </a>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 p-3 rounded">
          <p className="font-semibold">
            ❌ No se encontró la teoría
          </p>
        </div>
      )}
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>
      <p className="font-medium">
        {value || "-"}
      </p>
    </div>
  );
}

async function FilaAlumno({
  alumno,
}: {
  alumno: Alumno;
}) {
  const teoriaUrl = await getTeoriaUrl(
    alumno.turno,
    alumno.graduacion
  );

  return (
    <div className="flex flex-col gap-3 p-4 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] md:items-center">
      {/* Nombre */}
      <div>
        <p className="font-medium">
          {alumno.nombre} {alumno.apellido}
        </p>
        <p className="text-sm text-gray-500">
          Turno: {alumno.turno}
        </p>
      </div>

      {/* Graduación */}
      <div>
        <GraduacionBadge
          graduacion={alumno.graduacion}
        />
      </div>

      {/* Fecha nacimiento */}
      <div className="text-sm">
        <p className="text-gray-500">
          Nacimiento
        </p>
        <p>
          {alumno.fecha_nacimiento || "-"}
        </p>
      </div>

      {/* Próximo examen */}
      <div className="text-sm">
        <p className="text-gray-500">
          Próx. examen
        </p>
        <p>
          {alumno.proxima_fecha_examen ||
            "-"}
        </p>
      </div>

      {/* Estado */}
      <div>
        {alumno.activo ? (
          <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded text-xs">
            ● Activo
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded text-xs">
            ● Inactivo
          </span>
        )}
      </div>

      {/* Acción */}
      <div className="text-sm">
        {teoriaUrl ? (
          <a
            href={teoriaUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            Ver teoría
          </a>
        ) : (
          <span className="text-gray-400">
            Sin teoría
          </span>
        )}
      </div>
    </div>
  );
}


function GraduacionBadge({
  graduacion,
}: {
  graduacion: string;
}) {
  const gradKey = Number(graduacion);

  const grad = GRADUACIONES.find(
    (g) => g.key === gradKey
  );

  if (!grad) {
    return (
      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
        {graduacion}
      </span>
    );
  }

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${grad.color}`}
    >
      {grad.label}
    </span>
  );
}
