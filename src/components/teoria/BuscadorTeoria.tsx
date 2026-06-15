"use client";

import { useMemo, useState } from "react";
import { GRADUACIONES } from "@/lib/constants";

type Props = {
  teoriaData: {
    turno: string;
    graduaciones: {
      key: number;
      label: string;
      url: string;
    }[];
  }[];
};

export default function BuscadorTeoria({
  teoriaData,
}: Props) {
  const [turno, setTurno] = useState(
    teoriaData[0]?.turno ?? ""
  );

  const [graduacion, setGraduacion] = useState<number>(
    teoriaData[0]?.graduaciones[0]?.key ?? 1
  );

  const teoriaSeleccionada = useMemo(() => {
    const turnoData = teoriaData.find(
      (t) => t.turno === turno
    );

    return turnoData?.graduaciones.find(
      (g) => g.key === graduacion
    );
  }, [turno, graduacion, teoriaData]);

  const siguiente = GRADUACIONES.find(
    (g) => g.key === graduacion + 1
  );

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
      <h2 className="text-xl font-bold">
        🎯 ¿Qué teoría tengo que estudiar?
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">
            Turno
          </label>

          <select
            value={turno}
            onChange={(e) =>
              setTurno(e.target.value)
            }
            className="w-full border rounded p-2"
          >
            {teoriaData.map((t) => (
              <option
                key={t.turno}
                value={t.turno}
              >
                {t.turno}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Graduación actual
          </label>

          <select
            value={graduacion}
            onChange={(e) =>
              setGraduacion(
                Number(e.target.value)
              )
            }
            className="w-full border rounded p-2"
          >
            {GRADUACIONES.filter(
              (g) => g.key <= 10
            ).map((g) => (
              <option
                key={g.key}
                value={g.key}
              >
                {g.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {teoriaSeleccionada && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="font-semibold">
            📘 Debés estudiar:
          </p>

          <p className="mt-1">
            {teoriaSeleccionada.label}
          </p>

          {siguiente && (
            <p className="text-blue-700 text-sm mt-2">
              🎯 Rendís para:{" "}
              {siguiente.label}
            </p>
          )}

          <a
            href={teoriaSeleccionada.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            📖 Ver teoría
          </a>
        </div>
      )}
    </div>
  );
}