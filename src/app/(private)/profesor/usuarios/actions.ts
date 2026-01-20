"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type CrearUsuarioInput = {
  email: string;
  full_name: string;
  //es_alumno: boolean;
};

export async function crearUsuario(data: CrearUsuarioInput) {
  // 1. Crear usuario en Auth (invitar)
  const { data: invite, error: inviteError } =
    await supabaseAdmin.auth.admin.inviteUserByEmail(
      data.email,
      {
        data: {
          full_name: data.full_name,
          //es_alumno: data.es_alumno,
        },
      }
    );

  if (inviteError) {
    throw new Error(inviteError.message);
  }

  const userId = invite.user.id;

  // 2. Crear profile
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .insert({
      id: userId,
      email: data.email,
      full_name: data.full_name,
      //es_alumno: data.es_alumno,
    });

  if (profileError) {
    throw new Error(profileError.message);
  }

  return { ok: true };
}
