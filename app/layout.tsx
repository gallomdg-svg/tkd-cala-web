// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'TKD Cala',
  description: 'Plataforma web de alumnos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  )
}
