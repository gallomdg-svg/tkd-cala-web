import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GRADUACIONES, TURNOS } from "@/lib/constants";
import UserAutocomplete from "@/components/UserAutocomplete";

export default async function NuevoAlumnoPage() {
  const supabase = await createSupabaseServerClient();

  const { data: usuarios } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .order("full_name");

  async function crearAlumno(formData: FormData) {
    "use server";

    const supabase = await createSupabaseServerClient();

    const profile_id =
      (formData.get("profile_id") as string) || null;

    const { error } = await supabase
      .from("alumnos")
      .insert({
        nombre: formData.get("nombre"),
        apellido: formData.get("apellido"),
        turno: Number(formData.get("turno")),
        graduacion: Number(formData.get("graduacion")),
        fecha_nacimiento:
          formData.get("fecha_nacimiento") || null,
        mail: formData.get("mail") || null,
        activo: formData.get("activo") === "on",
        habilitado_examen:
          formData.get("habilitado_examen") === "on",
        cuota_pagada:
          formData.get("cuota_pagada") === "on",
        profile_id,
      });

    if (error) {
      console.error("ERROR creando alumno 👉", error);
      throw new Error("No se pudo crear el alumno");
    }

    redirect("/profesor/alumnos");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">
        Nuevo alumno
      </h1>

      <form action={crearAlumno} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm mb-1">
            Nombre
          </label>
          <input
            name="nombre"
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Apellido */}
        <div>
          <label className="block text-sm mb-1">
            Apellido
          </label>
          <input
            name="apellido"
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Usuario responsable */}
        <div>
          <label className="block text-sm mb-1">
            Usuario responsable
          </label>
          <UserAutocomplete usuarios={usuarios ?? []} />
        </div>

        {/* Turno */}
        <div>
          <label className="block text-sm mb-1">
            Turno
          </label>
          <select
            name="turno"
            className="border p-2 w-full rounded"
          >
            {TURNOS.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Graduación */}
        <div>
          <label className="block text-sm mb-1">
            Graduación
          </label>
          <select
            name="graduacion"
            className="border p-2 w-full rounded"
          >
            {GRADUACIONES.map((g) => (
              <option key={g.key} value={g.key}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        {/* Checks */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="activo" defaultChecked />
            Activo
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" name="habilitado_examen" />
            Habilitado examen
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" name="cuota_pagada" />
            Cuota paga
          </label>
        </div>

        {/* Acciones */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Crear
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
