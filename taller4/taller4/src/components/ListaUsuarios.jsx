import { Link } from "react-router-dom";

function ListaUsuarios({ usuarios, eliminarUsuario }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestión de Usuarios</h1>
      <Link to="/crear">[ + Crear Nuevo Usuario ]</Link>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.nombre} ({u.correo}){" "}
            <Link to={`/editar/${u.id}`}>[Editar]</Link>{" "}
            <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaUsuarios;
