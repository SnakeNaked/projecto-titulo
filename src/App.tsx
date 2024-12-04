import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Inicio from "./pages/Inicio";
import Pagina2 from "./pages/Pagina2";
import Pagina3 from "./pages/Pagina3";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import BienvenidoUsuario from "./pages/BienvenidoUsuario";
import Biblioteca from "./pages/Biblioteca";
import DrBienestar from "./pages/DrBienestar";
import Especialistas from "./pages/Especialistas";
import ContactarAhora from "./pages/ContactarAhora";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Inicio de sesión enviado: ${email}`);
    setEmail("");
    setPassword("");
  };

  const handleRegisterFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Registro enviado: ${name}, ${email}, ${phone}`);
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/pagina2" element={<Pagina2 />} />
        <Route path="/pagina3" element={<Pagina3 />} />
        <Route
          path="/login"
          element={
            <Login
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleFormSubmit={handleFormSubmit}
            />
          }
        />
        <Route
          path="/registro"
          element={
            <Registro
              name={name}
              email={email}
              password={password}
              phone={phone}
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
              setPhone={setPhone}
              handleRegisterFormSubmit={handleRegisterFormSubmit}
            />
          }
        />
        <Route path="/bienvenido" element={<BienvenidoUsuario />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/drbienestar" element={<DrBienestar />} />
        <Route path="/especialistas" element={<Especialistas />} />
        <Route path="/contactar" element={<ContactarAhora />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
