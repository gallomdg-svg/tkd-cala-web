import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function EventosPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="p-6">No autenticado</p>;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.is_admin ?? false;

  const { data: eventos } = await supabase
    .from("eventos")
    .select("*")
    .eq("solo_profesores", false)
    .order("fecha", { ascending: true });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Eventos</h1>

      {eventos?.length === 0 && (
        <p>No hay eventos cargados</p>
      )}

      <div className="space-y-4">
        {eventos?.map((e) => (
          <div
            key={e.id}
            className="border rounded p-4 space-y-1"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{e.titulo}</h2>
              {isAdmin && e.solo_profesores && (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                  Solo profesores
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600">
              📅 {e.fecha} ⏰ {e.hora}
            </p>

            <p>{e.descripcion}</p>

            {e.lugar && (
              <p className="text-sm text-gray-500">
                📍 {e.lugar}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
