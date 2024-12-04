import React from "react";
import { useNavigate } from "react-router-dom";

const Biblioteca: React.FC = () => {
  const navigate = useNavigate();

  const libros = [
    {
      nombre: "Tratamiento del Alcoholismo",
      ruta: "/libros/01 - Tratamiento del alcoholismo.pdf",
    },
    {
      nombre: "Guias de autoayuda para la depresion",
      ruta: "/libros/02 - Guias de autoayuda para la depresion.pdf",
    },
    {
      nombre: "Los caminos para el exito",
      ruta: "/libros/03 - Los caminos para el exito.pdf",
    },
    {
      nombre: "Guia para dejar de fumar",
      ruta: "/libros/04 - Guia para que las personas dejen de fumar.pdf",
    },
    {
      nombre: "Manual de autoayuda",
      ruta: "/libros/07 - Manual de grupos de autoayuda.pdf",
    },
  ];

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white">
      {/* Título */}
      <h1 className="mb-4">Bienvenido a la biblioteca</h1>

      {/* Imagen */}
      <img
        src="/Biblioteca.png"
        alt="Biblioteca"
        className="mb-4"
        style={{ maxWidth: "150px", width: "100%", height: "auto" }}
      />

      <div className="d-flex flex-column align-items-center mb-4">
        {libros.map((libro, index) => (
          <a
            key={index}
            href={libro.ruta}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mb-2"
            style={{ width: "200px", textDecoration: "none" }}
          >
            {libro.nombre}
          </a>
        ))}
      </div>

      <button
        className="btn btn-secondary"
        onClick={() => navigate("/bienvenido")}
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default Biblioteca;
