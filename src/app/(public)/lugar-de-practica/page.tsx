export default function LugarDePracticaPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Lugar de práctica</h1>

      <p className="mb-6 text-lg">
        Las clases de Taekwondo se dictan en el siguiente lugar:
      </p>

      <div className="space-y-2 text-base">
        <p>
          <strong>Dirección:</strong> Av. Independencia 448
        </p>
        <p>
          <strong>Barrio:</strong> San Telmo
        </p>
        <p>
          <strong>Ciudad:</strong> Buenos Aires, Argentina
        </p>
      </div>

      <p className="mt-6">
        Consultanos por horarios y niveles disponibles.
      </p>

      <a
        href="https://wa.me/541136281384"
        target="_blank"
        className="inline-block mt-6 rounded bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700"
      >
        Contactar por WhatsApp
      </a>
    </section>
  );
}
