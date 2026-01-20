import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditarUsuarioPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: usuario, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !usuario) {
    return (
      <div className="p-6">
        <p className="text-red-600">Usuario no encontrado</p>
        <Link href="/profesor/usuarios" className="underline text-blue-600">
          Volver
        </Link>
      </div>
    );
  }

  async function actualizarUsuario(formData: FormData) {
    "use server";

    const supabase = await createSupabaseServerClient();

    const full_name = formData.get("full_name") as string;
    //const es_alumno = formData.get("es_alumno") === "on";

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name,
      //  es_alumno,
      })
      .eq("id", id);

    if (error) {
      console.error("UPDATE USUARIO ERROR 👉", error);
      throw new Error("Error al actualizar usuario");
    }

    redirect("/profesor/usuarios");
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Editar usuario</h1>

      <form action={actualizarUsuario} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Nombre completo
          </label>
          <input
            name="full_name"
            defaultValue={usuario.full_name ?? ""}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Email solo lectura */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            value={usuario.email ?? ""}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Es alumno */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="es_alumno"
            defaultChecked={usuario.es_alumno ?? false}
            className="h-4 w-4"
          />
          <label className="text-sm">Es alumno</label>
        </div>

        {/* Acciones */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>

          <Link
            href="/profesor/usuarios"
            className="px-4 py-2 rounded border"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
