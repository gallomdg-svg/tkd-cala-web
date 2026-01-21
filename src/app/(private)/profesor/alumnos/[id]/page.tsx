import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GRADUACIONES, TURNOS } from "@/lib/constants";


type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditarAlumnoPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: alumno } = await supabase
    .from("alumnos")
    .select("*")
    .eq("id", id)
    .single();

  if (!alumno) {
    redirect("/profesor/alumnos");
  }

  async function actualizarAlumno(formData: FormData) {
    "use server";

    const supabase = await createSupabaseServerClient();

    const fechaNacimiento = formData.get("fecha_nacimiento") || null;
    const proximaFechaExamen = formData.get("proxima_fecha_examen") || null;

    const { error }=await supabase
      .from("alumnos")
      .update({
        nombre: formData.get("nombre"),
        apellido: formData.get("apellido"),
        turno: formData.get("turno"),
        graduacion: Number(formData.get("graduacion")),
        fecha_nacimiento: fechaNacimiento,
        activo: formData.get("activo") === "on",
        habilitado_examen: formData.get("habilitado_examen") === "on",
        cuota_pagada: formData.get("cuota_pagada") === "on",
        proxima_fecha_examen: proximaFechaExamen,
      })
      .eq("id", id);
      console.log("UPDATE ERROR 👉", error);

    redirect("/profesor/alumnos");
    
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">
        Editar alumno
      </h1>

      <form action={actualizarAlumno} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Nombre
          </label>
          <input
            name="nombre"
            defaultValue={alumno.nombre}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Apellido */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Apellido
          </label>
          <input
            name="apellido"
            defaultValue={alumno.apellido}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Turno */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Turno
          </label>
          <select
            name="turno"
            defaultValue={alumno.turno}
            className="border p-2 w-full rounded"
          >
            {TURNOS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Graduación */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Graduación
          </label>
          <select
            name="graduacion"
            defaultValue={alumno.graduacion}
            className="border p-2 w-full rounded"
          >
            {GRADUACIONES.map((g) => (
              <option key={g.key} value={g.key}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha nacimiento */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            name="fecha_nacimiento"
            defaultValue={alumno.fecha_nacimiento ?? ""}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Próximo examen */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Próximo examen
          </label>
          <input
            type="date"
            name="proxima_fecha_examen"
            defaultValue={alumno.proxima_fecha_examen ?? ""}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Checks */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="activo"
              defaultChecked={alumno.activo}
            />
            Activo
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="habilitado_examen"
              defaultChecked={alumno.habilitado_examen}
            />
            Habilitado examen
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="cuota_paga"
              defaultChecked={alumno.cuota_paga}
            />
            Cuota paga
          </label>
        </div>

        {/* Acciones */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Guardar
          </button>

          <Link
            href="/profesor/alumnos"
            className="border px-4 py-2 rounded"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
