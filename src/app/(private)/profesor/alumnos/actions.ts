"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function actualizarAlumno(
  formData: FormData
) {
  const supabase = await createSupabaseServerClient();

  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("ID de alumno faltante");
  }

  const payload = {
    nombre: formData.get("nombre"),
    apellido: formData.get("apellido"),
    turno: formData.get("turno"),
    graduacion: formData.get("graduacion"),
    activo: formData.get("activo") === "on",
    cuota_pagada:
      formData.get("cuota_pagada") === "on",
    habilitado_examen:
      formData.get("habilitado_examen") ===
      "on",
    proxima_fecha_examen:
      formData.get("proxima_fecha_examen") ||
      null,
  };

  const { error } = await supabase
    .from("alumnos")
    .update(payload)
    .eq("id", id);

  if (error) {
    console.error(
      "Error actualizando alumno:",
      error
    );
    throw new Error(
      "No se pudo actualizar el alumno"
    );
  }

  redirect("/profesor/alumnos");
}
