import React from "react";

export default function ResultadosBusqueda({
  opciones,
  onChange,
  valorActual,
}) {
  return (
    <div className="resultados-por-pagina">
      <label htmlFor="resultados-select">Resultados por página: </label>
      <select id="resultados-select" onChange={onChange} value={valorActual}>
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
    </div>
  );
}
