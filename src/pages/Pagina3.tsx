import { useNavigate } from "react-router-dom";

function Pagina3() {
  const navigate = useNavigate();
  const altDesafios = [
    "Embarazo",
    "LGBTQ+",
    "Autoestima",
    "Trauma",
    "Duelo",
    "Fatiga",
    "Soledad",
    "Problemas de salud",
  ];

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-white bg-dark vh-100 p-4">
      <h2 className="text-center mb-4">
        Agrega otros desafíos con los que te gustaría recibir ayuda en tu
        espacio.
      </h2>
      <div className="row justify-content-center w-75 g-3">
        {altDesafios.map((desafio, index) => (
          <div className="col-6 d-flex justify-content-center" key={index}>
            <button
              className="btn btn-secondary w-100"
              onClick={() => navigate("/login")}
            >
              {desafio}
            </button>
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary mt-4"
        onClick={() => navigate("/login")}
      >
        Continuar al Login
      </button>
    </div>
  );
}

export default Pagina3;