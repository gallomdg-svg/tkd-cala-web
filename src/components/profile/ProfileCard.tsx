import Image from "next/image";

type Profile = {
  full_name: string | null;
  role: string;
  avatar_url: string | null;
  email: string | null;
};

export default function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex flex-col items-center gap-4">
        {/* Avatar */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border">
          <Image
            src={profile.avatar_url || "/images/avatar-placeholder.png"}
            alt="Avatar"
            fill
            className="object-cover"
          />
        </div>

        {/* Datos principales */}
        <div className="text-center mt-2">
          <h1 className="text-xl font-semibold">
            {profile.full_name ?? "Sin nombre"}
          </h1>
          <p className="text-sm text-gray-500 capitalize">{profile.role}</p>
          <p className="text-sm text-gray-400">{profile.email}</p>
        </div>

        {/* Info detallada */}
        <div className="w-full mt-6 border-t pt-4 text-sm">
          <div className="grid grid-cols-1 gap-3">
            <InfoRow label="Nombre completo" value={profile.full_name} />
            <InfoRow label="Email" value={profile.email} />
            <InfoRow label="Rol" value={profile.role} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div className="flex justify-between border-b pb-1">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">
        {value ?? "-"}
      </span>
    </div>
  );
}
