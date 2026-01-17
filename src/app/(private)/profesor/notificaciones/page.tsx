import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function NotificacionesPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="p-6">No autenticado</p>;
  }

  // Perfil
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.is_admin ?? false;

  // Notificaciones
  const { data: notificaciones } = await supabase
    .from("notificaciones")
    .select("*")
    .order("created_at", { ascending: false });

  // Filtro visual (las policies pueden hacer lo mismo)
  const visibles = isAdmin
    ? notificaciones
    : notificaciones?.filter((n) => !n.solo_profesores);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Notificaciones</h1>

      {(!visibles || visibles.length === 0) && (
        <p className="text-gray-500">
          No hay notificaciones
        </p>
      )}

      <div className="space-y-4">
        {visibles?.map((n) => (
          <div
            key={n.id}
            className="border rounded p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">
                {n.titulo}
              </h2>

              <span className="text-xs text-gray-400">
                {new Date(n.created_at).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm text-gray-700">
              {n.mensaje}
            </p>

            {n.solo_profesores && isAdmin && (
              <span className="inline-block text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                Solo profesores
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
