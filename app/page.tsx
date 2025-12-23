import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 40, maxWidth: 600, margin: "0 auto" }}>
      <h1>TKD Cala</h1>

      <p>
        Plataforma de alumnos.
        <br />
        Acceso a perfil y material teórico.
      </p>

      <Link href="/login">
        <button style={{ marginTop: 20 }}>
          Ingresar
        </button>
      </Link>
    </main>
  );
}
