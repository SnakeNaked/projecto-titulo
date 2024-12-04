import { useNavigate } from "react-router-dom";

interface RegistroProps {
  name: string;
  email: string;
  password: string;
  phone: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setPhone: (value: string) => void;
  handleRegisterFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Registro: React.FC<RegistroProps> = ({
  name,
  email,
  password,
  phone,
  setName,
  setEmail,
  setPassword,
  setPhone,
}) => {
  const navigate = useNavigate();

  const handleRegisterFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registro exitoso. Ahora inicia sesión.");
        navigate("/login");
      } else {
        alert(data.message || "Error al registrar");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error al conectar con el servidor");
    }

    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
  };

  return (
    <div className="text-white bg-dark vh-100 d-flex flex-column justify-content-center align-items-center">
      <form onSubmit={handleRegisterFormSubmit} className="text-center w-50">
        <h1>Registro</h1>
        <input
          type="text"
          placeholder="Nombre"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Teléfono"
          className="form-control mb-3"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit" className="btn btn-success w-100">
          Registrarse
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-3 w-100"
          onClick={() => navigate("/login")}
        >
          Volver al login
        </button>
      </form>
    </div>
  );
};

export default Registro;
