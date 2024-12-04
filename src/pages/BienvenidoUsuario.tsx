import React from "react";
import { useNavigate } from "react-router-dom";

const BienvenidoUsuario: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white">
      <h1 className="mb-4">Health App</h1>
      <img
        src="/Pulpo.png"
        alt="Pulpo"
        className="mb-4"
        style={{ maxWidth: "200px", width: "100%", height: "auto" }}
      />
      <p className="mb-4">Bienvenido, ¿en qué puedo ayudarte hoy?</p>

      <button
        className="btn btn-primary mb-3"
        style={{ width: "200px" }}
        onClick={() => navigate("/biblioteca")}
      >
        Biblioteca de ayuda
      </button>
      <button
        className="btn btn-primary mb-3"
        style={{ width: "200px" }}
        onClick={() => navigate("/drbienestar")}
      >
        Dr. Bienestar
      </button>
      <button
        className="btn btn-primary mb-3"
        style={{ width: "200px" }}
        onClick={() => navigate("/especialistas")}
      >
        Especialistas
      </button>
      <button
        className="btn btn-primary mb-3"
        style={{ width: "200px" }}
        onClick={() => navigate("/contactar")}
      >
        Contactar ahora
      </button>

      <button
        className="btn btn-secondary"
        style={{ width: "200px" }}
        onClick={() => navigate("/")}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default BienvenidoUsuario;
