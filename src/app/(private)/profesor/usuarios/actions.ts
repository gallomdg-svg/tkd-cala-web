"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type CrearUsuarioInput = {
  email: string;
  full_name: string;
  // es_alumno?: boolean; // se usará más adelante
};

export async function crearUsuario(data: CrearUsuarioInput) {
  // 1. Crear usuario en Auth (invitar por email)
  const { data: invite, error } =
    await supabaseAdmin.auth.admin.inviteUserByEmail(
      data.email,
      {
        data: {
          full_name: data.full_name,
          // es_alumno: data.es_alumno,
        },
      }
    );

  if (error) {
    throw new Error(error.message);
  }

  // ❗ IMPORTANTE
  // NO crear profile acá
  // El trigger on auth.users ya lo hace

  return {
    ok: true,
    user_id: invite.user.id,
  };
}
