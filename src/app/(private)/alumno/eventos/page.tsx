export default function EventosPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Eventos</h1>

      <p className="text-gray-600">
        Acá vas a encontrar los próximos exámenes, torneos y actividades del
        gimnasio.
      </p>

      <div className="rounded border p-4 text-sm text-gray-500">
        No hay eventos cargados por el momento.
      </div>
    </div>
  );
}
