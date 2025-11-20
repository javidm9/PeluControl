import React from 'react';

export default function OrdenarLista({
  criterioActual,
  direccionActual,
  onCriterioChange,
  onDireccionChange
}) {
  return (
    <div className="selector-orden">
      <label htmlFor="criterio-select">Ordenar por: </label>
      <select 
        id="criterio-select" 
        value={criterioActual} 
        onChange={onCriterioChange}
      >
        <option value="id">Por defecto</option>
        <option value="nombre">Nombre</option>
        <option value="telefono">Teléfono</option>
      </select>

      <label 
        htmlFor="direccion-select" 
        className="label-direccion"
      >
        Dirección: 
      </label>
      <select 
        id="direccion-select" 
        value={direccionActual} 
        onChange={onDireccionChange}
      >
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
  );
}