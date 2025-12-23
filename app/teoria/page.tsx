"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PerfilPage() {
  const router = useRouter();

  useEffect(() => {
    const logged = localStorage.getItem("logged");
    if (!logged) {
      router.push("/login");
    }
  }, [router]);

  function logout() {
    localStorage.removeItem("logged");
    router.push("/");
  }

  return (
    <main style={{ padding: 40 }}>
      <h2>Mi Perfil</h2>

      <p>Nombre: Alumno</p>
      <p>Graduación: --</p>

      <Link href="/app/teoria">Ir a Teoría</Link>

      <br /><br />

      <button onClick={logout}>Cerrar sesión</button>
    </main>
  );
}
