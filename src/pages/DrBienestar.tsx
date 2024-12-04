import React from "react";
import { useNavigate } from "react-router-dom";

const DrBienestar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white">
      <img
        src="/robot.jpg"
        alt="Robot asistente"
        className="mb-4"
        style={{
          maxWidth: "200px",
          width: "100%",
          height: "auto",
          borderRadius: "10px",
        }}
      />
      <h1 className="mb-4 text-center">
        ¿En qué puedo ayudarte el día de hoy?
      </h1>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Haz tu pregunta"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "5px",
          padding: "10px",
        }}
      />
      <small className="text-white mb-4">Tienes 10 preguntas diarias</small>
      <button
        className="btn btn-primary"
        onClick={() => navigate("/bienvenido")}
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default DrBienestar;
