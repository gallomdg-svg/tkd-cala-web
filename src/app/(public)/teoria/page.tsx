import { getTeoriaUrl } from "@/lib/teoria";
import { GRADUACIONES } from "@/lib/constants";
import BuscadorTeoria from "@/components/teoria/BuscadorTeoria";

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

  const teoriaData = teoriaPorTurno.map(
    ({ turno, graduaciones }) => ({
      turno,
      graduaciones: graduaciones.map(
        ({ grad, url }) => ({
          key: grad.key,
          label: grad.label,
          url: url!,
        })
      ),
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

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="font-semibold text-blue-900 mb-1">
          📢 Importante
        </p>

        <p className="text-sm text-gray-700">
          La teoría corresponde a la graduación actual del alumno y es
          el material que debe estudiar para rendir el examen de la
          siguiente graduación.
        </p>

        <p className="text-sm text-gray-700 mt-2">
          Ejemplo: si actualmente sos <strong>Cinturón Verde</strong>,
          debés estudiar la teoría de <strong>Cinturón Verde</strong>{" "}
          para rendir a <strong>Verde punta azul</strong>.
        </p>
      </div>

      <BuscadorTeoria teoriaData={teoriaData} />

      <div className="space-y-8">
        {teoriaPorTurno.map(({ turno, graduaciones }) => (
          <div key={turno} className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-1">
              {turno}
            </h2>

            <ul className="space-y-2">
              {graduaciones.map(({ grad, url }) => {
                const siguiente = GRADUACIONES.find(
                  (g) => g.key === grad.key + 1
                );

                return (
                  <li
                    key={`${turno}-${grad.key}`}
                    className="flex items-center justify-between bg-gray-50 border rounded p-3"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {grad.label}
                      </span>

                      {siguiente && (
                        <span className="text-xs font-medium text-blue-600 mt-1">
                          🎯 Examen: {siguiente.label}
                        </span>
                      )}
                    </div>

                    <a
                      href={url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      📖 Ver teoría
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