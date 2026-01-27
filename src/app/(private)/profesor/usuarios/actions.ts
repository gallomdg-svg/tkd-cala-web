"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type CrearUsuarioInput = {
  email: string;
  full_name: string;
  es_alumno: boolean;
};

export async function crearUsuario(data: CrearUsuarioInput) {
  console.log("🟢 crearUsuario START", data);

  /* =========================
     1. Crear usuario Auth
  ========================== */
  const { data: invite, error: inviteError } =
    await supabaseAdmin.auth.admin.inviteUserByEmail(
      data.email,
      {
        data: {
          full_name: data.full_name,
        },
      }
    );

  if (inviteError) {
      throw new Error(inviteError.message);
  }

  const userId = invite.user.id;
  

  /* =========================
     2. Obtener profile creado por trigger
  ========================== */
  const { data: profile, error: profileError } =
    await supabaseAdmin
      .from("profiles")
      .select("id, full_name")
      .eq("id", userId)
      .single();


  if (profileError || !profile) {
    throw new Error("No se pudo obtener el profile del usuario");
  }

  /* =========================
     3. Crear alumno si es_alumno
  ========================== */
  if (data.es_alumno) {
    const partes = data.full_name.trim().split(" ");
    const nombre = partes[0];
    const apellido =
      partes.slice(1).join(" ") || "-";

    const alumnoPayload = {
      nombre,
      apellido,
      mail: data.email,
      activo: true,
      profile_id: profile.id,
    };

    const { error: alumnoError } =
      await supabaseAdmin
        .from("alumnos")
        .insert(alumnoPayload);

    if (alumnoError) {
      console.error(
        "🔴 ERROR insert alumnos",
        alumnoError
      );

      throw new Error(
        "Usuario creado, pero falló la creación del alumno"
      );
    }


  }


  return {
    ok: true,
    user_id: userId,
  };
}
