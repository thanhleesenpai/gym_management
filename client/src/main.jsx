import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from "./context/auth";
import { CartProvider } from './context/cart.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <CartProvider>
    <App/>
      </CartProvider>
    </AuthProvider>
)
