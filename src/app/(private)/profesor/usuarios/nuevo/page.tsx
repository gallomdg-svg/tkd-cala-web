"use client";

import { useState } from "react";
import { crearUsuario } from "../actions";
import { useRouter } from "next/navigation";

export default function NuevoUsuarioPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [esAlumno, setEsAlumno] = useState(false);
  const [loading, setLoading] = useState(false);

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);

  try {
    await crearUsuario({
      email,
      full_name: fullName,
      //es_alumno: esAlumno,
    });

    router.push("/profesor/usuarios");
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("Error inesperado al crear el usuario");
    }
  } finally {
    setLoading(false);
  }
}


  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 space-y-4"
    >
      <h1 className="text-2xl font-semibold">
        Nuevo usuario
      </h1>

      <input
        className="border p-2 w-full"
        placeholder="Email"
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Nombre completo"
        required
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={esAlumno}
          onChange={(e) => setEsAlumno(e.target.checked)}
        />
        Es alumno
      </label>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Crear usuario
        </button>

        <button
          type="button"
          onClick={() => router.push("/profesor/usuarios")}
          className="border px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

