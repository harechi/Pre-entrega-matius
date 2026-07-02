import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./components/pages/Home";
import Productos from "./components/pages/Products";
import ProductoDetalle from "./components/pages/DetalleProducto";
import Cart from "./components/pages/Cart";
import Login from "./components/pages/Login";
import Registro from "./components/pages/Registro";
import Dashboard from "./components/forms/Dashboard";
import RutasProtegidas from './components/RutasProtegidas';
import ResultadosBusqueda from './components/search/ResultadoBusqueda'

function App() {
  return (
  
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:categoria" element={<Productos />} />

          <Route path="/producto/:id" element={<ProductoDetalle />} />

          <Route path="/carrito" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/busqueda" element={<ResultadosBusqueda />} />
        </Routes>
      </Layout>
  );
}

export default App;