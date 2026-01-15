import Image from "next/image";

export default function LugarDePracticaPage() {
  return (
    <section className="bg-white text-gray-800">
      {/* Banner */}
      <div className="relative w-full h-[280px] md:h-[360px]">
        <Image
          src="/logos/centro-leopoldo.jpg"
          alt="Centro Cultural y Deportivo Leopoldo González"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold tracking-wide text-center px-4">
            Lugar de práctica
          </h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Información */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Centro Cultural y Deportivo Leopoldo González
            </h2>

            <p className="mb-4">
              Nuestro entrenamiento se realiza en un espacio cómodo, seguro y
              adecuado para la práctica del Taekwondo ITF, ubicado en el barrio
              de San Telmo.
            </p>

            <p className="font-medium">
              📍 Dirección:
              <br />
              Av. Independencia 448,
              <br />
              C1099 Cdad. Autónoma de Buenos Aires
            </p>
          </div>

          {/* Google Maps embebido */}
          <div className="w-full h-[300px] rounded-xl overflow-hidden border">
            <iframe
              title="Mapa Centro Leopoldo González"
              src="https://www.google.com/maps?q=Av.+Independencia+448,+Buenos+Aires&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Horarios */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-gray-900">
            Días y horarios
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-xl p-6 text-center">
              <h4 className="font-semibold text-lg mb-2">Infantiles</h4>
              <p>Lunes y Viernes</p>
              <p className="font-medium">17:30 hs</p>
            </div>

            <div className="border rounded-xl p-6 text-center">
              <h4 className="font-semibold text-lg mb-2">Juveniles</h4>
              <p>Lunes y Viernes</p>
              <p className="font-medium">18:30 hs</p>
            </div>

            <div className="border rounded-xl p-6 text-center">
              <h4 className="font-semibold text-lg mb-2">
                Adolescentes y Adultos
              </h4>
              <p>Lunes y Viernes</p>
              <p className="font-medium">19:30 hs</p>
            </div>
          </div>
        </div>

        {/* Galería */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-gray-900">
            Nuestros entrenamientos
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <Image
              src="/images/turno-infantil.jpg"
              alt="Entrenamiento infantil"
              width={400}
              height={260}
              className="rounded-xl object-cover"
            />
            <Image
              src="/images/turno-juvenil.jpg"
              alt="Entrenamiento juvenil"
              width={400}
              height={260}
              className="rounded-xl object-cover"
            />
            <Image
              src="/images/turno-adultos.jpg"
              alt="Entrenamiento adultos"
              width={400}
              height={260}
              className="rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
