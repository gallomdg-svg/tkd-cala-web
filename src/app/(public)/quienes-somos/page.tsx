import Image from "next/image"

export default function QuienesSomosPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-16 animate-fade-in">

      {/* Logos */}
      <div className="flex flex-wrap justify-center gap-10">
        <Image src="/logos/tkd_cala_logo.png" alt="Sergio Cala" width={160} height={160} />
        <Image src="/logos/tkd_cala_cts.png" alt="CTS" width={160} height={160} />
      </div>

      {/* Texto principal */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Escuela CTS – Taekwondo ITF
        </h1>

        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          En el DoJang Cala promovemos la práctica del Taekwondo como una
          herramienta integral para el desarrollo físico, mental y emocional.
          Bajo la guía del profesor <strong>Sergio Cala (V Dan)</strong>,
          transmitimos no solo técnicas marciales, sino valores que acompañan
          a nuestros alumnos dentro y fuera del DoJang.
        </p>
      </div>

      {/* Valores */}
      <div className="grid md:grid-cols-2 gap-8">
        {[
          "Respeto y disciplina",
          "Perseverancia y superación personal",
          "Autoconfianza y autocontrol",
          "Formación integral a través del Taekwondo",
        ].map((v) => (
          <div
            key={v}
            className="border rounded-xl p-6 text-center hover:shadow-md transition-shadow"
          >
            <p className="font-medium text-gray-800">{v}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
