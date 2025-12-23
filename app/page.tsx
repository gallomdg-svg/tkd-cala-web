"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Usuario de prueba
  const USUARIO_TEST = "alumno@tkd.com";
  const PASSWORD_TEST = "1234";

  const handleLogin = () => {
    if (email === USUARIO_TEST && password === PASSWORD_TEST) {
      router.push("/perfil");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>TKD Grupo Cala</h1>

      <div style={styles.form}>
        <input
          type="email"
          placeholder="Usuario (mail)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button onClick={handleLogin} style={styles.button}>
          Ingresar
        </button>
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    color: "#fff"
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem"
  },
  form: {
    width: "300px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem"
  },
  input: {
    padding: "0.7rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none"
  },
  button: {
    padding: "0.7rem",
    fontSize: "1rem",
    backgroundColor: "#e10600",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  error: {
    color: "#ff4d4d",
    fontSize: "0.9rem"
  }
};
