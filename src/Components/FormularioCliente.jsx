import React, { useState } from "react";

export default function FormularioCliente({ agregarCliente, cancelar }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: ""
  });

  const validar = () => {
    const nuevosErrores = {};
    let esValido = true;

    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
      esValido = false;
    }

    if (!telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio";
      esValido = false;
    } else if (!/^[0-9]+$/.test(telefono)) {
      nuevosErrores.telefono = "El teléfono solo debe contener números";
      esValido = false;
    } else if (telefono.length < 9) {
      nuevosErrores.telefono = "El teléfono debe tener al menos 9 dígitos";
      esValido = false;
    }

    setErrores(nuevosErrores);
    return esValido;
  };

  const manejarEnvio = (e) => {
    e.preventDefault(); 

    if (validar()) {
      agregarCliente({ nombre, telefono });
      
      setNombre("");
      setTelefono("");
      setErrores({});
    }
  };

  return (
    <div className="formulario-contenedor" style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px", borderRadius: "8px" }}>
      <h3>Nuevo Cliente</h3>
      <form onSubmit={manejarEnvio}>
        
        <div className="campo">
          <label style={{ display: "block", marginBottom: "5px" }}>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Juan Pérez"
            style={{ 
              width: "100%", 
              padding: "8px", 
              border: errores.nombre ? "1px solid red" : "1px solid #ccc" 
            }} 
          />
          {errores.nombre && <p style={{ color: "red", fontSize: "0.8rem", marginTop: "2px" }}>{errores.nombre}</p>}
        </div>

        <div className="campo" style={{ marginTop: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Teléfono:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej. 600123456"
            style={{ 
              width: "100%", 
              padding: "8px", 
              border: errores.telefono ? "1px solid red" : "1px solid #ccc" 
            }} 
          />
          {errores.telefono && <p style={{ color: "red", fontSize: "0.8rem", marginTop: "2px" }}>{errores.telefono}</p>}
        </div>

        <div className="botones" style={{ marginTop: "20px" }}>
          <button 
            type="submit" 
            style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", marginRight: "10px", cursor: "pointer" }}
          >
            Guardar
          </button>
          
          <button 
            type="button" 
            onClick={cancelar}
            style={{ backgroundColor: "#f44336", color: "white", padding: "10px 20px", border: "none", cursor: "pointer" }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}