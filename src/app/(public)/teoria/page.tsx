import { getTeoriaUrl } from "@/lib/teoria";
import { GRADUACIONES } from "@/lib/constants";

const TURNOS = [
  "Infantiles y Juveniles",
  "Adolescentes y Adultos",
];

export default async function TeoriaPublicaPage() {
  const teoriaPorTurno = await Promise.all(
    TURNOS.map(async (turno) => {
      const graduaciones = await Promise.all(
        GRADUACIONES.map(async (grad) => {
          const url = await getTeoriaUrl(
            turno,
            String(grad.key)
          );

          return {
            grad,
            url,
          };
        })
      );

      return {
        turno,
        graduaciones: graduaciones.filter(
          (g) => g.url !== null
        ),
      };
    })
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        📘 Teoría
      </h1>

      <p className="text-gray-700">
        En esta sección vas a encontrar todo el
        material teórico disponible del Dojang,
        organizado por turno y graduación.
      </p>

      <div className="space-y-8">
        {teoriaPorTurno.map(({ turno, graduaciones }) => (
          <div key={turno} className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-1">
              {turno}
            </h2>

            <ul className="space-y-2">
              {graduaciones.map(({ grad, url }) => (
                <li
                  key={`${turno}-${grad.key}`}
                  className="flex items-center justify-between bg-gray-50 border rounded p-3"
                >
                  <span>{grad.label}</span>

                  <a
                    href={url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    📥 Descargar
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}