"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Borra un evento
 */
export async function borrarEvento(id: string) {
  const supabase = await createSupabaseServerClient();

  await supabase
    .from("eventos")
    .delete()
    .eq("id", id);

  revalidatePath("/profesor/eventos");
}

/**
 * Crea un evento y vuelve al listado
 */
export async function crearEvento(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const titulo = formData.get("titulo") as string;
  const descripcion = formData.get("descripcion") as string;
  const fecha = formData.get("fecha") as string;
  const hora = formData.get("hora") as string;
  const lugar = formData.get("lugar") as string | null;
  const solo_profesores =
    formData.get("solo_profesores") === "on";

  await supabase.from("eventos").insert({
    titulo,
    descripcion,
    fecha,
    hora,
    lugar,
    solo_profesores,
  });

  revalidatePath("/profesor/eventos");
  redirect("/profesor/eventos");
}
