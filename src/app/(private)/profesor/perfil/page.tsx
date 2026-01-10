import { getCurrentUserProfile } from "@/lib/auth";

export default async function ProfesorPerfilPage() {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return (
      <div className="p-6 text-red-600">
        No se pudo cargar el perfil del profesor.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Perfil del Profesor</h1>

      <div className="rounded border p-4 space-y-2">
        <p>
          <strong>Nombre:</strong> {profile.full_name}
        </p>

        <p>
          <strong>Rol:</strong> {profile.role}
        </p>

        <p className="text-sm text-gray-500">
          ID de usuario: {profile.id}
        </p>
      </div>
    </div>
  );
}
