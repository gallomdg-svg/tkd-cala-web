import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Verifica que quien llama a una acción del servidor sea un profesor (admin).
 * Las server actions se pueden invocar directamente aunque la página esté
 * protegida por el middleware, así que cada acción sensible debe chequearlo.
 */
export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    throw new Error("No autorizado");
  }

  return { supabase, user };
}
