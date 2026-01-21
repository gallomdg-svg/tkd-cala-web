"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Elimina una notificación por id
 * (solo debe ser usada por profesores/admin)
 */
export async function borrarNotificacion(id: string) {
  const supabase = await createSupabaseServerClient();

  await supabase
    .from("notificaciones")
    .delete()
    .eq("id", id);

  revalidatePath("/profesor/notificaciones");
}

/**
 * Crea una nueva notificación y redirige
 * al listado de notificaciones
 */
export async function crearNotificacion(
  formData: FormData
) {
  const supabase = await createSupabaseServerClient();

  const titulo = formData.get("titulo") as string;
  const mensaje = formData.get("mensaje") as string;
  const solo_profesores =
    formData.get("solo_profesores") === "on";

  await supabase.from("notificaciones").insert({
    titulo,
    mensaje,
    solo_profesores,
  });

  revalidatePath("/profesor/notificaciones");

  redirect("/profesor/notificaciones");
}
