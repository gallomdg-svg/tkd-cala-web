// src/lib/teoria.ts
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GRADUACIONES } from "@/lib/constants";

export async function getTeoriaUrl(
  turno: string | null,
  graduacion: string | null
): Promise<string | null> {
  // 🛑 Validación defensiva
  if (!graduacion) {
    return null;
  }

  const supabase = await createSupabaseServerClient();

  // 📂 Carpeta según turno (robusto ante null/undefined/otros tipos)
  const turnoStr = String(turno ?? "").toLowerCase();

  const carpeta = turnoStr.includes("infantil")
    ? "infantil"
    : "adulto";

  // 🎓 Normalizar graduación
  const gradKey = Number(graduacion);

  if (Number.isNaN(gradKey)) {
    return null;
  }

  // 🎓 Verificar que exista en constants
  const grad = GRADUACIONES.find(
    (g) => g.key === gradKey
  );

  if (!grad) {
    return null;
  }

  // 📄 Path del archivo
  const path = `${carpeta}/teoria-${grad.key}.pdf`;

  const { data, error } = await supabase.storage
    .from("Teoria")
    .createSignedUrl(path, 60 * 60); // 1 hora

  if (error) {
    if (error.message === "Object not found") {
      return null;
    }

    console.error("❌ Error storage:", error.message);
    return null;
  }

  return data?.signedUrl ?? null;
}