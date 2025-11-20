import React from "react";

export default function Paginacion({
  paginaActual,
  totalPaginas,
  irAnterior,
  irSiguiente,
}) {
  if (totalPaginas <= 1) {
    return null;
  }

  return (
    <div className="paginacion">
      <button onClick={irAnterior} disabled={paginaActual === 1}>
        Anterior
      </button>

      <span>
        Página {paginaActual} de {totalPaginas}
      </span>

      <button onClick={irSiguiente} disabled={paginaActual === totalPaginas}>
        Siguiente
      </button>
    </div>
  );
}
