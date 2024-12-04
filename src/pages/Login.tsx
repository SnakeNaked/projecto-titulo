import { useNavigate } from "react-router-dom";

interface LoginProps {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Login: React.FC<LoginProps> = ({
  email,
  password,
  setEmail,
  setPassword,
}) => {
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inicio de sesión exitoso");
        navigate("/bienvenido");
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="text-white bg-dark vh-100 d-flex flex-column justify-content-center align-items-center">
      <form onSubmit={handleLoginSubmit} className="text-center w-50">
        <h1>Iniciar sesión</h1>
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
        <button type="submit" className="btn btn-primary w-100">
          Iniciar sesión
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-3 w-100"
          onClick={() => navigate("/registro")}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Login;
