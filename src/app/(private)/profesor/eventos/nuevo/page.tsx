import Link from "next/link";
import { crearEvento } from "../actions";

export default function NuevoEventoPage() {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Nuevo evento
      </h1>

      <form
        action={crearEvento}
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
            Descripción
          </label>
          <textarea
            name="descripcion"
            required
            rows={4}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">
              Fecha
            </label>
            <input
              type="date"
              name="fecha"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">
              Hora
            </label>
            <input
              type="time"
              name="hora"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Lugar
          </label>
          <input
            name="lugar"
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
            href="/profesor/eventos"
            className="px-4 py-2 border rounded"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
