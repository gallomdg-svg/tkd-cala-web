import Image from "next/image"

export default function QuienesSomosPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-16 animate-fade-in">

      {/* Título principal */}
{/* Encabezado */}
<div className="text-center space-y-2">
  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
    Escuela Centro de Taekwondo Sud-Americano ITF
  </h1>

  <h2 className="text-lg md:text-xl font-semibold text-red-700 tracking-wide">
    Grupo Cala
  </h2>
</div>


      {/* Logos */}
      <div className="flex flex-wrap justify-center gap-10">
        <Image
          src="/logos/tkd_cala_cts.png"
          alt="TKD Cala"
          width={150}
          height={150}
        />
        <Image
          src="/logos/tkd_cala_logo.png"
          alt="CTS"
          width={150}
          height={150}
        />
      </div>

      {/* Profesor + Texto */}
      <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
        {/* Foto del profesor */}
        <div className="flex justify-center">
          <Image
            src="/logos/sergio-cala.jpeg" 
            alt="Profesor Sergio Cala"
            width={180}
            height={180}
            className="rounded-full object-cover shadow-md"
          />
        </div>

        {/* Texto principal */}
        <p className="text-lg text-gray-700">
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
