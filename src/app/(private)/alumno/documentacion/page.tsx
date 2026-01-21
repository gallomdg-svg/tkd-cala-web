// app/private/documentacion/page.tsx
import React from "react";
import Link from "next/link";

const DocumentacionPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Documentación</h1>
      <p className="mb-6 text-gray-700">
        En esta sección encontrarás toda la documentación necesaria para alumnos y profesores.
      </p>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Planilla de Inscripción</h2>
        <p className="mb-2 text-gray-600">
          Puedes descargar la planilla de inscripción haciendo click en el enlace:
        </p>
        <Link
          href="/documentos/planilla_inscripcion.pdf"
          target="_blank"
          className="text-blue-600 hover:underline font-medium"
        >
          Descargar planilla de inscripción
        </Link>
      </div>
    </div>
  );
};

export default DocumentacionPage;
