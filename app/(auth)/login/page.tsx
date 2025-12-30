"use client";

import { supabase } from "../../../lib/supabase/client";
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

    // 1️⃣ Login
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

    // 2️⃣ Buscar perfil en alumnos
    const userId = authData.user.id;

    console.log("🔍 Buscando alumno con user_id:", userId);

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

    // 3️⃣ Redirección por rol
    if (alumno.rol === "profesor") {
      console.log("➡️ Redirigiendo a profesor");
      router.push("/profesor/perfil"); // layout profesor
    } else {
      console.log("➡️ Redirigiendo a alumno");
      router.push("/alumno/perfil"); // layout alumno
    }

    setLoading(false);
  };

  return (
    <div style={{ width: 320 }}>
      <h1>TKD Cala</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <button disabled={loading} style={{ width: "100%" }}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
