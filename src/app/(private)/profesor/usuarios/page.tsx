import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Plus, Pencil, KeyRound, UserX } from "lucide-react";
import { resetPassword, bajaUsuario } from "./actions";

type Usuario = {
  id: string;
  full_name: string | null;
  email: string | null;
  es_alumno: boolean | null;
  created_at: string;
};

export default async function UsuariosPage() {
  const supabase = await createSupabaseServerClient();

  const { data: usuarios, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at");

  if (error) {
    console.error("Error cargando usuarios:", error);
  }

  const listaUsuarios: Usuario[] = usuarios ?? [];

  async function handleResetPassword(userId: string) {
    "use server";
    await resetPassword(userId, "123456"); // 🔥 podés cambiar por DNI después
  }

  async function handleBajaUsuario(userId: string) {
    "use server";
    await bajaUsuario(userId);
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Usuarios
        </h1>

        <Link
          href="/profesor/usuarios/nuevo"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
        >
          <Plus size={18} />
          Nuevo usuario
        </Link>
      </div>

      {/* Tabla */}
      <div className="border rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Es alumno</th>
              <th className="p-3 text-left">Creado</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {listaUsuarios.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-gray-500"
                >
                  No hay usuarios para mostrar
                </td>
              </tr>
            )}

            {listaUsuarios.map((u) => (
              <tr
                key={u.id}
                className="border-t hover:bg-gray-50"
              >
                {/* Nombre */}
                <td className="p-3">
                  {u.full_name ?? u.email ?? "-"}
                </td>

                {/* Email */}
                <td className="p-3">
                  {u.email}
                </td>

                {/* Es alumno */}
                <td className="p-3 text-center">
                  {u.es_alumno ? "✔️" : "—"}
                </td>

                {/* Creado */}
                <td className="p-3">
                  {new Date(
                    u.created_at
                  ).toLocaleDateString()}
                </td>

                {/* Acciones */}
                <td className="p-3 text-right space-x-3">
                  {/* Editar */}
                  <Link
                    href={`/profesor/usuarios/${u.id}`}
                    title="Editar usuario"
                    className="inline-flex text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </Link>

                  {/* Reset Password */}
                  <form action={handleResetPassword.bind(null, u.id)} className="inline">
                    <button
                      type="submit"
                      title="Resetear password (123456)"
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <KeyRound size={18} />
                    </button>
                  </form>

                  {/* Baja lógica */}
                  <form action={handleBajaUsuario.bind(null, u.id)} className="inline">
                    <button
                      type="submit"
                      title="Inactivar usuario"
                      className="text-red-600 hover:text-red-800"
                    >
                      <UserX size={18} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}