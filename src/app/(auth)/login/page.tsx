"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Credenciales incorrectas");
      setLoading(false);
      return;
    }

    // 🔑 Buscar perfil
    const { data: profile } = await supabaseClient
      .from("profiles")
      .select("is_admin")
      .eq("id", data.user.id)
      .single();

    if (!profile) {
      setError("Perfil no encontrado");
      setLoading(false);
      return;
    }

    // 🎯 REDIRECCIÓN POR ROL
    if (profile.is_admin === true) {
      router.push("/profesor/perfil");
    } else {
      router.push("/alumno/perfil");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        className="w-full border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full bg-black text-white p-2"
        disabled={loading}
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
