import React from 'react';

export default function TarjetaUsuario({ nombre, telefono }) {
  return (
    <div className="tarjeta">
      <h3>{nombre}</h3>
      <p>Tlf: {telefono}</p>
    </div>
  );
}