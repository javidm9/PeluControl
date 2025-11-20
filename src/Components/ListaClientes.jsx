import React from 'react';

import TarjetaUsuario from './TarjetaUsuario';

export default function ListaClientes({ clientes }) {
  
  if (clientes.length === 0) {
    return <p>No se encontraron clientes.</p>;
  }

  return (
    <div className="lista-clientes-contenedor">
      {clientes.map((usuario) => (
        <TarjetaUsuario
          key={usuario.id} 
          nombre={usuario.nombre}
          telefono={usuario.telefono}
        />
      ))}
    </div>
  );
}