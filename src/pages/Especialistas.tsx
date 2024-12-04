import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Especialistas: React.FC = () => {
  const navigate = useNavigate();
  const [misHoras, setMisHoras] = useState<
    { id: number; doctor: string; fecha: string }[]
  >([]);
  const [mostrarHoras, setMostrarHoras] = useState(false);

  const fetchHorasAgendadas = async () => {
    try {
      const response = await fetch("http://localhost:3001/mishoras");
      const data = await response.json();
      setMisHoras(data);
    } catch (error) {
      console.error("Error al obtener las horas agendadas:", error);
    }
  };

  useEffect(() => {
    fetchHorasAgendadas();
  }, []);

  const handleAgendar = async (doctor: string, fecha: string) => {
    if (!fecha) {
      alert("Selecciona una fecha antes de agendar.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/agendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctor,
          fecha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchHorasAgendadas();
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error al agendar la cita:", error);
      alert("No se pudo agendar la cita. Intenta nuevamente.");
    }
  };

  const handleCancelarHora = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/cancelarhora/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchHorasAgendadas();
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error al cancelar la hora:", error);
      alert("No se pudo cancelar la hora. Intenta nuevamente.");
    }
  };

  const today = new Date();
  const oneWeekFromToday = new Date();
  oneWeekFromToday.setDate(today.getDate() + 7);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const minDate = formatDate(today);
  const maxDate = formatDate(oneWeekFromToday);

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
      {!mostrarHoras && (
        <h1 className="mb-4 text-center">
          Agenda una hora en persona con nuestros especialistas
        </h1>
      )}

      {!mostrarHoras ? (
        <>
          <div className="row w-100 text-center mb-4">
            <div className="col-4">Doctor</div>
            <div className="col-4">Fecha</div>
            <div className="col-4">Confirmación</div>
          </div>

          {[
            { nombre: "Dr. Jiménez" },
            { nombre: "Dr. Sánchez" },
            { nombre: "Dr. Iturria" },
            { nombre: "Dr. Polo" },
          ].map((doctor, index) => (
            <div className="row w-100 text-center mb-3" key={index}>
              <div className="col-4">
                <h1 className="fs-4 text-nowrap">{doctor.nombre}</h1>
              </div>
              <div className="col-4">
                <input
                  type="date"
                  className="form-control"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "5px",
                    padding: "5px 10px",
                  }}
                  id={`fecha-${index}`}
                  min={minDate}
                  max={maxDate}
                />
              </div>
              <div className="col-4">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleAgendar(
                      doctor.nombre,
                      (
                        document.getElementById(
                          `fecha-${index}`
                        ) as HTMLInputElement
                      ).value
                    )
                  }
                >
                  Agendar
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-center">
          <h2 className="mb-4">Mis Horas Agendadas</h2>
          {misHoras.length > 0 ? (
            misHoras.map((hora) => (
              <div
                key={hora.id}
                className="d-flex justify-content-between align-items-center bg-light text-dark p-3 mb-2"
                style={{ borderRadius: "5px", width: "300px" }}
              >
                <div>
                  <strong>{hora.doctor}</strong>
                  <br />
                  {hora.fecha}
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleCancelarHora(hora.id)}
                >
                  Cancelar
                </button>
              </div>
            ))
          ) : (
            <p>No tienes horas agendadas.</p>
          )}
        </div>
      )}

      <div className="d-flex flex-column align-items-center mt-4">
        {misHoras.length > 0 && (
          <button
            className="btn btn-warning mb-3"
            onClick={() => setMostrarHoras(!mostrarHoras)}
          >
            {mostrarHoras ? "Volver a agendar" : "Ver mis horas"}
          </button>
        )}
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/bienvenido")}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default Especialistas;
