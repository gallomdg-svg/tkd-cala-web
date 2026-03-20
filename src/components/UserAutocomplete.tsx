"use client";

import { useState } from "react";

type Usuario = {
  id: string;
  full_name: string | null;
  email: string;
};

export default function UserAutocomplete({
  usuarios,
  defaultValue,
}: {
  usuarios: Usuario[];
  defaultValue?: Usuario | null;
}) {
  const [query, setQuery] = useState(
    defaultValue?.full_name ?? defaultValue?.email ?? ""
  );
  const [selected, setSelected] = useState<Usuario | null>(
    defaultValue ?? null
  );
  const [open, setOpen] = useState(false);

  const filtered =
    query.length < 2
      ? []
      : usuarios.filter(
          (u) =>
            u.full_name?.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        placeholder="Buscar usuario..."
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setSelected(null);
        }}
        onFocus={() => setOpen(true)}
        className="border p-2 w-full rounded"
      />

      {/* valor real que viaja al server */}
      <input
        type="hidden"
        name="profile_id"
        value={selected?.id ?? ""}
      />

      {open && filtered.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow mt-1 max-h-48 overflow-auto">
          {filtered.map((u) => (
            <li
              key={u.id}
              onClick={() => {
                setSelected(u);
                setQuery(u.full_name ?? u.email);
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="font-medium">
                {u.full_name ?? "Sin nombre"}
              </div>
              <div className="text-xs text-gray-500">
                {u.email}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
