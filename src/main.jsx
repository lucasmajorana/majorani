import React from 'react';
import ReactDOM from 'react-dom/client';  // Cambiar importación
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Usamos createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
