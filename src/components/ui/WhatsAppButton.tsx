'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function WhatsAppButton() {
  const pathname = usePathname()

  // Ocultar solo en login
  if (pathname.startsWith('/login')) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Tooltip (solo desktop) */}
      <div className="
        hidden md:block
        absolute right-14 top-1/2 -translate-y-1/2
        bg-black text-white text-sm px-3 py-1 rounded-md
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        whitespace-nowrap
      ">
        Escribinos por WhatsApp
      </div>

      {/* Botón */}
      <Link
        href="https://wa.me/5491153842610"
        target="_blank"
        aria-label="WhatsApp"
        className="
          w-14 h-14
          rounded-full
          bg-green-500
          flex items-center justify-center
          shadow-lg
          hover:bg-green-600
          transition-all duration-300
          whatsapp-pulse
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="white"
          className="w-7 h-7"
        >
          <path d="M19.11 17.32c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.99 2.67 1.13 2.86.14.18 1.95 2.98 4.73 4.18.66.29 1.17.46 1.57.59.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.27.23-.61.23-1.13.16-1.27-.07-.14-.25-.23-.52-.36z"/>
        </svg>
      </Link>
    </div>
  )
}
