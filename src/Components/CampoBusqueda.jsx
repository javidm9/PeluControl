import React from "react";

import { useState } from "react";

export default function Busqueda({ buscar }) {
  const [busqueda, setBusqueda] = useState("");

  const manejarCambio = (e) => {
    const valor = e.target.value;

    setBusqueda(valor);

    buscar(valor);
  };

  return (
    <input
      type="text"
      placeholder="Buscar por nombre o teléfono"
      className="campo-busqueda"
      value={busqueda}
      onChange={manejarCambio}
    />
  );
}
