import { useState } from "react";

function Login() {
  const [email, setCorreo] = useState("");
  const [password, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch("http://localhost:6502/apiu/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        localStorage.setItem("token", data.token);
        alert("Bienvenido, " + data.usuario.name);
      } else {
        setError(data.mensaje);
      }
    } catch (err) {
      setError("Error al conectar con el servidor", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ingresa tu correo"
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
        <button type="submit" className="btn btn-primary mt-4">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
