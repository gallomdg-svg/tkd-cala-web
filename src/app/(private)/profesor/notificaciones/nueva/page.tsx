import { crearNotificacion } from "../actions";
import Link from "next/link";

export default function NuevaNotificacionPage() {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Nueva notificación
      </h1>

      <form
        action={crearNotificacion}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium">
            Título
          </label>
          <input
            name="titulo"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Mensaje
          </label>
          <textarea
            name="mensaje"
            required
            rows={4}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="solo_profesores"
          />
          Solo profesores
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Crear
          </button>

          <Link
            href="/profesor/notificaciones"
            className="px-4 py-2 border rounded"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
