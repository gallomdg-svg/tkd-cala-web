// src/lib/teoria.ts
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GRADUACIONES } from "@/lib/constants";

export async function getTeoriaUrl(
  turno: string | null,
  graduacion: string | null
): Promise<string | null> {
  // 🛑 Validación defensiva (no debería pasar, pero protege)
  if (!turno || !graduacion) {
    return null;
  }

  const supabase = await createSupabaseServerClient();

  // 📂 Carpeta según turno (misma lógica que ya tenías)
  const carpeta = turno
    .toLowerCase()
    .includes("infantil")
    ? "infantil"
    : "adulto";

  // 🎓 Normalizar graduación (viene como string numérico)
  const gradKey = Number(graduacion);

  if (Number.isNaN(gradKey)) {
    return null;
  }

  // 🎓 Verificar que la graduación exista en constants
  const grad = GRADUACIONES.find(
    (g) => g.key === gradKey
  );

  if (!grad) {
    return null;
  }

  // 📄 Path del archivo (MISMO criterio que antes)
  const path = `${carpeta}/teoria-${grad.key}.pdf`;

  const { data, error } = await supabase.storage
    .from("Teoria")
    .createSignedUrl(path, 60 * 60); // 1 hora

  if (error) {
    // 👉 CASO ESPERADO: no existe el archivo (ej. cinturón negro)
    // No es un error funcional, simplemente no se muestra
    if (error.message === "Object not found") {
      return null;
    }

    // 👉 Cualquier otro error sí es relevante
    console.error("❌ Error storage:", error.message);
    return null;
  }

  return data?.signedUrl ?? null;
}
