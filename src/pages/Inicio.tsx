import { useNavigate } from "react-router-dom";

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white">
      <img
        src="/Pulpo.png"
        alt="Imagen de bienvenida"
        className="mb-4"
        style={{ width: "200px" }}
      />
      <h1 className="mb-5">¡Hola! Soy Healer</h1>
      <p>Estoy aquí para ayudarte a amarte y nutrirte</p>
      <button
        className="btn btn-primary mt-4"
        onClick={() => navigate("/pagina2")}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Inicio;
