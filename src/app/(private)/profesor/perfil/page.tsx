import { createSupabaseServerClient } from "@/lib/supabase/server";
import Image from "next/image";

export default async function PerfilProfesorPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="p-6">No autenticado</p>;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, avatar_url, is_admin")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.is_admin) {
    return <p className="p-6">Acceso no autorizado</p>;
  }

  const { count: totalAlumnos } = await supabase
    .from("alumnos")
    .select("*", { count: "exact", head: true });

  const { count: totalEventos } = await supabase
    .from("eventos")
    .select("*", { count: "exact", head: true });

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Perfil del Profesor</h1>

      <div className="flex items-center gap-6">
        <Image
          src={profile.avatar_url || "/images/avatar-placeholder.png"}
          alt="Avatar"
          width={96}
          height={96}
          className="rounded-full border"
        />

        <div>
          <p className="text-lg font-semibold">
            {profile.full_name || "Profesor"}
          </p>
          <p className="text-gray-600">{profile.email}</p>
          <p className="text-sm text-green-600 font-medium">
            Administrador
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Stat label="Alumnos" value={totalAlumnos} />
        <Stat label="Eventos" value={totalEventos} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="border rounded p-4 text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value ?? 0}</p>
    </div>
  );
}
