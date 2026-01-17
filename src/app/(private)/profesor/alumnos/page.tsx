import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AlumnosPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="p-6">No autenticado</p>;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return <p className="p-6">Acceso no autorizado</p>;
  }

  const { data: alumnos } = await supabase
    .from("alumnos")
    .select(`
      id,
      nombre,
      apellido,
      graduacion,
      turno,
      cuota_pagada,
      habilitado_examen,
      activo
    `)
    .order("apellido");

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Alumnos</h1>

      <table className="w-full border-collapse border">
        <thead className="bg-gray-100">
          <tr>
            <Th>Alumno</Th>
            <Th>Graduación</Th>
            <Th>Turno</Th>
            <Th>Cuota</Th>
            <Th>Examen</Th>
            <Th>Activo</Th>
          </tr>
        </thead>
        <tbody>
          {alumnos?.map((a) => (
            <tr key={a.id} className="border-t">
              <Td>{a.nombre} {a.apellido}</Td>
              <Td>{a.graduacion}</Td>
              <Td>{a.turno}</Td>
              <Td>{a.cuota_pagada ? "✅" : "❌"}</Td>
              <Td>{a.habilitado_examen ? "🎯" : "-"}</Td>
              <Td>{a.activo ? "✔" : "✖"}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="border p-2 text-left">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="border p-2">{children}</td>;
}
