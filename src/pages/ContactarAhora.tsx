import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactarAhora: React.FC = () => {
  const [doctorSeleccionado, setDoctorSeleccionado] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  const handleContactar = (doctor: string) => {
    setDoctorSeleccionado(doctor);
  };

  const doctorImages: { [key: string]: string } = {
    "Dr. Jiménez": "/DrJimenez.jpg",
    "Dr. Sánchez": "/DrSanchez.jpg",
    "Dr. Iturria": "/DrIturria.jpg",
    "Dr. Polo": "/DrPolo.jpg",
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
      {!doctorSeleccionado ? (
        <>
          <h1 className="mb-4 text-center">
            Aquí puedes comunicarte directamente
          </h1>
          <div className="row w-100 text-center mb-4">
            <div className="col-6">Doctor</div>
            <div className="col-6">Acción</div>
          </div>

          {[
            { nombre: "Dr. Jiménez" },
            { nombre: "Dr. Sánchez" },
            { nombre: "Dr. Iturria" },
            { nombre: "Dr. Polo" },
          ].map((doctor, index) => (
            <div className="row w-100 text-center mb-3" key={index}>
              <div className="col-6">
                <h1 className="fs-4 text-nowrap">{doctor.nombre}</h1>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-primary"
                  onClick={() => handleContactar(doctor.nombre)}
                >
                  Contactar
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <h1 className="mb-4 text-center">{doctorSeleccionado}</h1>
          <img
            src={doctorImages[doctorSeleccionado]}
            alt={doctorSeleccionado}
            className="mb-4"
            style={{
              maxWidth: "200px",
              width: "100%",
              height: "auto",
              borderRadius: "10px",
            }}
          />
          <div className="d-flex flex-column align-items-center">
            <button className="btn btn-primary mb-3" style={{ width: "200px" }}>
              Llamada de voz
            </button>
            <button
              className="btn btn-primary mb-3"
              style={{ width: "200px" }}
              onClick={() => window.open("https://web.whatsapp.com/", "_blank")}
            >
              Mandar mensaje
            </button>
            <button
              className="btn btn-primary mb-3"
              style={{ width: "200px" }}
              onClick={() => window.open("https://www.zoom.com/es", "_blank")}
            >
              Videollamada
            </button>
            <button
              className="btn btn-secondary mb-3"
              style={{ width: "200px" }}
              onClick={() => setDoctorSeleccionado(null)}
            >
              Volver
            </button>
          </div>
        </>
      )}
      <button
        className="btn btn-secondary mt-4"
        style={{ width: "200px" }}
        onClick={() => navigate("/bienvenido")}
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default ContactarAhora;
