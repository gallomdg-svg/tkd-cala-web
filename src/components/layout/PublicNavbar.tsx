import Link from "next/link";

export default function PublicNavbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Izquierda */}
        <div className="flex gap-4 items-center">
          <Link href="/quienes-somos" className="hover:underline">
            Quiénes somos
          </Link>
          <Link href="/lugar-de-practica" className="hover:underline">
            Lugar de práctica
          </Link>
        </div>

        {/* Derecha */}
        <div className="flex gap-4 items-center">
          <a
            href="https://www.instagram.com/tkd_san_telmo?igsh=MTRjMncxenJ5bjBqcw=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Instagram
          </a>

          <Link
            href="/login"
            className="border px-3 py-1 rounded hover:bg-black hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
