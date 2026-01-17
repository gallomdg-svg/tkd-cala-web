import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getTeoriaUrl } from "@/lib/teoria";

const TURNOS = ["Infantiles y Juveniles", "Adolescentes y Adultos"];

const GRADUACIONES = [
"Cinturón blanco",
"Cinturón blanco punta amarilla",
"Cinturón amarillo",
"Cinturón amarillo punta verde",
"Cinturón verde",
"Cinturón verde punta azul",
"Cinturón azul",
"Cinturón azul punta roja",
"Cinturón rojo",
"Cinturón rojo punta negra"];



export default async function TeoriaAlumnoPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="p-6">No autenticado</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">📘 Teoría</h1>

      <p className="text-gray-700">
        En esta sección vas a encontrar <strong>todo el material teórico</strong>{" "}
        disponible del Dojang, organizado por turno y graduación.
      </p>

      <div className="space-y-8">
        {TURNOS.map((turno) => (
          <div key={turno} className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-1">
              {turno}
            </h2>

            <ul className="space-y-2">
              {GRADUACIONES.map(async (graduacion) => {
                const url = await getTeoriaUrl(turno, graduacion);

                if (!url) return null;

                return (
                  <li
                    key={`${turno}-${graduacion}`}
                    className="flex items-center justify-between bg-gray-50 border rounded p-3"
                  >
                    <span>{graduacion}</span>

                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      📥 Descargar
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
