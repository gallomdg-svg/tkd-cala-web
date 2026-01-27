import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GRADUACIONES, TURNOS } from "@/lib/constants";
import { Pencil } from "lucide-react";

/* =======================
   Types
======================= */

type ProfileDB = {
  full_name: string | null;
  telefono: string | null;
};

type AlumnoDB = {
  id: string;
  nombre: string;
  apellido: string;
  turno: string;
  graduacion: number | string | null;
  activo: boolean;
  cuota_pagada: boolean;
  habilitado_examen: boolean;
  proxima_fecha_examen: string | null;
  fecha_nacimiento: string | null;
  profiles: ProfileDB | ProfileDB[] | null;
};

type Alumno = Omit<AlumnoDB, "profiles"> & {
  profile: ProfileDB | null;
};

type PageProps = {
  searchParams: Promise<{
    turno?: string;
    activo?: string;
  }>;
};

/* =======================
   Helpers
======================= */

const getGraduacionLabel = (value: number | string | null) => {
  if (!value) return "-";
  const key = Number(value);
  return GRADUACIONES.find((g) => g.key === key)?.label ?? "-";
};

const calcularEdad = (fecha: string | null) => {
  if (!fecha) return "-";
  const hoy = new Date();
  const nacimiento = new Date(fecha);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
};

const Check = ({ value }: { value: boolean }) => (value ? "✔️" : "—");

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
    {children}
  </span>
);

/* =======================
   Page
======================= */

export default async function AlumnosPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const turnoFiltro = params.turno ?? "Todos";
  const activoFiltro = params.activo !== "false";

  const supabase = await createSupabaseServerClient();

  /* ===== Query base ===== */
  let query = supabase
    .from("alumnos")
    .select(`
      id,
      nombre,
      apellido,
      turno,
      graduacion,
      activo,
      cuota_pagada,
      habilitado_examen,
      proxima_fecha_examen,
      fecha_nacimiento,
      profiles:profile_id (
        full_name,
        telefono
      )
    `)
    .order("apellido");

  /* ===== Filtros (ANTES del await) ===== */
  if (turnoFiltro !== "Todos") {
    query = query.eq("turno", turnoFiltro);
  }

  if (activoFiltro) {
    query = query.eq("activo", true);
  }

  /* ===== Ejecutar query ===== */
  const { data, error } = await query;

  console.log("📌 SUPABASE DATA 👉", data);
  console.log("❌ SUPABASE ERROR 👉", error);

  /* ===== Normalización ===== */
  const listaAlumnos: Alumno[] =
    (data as AlumnoDB[] | null)?.map((a) => ({
      ...a,
      profile: Array.isArray(a.profiles)
        ? a.profiles[0] ?? null
        : a.profiles ?? null,
    })) ?? [];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Alumnos</h1>


      {/* =======================
          Filtros
      ======================= */}
      <form className="flex gap-4 items-center">
        <select
          name="turno"
          defaultValue={turnoFiltro}
          className="border p-2 rounded"
        >
          <option value="Todos">Todos</option>
          {TURNOS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="activo"
            defaultChecked={activoFiltro}
          />
          Activo
        </label>

        <button type="submit" className="border px-3 py-2 rounded">
          Filtrar
        </button>

<Link
    href="/profesor/alumnos/nuevo"
    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
  >
    + Nuevo alumno
  </Link>


      </form>



      {/* =======================
          Tabla
      ======================= */}
      <div className="border rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="p-3 text-left">Alumno</th>
              <th className="p-3">Turno</th>
              <th className="p-3">Graduación</th>
              <th className="p-3 text-center">Edad</th>
              <th className="p-3 text-center">Cuota</th>
              <th className="p-3 text-center">Examen</th>
              <th className="p-3">Próx. Ex.</th>
              <th className="p-3">Referente</th>
              <th className="p-3">Teléfono</th>
              <th className="p-3 text-center">Activo</th>
              <th className="p-3 text-right"></th>
            </tr>
          </thead>

          <tbody>
            {listaAlumnos.length === 0 && (
              <tr>
                <td colSpan={11} className="p-6 text-center text-gray-500">
                  No hay alumnos para mostrar
                </td>
              </tr>
            )}

            {listaAlumnos.map((alumno) => (
              <tr key={alumno.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">
                  {alumno.apellido}, {alumno.nombre}
                </td>

                <td className="p-3">
                  <Badge>{alumno.turno}</Badge>
                </td>

                <td className="p-3">
                  {getGraduacionLabel(alumno.graduacion)}
                </td>

                <td className="p-3 text-center">
                  {calcularEdad(alumno.fecha_nacimiento)}
                </td>

                <td className="p-3 text-center">
                  <Check value={alumno.cuota_pagada} />
                </td>

                <td className="p-3 text-center">
                  <Check value={alumno.habilitado_examen} />
                </td>

                <td className="p-3">
                  {alumno.proxima_fecha_examen
                    ? new Date(alumno.proxima_fecha_examen).toLocaleDateString()
                    : "-"}
                </td>

                <td className="p-3">
                  {alumno.profile?.full_name ?? "-"}
                </td>

                <td className="p-3 text-gray-600">
                  {alumno.profile?.telefono ?? "-"}
                </td>

                <td className="p-3 text-center">
                  <Check value={alumno.activo} />
                </td>

                <td className="p-3 text-right">
                  <Link
                    href={`/profesor/alumnos/${alumno.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
