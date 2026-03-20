"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type CrearUsuarioInput = {
  email: string;
  full_name: string;
  dni: string;
  es_alumno: boolean;
};

export async function crearUsuario(data: CrearUsuarioInput) {
  console.log("🟢 crearUsuario START", data);

  /* =========================
     1. Crear usuario Auth (con password)
  ========================== */
  const { data: userData, error: createError } =
    await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.dni,
      email_confirm: true,
      user_metadata: {
        full_name: data.full_name,
      },
    });

  if (createError) {
    throw new Error(createError.message);
  }

  const userId = userData.user.id;

  /* =========================
     2. Crear / actualizar profile
  ========================== */
  const { error: profileUpsertError } =
    await supabaseAdmin
      .from("profiles")
      .upsert({
        id: userId,
        full_name: data.full_name,
        dni: data.dni,
        is_admin: !data.es_alumno,
      });

  if (profileUpsertError) {
    console.error("🔴 ERROR upsert profiles", profileUpsertError);
    throw new Error("Error creando profile");
  }

  /* =========================
     3. Crear alumno si es_alumno
  ========================== */
  if (data.es_alumno) {
    const partes = data.full_name.trim().split(" ");
    const nombre = partes[0];
    const apellido = partes.slice(1).join(" ") || "-";

    const alumnoPayload = {
      nombre,
      apellido,
      mail: data.email,
      activo: true,
      profile_id: userId,
    };

    const { error: alumnoError } =
      await supabaseAdmin
        .from("alumnos")
        .insert(alumnoPayload);

    if (alumnoError) {
      console.error("🔴 ERROR insert alumnos", alumnoError);

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

export async function resetPassword(userId: string, newPassword: string) {
  const { error } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    {
      password: newPassword,
    }
  );

  if (error) {
    console.error("🔴 ERROR reset password", error);
    throw new Error("No se pudo resetear el password");
  }

  return { ok: true };
}

export async function bajaUsuario(userId: string) {
  const { error } = await supabaseAdmin
    .from("profiles")
    .update({ activo: false })
    .eq("id", userId);

  if (error) {
    console.error("🔴 ERROR baja usuario", error);
    throw new Error("No se pudo dar de baja el usuario");
  }

  return { ok: true };
}