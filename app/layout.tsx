import './globals.css'

export const metadata = {
  title: 'TKD Grupo Cala',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-100">
        {children}
      </body>
    </html>
  )
}
