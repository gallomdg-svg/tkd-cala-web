import Image from "next/image"
import Link from "next/link"
import { openWhatsApp } from "@/components/ui/WhatsAppButton";

export default function QuienesSomosPage() {
  return (
    <main className="animate-fade-in">

      {/* HERO */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/home-banner.jpg" 
            alt="Taekwondo ITF"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>


<div className="relative max-w-6xl mx-auto px-6 py-28 text-center space-y-6">
  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
    Centro de Taekwon-do SudAmericano
  </h1>

  <h2 className="text-lg md:text-2xl font-semibold text-gray-200 tracking-wide">
    Grupo Cala · Taekwondo ITF
  </h2>

  <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
    Formación marcial y humana para niños, jóvenes y adultos.
    Disciplina, respeto y superación personal dentro y fuera del Dojang.
  </p>

    <button
            onClick={openWhatsApp}
            className="inline-block bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold px-8 py-3 rounded-full shadow-lg"
          >
            Sumate a entrenar
          </button>
</div>


      
      
        
        
  
      </section>

      {/* LOGOS */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-12 px-6">
          {[
            { src: "/logos/tkd_cala_cts.png", alt: "CTS" },
            { src: "/logos/tkd_cala_logo.png", alt: "TKD Cala" },
            { src: "/logos/tkd_itfu.jpg", alt: "ITF" },
          ].map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={120}
              className="grayscale hover:grayscale-0 transition"
            />
          ))}
        </div>
      </section>

      {/* PROFESOR */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-[260px_1fr] gap-12 items-center">
        <div className="flex justify-center">
          <Image
            src="/logos/sergio-cala.jpeg"
            alt="Profesor Sergio Cala"
            width={220}
            height={220}
            className="rounded-full shadow-xl object-cover"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Sergio Cala
          </h2>
          <p className="text-red-700 font-semibold tracking-wide">
            Instructor ITF – V Dan
          </p>

          <p className="text-lg text-gray-700">
            En el DoJang Cala promovemos la práctica del Taekwondo como una
            herramienta integral para el desarrollo físico, mental y emocional.
          </p>

          <p className="text-gray-700">
            Bajo la guía del profesor <strong>Sergio Cala</strong>, transmitimos
            no solo técnicas marciales, sino valores que acompañan a nuestros
            alumnos a lo largo de su vida.
          </p>
        </div>
      </section>

      {/* VALORES */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">
            Nuestros valores
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🥋", text: "Respeto y disciplina" },
              { icon: "🔥", text: "Perseverancia y superación" },
              { icon: "🧠", text: "Autocontrol y confianza" },
              { icon: "🧍", text: "Formación integral" },
            ].map((v) => (
              <div
                key={v.text}
                className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <p className="font-semibold text-gray-800">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-[360px_1fr] gap-12 items-center">
        <Image
          src="/images/cinturones-negros.jpeg"
          alt="Equipo de instructores TKD Cala"
          width={360}
          height={360}
          className="rounded-2xl shadow-lg object-cover"
        />

        <div className="space-y-4">
          <h3 className="text-3xl font-bold text-gray-900">
            Equipo de Instructores
          </h3>

          <p className="text-lg text-gray-700">
            Nuestro dojang cuenta con cinturones negros formados en nuestra
            escuela que acompañan activamente las clases y los exámenes.
          </p>

          <ul className="space-y-2 text-gray-700">
            <li>✔ Asistencia técnica permanente</li>
            <li>✔ Acompañamiento personalizado</li>
            <li>✔ Transmisión de valores ITF</li>
          </ul>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-red-700 text-white py-20 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-6">
          ¿Querés formar parte de nuestra escuela?
        </h3>

        <p className="text-lg mb-8">
          Sumate al entrenamiento y empezá tu camino en el Taekwondo ITF.
        </p>

        <Link
          href="/lugar-de-practica"
          className="inline-block bg-white text-red-700 font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          Ver lugares de práctica
        </Link>
      </section>
    </main>
  )
}
