
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// --- COMPONENTES TEMPORALES ---
const Home = () => (
  <div style={{ padding: '20px' }}>
    <h1>Nakeema - Home</h1>
    <nav style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Link to="/login"><button className="btn-nakeema">Login</button></Link>
      <Link to="/cliente"><button className="btn-nakeema">Soy Cliente (Emilse)</button></Link>
      <Link to="/tecnico"><button className="btn-nakeema">Soy Técnico (Kelly)</button></Link>
      <Link to="/admin"><button className="btn-nakeema">Soy Admin (Mauricio)</button></Link>
      <Link to="/operativo"><button className="btn-nakeema">Soy Operativo (Natalia)</button></Link>
      <Link to="/almacen"><button className="btn-nakeema">Soy Almacén (Jorge)</button></Link>
    </nav>
  </div>
);

// Módulo para Natalia (Operativo) - Págs 34-39 del PDF
const ModuloOperativo = () => (
  <div style={{padding: '20px'}}>
    <h2>Panel Operativo (Natalia Escobar)</h2>
    <p>Gestión de servicios, asignación de técnicos y reportes automáticos.</p>
  </div>
);

// Módulo para Jorge (Almacén) - Págs 32-33 del PDF
const ModuloAlmacen = () => (
  <div style={{padding: '20px'}}>
    <h2>Panel de Almacén e Inventarios (Jorge)</h2>
    <p>Control de stock, entrada/salida de materiales y solicitudes.</p>
  </div>
);

// (Los otros componentes se mantienen igual...)
const Login = () => <div style={{padding: '20px'}}><h2>Inicio de Sesión</h2></div>;
const ModuloCliente = () => <div style={{padding: '20px'}}><h2>Panel de Cliente (Emilse)</h2></div>;
const ModuloTecnico = () => <div style={{padding: '20px'}}><h2>Panel de Técnico (Kelly)</h2></div>;
const ModuloAdmin = () => <div style={{padding: '20px'}}><h2>Panel Administrativo (Mauricio)</h2></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rutas por Rol Actualizadas */}
        <Route path="/cliente/*" element={<ModuloCliente />} />
        <Route path="/tecnico/*" element={<ModuloTecnico />} />
        <Route path="/admin/*" element={<ModuloAdmin />} />
        <Route path="/operativo/*" element={<ModuloOperativo />} />
        <Route path="/almacen/*" element={<ModuloAlmacen />} />
        
        <Route path="*" element={<h1>404 - No encontrado</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;