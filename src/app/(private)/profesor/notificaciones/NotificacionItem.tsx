"use client";

import { Trash2 } from "lucide-react";
import { borrarNotificacion } from "./actions";

type Notificacion = {
  id: string;
  titulo: string;
  mensaje: string;
  created_at: string;
  solo_profesores: boolean;
};

type Props = {
  notificacion: Notificacion;
  isAdmin: boolean;
};

export default function NotificacionItem({
  notificacion,
  isAdmin,
}: Props) {
  return (
    <div className="border rounded p-4 space-y-2">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h2 className="font-semibold">
            {notificacion.titulo}
          </h2>

          <span className="text-xs text-gray-400">
            {new Date(
              notificacion.created_at
            ).toLocaleDateString()}
          </span>
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              if (
                confirm("¿Eliminar notificación?")
              ) {
                borrarNotificacion(
                  notificacion.id
                );
              }
            }}
            className="text-gray-400 hover:text-red-600"
            title="Eliminar"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <p className="text-sm text-gray-700">
        {notificacion.mensaje}
      </p>

      {notificacion.solo_profesores &&
        isAdmin && (
          <span className="inline-block text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
            Solo profesores
          </span>
        )}
    </div>
  );
}