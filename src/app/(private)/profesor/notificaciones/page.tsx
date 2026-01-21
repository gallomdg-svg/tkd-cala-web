import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import NotificacionItem from "./NotificacionItem";

export default async function NotificacionesPage() {
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

  const { data: notificaciones } = await supabase
    .from("notificaciones")
    .select("*")
    .order("created_at", { ascending: false });

  const visibles = isAdmin
    ? notificaciones
    : notificaciones?.filter(
        (n) => !n.solo_profesores
      );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Notificaciones
        </h1>

        {isAdmin && (
          <Link
            href="/profesor/notificaciones/nueva"
            className="px-4 py-2 bg-black text-white rounded text-sm"
          >
            Nueva notificación
          </Link>
        )}
      </div>

      {(!visibles || visibles.length === 0) && (
        <p className="text-gray-500">
          No hay notificaciones
        </p>
      )}

      <div className="space-y-4">
        {visibles?.map((n) => (
          <NotificacionItem
            key={n.id}
            notificacion={n}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  );
}
