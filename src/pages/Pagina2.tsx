import { useNavigate } from "react-router-dom";

function Pagina2() {
  const navigate = useNavigate();
  const desafios = [
    "Ansiedad",
    "Confianza",
    "Depresión",
    "Relaciones",
    "Motivación",
    "Sueño",
    "Estrés laboral",
    "Estrés estudiantil",
  ];

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-white bg-dark vh-100 p-4">
      <h2 className="text-center mb-4">
        Agrega desafíos con los que te gustaría recibir ayuda en tu espacio.
      </h2>
      <div className="row justify-content-center w-75 g-3">
        {desafios.map((desafio, index) => (
          <div className="col-6 d-flex justify-content-center" key={index}>
            <button
              className="btn btn-secondary w-100"
              onClick={() => navigate("/pagina3")}
            >
              {desafio}
            </button>
          </div>
        ))}
      </div>
      <button
        className="btn btn-warning mt-4"
        onClick={() => navigate("/pagina3")}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagina2;
