"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // El redirect por rol ya lo maneja tu lógica existente
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 to-red-800 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-600">TKD Cala</h1>
          <p className="text-gray-500 text-sm">
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alumno@tkd.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          © TKD Cala
        </p>
      </div>
    </main>
  );
}
