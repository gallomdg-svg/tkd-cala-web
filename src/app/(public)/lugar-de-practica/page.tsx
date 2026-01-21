import Image from "next/image";

export default function LugarDePracticaPage() {
  return (
    <section className="bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-14 space-y-20">
        {/* Título */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Lugar de práctica
          </h1>
          <p className="text-lg text-gray-600">
            Centro Cultural y Deportivo Leopoldo González
          </p>
        </div>

        {/* Información + foto + mapa */}
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* Texto */}
          <div className="md:col-span-1 text-center">
            <h2 className="text-xl font-semibold text-red-700 mb-4">
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
              Av. Independencia 448
              <br />
              C1099 Cdad. Autónoma de Buenos Aires
            </p>
          </div>

          {/* Foto del lugar */}
          <div className="md:col-span-1">
            <Image
              src="/logos/centro_leopoldo.jpeg"
              alt="Centro Cultural Leopoldo González"
              width={400}
              height={400}
              className="rounded-xl object-cover shadow-md w-full"
            />
          </div>

          {/* Mapa */}
          <div className="md:col-span-1 w-full h-[400px] rounded-xl overflow-hidden border">
            <iframe
              title="Mapa Centro Leopoldo González"
              src="https://www.google.com/maps?q=Av.+Independencia+448,+Buenos+Aires&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Turnos */}
        <div>
          <h3 className="text-2xl font-semibold mb-10 text-center">
            Turnos de entrenamiento
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Infantiles */}
            <div className="rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/turno-infantil.jpg"
                alt="Turno infantil"
                width={400}
                height={260}
                className="object-cover"
              />
              <div className="p-5 text-center">
                <h4 className="font-semibold text-lg">Infantiles</h4>
                <p>Lunes y Viernes</p>
                <p className="font-medium text-red-700">17:30 hs</p>
              </div>
            </div>

            {/* Juveniles */}
            <div className="rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/turno-juvenil.jpeg"
                alt="Turno juvenil"
                width={400}
                height={260}
                className="object-cover"
              />
              <div className="p-5 text-center">
                <h4 className="font-semibold text-lg">Juveniles</h4>
                <p>Lunes y Viernes</p>
                <p className="font-medium text-red-700">18:30 hs</p>
              </div>
            </div>

            {/* Adultos */}
            <div className="rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/turno-adultos.jpeg"
                alt="Turno adultos"
                width={400}
                height={260}
                className="object-cover"
              />
              <div className="p-5 text-center">
                <h4 className="font-semibold text-lg">
                  Adolescentes y Adultos
                </h4>
                <p>Lunes y Viernes</p>
                <p className="font-medium text-red-700">19:30 hs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Video */}
        {/* Video + Detalle del espacio */}
<div className="max-w-6xl mx-auto space-y-6">
  <h3 className="text-2xl font-semibold text-center">
    Conocé nuestro espacio de entrenamiento
  </h3>

  <div className="grid md:grid-cols-2 gap-10 items-start">
    {/* Video */}
    <div className="flex justify-center">
      <video
        src="/videos/lugar-practica.mp4"
        controls
        className="w-full max-w-md rounded-xl shadow-md"
      />
    </div>

    {/* Detalle del lugar */}
    <div className="bg-gray-50 rounded-xl shadow-md p-6">
      <h4 className="text-xl font-semibold text-red-700 mb-4">
        Sede San Telmo – Dojang
      </h4>

      <ul className="space-y-2 text-gray-700">
        <li>✔️ Sala de 13 x 5 metros con piso de goma de alto impacto</li>
        <li>✔️ Focos, escudos de potencia, palmetas y accesorios completos</li>
        <li>✔️ Baños cómodos y vestuarios propios</li>
        <li>✔️ Sacos de boxeo</li>
        <li>✔️ Sala climatizada con aire acondicionado</li>
        <li>✔️ Dispenser de agua</li>
        <li>✔️ Ventiladores de techo</li>
        <li>✔️ Gran ambiente de compañerismo</li>
        <li>✔️ Excelente equipo de trabajo</li>
      </ul>
    </div>
  </div>
</div>
      </div>
    </section>
  );
}
