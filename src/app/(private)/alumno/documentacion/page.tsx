// app/private/documentacion/page.tsx
import React from "react";
import Link from "next/link";
import { FileText, Download } from "lucide-react";

const DocumentacionPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Documentación</h1>
      <p className="mb-6 text-gray-700">
        En esta sección encontrarás toda la documentación necesaria para alumnos y profesores.
      </p>

      <div className="bg-white shadow rounded divide-y">
        {/* Documento */}
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
          <div className="flex items-center gap-3">
            <FileText className="text-gray-500" size={22} />
            <span className="font-medium text-gray-800">
              Planilla de Inscripción
            </span>
          </div>

          <Link
            href="/documentos/planilla_inscripcion.pdf"
            target="_blank"
            className="flex items-center gap-2 text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition"
          >
            <Download size={16} />
            Descargar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocumentacionPage;
