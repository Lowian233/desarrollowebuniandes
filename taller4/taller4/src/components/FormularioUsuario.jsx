import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FormularioUsuario({ onSubmit, usuarios = [], modo = "crear" }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

 
  useEffect(() => {
    if (modo === "editar" && id) {
      const usuario = usuarios.find((u) => u.id === Number(id));
      if (usuario) {
        setNombre(usuario.nombre);
        setCorreo(usuario.correo);
      }
    }
  }, [modo, id, usuarios]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !correo) {
      alert("Por favor completa todos los campos");
      return;
    }
    if (modo === "editar") {
      onSubmit(Number(id), { nombre, correo });
    } else {
      onSubmit({ nombre, correo });
    }
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{modo === "editar" ? "Editar Usuario" : "Crear Usuario"}</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <br />
        <label>Correo:</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <br />
        <button type="submit">
          {modo === "editar" ? "Guardar Cambios" : "Crear"}
        </button>{" "}
        <button type="button" onClick={() => navigate("/")}>
          Volver
        </button>
      </form>
    </div>
  );
}

export default FormularioUsuario;
