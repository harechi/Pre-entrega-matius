import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import CartProvider from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import {BusquedaProvider} from './context/BusquedaContext.jsx'
import { ProductosProvider } from "./context/ProductsContext.jsx";
import { CategoriaProvider } from './context/CategoriaContext.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <BusquedaProvider>
      <CategoriaProvider>
      <AuthProvider>
        <ProductosProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductosProvider>
      </AuthProvider>
    </CategoriaProvider>
    </BusquedaProvider>
  </BrowserRouter>
)
