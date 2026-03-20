import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type Reaccion = {
  id: string;
  tipo: string;
  user_id: string;
  notificacion_id: string;
};

type Comentario = {
  id: string;
  comentario: string;
  user_id: string;
  notificacion_id: string;
  profiles?: {
    full_name: string;
  };
};


/* ===================== */
/* SERVER ACTIONS */
/* ===================== */

async function agregarReaccion(formData: FormData) {
  "use server";

  const supabase = await createSupabaseServerClient();

  const notificacion_id = formData.get("notificacion_id") as string;
  const tipo = formData.get("tipo") as string;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // elimina reacción previa (si existe)
  await supabase
    .from("notificaciones_reacciones")
    .delete()
    .eq("notificacion_id", notificacion_id)
    .eq("user_id", user.id);

  // inserta nueva
  await supabase.from("notificaciones_reacciones").insert({
    notificacion_id,
    user_id: user.id,
    tipo,
  });

  revalidatePath("/alumno/notificaciones");
}

async function agregarComentario(formData: FormData) {
  "use server";

  const supabase = await createSupabaseServerClient();

  const notificacion_id = formData.get("notificacion_id") as string;
  const comentario = formData.get("comentario") as string;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !comentario) return;

  await supabase.from("notificaciones_comentarios").insert({
    notificacion_id,
    user_id: user.id,
    comentario,
  });

  revalidatePath("/alumno/notificaciones");
}

/* ===================== */
/* PAGE */
/* ===================== */

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

  // Notificaciones + relaciones
  const { data: notificaciones } = await supabase
    .from("notificaciones")
    .select(`
      *,
      notificaciones_reacciones (*),
      notificaciones_comentarios (
        *,
        profiles (full_name)
      )
    `)
    .order("created_at", { ascending: false });

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

      <div className="space-y-6">
        {visibles?.map((n) => {
const reacciones: Reaccion[] = n.notificaciones_reacciones || [];
const comentarios: Comentario[] = n.notificaciones_comentarios || [];

          return (
            <div
              key={n.id}
              className="border rounded-lg p-4 space-y-3 shadow-sm"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">
                  {n.titulo}
                </h2>

                <span className="text-xs text-gray-400">
                  {new Date(n.created_at).toLocaleDateString()}
                </span>
              </div>

              {/* Mensaje */}
              <p className="text-sm text-gray-700">
                {n.mensaje}
              </p>

              {/* Badge */}
              {n.solo_profesores && isAdmin && (
                <span className="inline-block text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                  Solo profesores
                </span>
              )}

              {/* ===================== */}
              {/* REACCIONES */}
              {/* ===================== */}

              <div className="flex gap-2 text-lg">
                {["👍", "❤️", "👏", "🔥"].map((emoji) => (
                  <form key={emoji} action={agregarReaccion}>
                    <input
                      type="hidden"
                      name="notificacion_id"
                      value={n.id}
                    />
                    <input
                      type="hidden"
                      name="tipo"
                      value={emoji}
                    />
                    <button className="hover:scale-110 transition">
                      {emoji}
                    </button>
                  </form>
                ))}
              </div>

              {/* Conteo */}
              <div className="flex gap-4 text-sm text-gray-600">
                {["👍", "❤️", "👏", "🔥"].map((emoji) => {
                  const count = reacciones.filter(
                    (r: Reaccion) => r.tipo === emoji
                  ).length;

                  if (count === 0) return null;

                  return (
                    <span key={emoji}>
                      {emoji} {count}
                    </span>
                  );
                })}
              </div>

              {/* ===================== */}
              {/* COMENTARIOS */}
              {/* ===================== */}

              <div className="space-y-2">
                {comentarios.map((c: Comentario) => (
                  <div
                    key={c.id}
                    className="text-sm border-t pt-2"
                  >
                    <span className="font-semibold">
                      {c.profiles?.full_name || "Usuario"}
                    </span>
                    : {c.comentario}
                  </div>
                ))}
              </div>

              {/* Input comentario */}
              <form action={agregarComentario} className="flex gap-2 pt-2">
                <input
                  type="hidden"
                  name="notificacion_id"
                  value={n.id}
                />

                <input
                  type="text"
                  name="comentario"
                  placeholder="Escribir comentario..."
                  className="flex-1 border rounded px-3 py-1 text-sm"
                />

                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  Enviar
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}