"use client";

import { Trash2 } from "lucide-react";
import { borrarEvento } from "./actions";

type Evento = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string | null;
  solo_profesores: boolean;
};

type Props = {
  evento: Evento;
  isAdmin: boolean;
};

export default function EventoItem({
  evento,
  isAdmin,
}: Props) {
  return (
    <div className="border rounded p-4 space-y-1">
      <div className="flex justify-between items-start gap-2">
        <h2 className="font-semibold">
          {evento.titulo}
        </h2>

        {isAdmin && (
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "¿Eliminar evento?"
                )
              ) {
                borrarEvento(evento.id);
              }
            }}
            className="text-gray-400 hover:text-red-600"
            title="Eliminar"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <p className="text-sm text-gray-600">
        📅 {evento.fecha} ⏰ {evento.hora}
      </p>

      <p>{evento.descripcion}</p>

      {evento.lugar && (
        <p className="text-sm text-gray-500">
          📍 {evento.lugar}
        </p>
      )}

      {evento.solo_profesores && isAdmin && (
        <span className="inline-block text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
          Solo profesores
        </span>
      )}
    </div>
  );
}
