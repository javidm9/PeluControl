import { useState, useEffect } from "react";
import Busqueda from "./CampoBusqueda";
import ListaClientes from "./ListaClientes";
import Paginacion from "./Paginacion";
import FormularioCliente from "./FormularioCliente"; // Importamos el componente nuevo

// Datos iniciales
const datosClientes = [
  { id: 1, nombre: "Laura González", telefono: "644 123 123" },
  { id: 2, nombre: "Carlos Ruiz", telefono: "655 321 321" },
  { id: 3, nombre: "Marta Pérez", telefono: "699 112 233" },
  { id: 4, nombre: "Ana López", telefono: "611 223 344" },
  { id: 5, nombre: "David Martín", telefono: "622 334 455" },
  { id: 6, nombre: "Sofía Fernández", telefono: "633 445 566" },
];

const opcionesPagina = [2, 3, 4, 5, 6];

export default function ContenedorClientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [resultadosPorPagina, setResultadosPorPagina] = useState(opcionesPagina[0]);
  const [criterioOrden, setCriterioOrden] = useState("id");
  const [direccionOrden, setDireccionOrden] = useState("asc");

  useEffect(() => {
    if (error) {
      setCargando(false);
      return;
    }
    setCargando(true);
    const timer = setTimeout(() => {
      setClientes(datosClientes);
      setCargando(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [error]);

  const agregarCliente = (nuevoCliente) => {
    const id = clientes.length > 0 ? Math.max(...clientes.map((c) => c.id)) + 1 : 1;

    const clienteConId = { id, ...nuevoCliente };

    setClientes([clienteConId, ...clientes]);

    setMostrarFormulario(false);
  };

  const filtrarClientes = (texto) => {
    setBusqueda(texto.toLowerCase());
    setPaginaActual(1);
  };

  const cambiarCriterio = (e) => { setCriterioOrden(e.target.value); setPaginaActual(1); };
  const cambiarDireccion = (e) => { setDireccionOrden(e.target.value); setPaginaActual(1); };
  const cambiarResultados = (e) => { setResultadosPorPagina(Number(e.target.value)); setPaginaActual(1); };

  const clientesFiltrados = clientes.filter((cliente) => {
    return (
      cliente.nombre.toLowerCase().includes(busqueda) ||
      cliente.telefono.includes(busqueda)
    );
  });

  const clientesOrdenados = [...clientesFiltrados].sort((a, b) => {
    let valA = criterioOrden === "id" ? a.id : a[criterioOrden].toLowerCase();
    let valB = criterioOrden === "id" ? b.id : b[criterioOrden].toLowerCase();

    if (valA < valB) return direccionOrden === "asc" ? -1 : 1;
    if (valA > valB) return direccionOrden === "asc" ? 1 : -1;
    return 0;
  });

  const indiceFinal = paginaActual * resultadosPorPagina;
  const indiceInicial = indiceFinal - resultadosPorPagina;
  const clientesPaginados = clientesOrdenados.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(clientesFiltrados.length / resultadosPorPagina) || 1;

  const irSiguiente = () => { if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1); };
  const irAnterior = () => { if (paginaActual > 1) setPaginaActual(paginaActual - 1); };

  if (error) return <div>Error <button onClick={() => setError(false)}>Reintentar</button></div>;
  if (cargando) return <div className="cargando"><h1>Cargando clientes...</h1></div>;

  return (
    <div>
      <Busqueda buscar={filtrarClientes} />

      <div className="acciones-contenedor" style={{ margin: "20px 0" }}>
        {!mostrarFormulario ? (
          <button
            onClick={() => setMostrarFormulario(true)}
            style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px", border: "none" }}
          >
            + Añadir cliente
          </button>
        ) : (
          <FormularioCliente
            agregarCliente={agregarCliente}
            cancelar={() => setMostrarFormulario(false)}
          />
        )}
      </div>

      <div className="controles-contenedor">
        <div className="control-grupo">
          <label>Ordenar por: </label>
          <select value={criterioOrden} onChange={cambiarCriterio}>
            <option value="id">ID</option>
            <option value="nombre">Nombre</option>
            <option value="telefono">Teléfono</option>
          </select>
        </div>
        <div className="control-grupo">
          <label>Dirección: </label>
          <select value={direccionOrden} onChange={cambiarDireccion}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
        <div className="control-grupo">
          <label>Resultados: </label>
          <select value={resultadosPorPagina} onChange={cambiarResultados}>
            {opcionesPagina.map(op => <option key={op} value={op}>{op}</option>)}
          </select>
        </div>
      </div>

      <ListaClientes clientes={clientesPaginados} />

      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        irAnterior={irAnterior}
        irSiguiente={irSiguiente}
      />
    </div>
  );
}