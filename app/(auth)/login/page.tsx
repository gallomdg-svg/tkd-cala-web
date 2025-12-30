"use client";

import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("🔐 Intentando login:", email);

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    console.log("👤 AUTH DATA:", authData);
    console.log("❌ AUTH ERROR:", authError);

    if (authError || !authData.user) {
      alert("Error de login");
      setLoading(false);
      return;
    }

    const userId = authData.user.id;

    const { data: alumno, error: alumnoError } = await supabase
      .from("alumnos")
      .select("*")
      .eq("user_id", userId)
      .single();

    console.log("📦 ALUMNO:", alumno);
    console.log("❌ ALUMNO ERROR:", alumnoError);

    if (alumnoError || !alumno) {
      alert("No se encontró el perfil");
      setLoading(false);
      return;
    }

    if (alumno.rol === "profesor") {
      router.push("/profesor/perfil");
    } else {
      router.push("/alumno/perfil");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-600">TKD Cala</h1>
          <p className="text-gray-500 text-sm mt-1">
            Plataforma de alumnos y profesores
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="alumno@tkd.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </main>
  );
}
