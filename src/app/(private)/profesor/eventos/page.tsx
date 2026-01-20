import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import EventoItem from "./EventoItem";

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
    .order("fecha", { ascending: true });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Eventos
        </h1>

        {isAdmin && (
          <Link
            href="/profesor/eventos/nuevo"
            className="px-4 py-2 bg-black text-white rounded text-sm"
          >
            Nuevo evento
          </Link>
        )}
      </div>

      {eventos?.length === 0 && (
        <p>No hay eventos cargados</p>
      )}

      <div className="space-y-4">
        {eventos?.map((e) => (
          <EventoItem
            key={e.id}
            evento={e}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  );
}
