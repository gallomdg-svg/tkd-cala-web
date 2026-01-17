// src/lib/teoria.ts
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GRADUACIONES } from "@/lib/constants";

export async function getTeoriaUrl(
  turno: string | null,
  graduacion: string | null
): Promise<string | null> {
  if (!turno || !graduacion) {
    console.error("❌ getTeoriaUrl recibió valores inválidos", {
      turno,
      graduacion,
    });
    return null;
  }

  const supabase = await createSupabaseServerClient();

  // 📂 Carpeta según turno
  const carpeta =
    turno.toLowerCase().includes("infantil") ? "infantil" : "adulto";

  // 🎓 Mapear graduación desde constants.ts
  const grad = GRADUACIONES.find((g) => g.label === graduacion);

  if (!grad) {
    console.error("❌ Graduación no mapeada:", graduacion);
    return null;
  }

  const path = `${carpeta}/teoria-${grad.key}.pdf`;

  console.log("🟡 getTeoriaUrl");
  console.log("📦 Bucket: Teoria");
  console.log("📄 Path final:", path);

  const { data, error } = await supabase.storage
    .from("Teoria")
    .createSignedUrl(path, 60 * 60); // 1 hora

  if (error) {
    console.error("❌ Error storage:", error.message);
    return null;
  }

  return data.signedUrl;
}
