import Image from "next/image"
import Link from "next/link"

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/quienes-somos" className="flex items-center gap-3">
          <Image
            src="/logos/tkd_cala_cts.png"
            alt="Taekwondo Cala CTS"
            width={44}
            height={44}
            priority
          />
          <span className="font-semibold tracking-wide text-gray-900">
            Taekwondo CTS
          </span>
        </Link>

        {/* Navegación */}
        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link
            href="/quienes-somos"
            className="hover:text-red-600 transition-colors"
          >
            Quiénes somos
          </Link>

          <Link
            href="/lugar-de-practica"
            className="hover:text-red-600 transition-colors"
          >
            Lugar de práctica
          </Link>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/tkd_san_telmo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:scale-110 transition-transform"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2Z"
                stroke="url(#ig-gradient)"
                strokeWidth="2"
              />
              <circle
                cx="12"
                cy="12"
                r="3.5"
                stroke="url(#ig-gradient)"
                strokeWidth="2"
              />
              <circle cx="17.5" cy="6.5" r="1" fill="url(#ig-gradient)" />
              <defs>
                <linearGradient
                  id="ig-gradient"
                  x1="0"
                  y1="0"
                  x2="24"
                  y2="24"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F58529" />
                  <stop offset="0.5" stopColor="#DD2A7B" />
                  <stop offset="1" stopColor="#515BD4" />
                </linearGradient>
              </defs>
            </svg>
          </a>

          {/* Login */}
          <Link
            href="/login"
            className="
              border border-red-600 text-red-600
              px-4 py-1.5 rounded-full
              hover:bg-red-600 hover:text-white
              transition-colors
            "
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  )
}
