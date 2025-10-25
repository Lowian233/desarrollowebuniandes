import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaUsuarios from "./components/ListaUsuarios";
import FormularioUsuario from "./components/FormularioUsuario";

function App() {
  // Estado principal con datos iniciales
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Ana García", correo: "ana@email.com" },
    { id: 2, nombre: "Carlos López", correo: "carlos@email.com" },
  ]);

  // Crear usuario
  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios([...usuarios, { ...nuevoUsuario, id: Date.now() }]);
  };

  // Eliminar usuario
  const eliminarUsuario = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
    }
  };

  // Actualizar usuario
  const actualizarUsuario = (id, usuarioActualizado) => {
    setUsuarios(
      usuarios.map((u) => (u.id === id ? { ...usuarioActualizado, id } : u))
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ListaUsuarios
              usuarios={usuarios}
              eliminarUsuario={eliminarUsuario}
            />
          }
        />
        <Route
          path="/crear"
          element={<FormularioUsuario onSubmit={agregarUsuario} />}
        />
        <Route
          path="/editar/:id"
          element={
            <FormularioUsuario
              usuarios={usuarios}
              onSubmit={actualizarUsuario}
              modo="editar"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

