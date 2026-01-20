import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GRADUACIONES, TURNOS } from "@/lib/constants";
import { Pencil } from "lucide-react";

type Alumno = {
  id: string;
  nombre: string;
  apellido: string;
  turno: string;
  graduacion: number | string | null;
  activo: boolean;
  proxima_fecha_examen: string | null;
};

type PageProps = {
  searchParams: Promise<{
    turno?: string;
    activo?: string;
  }>;
};

const getGraduacionLabel = (
  value: number | string | null
) => {
  if (!value) return "-";
  const key = Number(value);

  return (
    GRADUACIONES.find((g) => g.key === key)
      ?.label ?? "-"
  );
};

export default async function AlumnosPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const turnoFiltro = params.turno ?? "Todos";
  const activoFiltro = params.activo !== "false";

  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from("alumnos")
    .select("*")
    .order("apellido");

  if (turnoFiltro !== "Todos") {
    query = query.eq("turno", turnoFiltro);
  }

  if (activoFiltro) {
    query = query.eq("activo", true);
  }

  const { data: alumnos } = await query;

  const listaAlumnos: Alumno[] = alumnos ?? [];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Alumnos
      </h1>

      {/* Filtros */}
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

        <button
          type="submit"
          className="border px-3 py-2 rounded"
        >
          Filtrar
        </button>
      </form>

      {/* Tabla */}
      <div className="border rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">
                Nombre
              </th>
              <th className="p-3 text-left">
                Turno
              </th>
              <th className="p-3 text-left">
                Graduación
              </th>
              <th className="p-3 text-center">
                Activo
              </th>
              <th className="p-3 text-left">
                Próx. examen
              </th>
              <th className="p-3 text-right">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {listaAlumnos.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-4 text-center text-gray-500"
                >
                  No hay alumnos para mostrar
                </td>
              </tr>
            )}

            {listaAlumnos.map((alumno) => (
              <tr
                key={alumno.id}
                className="border-t hover:bg-gray-50"
              >
                {/* Nombre */}
                <td className="p-3">
                  {alumno.apellido},{" "}
                  {alumno.nombre}
                </td>

                {/* Turno */}
                <td className="p-3">
                  {alumno.turno}
                </td>

                {/* Graduación */}
                <td className="p-3">
                  {getGraduacionLabel(
                    alumno.graduacion
                  )}
                </td>

                {/* Activo */}
                <td className="p-3 text-center">
                  {alumno.activo ? "✔️" : "—"}
                </td>

                {/* Próximo examen */}
                <td className="p-3">
                  {alumno.proxima_fecha_examen
                    ? new Date(
                        alumno.proxima_fecha_examen
                      ).toLocaleDateString()
                    : "-"}
                </td>

                {/* Acciones */}
                <td className="p-3 text-right">
                  <Link
                    href={`/profesor/alumnos/${alumno.id}`}
                    title="Editar alumno"
                    className="inline-flex text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
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
