import "./Styles/App.css";

import ContenedorClientes from "./Components/FiltrarClientes";

export default function App() {
  return (
    <div className="App">
      
      <img 
        src="/Adobe Express - file.png" 
        alt="Logo de PeluControl" 
        className="app-logo" 
      />

      <ContenedorClientes />
    </div>
  );
}
